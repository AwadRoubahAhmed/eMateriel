"use client";

import { useSyncExternalStore } from "react";
import { type CartItem, getCart, subscribeCart } from "../services/cart_service";

const EMPTY: CartItem[] = [];

// contenu du panier ; vide côté serveur et pendant l'hydratation
export const useCart = () => useSyncExternalStore(subscribeCart, getCart, () => EMPTY);
