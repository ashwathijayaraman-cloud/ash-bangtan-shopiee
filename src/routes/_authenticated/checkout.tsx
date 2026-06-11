import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Banknote, Wallet, Lock } from "lucide-react";
import { toast } from "sonner";
import { ShopHeader } from "@/components/ShopHeader";
import { useCart, useOrders } from "@/hooks/use-shop";
import { formatINR } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import type { Address, Payment, Order } from "@/lib/shop-storage";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Bangtan Shopiee" }] }),
  component: CheckoutPage,
});

const emptyAddress: Address = {
  fullName: "", phone: "", line: "", city: "", state: "", postalCode: "",
};

function CheckoutPage() {
  const cart = useCart();
  const orders = useOrders();
  const navigate = useNavigate();
  const [address, setAddress] = useState<Address>(emptyAddress);
  const [payment, setPayment] = useState<Payment>("UPI");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles")
        .select("display_name,phone,address_line,city,state,postal_code").eq("id", user.id).maybeSingle();
      if (data) {
        setAddress({
          fullName: data.display_name ?? "",
          phone: data.phone ?? "",
          line: data.address_line ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          postalCode: data.postal_code ?? "",
        });
      }
    })();
  }, []);

  const shipping = cart.subtotal > 0 && cart.subtotal < 499 ? 49 : 0;
  const total = cart.subtotal + shipping;

  const update = (k: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddress((a) => ({ ...a, [k]: e.target.value }));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.resolved.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const required: (keyof Address)[] = ["fullName", "phone", "line", "city", "state", "postalCode"];
    for (const k of required) {
      if (!address[k].trim()) {
        toast.error("Please complete your delivery address");
        return;
      }
    }
    setPlacing(true);

    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      items: cart.resolved.map(({ product, qty }) => ({
        productId: product.id, qty, price: product.price, name: product.name, image: product.image,
      })),
      subtotal: cart.subtotal,
      shipping,
      total,
      address,
      payment,
      status: "Confirmed",
    };
    orders.add(order);
    cart.clear();
    setTimeout(() => navigate({ to: "/order/$id", params: { id: order.id } }), 400);
  };

  const inputCls = "w-full rounded-2xl border-2 border-coffee/25 bg-champagne px-4 py-2.5 text-coffee-dark placeholder:text-coffee-light/70 focus:border-coffee focus:outline-none";
  const labelCls = "block text-sm font-medium text-coffee-dark";

  const payOptions: { id: Payment; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "UPI", label: "UPI", icon: <Smartphone className="h-5 w-5" />, desc: "GPay, PhonePe, Paytm" },
    { id: "Debit Card", label: "Debit Card", icon: <CreditCard className="h-5 w-5" />, desc: "Visa, Mastercard, RuPay" },
    { id: "Credit Card", label: "Credit Card", icon: <Wallet className="h-5 w-5" />, desc: "All major cards" },
    { id: "Cash on Delivery", label: "Cash on Delivery", icon: <Banknote className="h-5 w-5" />, desc: "Pay when it arrives" },
  ];

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <Link to="/cart" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> back to cart
        </Link>
        <h1 className="font-display text-3xl font-bold text-coffee-dark">Checkout</h1>

        {cart.resolved.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center">
            <p className="font-script text-2xl text-coffee">your cart is empty ♡</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Shop now</Link>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-6">
              <section className="rounded-3xl border border-coffee/20 bg-cream p-6 shadow-soft">
                <h2 className="font-display text-lg font-semibold text-coffee-dark">Delivery Address</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2"><label className={labelCls}>Full name</label>
                    <input className={inputCls} value={address.fullName} onChange={update("fullName")} required /></div>
                  <div><label className={labelCls}>Phone</label>
                    <input type="tel" className={inputCls} value={address.phone} onChange={update("phone")} required /></div>
                  <div><label className={labelCls}>Postal code</label>
                    <input className={inputCls} value={address.postalCode} onChange={update("postalCode")} required /></div>
                  <div className="md:col-span-2"><label className={labelCls}>Address</label>
                    <input className={inputCls} value={address.line} onChange={update("line")} placeholder="House no, street, area" required /></div>
                  <div><label className={labelCls}>City</label>
                    <input className={inputCls} value={address.city} onChange={update("city")} required /></div>
                  <div><label className={labelCls}>State</label>
                    <input className={inputCls} value={address.state} onChange={update("state")} required /></div>
                </div>
              </section>

              <section className="rounded-3xl border border-coffee/20 bg-cream p-6 shadow-soft">
                <h2 className="font-display text-lg font-semibold text-coffee-dark">Payment Method</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {payOptions.map((o) => {
                    const active = payment === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setPayment(o.id)}
                        className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition ${
                          active ? "border-coffee bg-blush/40" : "border-coffee/20 bg-champagne hover:bg-blush/20"
                        }`}
                      >
                        <span className={`grid h-10 w-10 place-items-center rounded-full ${active ? "bg-coffee text-cream" : "bg-cream text-coffee"}`}>
                          {o.icon}
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-coffee-dark">{o.label}</span>
                          <span className="block text-xs text-coffee-light">{o.desc}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-coffee-light">
                  <Lock className="h-3.5 w-3.5" /> Demo checkout — no real payment is collected.
                </p>
              </section>
            </div>

            <aside className="h-fit rounded-3xl border border-coffee/20 bg-cream p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-coffee-dark">Order Summary</h2>
              <ul className="mt-4 space-y-3">
                {cart.resolved.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="line-clamp-1 font-medium text-coffee-dark">{product.name}</p>
                      <p className="text-xs text-coffee-light">Qty {qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-coffee">{formatINR(product.price * qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-coffee/15" />
              <div className="space-y-2 text-sm text-coffee-dark">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(cart.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                <div className="my-2 h-px bg-coffee/15" />
                <div className="flex justify-between text-base font-bold text-coffee"><span>Total</span><span>{formatINR(total)}</span></div>
              </div>
              <button type="submit" disabled={placing} className="mt-5 w-full rounded-full bg-coffee py-3 font-semibold text-cream shadow-soft transition hover:bg-coffee-dark disabled:opacity-60">
                {placing ? "Placing order..." : `Place Order • ${formatINR(total)}`}
              </button>
            </aside>
          </form>
        )}
      </main>
    </div>
  );
}
