import pencilBox from "@/assets/pencil-box.jpg";
import colorPens from "@/assets/color-pens.jpg";
import stickers from "@/assets/stickers.jpg";
import notebooks from "@/assets/notebooks.jpg";
import highlighters from "@/assets/highlighters.jpg";
import artSupplies from "@/assets/art-supplies.jpg";
import erasers from "@/assets/erasers.jpg";
import stationery1 from "@/assets/stationery-1.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  specs: string[];
};

export const products: Product[] = [
  {
    id: "pastel-pencil-box",
    name: "Pastel Mint Pencil Box",
    category: "Pencil Boxes",
    price: 12.5,
    image: pencilBox,
    description: "A dreamy mint pencil box that fits all your coloring essentials. Soft-touch finish, magnetic lid, and a snug velvet interior.",
    specs: ["Holds 24 pencils", "Magnetic closure", "Soft-touch matte finish"],
  },
  {
    id: "rainbow-color-pens",
    name: "Rainbow Color Pens (12 pcs)",
    category: "Color Pens",
    price: 9.9,
    image: colorPens,
    description: "Smooth gel pens in 12 candy pastel shades — perfect for journaling, doodling, and study notes.",
    specs: ["0.5mm tip", "12 pastel colors", "Quick-dry ink"],
  },
  {
    id: "kawaii-sticker-pack",
    name: "Kawaii Sticker Sheet",
    category: "Stickers",
    price: 4.5,
    image: stickers,
    description: "A sheet packed with adorable animal and stationery stickers to decorate your planner.",
    specs: ["30+ stickers", "Waterproof", "Removable adhesive"],
  },
  {
    id: "pastel-notebook-stack",
    name: "Pastel Notebook (A5)",
    category: "Notebooks",
    price: 7.0,
    image: notebooks,
    description: "Buttery-smooth pages bound in soft pastel covers. Ideal for journaling and study notes.",
    specs: ["120 pages", "100gsm paper", "Lay-flat binding"],
  },
  {
    id: "neon-highlighters",
    name: "Soft Neon Highlighters",
    category: "Highlighters",
    price: 6.2,
    image: highlighters,
    description: "Gentle on the eyes, bold on the page. A pastel highlighter set for color-coding queens.",
    specs: ["5 pastel shades", "Chisel tip", "Bleed resistant"],
  },
  {
    id: "art-watercolor-set",
    name: "Mini Watercolor Studio",
    category: "Art Supplies",
    price: 24.0,
    image: artSupplies,
    description: "A travel-friendly watercolor case with brushes and a mixing tray for tiny artists everywhere.",
    specs: ["24 colors", "3 brushes included", "Compact travel case"],
  },
  {
    id: "kawaii-erasers",
    name: "Kawaii Eraser Friends",
    category: "Art Supplies",
    price: 5.5,
    image: erasers,
    description: "A pile of tiny squishy eraser friends. Too cute to actually erase with (but you can).",
    specs: ["Set of 12", "Latex-free", "Collectible designs"],
  },
  {
    id: "study-flatlay-bundle",
    name: "Study Aesthetic Bundle",
    category: "Notebooks",
    price: 18.5,
    image: stationery1,
    description: "A curated bundle of notebook, pens, washi tape, and stickers to start your study era.",
    specs: ["Notebook + pens + tape", "Pink pastel theme", "Gift-wrapped"],
  },
];

export const categories = [
  "Pencil Boxes",
  "Color Pens",
  "Stickers",
  "Notebooks",
  "Highlighters",
  "Art Supplies",
];
