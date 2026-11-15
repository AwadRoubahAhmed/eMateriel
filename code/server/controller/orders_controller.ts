import type { Request, Response } from "express";
import { ADMIN, currentUser } from "../middleware/autorization_Middleware";
import Orders_Repository, { MAX_PENDING_PER_USER, OrderError } from "../repository/orders_repository";
import OrderPaymentService from "../service/order_payment_service";
import StripeService from "../service/stripe_service";
import { idParam } from "../validation/schemas";

const siteUrl = (req: Request) =>
	process.env.SITE_URL ?? `${req.protocol}://${req.get("host")}`;

class Orders_Controller {
	private repository = new Orders_Repository();
	private stripe = new StripeService();
	private payments = new OrderPaymentService();

	// une commande n'est visible que par son client ou un administrateur
	private findOwned = async (req: Request, res: Response) => {
		const order = await this.repository.selectOne(idParam.parse(req.params.id));
		const user = currentUser(res);
		if (!order || (order.user_id !== user.id && user.role !== ADMIN)) {
			res.status(404).json({ status: 404, message: "Commande introuvable" });
			return null;
		}
		return order;
	};

	// POST /api/orders : crée la commande puis la session de paiement Stripe
	public create = async (req: Request, res: Response) => {
		if (!this.stripe.isConfigured()) {
			res.status(503).json({ status: 503, message: "Paiement indisponible pour le moment" });
			return;
		}
		const user = currentUser(res);
		if ((await this.repository.countPending(user.id)) >= MAX_PENDING_PER_USER) {
			res.status(409).json({
				status: 409,
				message: "Vous avez déjà des commandes en attente de paiement : payez-les ou annulez-les d'abord",
			});
			return;
		}
		let order: Awaited<ReturnType<Orders_Repository["create"]>>;
		try {
			order = await this.repository.create(user.id, req.body.items, req.body.shipping);
		} catch (error) {
			if (error instanceof OrderError) {
				res.status(409).json({ status: 409, message: error.message });
				return;
			}
			throw error;
		}

		try {
			const session = await this.stripe.createCheckoutSession({
				orderId: order.id,
				email: user.email,
				lines: order.lines,
				siteUrl: siteUrl(req),
			});
			await this.repository.setStripeSession(order.id, session.id);
			res.status(201).json({
				status: 201,
				message: "Commande créée",
				data: { id: order.id, total: order.total, checkout_url: session.url },
			});
		} catch (error) {
			// paiement impossible : on libère le stock réservé
			await this.repository.setStatus(order.id, "annulee");
			throw error;
		}
	};

	// POST /api/orders/:id/confirm : vérifie auprès de Stripe que le paiement est passé
	// (un paiement dont le client ne revient pas est rattrapé par le nettoyage périodique)
	// shortcut: pas de webhook Stripe ; l'ajouter (checkout.session.completed) pour une
	// confirmation instantanée en production.
	public confirm = async (req: Request, res: Response) => {
		const order = await this.findOwned(req, res);
		if (!order) return;
		if (order.status === "en_attente" && (await this.payments.syncPaid(order))) {
			order.status = "payee";
		}
		res.json({ status: 200, message: "ok", data: order });
	};

	// POST /api/orders/:id/cancel : le client abandonne une commande non payée
	public cancel = async (req: Request, res: Response) => {
		const order = await this.findOwned(req, res);
		if (!order) return;
		if (order.status !== "en_attente") {
			res.status(409).json({ status: 409, message: "Seule une commande en attente peut être annulée" });
			return;
		}
		// on vérifie d'abord auprès de Stripe : une commande déjà payée n'est jamais annulée
		if ((await this.payments.cancelUnpaid(order)) === "payee") {
			res.status(409).json({ status: 409, message: "Cette commande a déjà été payée" });
			return;
		}
		res.json({ status: 200, message: "Commande annulée" });
	};

	public mine = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectByUser(currentUser(res).id) });
	};

	public selectOne = async (req: Request, res: Response) => {
		const order = await this.findOwned(req, res);
		if (order) res.json({ status: 200, message: "ok", data: order });
	};

	// admin
	public index = async (_req: Request, res: Response) => {
		res.json({ status: 200, message: "ok", data: await this.repository.selectAll() });
	};

	public setStatus = async (req: Request, res: Response) => {
		try {
			if (!(await this.repository.setStatus(idParam.parse(req.params.id), req.body.status))) {
				res.status(404).json({ status: 404, message: "Commande introuvable" });
				return;
			}
		} catch (error) {
			if (error instanceof OrderError) {
				res.status(409).json({ status: 409, message: error.message });
				return;
			}
			throw error;
		}
		res.json({ status: 200, message: "Statut modifié" });
	};
}

export default Orders_Controller;
