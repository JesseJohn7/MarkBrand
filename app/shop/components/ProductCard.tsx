"use client";
import Image from "next/image";
import { useCart } from "./Cart";
import { formatPrice, type Product } from "./Products";
import { useState, useEffect, useCallback } from "react";

/* ─── Static colour options per category ────────────────────────────── */
const CATEGORY_COLORS: Record<string, { name: string; hex: string }[]> = {
  "clothing":    [{ name:"Black", hex:"#1a1a1a" },{ name:"White", hex:"#f5f5f5" },{ name:"Brown", hex:"#7c5c3e" },{ name:"Navy", hex:"#1e2a45" }],
  "accessories": [{ name:"Gold", hex:"#c9a84c" },{ name:"Silver", hex:"#a0a0a0" },{ name:"Black", hex:"#1a1a1a" }],
  "footwear":    [{ name:"Black", hex:"#1a1a1a" },{ name:"Brown", hex:"#7c5c3e" },{ name:"Tan", hex:"#c2956c" }],
  "electronics": [{ name:"Black", hex:"#1a1a1a" },{ name:"White", hex:"#f5f5f5" },{ name:"Grey", hex:"#888888" }],
  "home":        [{ name:"Beige", hex:"#d4c4a8" },{ name:"White", hex:"#f5f5f5" },{ name:"Black", hex:"#1a1a1a" }],
};
const DEFAULT_COLORS = [{ name:"Black", hex:"#1a1a1a" },{ name:"White", hex:"#f5f5f5" }];

function StarIcon({ filled, half }: { filled?: boolean; half?: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className="w-3 h-3 shrink-0" fill="none">
      {half ? (
        <>
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#f59e0b"/>
              <stop offset="50%" stopColor="#44403c"/>
            </linearGradient>
          </defs>
          <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="url(#halfGrad)"/>
        </>
      ) : (
        <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5"
          fill={filled ? "#f59e0b" : "#44403c"}/>
      )}
    </svg>
  );
}

