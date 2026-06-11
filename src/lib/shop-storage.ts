// Local persistence for cart / wishlist / orders, keyed by user id.
// Emits a custom event so hooks can re-render across the app.

import { products, type Product } from "./products";

export type CartItem = { productId: string; qty: number };
export type Address = {
  fullName: string;
  phone: string;
  line: string;
  city: string;
  state: string;
  postalCode: string;
};
export type Payment = "UPI" | "Debit Card" | "Credit Card" | "Cash on Delivery";
export type Order = {
  id: string;
  createdAt: string;
  items: { productId: string; qty: number; price: number; name: string; image: string }[];
  subtotal: number;
  shipping: number;
  total: number;
  address: Address;
  payment: Payment;
  status: "Confirmed" | "Packed" | "Shipped" | "Delivered";
};

const EVENT = "bs:shop-storage";

const key = (userId: string, k: string) => `bs:${userId}:${k}`;

function read<T>(userId: string, k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key(userId, k));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(userId: string, k: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(userId, k), JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { userId, k } }));
}

export const ShopStorage = {
  EVENT,

  // ---------- Cart ----------
  getCart: (uid: string) => read<CartItem[]>(uid, "cart", []),
  addToCart: (uid: string, productId: string, qty = 1) => {
    const cart = ShopStorage.getCart(uid);
    const idx = cart.findIndex((c) => c.productId === productId);
    if (idx >= 0) cart[idx].qty += qty;
    else cart.push({ productId, qty });
    write(uid, "cart", cart);
  },
  setCartQty: (uid: string, productId: string, qty: number) => {
    let cart = ShopStorage.getCart(uid);
    if (qty <= 0) cart = cart.filter((c) => c.productId !== productId);
    else cart = cart.map((c) => (c.productId === productId ? { ...c, qty } : c));
    write(uid, "cart", cart);
  },
  removeFromCart: (uid: string, productId: string) => {
    write(uid, "cart", ShopStorage.getCart(uid).filter((c) => c.productId !== productId));
  },
  clearCart: (uid: string) => write(uid, "cart", []),

  // ---------- Wishlist ----------
  getWishlist: (uid: string) => read<string[]>(uid, "wishlist", []),
  toggleWishlist: (uid: string, productId: string) => {
    const wl = ShopStorage.getWishlist(uid);
    const next = wl.includes(productId) ? wl.filter((id) => id !== productId) : [...wl, productId];
    write(uid, "wishlist", next);
    return next.includes(productId);
  },

  // ---------- Orders ----------
  getOrders: (uid: string) => read<Order[]>(uid, "orders", []),
  addOrder: (uid: string, order: Order) => {
    write(uid, "orders", [order, ...ShopStorage.getOrders(uid)]);
  },
};

export function resolveCart(items: CartItem[]) {
  return items
    .map((i) => {
      const p = products.find((x) => x.id === i.productId);
      return p ? { product: p, qty: i.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];
}
