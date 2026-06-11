import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShopStorage, resolveCart, type Order } from "@/lib/shop-storage";

function useUserId() {
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) setUid(data.user?.id ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setUid(s?.user?.id ?? null);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return uid;
}

function useStorageBump() {
  const [, set] = useState(0);
  useEffect(() => {
    const handler = () => set((n) => n + 1);
    window.addEventListener(ShopStorage.EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(ShopStorage.EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
}

export function useCart() {
  const uid = useUserId();
  useStorageBump();
  const items = uid ? ShopStorage.getCart(uid) : [];
  const resolved = resolveCart(items);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = resolved.reduce((s, r) => s + r.product.price * r.qty, 0);

  return {
    uid,
    items,
    resolved,
    count,
    subtotal,
    add: useCallback((id: string, qty = 1) => uid && ShopStorage.addToCart(uid, id, qty), [uid]),
    setQty: useCallback((id: string, qty: number) => uid && ShopStorage.setCartQty(uid, id, qty), [uid]),
    remove: useCallback((id: string) => uid && ShopStorage.removeFromCart(uid, id), [uid]),
    clear: useCallback(() => uid && ShopStorage.clearCart(uid), [uid]),
  };
}

export function useWishlist() {
  const uid = useUserId();
  useStorageBump();
  const ids = uid ? ShopStorage.getWishlist(uid) : [];
  return {
    uid,
    ids,
    has: (id: string) => ids.includes(id),
    toggle: useCallback((id: string) => (uid ? ShopStorage.toggleWishlist(uid, id) : false), [uid]),
  };
}

export function useOrders() {
  const uid = useUserId();
  useStorageBump();
  return {
    uid,
    orders: uid ? ShopStorage.getOrders(uid) : [],
    add: useCallback((order: Order) => uid && ShopStorage.addOrder(uid, order), [uid]),
  };
}
