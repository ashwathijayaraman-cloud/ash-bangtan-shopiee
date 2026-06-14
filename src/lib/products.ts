import pencilBox from "@/assets/pencil-box.jpg";
import colorPens from "@/assets/color-pens.jpg";
import stickers from "@/assets/stickers.jpg";
import notebooks from "@/assets/notebooks.jpg";
import highlighters from "@/assets/highlighters.jpg";
import artSupplies from "@/assets/art-supplies.jpg";
import erasers from "@/assets/erasers.jpg";
import stationery1 from "@/assets/stationery-1.jpg";
import btsMySevenAsset from "@/assets/bts-my-seven.jpg.asset.json";
const btsImage = btsMySevenAsset.url;

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number; // INR
  image: string;
  description: string;
  specs: string[];
};

export const products: Product[] = [
  // Original pastel goodies
  { id: "pastel-pencil-box", name: "Pastel Mint Pencil Box", category: "Pencil Boxes", price: 249, image: pencilBox,
    description: "A dreamy mint pencil box that fits all your coloring essentials. Soft-touch finish and magnetic lid.",
    specs: ["Holds 24 pencils", "Magnetic closure", "Soft-touch matte finish"] },
  { id: "rainbow-color-pens", name: "Rainbow Color Pens (12 pcs)", category: "Color Pens", price: 179, image: colorPens,
    description: "Smooth gel pens in 12 candy pastel shades — perfect for journaling, doodling, and study notes.",
    specs: ["0.5mm tip", "12 pastel colors", "Quick-dry ink"] },
  { id: "kawaii-sticker-pack", name: "Kawaii Sticker Sheet", category: "Stickers", price: 99, image: stickers,
    description: "A sheet packed with adorable animal and stationery stickers to decorate your planner.",
    specs: ["30+ stickers", "Waterproof", "Removable adhesive"] },
  { id: "pastel-notebook-stack", name: "Pastel Notebook (A5)", category: "Notebooks", price: 149, image: notebooks,
    description: "Buttery-smooth pages bound in soft pastel covers. Ideal for journaling and study notes.",
    specs: ["120 pages", "100gsm paper", "Lay-flat binding"] },
  { id: "neon-highlighters", name: "Soft Neon Highlighters", category: "Highlighters", price: 129, image: highlighters,
    description: "Gentle on the eyes, bold on the page. A pastel highlighter set for color-coding queens.",
    specs: ["5 pastel shades", "Chisel tip", "Bleed resistant"] },
  { id: "art-watercolor-set", name: "Mini Watercolor Studio", category: "Art Supplies", price: 599, image: artSupplies,
    description: "A travel-friendly watercolor case with brushes and a mixing tray for tiny artists everywhere.",
    specs: ["24 colors", "3 brushes included", "Compact travel case"] },
  { id: "kawaii-erasers", name: "Kawaii Eraser Friends", category: "Art Supplies", price: 79, image: erasers,
    description: "A pile of tiny squishy eraser friends. Too cute to actually erase with (but you can).",
    specs: ["Set of 12", "Latex-free", "Collectible designs"] },
  { id: "study-flatlay-bundle", name: "Study Aesthetic Bundle", category: "Notebooks", price: 449, image: stationery1,
    description: "A curated bundle of notebook, pens, washi tape, and stickers to start your study era.",
    specs: ["Notebook + pens + tape", "Pink pastel theme", "Gift-wrapped"] },

  // BTS Collection
  { id: "bts-gift-box", name: "BTS Gift Box", category: "BTS Collection", price: 999, image: btsImage,
    description: "An ARMY-approved curated gift box with BTS pens, pencils, stickers, and a mini photocard.",
    specs: ["8+ BTS goodies", "Themed gift packaging", "Limited edition"] },
  { id: "bts-pen", name: "BTS Pen", category: "BTS Collection", price: 89, image: btsImage,
    description: "A sleek BTS-themed gel pen with a photocard charm. Writes like a dream.",
    specs: ["0.5mm tip", "Black gel ink", "Photocard charm"] },
  { id: "bts-pencil", name: "BTS Pencil", category: "BTS Collection", price: 49, image: btsImage,
    description: "An HB pencil with member portraits and lyric quotes printed along the barrel.",
    specs: ["HB lead", "Pre-sharpened", "Pack of 1"] },
  { id: "bts-stickers", name: "BTS Sticker Sheet", category: "BTS Collection", price: 149, image: btsImage,
    description: "A glossy sheet of BTS chibi stickers, logos, and tiny purple hearts.",
    specs: ["40+ stickers", "Waterproof", "ARMY-approved"] },

  // Toys & cute extras
  { id: "cute-mini-toys", name: "Cute Mini Toys (Set of 6)", category: "Toys & Extras", price: 199, image: erasers,
    description: "A handful of squishy desk toys to keep your study corner extra adorable.",
    specs: ["6 mini figures", "Soft squishy material", "Random assorted designs"] },

  // Craft Materials
  { id: "clay-kit", name: "Air-Dry Clay Kit", category: "Craft Materials", price: 349, image: artSupplies,
    description: "Pastel air-dry clay with sculpting tools to make tiny charms and figurines.",
    specs: ["12 clay colors", "5 sculpting tools", "Air-dry, no oven"] },
  { id: "craft-materials", name: "Craft Materials Pack", category: "Craft Materials", price: 299, image: artSupplies,
    description: "A grab bag of washi tape, ribbons, googly eyes, beads, and pom-poms for your next project.",
    specs: ["50+ pieces", "Pastel theme", "Reusable storage box"] },
  { id: "diy-craft-set", name: "DIY Craft Set", category: "Craft Materials", price: 549, image: stationery1,
    description: "Everything you need to make 3 cute crafts: bookmarks, friendship bracelets, and mini scrapbook pages.",
    specs: ["3 mini projects", "Step-by-step booklet", "All materials included"] },

  // Art Supplies (expanded)
  { id: "canva-paper-sheets", name: "Canvas Paper Sheets (A4, 20 pcs)", category: "Art Supplies", price: 129, image: notebooks,
    description: "Acid-free canvas-textured sheets perfect for watercolor, gouache, and acrylic painting.",
    specs: ["200gsm", "A4 size", "Pack of 20"] },
  { id: "paint-brushes", name: "Paint Brush Set (10 pcs)", category: "Art Supplies", price: 199, image: artSupplies,
    description: "Soft synthetic brushes in all the sizes you actually need — round, flat, and fan.",
    specs: ["10 brushes", "Wooden handles", "Travel pouch"] },
  { id: "paint-kit", name: "Acrylic Paint Kit", category: "Art Supplies", price: 499, image: artSupplies,
    description: "A starter acrylic kit with 18 colors, palette, and 3 brushes. Bright, blendable, and beginner-friendly.",
    specs: ["18 colors x 12ml", "Palette + 3 brushes", "Non-toxic"] },
  { id: "sketchbook", name: "Hardcover Sketchbook (A5)", category: "Notebooks", price: 249, image: notebooks,
    description: "Thick, smooth pages bound in a sturdy hardcover. Great for sketching, doodling, and journaling.",
    specs: ["80 pages", "120gsm", "Elastic closure"] },
  { id: "color-pencils", name: "Color Pencils (24 shades)", category: "Color Pens", price: 229, image: colorPens,
    description: "Buttery-smooth color pencils that blend like a dream. Pre-sharpened in a tin case.",
    specs: ["24 shades", "Pre-sharpened", "Reusable tin case"] },
  { id: "watercolors", name: "Watercolor Pan Set", category: "Art Supplies", price: 399, image: artSupplies,
    description: "Vivid watercolor pans in a compact tin with built-in mixing palette and a water brush.",
    specs: ["24 shades", "Water brush included", "Pocket tin"] },
  { id: "stationery-accessories", name: "Stationery Accessories Kit", category: "Pencil Boxes", price: 179, image: pencilBox,
    description: "A tiny treasure chest of paper clips, mini scissors, sticky tabs, and washi tape.",
    specs: ["Mini scissors + tape", "Paper clips + tabs", "Cute tin box"] },
];

export const categories = [
  "BTS Collection",
  "Pencil Boxes",
  "Color Pens",
  "Notebooks",
  "Stickers",
  "Highlighters",
  "Art Supplies",
  "Craft Materials",
  "Toys & Extras",
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
