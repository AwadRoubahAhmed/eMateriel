// Panier gardé dans le navigateur de chaque visiteur (localStorage) :
// pas de panier partagé entre visiteurs, et rien en base tant que la commande n'est pas passée.
// Le prix affiché ici est indicatif : le serveur recalcule tout à la commande.

export type CartItem = {
	product_id: number;
	name: string;
	price: number;
	image: string;
	stock: number;
	qty: number;
};

export const MAX_QTY = 20;

const KEY = "ematériel.cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();
let cache: CartItem[] | undefined;

const save = (items: CartItem[]) => {
	cache = items;
	localStorage.setItem(KEY, JSON.stringify(items));
	for (const listener of listeners) listener();
};

export const getCart = (): CartItem[] => {
	if (typeof window === "undefined") return EMPTY;
	if (cache === undefined) {
		try {
			const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
			cache = Array.isArray(parsed) ? parsed : EMPTY;
		} catch {
			cache = EMPTY;
		}
	}
	return cache as CartItem[];
};

const limit = (item: Pick<CartItem, "stock">, qty: number) =>
	Math.max(0, Math.min(qty, item.stock, MAX_QTY));

export const addToCart = (item: Omit<CartItem, "qty">, qty = 1) => {
	const cart = getCart();
	const existing = cart.find((i) => i.product_id === item.product_id);
	const next = existing
		? cart.map((i) =>
				i.product_id === item.product_id ? { ...i, ...item, qty: limit(item, i.qty + qty) } : i,
			)
		: [...cart, { ...item, qty: limit(item, qty) }];
	save(next.filter((i) => i.qty > 0));
};

export const setQty = (productId: number, qty: number) => {
	save(
		getCart()
			.map((i) => (i.product_id === productId ? { ...i, qty: limit(i, qty) } : i))
			.filter((i) => i.qty > 0),
	);
};

export const removeFromCart = (productId: number) =>
	save(getCart().filter((i) => i.product_id !== productId));

export const clearCart = () => save([]);

export const cartTotal = (items: CartItem[]) =>
	Math.round(items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100) / 100;

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.qty, 0);

export const subscribeCart = (listener: () => void) => {
	listeners.add(listener);
	const onStorage = (e: StorageEvent) => {
		if (e.key === KEY) {
			cache = undefined;
			listener();
		}
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", onStorage);
	};
};
