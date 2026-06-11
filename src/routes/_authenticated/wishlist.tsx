import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart } from "lucide-react";
import { ShopHeader } from "@/components/ShopHeader";
import { ProductCard } from "@/components/ProductCard";
import { useWishlist } from "@/hooks/use-shop";
import { products } from "@/lib/products";

export const Route = createFileRoute("/_authenticated/wishlist")({
  head: () => ({ meta: [{ title: "Your Wishlist — Bangtan Shopiee" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const wishlist = useWishlist();
  const items = products.filter((p) => wishlist.ids.includes(p.id));

  return (
    <div className="min-h-screen bg-champagne">
      <ShopHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-coffee hover:underline">
          <ArrowLeft className="h-4 w-4" /> back to shop
        </Link>
        <h1 className="font-display text-3xl font-bold text-coffee-dark">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-coffee/30 bg-cream p-10 text-center">
            <Heart className="mx-auto h-10 w-10 text-coffee" />
            <p className="mt-3 font-script text-2xl text-coffee">nothing liked yet ♡</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-coffee px-5 py-2 text-cream">Find some cuties</Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </main>
    </div>
  );
}
