// ─── Types ────────────────────────────────────────────────────────────────────
export type Category    = "merchandise" | "print-jobs" | "fashion" | "digital";
export type SubCategory =
  // merchandise
  | "bags" | "mugs" | "stationery" | "tech-accessories" | "gifts"
  // print-jobs
  | "cards" | "banners" | "flyers" | "booklets" | "stickers"
  // fashion
  | "t-shirts" | "polos" | "hoodies" | "caps" | "jackets" | "uniforms" | "accessories" | "underwear"
  // digital
  | "brand-identity" | "templates" | "ebooks" | "hr-docs" | "services";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
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

// ─── Category / SubCategory map ───────────────────────────────────────────────
export const CATEGORIES: {
  id: "all" | Category;
  label: string;
  subCategories: { id: SubCategory; label: string }[];
}[] = [
  { id: "all", label: "All Products", subCategories: [] },
  {
    id: "merchandise",
    label: "Merchandise",
    subCategories: [
      { id: "bags",             label: "Bags & Totes"       },
      { id: "mugs",             label: "Mugs & Drinkware"   },
      { id: "stationery",       label: "Stationery"         },
      { id: "tech-accessories", label: "Tech Accessories"   },
      { id: "gifts",            label: "Gift Sets"          },
    ],
  },
  {
    id: "print-jobs",
    label: "Print Jobs",
    subCategories: [
      { id: "cards",    label: "Cards & Letterheads" },
      { id: "banners",  label: "Banners & Displays"  },
      { id: "flyers",   label: "Flyers & Brochures"  },
      { id: "booklets", label: "Booklets & Pads"     },
      { id: "stickers", label: "Stickers & Labels"   },
    ],
  },
  {
    id: "fashion",
    label: "Fashion & Apparel",
    subCategories: [
      { id: "t-shirts",    label: "T-Shirts"        },
      { id: "polos",       label: "Polo Shirts"     },
      { id: "hoodies",     label: "Hoodies"         },
      { id: "caps",        label: "Caps & Hats"     },
      { id: "jackets",     label: "Jackets"         },
      { id: "uniforms",    label: "Staff Uniforms"  },
      { id: "underwear",   label: "Underwear"       },
      { id: "accessories", label: "Accessories"     },
    ],
  },
  {
    id: "digital",
    label: "Digital Products",
    subCategories: [
      { id: "brand-identity", label: "Brand Identity"  },
      { id: "templates",      label: "Templates"       },
      { id: "ebooks",         label: "eBooks & Guides" },
      { id: "hr-docs",        label: "HR Documents"    },
      { id: "services",       label: "Design Services" },
    ],
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [

  // ══ MERCHANDISE — BAGS ═══════════════════════════════════════════════════════
  {
    id:"merch-001", slug:"tote-bag", category:"merchandise", subCategory:"bags",
    name:"Markbrand Signature Tote Bag", price:8500,
    description:"Premium canvas tote featuring the Markbrand logo. Durable, stylish, and perfect for everyday use.",
    details:["Heavy-duty canvas","Screen-printed logo","Reinforced handles","38cm × 42cm"],
    image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    badge:"Bestseller", inStock:true,
  },
  {
    id:"merch-002", slug:"drawstring-bag", category:"merchandise", subCategory:"bags",
    name:"Branded Drawstring Bag", price:5500,
    description:"Lightweight drawstring bag with full-colour print. Great for events, gyms and school activations.",
    details:["Polyester material","Full-colour print","Adjustable drawstring","40cm × 35cm"],
    image:"https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"merch-003", slug:"conference-bag", category:"merchandise", subCategory:"bags",
    name:"Executive Conference Bag", price:18000,
    description:"Professional conference bag with laptop sleeve and logo embroidery. Built for executives.",
    details:["Fits 15\" laptop","Multiple compartments","Logo embroidery","Padded shoulder strap"],
    image:"https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-004", slug:"jute-bag", category:"merchandise", subCategory:"bags",
    name:"Eco Jute Shopping Bag", price:4500,
    description:"Sustainable jute bag with branded print. Eco-friendly choice for conscious brands.",
    details:["Natural jute fibre","Screen-printed logo","Reinforced handles","35cm × 40cm"],
    image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ MERCHANDISE — MUGS ═══════════════════════════════════════════════════════
  {
    id:"merch-005", slug:"ceramic-mug", category:"merchandise", subCategory:"mugs",
    name:"Markbrand Ceramic Mug", price:6000,
    description:"High-quality ceramic mug with the Markbrand identity. A daily reminder that your brand matters.",
    details:["350ml capacity","Dishwasher safe","Scratch-resistant print","White gloss finish"],
    image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-006", slug:"travel-mug", category:"merchandise", subCategory:"mugs",
    name:"Branded Travel Mug (Stainless)", price:11000,
    description:"Insulated travel mug with laser-engraved logo. Keeps drinks hot for 6 hours.",
    details:["400ml capacity","Double-wall insulated","Laser-engraved","Leak-proof lid","BPA free"],
    image:"https://images.unsplash.com/photo-1581396405360-16a5e06a42bb?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"merch-007", slug:"magic-mug", category:"merchandise", subCategory:"mugs",
    name:"Colour-Change Magic Mug", price:7500, originalPrice:9000,
    description:"Black mug reveals your brand design when filled with a hot drink. Wow factor guaranteed.",
    details:["320ml capacity","Heat-activated print","Microwave safe","Custom design"],
    image:"https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"merch-008", slug:"water-bottle", category:"merchandise", subCategory:"mugs",
    name:"Stainless Steel Water Bottle", price:9500,
    description:"Double-walled stainless steel bottle with your logo laser-engraved. Keeps drinks cold for 24hrs.",
    details:["500ml capacity","Double-wall insulation","Laser-engraved logo","BPA free","Leak-proof lid"],
    image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ MERCHANDISE — STATIONERY ══════════════════════════════════════════════════
  {
    id:"merch-009", slug:"executive-notebook", category:"merchandise", subCategory:"stationery",
    name:"Executive Branded Notebook", price:5500, originalPrice:7000,
    description:"A5 hardcover notebook with Markbrand branding. Perfect for meetings, notes and big ideas.",
    details:["A5 hardcover","200 lined pages","Ribbon bookmark","Custom logo emboss"],
    image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"merch-010", slug:"pen-set", category:"merchandise", subCategory:"stationery",
    name:"Corporate Pen Set (3-Pack)", price:4500,
    description:"Sleek branded pens for corporate gifting, events and everyday professional use.",
    details:["Set of 3 pens","Metal body","Custom engraving available","Black & blue ink"],
    image:"https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-011", slug:"desk-calendar", category:"merchandise", subCategory:"stationery",
    name:"Branded Desk Calendar 2025", price:7000,
    description:"12-month desk calendar with full-colour brand prints on each page. A year of visibility.",
    details:["12 monthly pages","A5 landscape","Full colour print","Spiral bound","Custom branding"],
    image:"https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"merch-012", slug:"sticky-notes", category:"merchandise", subCategory:"stationery",
    name:"Branded Sticky Note Set", price:3000,
    description:"Custom printed sticky notes — your logo on every sheet. Great for office gifting.",
    details:["3 pads of 50 sheets","75mm × 75mm","Full colour header","Custom design"],
    image:"https://images.unsplash.com/photo-1544717305-996b815c338c?w=600&q=80",
    badge:"New", inStock:true,
  },

  // ══ MERCHANDISE — TECH ACCESSORIES ════════════════════════════════════════════
  {
    id:"merch-013", slug:"usb-drive", category:"merchandise", subCategory:"tech-accessories",
    name:"Custom USB Flash Drive (16GB)", price:5500,
    description:"16GB USB drive with your logo printed. Perfect corporate gift for clients and staff.",
    details:["16GB storage","USB 3.0","Logo print","Metal casing","MOQ: 10 units"],
    image:"https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-014", slug:"mouse-pad", category:"merchandise", subCategory:"tech-accessories",
    name:"XL Branded Desk Mat", price:6500,
    description:"Large non-slip desk mat with full-colour brand design. Covers your entire workspace.",
    details:["80cm × 40cm","Full colour print","Anti-slip base","Stitched edges","Water-resistant"],
    image:"https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"merch-015", slug:"power-bank", category:"merchandise", subCategory:"tech-accessories",
    name:"Branded Power Bank (10,000mAh)", price:22000, originalPrice:27000,
    description:"Compact 10,000mAh power bank with your logo laser-engraved. Never run out of charge.",
    details:["10,000mAh","Dual USB output","Laser-engraved logo","LED indicator","Cable included"],
    image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"merch-016", slug:"wireless-charger", category:"merchandise", subCategory:"tech-accessories",
    name:"Branded Wireless Charger Pad", price:15000,
    description:"10W wireless charging pad with your logo printed. Modern, functional branded gift.",
    details:["10W fast charge","Qi compatible","Logo print on surface","Non-slip base","1m cable included"],
    image:"https://images.unsplash.com/photo-1586816879360-004f4d142167?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ MERCHANDISE — GIFTS ═══════════════════════════════════════════════════════
  {
    id:"merch-017", slug:"keychain", category:"merchandise", subCategory:"gifts",
    name:"Branded Metal Keychain", price:2500,
    description:"Compact branded metal keychain. Ideal for giveaways, events and corporate hampers.",
    details:["Metal body","Logo engraving","Split ring included","5cm × 3cm"],
    image:"https://images.unsplash.com/photo-1569388037243-dfa034e4b672?w=600&q=80",
    inStock:true,
  },
  {
    id:"merch-018", slug:"gift-hamper", category:"merchandise", subCategory:"gifts",
    name:"Corporate Gift Hamper Set", price:32000, originalPrice:40000,
    description:"Curated hamper with mug, notebook, pen set and tote — all branded. Perfect for clients.",
    details:["Mug + Notebook + Pen + Tote","Custom branded box","Ribbon & tissue paper","Personalised card","Free delivery in Lagos"],
    image:"https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"merch-019", slug:"premium-hamper", category:"merchandise", subCategory:"gifts",
    name:"Executive Hamper (Premium)", price:65000,
    description:"Premium executive gift set — leather notebook, metal pen, tumbler and branded keepsake box.",
    details:["Leather notebook","Metal ballpen","Stainless tumbler","Branded rigid box","Hand-tied ribbon"],
    image:"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    badge:"New", inStock:true,
  },

  // ══ PRINT JOBS — CARDS ════════════════════════════════════════════════════════
  {
    id:"print-001", slug:"business-cards", category:"print-jobs", subCategory:"cards",
    name:"Business Cards — 500 pcs", price:15000,
    description:"Premium business cards on 400gsm stock. Matte or gloss finish. Supply your design or use ours.",
    details:["500 cards","400gsm card stock","Matte or gloss finish","85×55mm","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1572502742864-dce19dbf3df7?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"print-002", slug:"letterhead", category:"print-jobs", subCategory:"cards",
    name:"Branded Letterhead — 500 pcs", price:20000,
    description:"Professional letterheads on 100gsm paper. Supply your logo or use our design team.",
    details:["500 sheets","A4 100gsm","Full colour header","Design available","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-003", slug:"envelope", category:"print-jobs", subCategory:"cards",
    name:"Custom Branded Envelopes — 250 pcs", price:12000,
    description:"DL envelopes with your brand logo and address printed. Professional correspondence starts here.",
    details:["250 envelopes","DL size (110×220mm)","Full colour front","80gsm paper","3–4 day turnaround"],
    image:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-004", slug:"id-card", category:"print-jobs", subCategory:"cards",
    name:"Staff ID Cards — 20 pcs", price:18000,
    description:"PVC ID cards with lanyards for your team. Full-colour, professional finish.",
    details:["20 PVC cards","CR80 standard size","Full colour both sides","Lanyards included","2–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    badge:"New", inStock:true,
  },

  // ══ PRINT JOBS — BANNERS ══════════════════════════════════════════════════════
  {
    id:"print-005", slug:"flex-banner", category:"print-jobs", subCategory:"banners",
    name:"Flex Banner 3ft × 6ft", price:18000, originalPrice:22000,
    description:"Large-format outdoor flex banner. Weather-resistant, vivid print, eyelets included.",
    details:["3ft × 6ft","Vinyl flex material","Weather-resistant","Eyelets fitted","1–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"print-006", slug:"rollup-banner", category:"print-jobs", subCategory:"banners",
    name:"Roll-Up Banner 85cm × 200cm", price:35000,
    description:"Premium pull-up roll-up banner on durable aluminium stand. Ready to display anywhere.",
    details:["85cm × 200cm","Aluminium stand","Carry bag included","Full colour","1–2 day turnaround"],
    image:"https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"print-007", slug:"xframe-banner", category:"print-jobs", subCategory:"banners",
    name:"X-Frame Banner 60cm × 160cm", price:22000,
    description:"Lightweight X-frame display banner. Easy to assemble and transport.",
    details:["60cm × 160cm","X-frame stand","Carry bag included","Double-sided print option","1–2 day turnaround"],
    image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    inStock:true,
  },

  // ══ PRINT JOBS — FLYERS ═══════════════════════════════════════════════════════
  {
    id:"print-008", slug:"a5-flyers", category:"print-jobs", subCategory:"flyers",
    name:"A5 Flyers — 1,000 pcs", price:25000,
    description:"Full-colour A5 flyers for events, promotions and campaigns. Fast turnaround, vibrant results.",
    details:["1,000 flyers","A5 size","Full colour both sides","130gsm gloss","2–4 day turnaround"],
    image:"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-009", slug:"brochure", category:"print-jobs", subCategory:"flyers",
    name:"Tri-Fold Brochure — 500 pcs", price:30000,
    description:"Professional tri-fold brochures for your products, services or events. Sharp and polished.",
    details:["500 pieces","A4 tri-fold","170gsm gloss","Full colour both sides","3–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-010", slug:"a4-flyers", category:"print-jobs", subCategory:"flyers",
    name:"A4 Flyers — 500 pcs", price:20000,
    description:"Full-colour A4 flyers on 130gsm gloss stock. Perfect for wall displays and handouts.",
    details:["500 flyers","A4 size","Full colour one side","130gsm gloss","2–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80",
    badge:"New", inStock:true,
  },

  // ══ PRINT JOBS — BOOKLETS ═════════════════════════════════════════════════════
  {
    id:"print-011", slug:"invoice-booklet", category:"print-jobs", subCategory:"booklets",
    name:"Branded Invoice Booklet (50 leaves)", price:8500,
    description:"Carbon-copy invoice booklets with your logo and business details. Ideal for field sales teams.",
    details:["50 duplicate leaves","A5 size","Carbon copy","Custom header","4–5 day turnaround"],
    image:"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    inStock:true,
  },
  {
    id:"print-012", slug:"company-profile", category:"print-jobs", subCategory:"booklets",
    name:"Company Profile Booklet — 50 pcs", price:55000,
    description:"Premium saddle-stitched company profile booklet. Leave a lasting impression at every meeting.",
    details:["50 copies","A4 size","16 pages","170gsm gloss cover","5–7 day turnaround"],
    image:"https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ PRINT JOBS — STICKERS ═════════════════════════════════════════════════════
  {
    id:"print-013", slug:"stickers", category:"print-jobs", subCategory:"stickers",
    name:"Custom Die-Cut Stickers — 200 pcs", price:14000, originalPrice:18000,
    description:"Glossy die-cut stickers in any shape. Great for packaging, gifting and brand activations.",
    details:["200 stickers","Die-cut to shape","Gloss laminate","Waterproof","2–3 day turnaround"],
    image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"print-014", slug:"product-labels", category:"print-jobs", subCategory:"stickers",
    name:"Product Labels — 500 pcs", price:16000,
    description:"Self-adhesive product labels on roll. Perfect for packaging, bottles and retail products.",
    details:["500 labels on roll","Custom size","Gloss or matte","Waterproof option","3–4 day turnaround"],
    image:"https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80",
    badge:"New", inStock:true,
  },

  // ══ FASHION — T-SHIRTS ════════════════════════════════════════════════════════
  {
    id:"fashion-001", slug:"event-tshirt", category:"fashion", subCategory:"t-shirts",
    name:"Event T-Shirt (Custom Print)", price:9000, originalPrice:11000,
    description:"Custom screen-printed t-shirts for events, activations and campaigns.",
    details:["180gsm cotton","Screen print or DTF","Sizes: S–3XL","Full colour","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"fashion-002", slug:"plain-tshirt", category:"fashion", subCategory:"t-shirts",
    name:"Premium Plain T-Shirt", price:7500,
    description:"Heavyweight 220gsm plain t-shirt available in all colours. Blank for you to brand.",
    details:["220gsm cotton","Sizes: XS–4XL","20+ colour options","Pre-shrunk","MOQ: 1 piece"],
    image:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-003", slug:"round-neck-tshirt", category:"fashion", subCategory:"t-shirts",
    name:"Round-Neck Corporate T-Shirt", price:8500,
    description:"Smart round-neck t-shirt with chest logo print. Great for casual Fridays and activations.",
    details:["200gsm cotton","Front logo print","Sizes: S–3XL","Machine washable","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ FASHION — POLOS ═══════════════════════════════════════════════════════════
  {
    id:"fashion-004", slug:"polo-shirt", category:"fashion", subCategory:"polos",
    name:"Corporate Polo Shirt", price:12000,
    description:"High-quality polo shirt with your company logo embroidered on the chest. All sizes available.",
    details:["100% cotton pique","Logo embroidery","Sizes: S–3XL","Multiple colours","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-005", slug:"long-sleeve-polo", category:"fashion", subCategory:"polos",
    name:"Long-Sleeve Polo Shirt", price:14000,
    description:"Professional long-sleeve polo with embroidered logo. Smart-casual for all seasons.",
    details:["Cotton-poly blend","Logo embroidery","Sizes: S–3XL","Ribbed collar & cuffs","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1625910513966-93bb91a11ced?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"fashion-006", slug:"dry-fit-polo", category:"fashion", subCategory:"polos",
    name:"Dry-Fit Sports Polo", price:11000, originalPrice:13500,
    description:"Moisture-wicking dry-fit polo for sports days, outdoor events and activations.",
    details:["100% polyester","Moisture-wicking","Sizes: S–3XL","Screen-print logo","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80",
    badge:"Sale", inStock:true,
  },

  // ══ FASHION — HOODIES ═════════════════════════════════════════════════════════
  {
    id:"fashion-007", slug:"hoodie", category:"fashion", subCategory:"hoodies",
    name:"Branded Pullover Hoodie", price:22000,
    description:"Heavyweight fleece hoodie with embroidered chest logo and printed back design.",
    details:["320gsm fleece","Embroidered + print","Sizes: S–3XL","Kangaroo pocket","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-008", slug:"zip-hoodie", category:"fashion", subCategory:"hoodies",
    name:"Full-Zip Hoodie", price:26000, originalPrice:32000,
    description:"Premium full-zip hoodie with chest embroidery. Suitable for corporate casual wear.",
    details:["320gsm fleece","Full zip","Embroidered logo","Sizes: S–3XL","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"fashion-009", slug:"sweatshirt", category:"fashion", subCategory:"hoodies",
    name:"Branded Crewneck Sweatshirt", price:18000,
    description:"Classic crewneck sweatshirt with screen-printed logo. Casual, comfortable, branded.",
    details:["280gsm cotton-poly","Screen-print logo","Sizes: XS–3XL","Ribbed cuffs","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ FASHION — CAPS ════════════════════════════════════════════════════════════
  {
    id:"fashion-010", slug:"branded-cap", category:"fashion", subCategory:"caps",
    name:"Branded Structured Cap", price:7500,
    description:"Structured cap with embroidered logo. Great for events, uniforms and brand activations.",
    details:["One size fits all","Adjustable strap","Embroidered logo","6 colour options"],
    image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    badge:"Bestseller", inStock:true,
  },
  {
    id:"fashion-011", slug:"dad-cap", category:"fashion", subCategory:"caps",
    name:"Unstructured Dad Cap", price:6500,
    description:"Relaxed unstructured dad cap with embroidered logo. Casual brand wear for all.",
    details:["Unstructured front","Adjustable strap","Embroidered logo","Cotton twill","5 colours"],
    image:"https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-012", slug:"bucket-hat", category:"fashion", subCategory:"caps",
    name:"Branded Bucket Hat", price:8500,
    description:"Trendy bucket hat with embroidered or printed logo. Perfect for outdoor events.",
    details:["100% cotton","Logo embroidery","Sizes: S/M & L/XL","UV protection","Wide brim"],
    image:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"fashion-013", slug:"beanie", category:"fashion", subCategory:"caps",
    name:"Branded Knit Beanie", price:5500,
    description:"Warm knit beanie with embroidered logo patch. Great for colder campaigns and giveaways.",
    details:["Acrylic knit","Embroidered patch","One size","Folded cuff","3 colour options"],
    image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&q=80",
    inStock:true,
  },

  // ══ FASHION — JACKETS ═════════════════════════════════════════════════════════
  {
    id:"fashion-014", slug:"bomber-jacket", category:"fashion", subCategory:"jackets",
    name:"Executive Bomber Jacket", price:45000, originalPrice:55000,
    description:"Premium satin bomber jacket with embroidered logo. Luxury corporate gift.",
    details:["Satin shell","Embroidered logo","Sizes: S–3XL","Ribbed cuffs & hem","MOQ: 3 pieces"],
    image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    badge:"Sale", inStock:true,
  },
  {
    id:"fashion-015", slug:"windbreaker", category:"fashion", subCategory:"jackets",
    name:"Branded Windbreaker Jacket", price:32000,
    description:"Lightweight windbreaker with full-colour print or embroidery. Water-resistant.",
    details:["Nylon shell","Water-resistant","Logo print/embroidery","Sizes: S–3XL","MOQ: 5 pieces"],
    image:"https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-016", slug:"fleece-jacket", category:"fashion", subCategory:"jackets",
    name:"Full-Zip Fleece Jacket", price:28000,
    description:"Cosy fleece jacket with chest embroidery. A go-to for corporate casual wear.",
    details:["Anti-pill fleece","Full zip","Embroidered logo","Sizes: XS–3XL","2 pockets"],
    image:"https://images.unsplash.com/photo-1614495975479-fe3667f0c21e?w=600&q=80",
    badge:"Popular", inStock:true,
  },

  // ══ FASHION — UNIFORMS ════════════════════════════════════════════════════════
  {
    id:"fashion-017", slug:"staff-uniform", category:"fashion", subCategory:"uniforms",
    name:"Custom Staff Uniform Set", price:35000,
    description:"Complete staff uniform — shirt and trousers tailored to your brand colours.",
    details:["Shirt + Trouser","Custom colour matching","Logo embroidery","Sizes: XS–4XL","MOQ: 3 sets"],
    image:"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-018", slug:"apron", category:"fashion", subCategory:"uniforms",
    name:"Custom Branded Apron", price:8000,
    description:"Canvas apron with front pocket and branded logo. Perfect for hospitality businesses.",
    details:["Canvas material","Adjustable neck strap","Front pocket","Screen-printed logo","One size"],
    image:"https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-019", slug:"safety-vest", category:"fashion", subCategory:"uniforms",
    name:"Hi-Vis Safety Vest (Branded)", price:6500,
    description:"Reflective safety vest with your company name printed. For construction and field teams.",
    details:["Hi-visibility yellow","Reflective strips","Screen-printed name","Sizes: S–XXL"],
    image:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    inStock:true,
  },

  // ══ FASHION — UNDERWEAR ══════════════════════════════════════════════════════
  {
    id:"fashion-022", slug:"boxer-briefs", category:"fashion", subCategory:"underwear",
    name:"Branded Boxer Briefs", price:4500,
    description:"Soft cotton-spandex boxer briefs with your logo waistband. Comfortable fit for everyday wear.",
    details:["95% cotton 5% spandex","Elasticated logo waistband","Sizes: S–3XL","3 colours: Black, Navy, Grey","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-023", slug:"boxers-shorts", category:"fashion", subCategory:"underwear",
    name:"Branded Boxer Shorts", price:4000,
    description:"Loose-fit woven boxer shorts with printed logo. Breathable and relaxed for all-day comfort.",
    details:["100% woven cotton","Printed logo waistband","Elastic waist","Sizes: S–3XL","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"fashion-024", slug:"trunks", category:"fashion", subCategory:"underwear",
    name:"Branded Trunks (Short Leg)", price:4200,
    description:"Short-leg trunks with stretch fabric and embossed logo waistband. Sleek and modern fit.",
    details:["92% cotton 8% elastane","Embossed logo waistband","Flat-lock seams","Sizes: S–3XL","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-025", slug:"briefs", category:"fashion", subCategory:"underwear",
    name:"Branded Classic Briefs", price:3500,
    description:"Classic-cut briefs with your logo on the waistband. Great for corporate gifting and staff packs.",
    details:["100% combed cotton","Logo waistband","Sizes: S–3XL","White, Black, Navy","MOQ: 12 pieces"],
    image:"https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-026", slug:"long-johns", category:"fashion", subCategory:"underwear",
    name:"Thermal Long Johns Set", price:9500,
    description:"Branded thermal long johns top and bottom set. Warm, stretchy, ideal for cold-season staff wear.",
    details:["Top + Bottom set","Thermal fleece lining","Printed logo","Sizes: S–2XL","MOQ: 5 sets"],
    image:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"fashion-027", slug:"vest-singlet", category:"fashion", subCategory:"underwear",
    name:"Branded Vest / Singlet", price:3000,
    description:"Ribbed cotton vest with subtle printed logo at chest. Lightweight everyday innerwear.",
    details:["100% ribbed cotton","Chest logo print","Sizes: S–3XL","White & Black","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    inStock:true,
  },
  {
    id:"fashion-028", slug:"sports-bra", category:"fashion", subCategory:"underwear",
    name:"Branded Sports Bra", price:5500,
    description:"Medium-support sports bra with logo print. Perfect for branded activewear sets and events.",
    details:["85% nylon 15% spandex","Medium support","Logo print","Sizes: XS–2XL","Moisture-wicking","MOQ: 10 pieces"],
    image:"https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80",
    badge:"New", inStock:true,
  },
  {
    id:"fashion-029", slug:"underwear-gift-set", category:"fashion", subCategory:"underwear",
    name:"Branded Underwear Gift Pack (3-in-1)", price:12000, originalPrice:15000,
    description:"Premium gift pack with 3 branded boxer briefs in a custom-printed box. Perfect corporate gift.",
    details:["3 boxer briefs","Custom gift box","Mixed colours","Sizes: S–3XL","Ribbon & tissue paper","MOQ: 5 sets"],
    image:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    badge:"Sale", inStock:true,
  },

  // ══ FASHION — ACCESSORIES ════════════════════════════════════════════════════
  {
    id:"fashion-020", slug:"lanyard", category:"fashion", subCategory:"accessories",
    name:"Branded Lanyards — 50 pcs", price:12000,
    description:"Full-colour sublimation-printed lanyards with ID card holder. Great for events and offices.",
    details:["50 lanyards","15mm or 20mm width","Sublimation print","Safety breakaway","Card holder included"],
    image:"https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=600&q=80",
    badge:"Popular", inStock:true,
  },
  {
    id:"fashion-021", slug:"face-mask", category:"fashion", subCategory:"accessories",
    name:"Branded Fabric Face Mask (10 pcs)", price:5000,
    description:"Reusable fabric masks with your logo print. Washable and comfortable for daily wear.",
    details:["10 masks","3-layer fabric","Custom logo print","One size fits most","Machine washable"],
    image:"https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=600&q=80",
    inStock:true,
  },

  // ══ DIGITAL — BRAND IDENTITY ══════════════════════════════════════════════════
  {
    id:"digital-001", slug:"brand-kit", category:"digital", subCategory:"brand-identity",
    name:"Brand Identity Starter Kit", price:45000,
    description:"Complete digital brand kit — logo files, colour palette, font selections and brand guidelines PDF.",
    details:["Logo in SVG, PNG, PDF","Brand guidelines PDF","Colour & font specs","Social templates","Instant download"],
    image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-002", slug:"logo-design", category:"digital", subCategory:"brand-identity",
    name:"Custom Logo Design Service", price:55000,
    description:"Professional logo design by our in-house creative team. 3 concepts, 2 revision rounds.",
    details:["3 initial concepts","2 revision rounds","Final files: SVG, PNG, PDF","5–7 day delivery","Brand guide included"],
    image:"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    badge:"Popular", inStock:true, digital:true,
  },
  {
    id:"digital-003", slug:"visual-identity", category:"digital", subCategory:"brand-identity",
    name:"Full Visual Identity Pack", price:120000,
    description:"End-to-end brand identity — logo, colours, typography, mockups and a full guidelines document.",
    details:["Logo + icon variants","Brand guidelines (30+ pages)","Mockup presentations","Social media kit","7–10 day delivery"],
    image:"https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
    badge:"Bestseller", inStock:true, digital:true,
  },

  // ══ DIGITAL — TEMPLATES ═══════════════════════════════════════════════════════
  {
    id:"digital-004", slug:"social-templates", category:"digital", subCategory:"templates",
    name:"Social Media Pack (30 Templates)", price:18000, originalPrice:25000,
    description:"30 professionally designed Canva-ready templates branded to your business.",
    details:["30 unique templates","Canva editable","Instagram & Facebook sizes","Colour customisable","Instant download"],
    image:"https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
    badge:"Sale", inStock:true, digital:true,
  },
  {
    id:"digital-005", slug:"pitch-deck-template", category:"digital", subCategory:"templates",
    name:"Investor Pitch Deck Template", price:22000,
    description:"Stunning 15-slide PowerPoint pitch deck template. Raise funding with confidence.",
    details:["15 slides","PowerPoint & Keynote","Fully editable","Investor-tested structure","Instant download"],
    image:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-006", slug:"invoice-template", category:"digital", subCategory:"templates",
    name:"Professional Invoice Template Pack", price:5000,
    description:"10 clean, brandable invoice templates in Word and Google Docs format.",
    details:["10 templates","Word + Google Docs","Auto-calculating fields","Fully editable","Instant download"],
    image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    inStock:true, digital:true,
  },
  {
    id:"digital-007", slug:"content-calendar", category:"digital", subCategory:"templates",
    name:"90-Day Content Calendar Template", price:7500,
    description:"Plan your social media content 90 days in advance. Excel & Google Sheets compatible.",
    details:["90-day planner","Excel + Google Sheets","Daily & weekly views","Caption prompts","Instant download"],
    image:"https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    badge:"Popular", inStock:true, digital:true,
  },
  {
    id:"digital-008", slug:"proposal-template", category:"digital", subCategory:"templates",
    name:"Client Proposal Template", price:9000, originalPrice:13000,
    description:"Win more clients with a polished proposal template. Works across any industry.",
    details:["12-page template","Word + PDF","Editable sections","Cover page design","Instant download"],
    image:"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    badge:"Sale", inStock:true, digital:true,
  },

  // ══ DIGITAL — EBOOKS ══════════════════════════════════════════════════════════
  {
    id:"digital-009", slug:"marketing-playbook", category:"digital", subCategory:"ebooks",
    name:"Digital Marketing Playbook (eBook)", price:8500,
    description:"Practical guide to growing your brand online — written for Nigerian businesses.",
    details:["85 pages PDF","Social media strategy","Content planning","Ads basics","Instant download"],
    image:"https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    badge:"Bestseller", inStock:true, digital:true,
  },
  {
    id:"digital-010", slug:"business-plan", category:"digital", subCategory:"ebooks",
    name:"Business Plan Template + Guide", price:12000,
    description:"A structured business plan template built for Nigerian entrepreneurs, with a how-to guide.",
    details:["Word + PDF format","12 key sections","Financial projections","Step-by-step guide","Instant download"],
    image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    inStock:true, digital:true,
  },
  {
    id:"digital-011", slug:"branding-101", category:"digital", subCategory:"ebooks",
    name:"Branding 101 for SMEs (eBook)", price:6000,
    description:"No-fluff branding guide for small businesses in Nigeria. Build a brand that sticks.",
    details:["60 pages PDF","Brand strategy basics","Visual identity tips","Nigerian market context","Instant download"],
    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },

  // ══ DIGITAL — HR DOCS ════════════════════════════════════════════════════════
  {
    id:"digital-012", slug:"hr-policy-pack", category:"digital", subCategory:"hr-docs",
    name:"HR Policy & Staff Handbook Pack", price:28000,
    description:"Ready-to-use HR documents — employment contract, leave policy, staff handbook and more.",
    details:["8 HR documents","Word format","Nigeria labour law compliant","Fully editable","Instant download"],
    image:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    badge:"New", inStock:true, digital:true,
  },
  {
    id:"digital-013", slug:"employment-contract", category:"digital", subCategory:"hr-docs",
    name:"Employment Contract Template", price:8000,
    description:"Legally sound Nigerian employment contract template. Covers full-time, part-time and contract staff.",
    details:["3 contract types","Word format","Nigerian law compliant","Fully customisable","Instant download"],
    image:"https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    inStock:true, digital:true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style:"currency", currency:"NGN", minimumFractionDigits:0,
  }).format(n);
}