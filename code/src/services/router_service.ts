import type { unstable_RSCRouteConfig as RSCRouteConfig } from "react-router";

// pages publiques (avec Navbar + Footer)
const publicPages: [string, string, () => Promise<unknown>][] = [
	["products", "products", () => import("../pages/products/Products")],
	["product_detail", "products/:id", () => import("../pages/products/ProductsDetail")],
	["category", "categories/:id", () => import("../pages/category/Category")],
	["contact", "contact", () => import("../pages/contact/Contact")],
	["apropos", "apropos", () => import("../pages/apropos/Apropos")],
	["faqs", "faqs", () => import("../pages/FAQs/FAQs")],
	["panier", "panier", () => import("../pages/panier/Panier")],
	["checkout", "commande", () => import("../pages/checkout/Checkout")],
	["checkout_success", "commande/confirmation", () => import("../pages/checkout/CheckoutSuccess")],
	["checkout_cancel", "commande/annulee", () => import("../pages/checkout/CheckoutCancel")],
	["my_orders", "mes-commandes", () => import("../pages/orders/MyOrders")],
	["auth", "auth", () => import("../pages/auth/AuthPage/AuthPage")],
	["mentions_legales", "mentions-legales", () => import("../pages/MentionsLegales/MentionsLegales")],
	["cgv", "cgv", () => import("../pages/legal/CGV")],
	["cgu", "cgu", () => import("../pages/legal/CGU")],
	["politique_confidentialite", "politique-confidentialite", () => import("../pages/PolitiqueConfidentialite/PolitiqueConfidentialite")],
	// toute autre adresse : vraie réponse HTTP 404
	["not_found", "*", () => import("../pages/error/Error")],
];

const adminPages: [string, string, () => Promise<unknown>][] = [
	["admin_products", "products", () => import("../pages/admin/product/index")],
	["admin_product_add", "product/form", () => import("../pages/admin/product/formAdd")],
	["admin_product_update", "product/update/:id", () => import("../pages/admin/product/update")],
	["admin_categories", "categories", () => import("../pages/admin/categories/AdminCategoryHome")],
	["admin_category_add", "category/form", () => import("../pages/admin/categories/Update")],
	["admin_category_update", "category/update/:id", () => import("../pages/admin/categories/Update")],
	["admin_orders", "orders", () => import("../pages/admin/orders/AdminOrders")],
	["admin_users", "users", () => import("../pages/admin/users/AdminUsers")],
	["admin_messages", "messages", () => import("../pages/admin/messages/AdminMessages")],
];

class RouterService {
	public getRouter = () =>
		[
			{
				id: "root",
				path: "/",
				lazy: () => import("../layouts/root_layout"),
				children: [
					{
						id: "public",
						path: "",
						lazy: () => import("../layouts/public_layout"),
						children: [
							{ id: "home", index: true, lazy: () => import("../pages/Homepage") },
							...publicPages.map(([id, path, lazy]) => ({ id, path, lazy })),
						],
					},
					{
						id: "admin",
						path: "admin",
						lazy: () => import("../layouts/admin_layout"),
						children: [
							{ id: "admin_home", index: true, lazy: () => import("../pages/admin/index") },
							{ id: "admin_dashboard", path: "dashboard", lazy: () => import("../pages/admin/index") },
							...adminPages.map(([id, path, lazy]) => ({ id, path, lazy })),
						],
					},
				],
			},
		] as RSCRouteConfig;
}

export default RouterService;
