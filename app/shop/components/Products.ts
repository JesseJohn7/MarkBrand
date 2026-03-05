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

  // ── MERCHANDISE ──────────────────────────────────────────────────────────────
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
  {
    id:"merch-005", slug:"branded-water-bottle", category:"merchandise",
    name:"Stainless Steel Water Bottle", price:9500,
    description:"Double-walled stainless steel bottle with your logo laser-engraved. Keeps drinks cold for 24hrs.",
    details:["500ml capacity","Double-wall insulation","Laser-engraved logo","BPA free","Leak-proof lid"],
    image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"merch-006", slug:"desk-calendar", category:"merchandise",
    name:"Branded Desk Calendar 2025", price:7000,
    description:"12-month desk calendar with full-colour brand prints on each page. A year of visibility.",
    details:["12 monthly pages","A5 landscape","Full colour print","Spiral bound","Custom branding"],
    image:"https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"merch-007", slug:"usb-drive", category:"merchandise",
    name:"Custom USB Flash Drive (16GB)", price:5500,
    description:"16GB USB drive with your logo printed. Perfect corporate gift for clients and staff.",
    details:["16GB storage","USB 3.0","Logo print","Metal casing","MOQ: 10 units"],
    image:"https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-008", slug:"keychain", category:"merchandise",
    name:"Branded Metal Keychain", price:2500,
    description:"Compact branded metal keychain. Ideal for giveaways, events and corporate hampers.",
    details:["Metal body","Logo engraving","Split ring included","5cm × 3cm"],
    image:"https://images.unsplash.com/photo-1569388037243-dfa034e4b672?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-009", slug:"mouse-pad", category:"merchandise",
    name:"XL Branded Desk Mat", price:6500,
    description:"Large non-slip desk mat with full-colour brand design. Covers your entire workspace.",
    details:["80cm × 40cm","Full colour print","Anti-slip base","Stitched edges","Water-resistant"],
    image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"merch-010", slug:"gift-hamper", category:"merchandise",
    name:"Corporate Gift Hamper Set", price:32000, originalPrice:40000,
    description:"Curated hamper with mug, notebook, pen set and tote — all branded. Perfect for clients.",
    details:["Mug + Notebook + Pen + Tote","Custom branded box","Ribbon & tissue paper","Personalised card","Free delivery in Lagos"],
    image:"https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
    badge:"Sale", inStock:true,
  },

  // ── PRINT JOBS ───────────────────────────────────────────────────────────────
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
  {
    id:"print-005", slug:"rollup-banner", category:"print-jobs",
    name:"Roll-Up Banner 85cm × 200cm", price:35000,
    description:"Premium pull-up roll-up banner on durable aluminium stand. Ready to display anywhere.",
    details:["85cm × 200cm","Aluminium stand","Carry bag included","Full colour","1–2 day turnaround"],
    image:"https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"print-006", slug:"brochure", category:"print-jobs",
    name:"Tri-Fold Brochure — 500 pcs", price:30000,
    description:"Professional tri-fold brochures for your products, services or events. Sharp and polished.",
    details:["500 pieces","A4 tri-fold","170gsm gloss","Full colour both sides","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-007", slug:"envelope", category:"print-jobs",
    name:"Custom Branded Envelopes — 250 pcs", price:12000,
    description:"DL envelopes with your brand logo and address printed. Professional correspondence starts here.",
    details:["250 envelopes","DL size (110×220mm)","Full colour front","80gsm paper","3–4 day turnaround"],
    image:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-008", slug:"stickers", category:"print-jobs",
    name:"Custom Die-Cut Stickers — 200 pcs", price:14000, originalPrice:18000,
    description:"Glossy die-cut stickers in any shape. Great for packaging, gifting and brand activations.",
    details:["200 stickers","Die-cut to shape","Gloss laminate","Waterproof","2–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"print-009", slug:"invoice-booklet", category:"print-jobs",
    name:"Branded Invoice Booklet (50 leaves)", price:8500,
    description:"Carbon-copy invoice booklets with your logo and business details. Ideal for field sales teams.",
    details:["50 duplicate leaves","A5 size","Carbon copy","Custom header","4–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    inStock:true,
  },

  // ── FASHION ──────────────────────────────────────────────────────────────────
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
  {
    id:"fashion-005", slug:"hoodie", category:"fashion",
    name:"Branded Pullover Hoodie", price:22000,
    description:"Heavyweight fleece hoodie with embroidered chest logo and printed back design. Premium streetwear feel.",
    details:["320gsm fleece","Embroidered + print","Sizes: S–3XL","Kangaroo pocket","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-006", slug:"apron", category:"fashion",
    name:"Custom Branded Apron", price:8000,
    description:"Canvas apron with front pocket and branded logo. Perfect for hospitality and food businesses.",
    details:["Canvas material","Adjustable neck strap","Front pocket","Screen-printed logo","One size"],
    image:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-007", slug:"safety-vest", category:"fashion",
    name:"Hi-Vis Safety Vest (Branded)", price:6500,
    description:"Reflective safety vest with your company name printed. For construction, logistics and field teams.",
    details:["Hi-visibility yellow","Reflective strips","Screen-printed name","Sizes: S–XXL","EN ISO 20471"],
    image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-008", slug:"bomber-jacket", category:"fashion",
    name:"Executive Bomber Jacket", price:45000, originalPrice:55000,
    description:"Premium satin bomber jacket with embroidered logo. Luxury corporate gift for top clients and staff.",
    details:["Satin shell","Embroidered logo","Sizes: S–3XL","Ribbed cuffs & hem","MOQ: 3 pieces"],
    image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    badge:"Sale", inStock:true,
  },

  // ── DIGITAL ──────────────────────────────────────────────────────────────────
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
  {
    id:"digital-005", slug:"pitch-deck-template", category:"digital",
    name:"Investor Pitch Deck Template", price:22000,
    description:"Stunning 15-slide PowerPoint pitch deck template. Raise funding with confidence.",
    details:["15 slides","PowerPoint & Keynote","Fully editable","Investor-tested structure","Instant download"],
    image:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-006", slug:"invoice-template", category:"digital",
    name:"Professional Invoice Template Pack", price:5000,
    description:"10 clean, brandable invoice templates in Word and Google Docs format.",
    details:["10 templates","Word + Google Docs","Auto-calculating fields","Fully editable","Instant download"],
    image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    inStock:true, digital:true,
  },
  {
    id:"digital-007", slug:"content-calendar", category:"digital",
    name:"90-Day Content Calendar Template", price:7500,
    description:"Plan your social media content 90 days in advance. Excel & Google Sheets compatible.",
    details:["90-day planner","Excel + Google Sheets","Daily & weekly views","Caption prompts","Instant download"],
    image:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    badge:"Popular", inStock:true, digital:true,
  },
  {
    id:"digital-008", slug:"proposal-template", category:"digital",
    name:"Client Proposal Template", price:9000, originalPrice:13000,
    description:"Win more clients with a polished proposal template. Works across any industry.",
    details:["12-page template","Word + PDF","Editable sections","Cover page design","Instant download"],
    image:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    badge:"Sale", inStock:true, digital:true,
  },
  {
    id:"digital-009", slug:"hr-policy-pack", category:"digital",
    name:"HR Policy & Staff Handbook Pack", price:28000,
    description:"Ready-to-use HR documents — employment contract, leave policy, staff handbook and more.",
    details:["8 HR documents","Word format","Nigeria labour law compliant","Fully editable","Instant download"],
    image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-010", slug:"logo-design", category:"digital",
    name:"Custom Logo Design Service", price:55000,
    description:"Professional logo design by our in-house creative team. 3 concepts, 2 revision rounds.",
    details:["3 initial concepts","2 revision rounds","Final files: SVG, PNG, PDF","5–7 day delivery","Brand guide included"],
    image:"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    badge:"Popular", inStock:true, digital:true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style:"currency", currency:"NGN", minimumFractionDigits:0,
  }).format(n);
}