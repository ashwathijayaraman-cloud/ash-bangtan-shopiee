import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Package } from "lucide-react";
import { ShopHeader } from "@/components/ShopHeader";
import { useOrders } from "@/hooks/use-shop";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/order/$id")({
  head: () => ({ meta: [{ title: "Order — Bangtan Shopiee" }] }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { orders } = useOrders();
  const order = orders.find((o) => o.id === id);

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 md:px-8">
        <Link to="/orders" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> all orders
        </Link>

        {!order ? (
          <div className="rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center">
            <Package className="mx-auto h-10 w-10 text-coffee" />
            <p className="mt-3 font-script text-2xl text-coffee">order not found ♡</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Go home</Link>
          </div>
        ) : (
          <div className="rounded-3xl border border-coffee/20 bg-cream p-6 shadow-cozy md:p-8">
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="h-14 w-14 text-coffee" />
              <h1 className="mt-3 font-display text-3xl font-bold text-coffee-dark">Order Confirmed ♡</h1>
              <p className="mt-1 text-coffee-light">Thank you! Your goodies are on their way.</p>
              <p className="mt-2 text-sm text-coffee">Order ID: <span className="font-semibold">{order.id}</span></p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <section className="rounded-2xl border border-coffee/15 bg-champagne p-4">
                <h2 className="font-display font-semibold text-coffee-dark">Delivery Address</h2>
                <p className="mt-2 text-sm text-coffee-dark">
                  {order.address.fullName}<br />
                  {order.address.line}<br />
                  {order.address.city}, {order.address.state} {order.address.postalCode}<br />
                  Phone: {order.address.phone}
                </p>
              </section>
              <section className="rounded-2xl border border-coffee/15 bg-champagne p-4">
                <h2 className="font-display font-semibold text-coffee-dark">Payment</h2>
                <p className="mt-2 text-sm text-coffee-dark">{order.payment}</p>
                <p className="mt-1 text-xs text-coffee-light">Status: {order.status}</p>
              </section>
            </div>

            <section className="mt-6 rounded-2xl border border-coffee/15 bg-champagne p-4">
              <h2 className="font-display font-semibold text-coffee-dark">Items</h2>
              <ul className="mt-3 space-y-3">
                {order.items.map((it) => (
                  <li key={it.productId} className="flex items-center gap-3">
                    <img src={it.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-coffee-dark">{it.name}</p>
                      <p className="text-xs text-coffee-light">Qty {it.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-coffee">{formatINR(it.price * it.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-coffee/15" />
              <div className="space-y-1.5 text-sm text-coffee-dark">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : formatINR(order.shipping)}</span></div>
                <div className="flex justify-between text-base font-bold text-coffee"><span>Total</span><span>{formatINR(order.total)}</span></div>
              </div>
            </section>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/" className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-coffee bg-cream py-3 font-semibold text-coffee transition hover:bg-blush">
                Continue Shopping
              </Link>
              <Link to="/orders" className="inline-flex flex-1 items-center justify-center rounded-full bg-coffee py-3 font-semibold text-cream shadow-soft transition hover:bg-coffee-dark">
                View All Orders
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