/* ─── Product Detail Modal ───────────────────────────────────────────── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [added, setAdded]         = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedColor, setColor] = useState(0);
  const [qty, setQty]             = useState(1);
  const [tab, setTab]             = useState<"desc" | "specs" | "delivery">("desc");

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const colors = CATEGORY_COLORS[product.category] ?? DEFAULT_COLORS;

  // Deterministic mock rating from product name
  const ratingVal = Math.min(5, 3.5 + ((product.name.charCodeAt(0) % 15) / 10));
  const rating    = parseFloat(ratingVal.toFixed(1));
  const reviews   = 40 + (product.name.charCodeAt(1) % 200);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const specs = [
    { label: "Category",  value: product.category.replace("-", " ") },
    { label: "Type",      value: product.digital ? "Digital Product" : "Physical Product" },
    { label: "Condition", value: "Brand New" },
    { label: "Warranty",  value: product.digital ? "Lifetime Access" : "12 Months" },
    { label: "In Stock",  value: product.digital ? "Unlimited" : `${10 + (product.name.charCodeAt(0) % 40)} units` },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
      style={{ background: "rgba(4,3,2,0.9)", backdropFilter: "blur(14px)" }}
    >
      <div
        className="relative w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-sm border border-stone-700/50 shadow-[0_40px_120px_rgba(0,0,0,0.95)]"
        style={{
          background: "linear-gradient(160deg,#251a12 0%,#1a1108 60%,#201510 100%)",
          animation: "modalIn 0.3s cubic-bezier(0.22,1,0.36,1) both",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-stone-700"/>
        </div>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-stone-700 text-stone-400 hover:text-white hover:bg-stone-800/80 transition-all duration-150"
          aria-label="Close">
          <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row">

          {/* ── LEFT: Image ────────────────────────────────────────── */}
          <div className="relative sm:w-[42%] shrink-0 aspect-square sm:aspect-auto sm:min-h-[500px] overflow-hidden sm:rounded-tl-sm sm:rounded-bl-sm">
            <div className="absolute inset-0 bg-stone-900 transition-opacity duration-500"
              style={{ opacity: imgLoaded ? 0 : 1 }}/>
            <Image src={product.image} alt={product.name} fill
              sizes="(max-width:640px) 100vw, 42vw"
              className="object-cover"
              onLoad={() => setImgLoaded(true)}/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.badge && (
                <span className={`px-2.5 py-1 text-[0.46rem] font-black tracking-[0.2em] uppercase rounded-sm shadow-lg ${
                  product.badge === "Sale"       ? "bg-white text-[#0A0A0A]" :
                  product.badge === "New"        ? "bg-[#00ff64] text-[#0A0A0A]" :
                  product.badge === "Bestseller" ? "bg-amber-400 text-[#0A0A0A]" :
                                                  "bg-stone-700 text-stone-200"
                }`}>{product.badge}</span>
              )}
              {discount && (
                <span className="px-2.5 py-1 text-[0.46rem] font-black tracking-[0.18em] uppercase rounded-sm bg-rose-600 text-white shadow-lg">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Rating pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-black/70 backdrop-blur-sm border border-stone-700/60">
              <StarIcon filled/>
              <span className="text-[0.52rem] font-bold text-amber-400">{rating}</span>
              <span className="text-[0.46rem] text-stone-400">({reviews})</span>
            </div>
          </div>

          {/* ── RIGHT: Details ──────────────────────────────────────── */}
          <div className="flex flex-col flex-1 p-5 sm:p-7">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[0.42rem] font-bold tracking-[0.24em] uppercase text-stone-600">Store</span>
              <span className="text-stone-700 text-[0.5rem]">›</span>
              <span className="text-[0.42rem] font-bold tracking-[0.24em] uppercase text-stone-500">
                {product.category.replace("-", " ")}
              </span>
            </div>

            {/* Name */}
            <h2 className="text-lg sm:text-2xl font-semibold text-white leading-snug mb-3 pr-8"
              style={{ fontFamily: "Cormorant Garamond, serif" }}>
              {product.name}
            </h2>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <StarIcon key={s}
                    filled={s <= Math.floor(rating)}
                    half={s === Math.ceil(rating) && rating % 1 !== 0}/>
                ))}
              </div>
              <span className="text-[0.52rem] font-bold text-amber-400">{rating}/5</span>
              <span className="text-[0.46rem] text-stone-500">— {reviews} ratings</span>
              <span className="ml-auto text-[0.44rem] font-bold tracking-[0.14em] uppercase text-emerald-500 border border-emerald-800/60 px-2 py-0.5 rounded-sm">
                In Stock
              </span>
            </div>

            {/* Price block */}
            <div className="flex items-baseline gap-3 mb-1 p-3 rounded-sm bg-stone-900/50 border border-stone-800/60">
              <span className="text-2xl sm:text-3xl font-bold text-white leading-none"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-500 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {discount && (
                <span className="text-[0.55rem] font-black tracking-[0.12em] uppercase text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-sm">
                  You save {discount}%
                </span>
              )}
            </div>
            <p className="text-[0.44rem] text-stone-600 mb-5 px-1">Price includes all taxes</p>

            {/* ── Colour picker ── */}
            {!product.digital && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[0.5rem] font-bold tracking-[0.18em] uppercase text-stone-400">Colour:</span>
                  <span className="text-[0.5rem] font-semibold text-white">{colors[selectedColor].name}</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {colors.map((c, i) => (
                    <button key={c.name} title={c.name} onClick={() => setColor(i)}
                      className="relative w-7 h-7 rounded-full transition-transform duration-150 hover:scale-110 focus:outline-none"
                      style={{
                        background: c.hex,
                        boxShadow: selectedColor === i
                          ? `0 0 0 2px #1a1108, 0 0 0 3.5px ${c.hex}`
                          : "0 0 0 1px rgba(255,255,255,0.12)",
                      }}>
                      {selectedColor === i && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round" fill="none"
                            style={{ color: ["#f5f5f5","#d4c4a8","#c2956c","#a0a0a0"].includes(c.hex) ? "#333" : "#fff" }}>
                            <polyline points="2,6 5,9 10,3"/>
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Quantity ── */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[0.5rem] font-bold tracking-[0.18em] uppercase text-stone-400">Qty:</span>
              <div className="flex items-center border border-stone-700 rounded-sm overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors text-sm font-bold">
                  −
                </button>
                <span className="w-10 text-center text-[0.72rem] font-semibold text-white border-x border-stone-700 leading-8">
                  {qty}
                </span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-300 hover:bg-stone-800 transition-colors text-sm font-bold">
                  +
                </button>
              </div>
              <span className="text-[0.44rem] text-stone-600">Max 10 per order</span>
            </div>

            {/* ── CTA ── */}
            <div className="flex gap-2.5 mb-5">
              <button onClick={handleAdd}
                className={`flex-1 py-3 text-[0.58rem] font-black tracking-[0.16em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  added ? "bg-emerald-500 text-white" : "bg-white text-[#0A0A0A] hover:bg-stone-100"
                }`}>
                {added ? (
                  <>
                    <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      <polyline points="2,6 5,9 10,3"/>
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      <circle cx="6" cy="13" r="1"/><circle cx="13" cy="13" r="1"/>
                      <path d="M1 1h2l1.5 7.5h8L14 5H4"/>
                    </svg>
                    {product.digital ? "Add to Cart" : "Add to Cart"}
                  </>
                )}
              </button>
             {/*  <button className="px-4 py-3 border border-stone-700 rounded-sm text-stone-400 hover:border-stone-500 hover:text-rose-400 transition-all duration-200"
                aria-label="Add to wishlist">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <path d="M8 13.5S2 9.5 2 5.5a3.5 3.5 0 017-0.5 3.5 3.5 0 017 .5c0 4-6 8-6 8z"/>
                </svg>
              </button> */}
            </div>

            {/* ── Delivery strip ── */}
            {!product.digital && (
              <div className="flex items-center gap-3 p-3 rounded-sm bg-stone-900/40 border border-stone-800/50 mb-5">
                <svg viewBox="0 0 20 14" className="w-5 h-5 shrink-0 stroke-current text-stone-500" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                  <rect x="1" y="1" width="12" height="9" rx="1"/>
                  <path d="M13 4h3l3 3v3h-6V4z"/>
                  <circle cx="5" cy="12" r="1.5"/>
                  <circle cx="16" cy="12" r="1.5"/>
                </svg>
                <div>
                  <p className="text-[0.5rem] font-bold text-stone-300">
                    Delivery to Lagos · <span className="text-emerald-400">FREE</span>
                  </p>
                  <p className="text-[0.44rem] text-stone-600 mt-0.5">Estimated 2–4 business days</p>
                </div>
                <svg viewBox="0 0 12 12" className="w-3 h-3 ml-auto stroke-current text-stone-600" strokeWidth="2" strokeLinecap="round" fill="none">
                  <polyline points="4,2 8,6 4,10"/>
                </svg>
              </div>
            )}

            {/* ── Tabs ── */}
            <div className="border-b border-stone-800 flex gap-5 mb-4">
              {(["desc","specs","delivery"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`pb-2.5 text-[0.48rem] font-bold tracking-[0.18em] uppercase transition-colors duration-150 border-b-2 -mb-px ${
                    tab === t ? "border-white text-white" : "border-transparent text-stone-500 hover:text-stone-300"
                  }`}>
                  {t === "desc" ? "Description" : t === "specs" ? "Details" : "Delivery & Returns"}
                </button>
              ))}
            </div>

            {tab === "desc" && (
              <p className="text-[0.7rem] text-stone-400 leading-relaxed">
                {(product as any).description ||
                  "A premium product crafted with exceptional attention to detail. Designed for those who demand the finest quality and uncompromising standards. Each piece is carefully inspected before dispatch to ensure you receive nothing but the best."}
              </p>
            )}

            {tab === "specs" && (
              <div className="divide-y divide-stone-800/60">
                {specs.map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5">
                    <span className="text-[0.48rem] font-bold tracking-[0.14em] uppercase text-stone-500">{label}</span>
                    <span className="text-[0.55rem] font-semibold text-stone-300 capitalize">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "delivery" && (
              <div className="space-y-4">
                {[
                  { title:"Free Delivery", body:"Orders above ₦15,000 qualify for free standard delivery within Lagos. Other states may attract a small fee." },
                  { title:"Estimated Arrival", body:"Lagos: 1–2 days · South-West: 2–3 days · Other states: 3–5 business days." },
                  { title:"Easy Returns", body:"Not satisfied? Return within 7 days of delivery for a full refund or exchange — no questions asked." },
                ].map(({ title, body }) => (
                  <div key={title} className="flex gap-3">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0"/>
                    <div>
                      <p className="text-[0.52rem] font-bold text-stone-200 mb-1">{title}</p>
                      <p className="text-[0.62rem] text-stone-500 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Trust bar ── */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-800/60">
              {[
                { d:"M6 1a5 5 0 100 10A5 5 0 006 1zM4 6l1.5 1.5L8 4", label:"100% Genuine" },
                { d:"M2 4h8v5a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM4 4V3a2 2 0 014 0v1", label:"Secure Pay" },
                { d:"M1 7l2-4h8l2 4M11 7v4H3V7", label:"Easy Return" },
              ].map(({ d, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-stone-500">
                  <svg viewBox="0 0 12 12" className="w-4 h-4 stroke-current" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d={d}/>
                  </svg>
                  <span className="text-[0.42rem] font-bold tracking-[0.1em] uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform:scale(0.97) translateY(16px); }
          to   { opacity:1; transform:scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────────────── */
export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const openModal  = useCallback(() => setModalOpen(true),  []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <div
        className="group relative bg-[#5c3d2e] border border-stone-800/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-600 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
        onClick={openModal}
        role="button" tabIndex={0}
        aria-label={`View details for ${product.name}`}
        onKeyDown={e => e.key === "Enter" && openModal()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden shrink-0">
          <Image src={product.image} alt={product.name} fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300"/>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`px-2 py-0.5 text-[0.44rem] font-bold tracking-[0.14em] uppercase rounded-sm ${
                product.badge === "Sale"       ? "bg-white text-[#0A0A0A]" :
                product.badge === "New"        ? "bg-[#00ff64] text-[#0A0A0A]" :
                product.badge === "Bestseller" ? "bg-amber-400 text-[#0A0A0A]" :
                                                "bg-stone-700 text-stone-200"
              }`}>{product.badge}</span>
            )}
            {product.digital && (
              <span className="px-2 py-0.5 text-[0.44rem] font-bold tracking-[0.14em] uppercase rounded-sm bg-stone-900/90 text-stone-300 border border-stone-700">
                Digital
              </span>
            )}
            {discount && (
              <span className="px-2 py-0.5 text-[0.44rem] font-bold tracking-[0.14em] uppercase rounded-sm bg-white text-[#0A0A0A]">
                -{discount}%
              </span>
            )}
          </div>

          {/* View Details hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 text-[0.48rem] font-bold tracking-[0.18em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm">
              View Details
            </span>
          </div>

          {/* Category pill */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 text-[0.42rem] font-bold tracking-[0.22em] uppercase text-stone-400 bg-black/70 backdrop-blur-sm border border-stone-700/50 rounded-sm">
              {product.category.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <h3 className="text-[0.78rem] font-semibold text-stone-100 leading-snug mb-4 line-clamp-2 group-hover:text-white transition-colors duration-200">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2.5 mb-4 mt-auto">
            <span className="font-[Cormorant_Garamond,serif] text-[1.35rem] font-bold text-white leading-none">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[0.6rem] text-stone-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button
            onClick={e => { e.stopPropagation(); add(product); }}
            className="w-full py-2.5 text-[0.58rem] font-bold tracking-[0.14em] uppercase rounded-sm transition-all duration-200 flex items-center justify-center gap-2 bg-white text-[#0A0A0A] hover:bg-stone-200 group/btn"
          >
            {product.digital ? "Get Download" : "Add to Cart"}
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 stroke-current transition-transform duration-200 group-hover/btn:translate-x-0.5"
              strokeWidth="2.5" strokeLinecap="round" fill="none">
              <line x1="2" y1="6" x2="10" y2="6"/><polyline points="7,3 10,6 7,9"/>
            </svg>
          </button>
        </div>

        <div className="absolute top-0 left-0 w-[2px] h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"/>
      </div>

      {modalOpen && <ProductModal product={product} onClose={closeModal}/>}
    </>
  );
}