import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Package } from "lucide-react";
import { ShopHeader } from "@/components/ShopHeader";
import { useOrders } from "@/hooks/use-shop";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/orders")({
  head: () => ({ meta: [{ title: "My Orders — Bangtan Shopiee" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> back to shop
        </Link>
        <h1 className="font-display text-3xl font-bold text-coffee-dark">My Orders</h1>

        {orders.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center">
            <Package className="mx-auto h-10 w-10 text-coffee" />
            <p className="mt-3 font-script text-2xl text-coffee">no orders yet ♡</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Start shopping</Link>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col gap-4">
            {orders.map((o) => (
              <li key={o.id}>
                <Link
                  to="/order/$id"
                  params={{ id: o.id }}
                  className="flex gap-4 rounded-2xl border border-coffee/20 bg-cream p-4 shadow-soft transition hover:shadow-cozy"
                >
                  <div className="flex -space-x-2">
                    {o.items.slice(0, 3).map((it) => (
                      <img key={it.productId} src={it.image} alt="" className="h-14 w-14 rounded-xl border-2 border-cream object-cover" />
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-coffee-dark">{o.id}</p>
                    <p className="text-xs text-coffee-light">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {o.items.length} item{o.items.length > 1 ? "s" : ""} • {o.payment}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-blush/60 px-2 py-0.5 text-xs font-medium text-coffee-dark">{o.status}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-coffee">{formatINR(o.total)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
