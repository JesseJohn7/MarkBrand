// ─── Types ────────────────────────────────────────────────────────────────────
export type Category = "merchandise" | "print-jobs" | "fashion" | "digital";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  image: string;
  badge?: "New" | "Sale" | "Bestseller" | "Popular";
  inStock: boolean;
  digital?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: "all",         label: "All Products"    },
  { id: "merchandise", label: "Merchandise"     },
  { id: "print-jobs",  label: "Print Jobs"      },
  { id: "fashion",     label: "Fashion & Apparel"},
  { id: "digital",     label: "Digital Products"},
] as const;

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  // MERCHANDISE
  {
    id:"merch-001", slug:"tote-bag", category:"merchandise",
    name:"Markbrand Signature Tote Bag", price:8500,
    description:"Premium canvas tote featuring the Markbrand logo. Durable, stylish, and perfect for everyday use.",
    details:["Heavy-duty canvas","Screen-printed logo","Reinforced handles","38cm × 42cm"],
    image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    badge:"Bestseller", inStock:true,
  },
  {
    id:"merch-002", slug:"ceramic-mug", category:"merchandise",
    name:"Markbrand Ceramic Mug", price:6000,
    description:"High-quality ceramic mug with the Markbrand identity. A daily reminder that your brand matters.",
    details:["350ml capacity","Dishwasher safe","Scratch-resistant print","White gloss finish"],
    image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-003", slug:"executive-notebook", category:"merchandise",
    name:"Executive Branded Notebook", price:5500, originalPrice:7000,
    description:"A5 hardcover notebook with Markbrand branding. Perfect for meetings, notes and big ideas.",
    details:["A5 hardcover","200 lined pages","Ribbon bookmark","Custom logo emboss"],
    image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"merch-004", slug:"pen-set", category:"merchandise",
    name:"Corporate Pen Set (3-Pack)", price:4500,
    description:"Sleek branded pens for corporate gifting, events and everyday professional use.",
    details:["Set of 3 pens","Metal body","Custom engraving available","Black & blue ink"],
    image:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
    inStock:true,
  },
  // PRINT JOBS
  {
    id:"print-001", slug:"business-cards", category:"print-jobs",
    name:"Business Cards — 500 pcs", price:15000,
    description:"Premium business cards on 400gsm stock. Matte or gloss finish. Supply your design or use ours.",
    details:["500 cards","400gsm card stock","Matte or gloss finish","85×55mm","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1572502742864-dce19dbf3df7?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"print-002", slug:"a5-flyers", category:"print-jobs",
    name:"A5 Flyers — 1,000 pcs", price:25000,
    description:"Full-colour A5 flyers for events, promotions and campaigns. Fast turnaround, vibrant results.",
    details:["1,000 flyers","A5 size","Full colour both sides","130gsm gloss","2–4 day turnaround"],
    image:"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-003", slug:"flex-banner", category:"print-jobs",
    name:"Flex Banner 3ft × 6ft", price:18000, originalPrice:22000,
    description:"Large-format outdoor flex banner. Weather-resistant, vivid print, eyelets included.",
    details:["3ft × 6ft","Vinyl flex material","Weather-resistant","Eyelets fitted","1–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"print-004", slug:"letterhead", category:"print-jobs",
    name:"Branded Letterhead — 500 pcs", price:20000,
    description:"Professional letterheads on 100gsm paper. Supply your logo or use our design team.",
    details:["500 sheets","A4 100gsm","Full colour header","Design available","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80",
    inStock:true,
  },
  // FASHION
  {
    id:"fashion-001", slug:"polo-shirt", category:"fashion",
    name:"Corporate Polo Shirt", price:12000,
    description:"High-quality polo shirt with your company logo embroidered on the chest. All sizes available.",
    details:["100% cotton pique","Logo embroidery","Sizes: S–3XL","Multiple colours","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-002", slug:"staff-uniform", category:"fashion",
    name:"Custom Staff Uniform Set", price:35000,
    description:"Complete staff uniform — shirt and trousers tailored to your brand colours and identity.",
    details:["Shirt + Trouser","Custom colour matching","Logo embroidery","Sizes: XS–4XL","MOQ: 3 sets"],
    image:"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-003", slug:"branded-cap", category:"fashion",
    name:"Branded Cap", price:7500,
    description:"Structured cap with embroidered logo. Great for events, uniforms and brand activations.",
    details:["One size fits all","Adjustable strap","Embroidered logo","6 colour options"],
    image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    badge:"Bestseller", inStock:true,
  },
  {
    id:"fashion-004", slug:"event-tshirt", category:"fashion",
    name:"Event T-Shirt (Custom Print)", price:9000, originalPrice:11000,
    description:"Custom screen-printed t-shirts for events, activations and campaigns.",
    details:["180gsm cotton","Screen print or DTF","Sizes: S–3XL","Full colour","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  // DIGITAL
  {
    id:"digital-001", slug:"brand-kit", category:"digital",
    name:"Brand Identity Starter Kit", price:45000,
    description:"Complete digital brand kit — logo files, colour palette, font selections and brand guidelines PDF.",
    details:["Logo in SVG, PNG, PDF","Brand guidelines PDF","Colour & font specs","Social templates","Instant download"],
    image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-002", slug:"social-templates", category:"digital",
    name:"Social Media Pack (30 Templates)", price:18000, originalPrice:25000,
    description:"30 professionally designed Canva-ready templates branded to your business.",
    details:["30 unique templates","Canva editable","Instagram & Facebook sizes","Colour customisable","Instant download"],
    image:"https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
    badge:"Sale", inStock:true, digital:true,
  },
  {
    id:"digital-003", slug:"business-plan", category:"digital",
    name:"Business Plan Template", price:12000,
    description:"A structured, professionally formatted business plan built for Nigerian entrepreneurs.",
    details:["Word + PDF format","12 key sections","Financial projections","Executive summary","Instant download"],
    image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    inStock:true, digital:true,
  },
  {
    id:"digital-004", slug:"marketing-playbook", category:"digital",
    name:"Digital Marketing Playbook (eBook)", price:8500,
    description:"Practical guide to growing your brand online — written for Nigerian businesses.",
    details:["85 pages PDF","Social media strategy","Content planning","Ads basics","Instant download"],
    image:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    badge:"Bestseller", inStock:true, digital:true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style:"currency", currency:"NGN", minimumFractionDigits:0,
  }).format(n);
}