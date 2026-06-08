import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ShopHeader } from "@/components/ShopHeader";
import { PandaIntro } from "@/components/PandaIntro";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import stationery1 from "@/assets/stationery-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bangtan Shopiee — Cute stationery for cozy students" },
      { name: "description", content: "Bangtan Shopiee is a cozy stationery shop with pastel pencil boxes, notebooks, stickers, and more." },
      { property: "og:title", content: "Bangtan Shopiee" },
      { property: "og:description", content: "Cute stationery, panda approved." },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (!category || p.category === category) &&
          (!query || p.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, category],
  );

  return (
    <>
      <PandaIntro />
      <div className="min-h-screen bg-champagne">
        <ShopHeader activeCategory={category} onCategory={setCategory} />

        <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 md:px-8">
          {/* Hero / search */}
          <section className="relative overflow-hidden rounded-[2rem] border border-coffee/15 bg-cream p-8 md:p-12 shadow-soft animate-fade-up">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="font-script text-3xl text-coffee">hello, friend ♡</p>
                <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold leading-tight text-coffee-dark">
                  Stationery that makes <span className="text-coffee">studying</span> feel like a treat.
                </h1>
                <p className="mt-3 max-w-md text-coffee-light">
                  Curated pastel notebooks, pens, and the kind of stickers you'll definitely hoard.
                </p>

                <div className="mt-6 flex items-center gap-2 rounded-full border-2 border-coffee/30 bg-champagne px-5 py-3 shadow-soft focus-within:border-coffee">
                  <Search className="h-5 w-5 text-coffee" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search stationery items..."
                    className="w-full bg-transparent text-coffee-dark placeholder:text-coffee-light/80 focus:outline-none"
                  />
                </div>
              </div>
              <div className="relative">
                <img
                  src={stationery1}
                  alt="Pastel stationery flatlay"
                  width={800}
                  height={800}
                  className="aspect-square w-full rounded-3xl object-cover shadow-cozy"
                />
                <span className="absolute -bottom-4 -left-4 rotate-[-6deg] rounded-2xl bg-coffee px-4 py-2 font-script text-2xl text-cream shadow-cozy">
                  new in!
                </span>
              </div>
            </div>
          </section>

          {/* Horizontal scroll */}
          <section className="mt-12">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-bold text-coffee-dark">Trending today</h2>
              <span className="font-script text-xl text-coffee-light">scroll →</span>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} compact />
              ))}
            </div>
          </section>

          {/* Grid */}
          <section className="mt-12">
            <h2 className="mb-5 font-display text-2xl font-bold text-coffee-dark">
              {category || "All goodies"}
            </h2>
            {filtered.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center text-coffee-light">
                No matches yet — try a different word ♡
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </section>
        </main>

        <footer className="border-t border-coffee/15 bg-cream py-8 text-center text-sm text-coffee-light">
          made with ♡ by Bangtan Shopiee
        </footer>
      </div>
    </>
  );
}
