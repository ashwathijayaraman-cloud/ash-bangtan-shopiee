import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";

export function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-coffee/20 bg-cream shadow-soft transition hover:-translate-y-1 hover:shadow-cozy ${
        compact ? "w-56 shrink-0" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-champagne-deep">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); setLiked((v) => !v); }}
          aria-label="Like"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-coffee backdrop-blur transition hover:bg-blush"
        >
          <Heart className={`h-4 w-4 transition ${liked ? "fill-coffee text-coffee" : ""}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-wider text-coffee-light">{product.category}</span>
        <h3 className="font-display text-base font-semibold text-coffee-dark">{product.name}</h3>
        <span className="mt-auto text-lg font-bold text-coffee">${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}
