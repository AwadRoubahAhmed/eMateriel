const euros = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export const formatPrice = (value: number) => euros.format(value);

export const formatDate = (value: string) =>
	new Date(value).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

export const ORDER_STATUS_LABELS: Record<string, string> = {
	en_attente: "En attente de paiement",
	payee: "Payée",
	expediee: "Expédiée",
	livree: "Livrée",
	annulee: "Annulée",
};

// chemin public d'une image produit
export const productImage = (image: string) =>
	image.startsWith("http") ? image : `/images/${encodeURIComponent(image)}`;
