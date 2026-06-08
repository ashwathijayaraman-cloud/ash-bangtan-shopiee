import { Link } from "@tanstack/react-router";
import { ShoppingCart, Heart } from "lucide-react";
import panda from "@/assets/panda-mascot.png";
import { ProfileMenu } from "./ProfileMenu";
import { categories } from "@/lib/products";

export function ShopHeader({ activeCategory, onCategory }: { activeCategory?: string; onCategory?: (c: string) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-coffee/15 bg-champagne/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <ProfileMenu />
        <Link to="/" className="flex items-center gap-2">
          <img src={panda} alt="" width={56} height={56} className="animate-panda-bob" />
          <span className="font-script text-3xl md:text-4xl text-coffee">Bangtan Shopiee</span>
        </Link>
        <div className="flex items-center gap-2">
          <button aria-label="Liked items" className="grid h-10 w-10 place-items-center rounded-full bg-cream text-coffee shadow-soft transition hover:bg-blush">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="grid h-10 w-10 place-items-center rounded-full bg-coffee text-cream shadow-soft transition hover:bg-coffee-dark">
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
      <nav className="mx-auto max-w-7xl overflow-x-auto px-4 pb-3 md:px-8 no-scrollbar">
        <ul className="flex min-w-max gap-2">
          {categories.map((c) => {
            const active = activeCategory === c;
            return (
              <li key={c}>
                <button
                  onClick={() => onCategory?.(active ? "" : c)}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "border-coffee bg-coffee text-cream"
                      : "border-coffee/30 bg-cream text-coffee-dark hover:bg-blush"
                  }`}
                >
                  {c}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
