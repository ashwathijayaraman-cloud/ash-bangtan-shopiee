import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingCart, Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { ShopHeader } from "@/components/ShopHeader";
import { products } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Bangtan Shopiee` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-champagne text-coffee">
      <div className="text-center">
        <p className="font-script text-4xl">oops, not here ♡</p>
        <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Go home</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> back to shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-coffee/20 bg-cream shadow-cozy">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-coffee-light">{product.category}</span>
            <div className="mt-1 flex items-start justify-between gap-3">
              <h1 className="font-display text-3xl font-bold text-coffee-dark md:text-4xl">{product.name}</h1>
              <button
                onClick={() => setLiked((v) => !v)}
                aria-label="Like"
                className="shrink-0 grid h-11 w-11 place-items-center rounded-full border border-coffee/25 bg-cream text-coffee transition hover:bg-blush"
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-coffee" : ""}`} />
              </button>
            </div>
            <p className="mt-4 text-3xl font-bold text-coffee">${product.price.toFixed(2)}</p>
            <p className="mt-4 leading-relaxed text-coffee-dark/80">{product.description}</p>

            <div className="mt-6 rounded-2xl border border-coffee/20 bg-cream p-5">
              <h2 className="font-display text-lg font-semibold text-coffee-dark">Details</h2>
              <ul className="mt-2 space-y-1.5 text-sm text-coffee-dark/80">
                {product.specs.map((s: string) => (
                  <li key={s} className="flex gap-2"><span className="text-coffee">♡</span>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-coffee bg-cream py-3 font-semibold text-coffee transition hover:bg-blush">
                <ShoppingCart className="h-5 w-5" /> Add to Cart
              </button>
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-coffee py-3 font-semibold text-cream shadow-soft transition hover:bg-coffee-dark">
                <Zap className="h-5 w-5" /> Order Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
