import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { ShopHeader } from "@/components/ShopHeader";
import { useCart } from "@/hooks/use-shop";
import { formatINR } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Bangtan Shopiee" }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const shipping = cart.subtotal > 0 && cart.subtotal < 499 ? 49 : 0;
  const total = cart.subtotal + shipping;

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> continue shopping
        </Link>
        <h1 className="font-display text-3xl font-bold text-coffee-dark">Your Cart</h1>

        {cart.resolved.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center">
            <ShoppingBag className="mx-auto h-10 w-10 text-coffee" />
            <p className="mt-3 font-script text-2xl text-coffee">your cart is empty ♡</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Shop now</Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <ul className="flex flex-col gap-3">
              {cart.resolved.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 rounded-2xl border border-coffee/20 bg-cream p-3 shadow-soft">
                  <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                    <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link to="/product/$id" params={{ id: product.id }} className="font-display font-semibold text-coffee-dark hover:underline">
                      {product.name}
                    </Link>
                    <span className="text-xs text-coffee-light">{product.category}</span>
                    <span className="mt-1 text-lg font-bold text-coffee">{formatINR(product.price)}</span>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-coffee/30 bg-champagne">
                        <button aria-label="Decrease" onClick={() => cart.setQty(product.id, qty - 1)} className="grid h-8 w-8 place-items-center rounded-full text-coffee hover:bg-blush">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-coffee-dark">{qty}</span>
                        <button aria-label="Increase" onClick={() => cart.setQty(product.id, qty + 1)} className="grid h-8 w-8 place-items-center rounded-full text-coffee hover:bg-blush">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => cart.remove(product.id)} className="ml-auto inline-flex items-center gap-1 text-sm text-coffee hover:text-coffee-dark">
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-3xl border border-coffee/20 bg-cream p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-coffee-dark">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm text-coffee-dark">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(cart.subtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                {cart.subtotal > 0 && cart.subtotal < 499 && (
                  <p className="text-xs text-coffee-light">Add {formatINR(499 - cart.subtotal)} more for free shipping ♡</p>
                )}
                <div className="my-2 h-px bg-coffee/15" />
                <div className="flex justify-between text-base font-bold text-coffee"><span>Total</span><span>{formatINR(total)}</span></div>
              </div>
              <button
                onClick={() => navigate({ to: "/checkout" })}
                className="mt-5 w-full rounded-full bg-coffee py-3 font-semibold text-cream shadow-soft transition hover:bg-coffee-dark"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
