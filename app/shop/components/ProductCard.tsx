"use client";
import Image from "next/image";
import { useCart } from "./Cart";
import { formatPrice, type Product } from "./Products";
import { useState, useEffect, useCallback } from "react";

/* ─── Product Detail Modal ─────────────────────────────────────────── */
function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      style={{ background: "rgba(5,4,3,0.85)", backdropFilter: "blur(10px)" }}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm border border-stone-700/60 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
        style={{
          background: "linear-gradient(145deg,#2a1f17 0%,#1c1410 50%,#221a12 100%)",
          animation: "modalIn 0.28s cubic-bezier(0.22,1,0.36,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-sm border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 hover:bg-stone-800/60 transition-all duration-150"
          aria-label="Close"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2" strokeLinecap="round" fill="none">
            <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* ── Image side ── */}
          <div className="relative sm:w-[45%] shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[420px] overflow-hidden">
            <div
              className="absolute inset-0 bg-stone-900/60 transition-opacity duration-500"
              style={{ opacity: imgLoaded ? 0 : 1 }}
            />
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:640px) 100vw, 45vw"
              className="object-cover"
              onLoad={() => setImgLoaded(true)}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-black/30" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.badge && (
                <span className={`px-2.5 py-1 text-[0.48rem] font-bold tracking-[0.18em] uppercase rounded-sm ${
                  product.badge === "Sale"       ? "bg-white text-[#0A0A0A]" :
                  product.badge === "New"        ? "bg-[#00ff64] text-[#0A0A0A]" :
                  product.badge === "Bestseller" ? "bg-amber-400 text-[#0A0A0A]" :
                                                  "bg-stone-700 text-stone-200"
                }`}>{product.badge}</span>
              )}
              {product.digital && (
                <span className="px-2.5 py-1 text-[0.48rem] font-bold tracking-[0.18em] uppercase rounded-sm bg-stone-900/90 text-stone-300 border border-stone-700">
                  Digital
                </span>
              )}
              {discount && (
                <span className="px-2.5 py-1 text-[0.48rem] font-bold tracking-[0.18em] uppercase rounded-sm bg-white text-[#0A0A0A]">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="flex flex-col flex-1 p-6 sm:p-8">

            {/* Category */}
            <span className="text-[0.42rem] font-bold tracking-[0.28em] uppercase text-stone-500 mb-3">
              {product.category.replace("-", " ")}
            </span>

            {/* Name */}
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-100 leading-tight mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}>
              {product.name}
            </h2>

            {/* Divider */}
            <div className="w-10 h-px bg-stone-600 mb-5" />

            {/* Description */}
            <p className="text-[0.72rem] text-stone-400 leading-relaxed mb-6">
              {product.description ||
                "A premium product crafted with exceptional attention to detail. Designed for those who demand the finest quality and uncompromising standards in every aspect of their lifestyle."}
            </p>



            {/* Spacer */}
            <div className="flex-1" />

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-3xl font-bold text-white leading-none"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-[0.55rem] font-bold tracking-[0.12em] uppercase text-emerald-400">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 text-[0.6rem] font-bold tracking-[0.18em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 ${
                added
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-[#0A0A0A] hover:bg-stone-100"
              }`}
            >
              {added ? (
                <>
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <polyline points="2,6 5,9 10,3"/>
                  </svg>
                  Added to Cart
                </>
              ) : (
                <>
                  {product.digital ? "Get Download" : "Add to Cart"}
                  <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                    <line x1="2" y1="6" x2="10" y2="6"/><polyline points="7,3 10,6 7,9"/>
                  </svg>
                </>
              )}
            </button>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-5 mt-4">
              {[
                { icon: "M6 2a4 4 0 100 8A4 4 0 006 2zM2 6a4 4 0 018 0", label: "Free Returns" },
                { icon: "M2 4h8v6H2zM4 4V3a2 2 0 014 0v1", label: "Secure Checkout" },
                { icon: "M2 9l2-5h4l2 5M5 9l1-2.5L7 9", label: "Fast Shipping" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-stone-500">
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current shrink-0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d={icon}/>
                  </svg>
                  <span className="text-[0.45rem] font-medium tracking-[0.1em] uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}

/* ─── Product Card ──────────────────────────────────────────────────── */
export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <div
        className="group relative bg-[#5c3d2e] border border-stone-800/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-600 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
        onClick={openModal}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        onKeyDown={(e) => e.key === "Enter" && openModal()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

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

          {/* "View Details" hint on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 text-[0.48rem] font-bold tracking-[0.18em] uppercase bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-sm">
              View Details
            </span>
          </div>

          {/* Category pill — bottom of image */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 text-[0.42rem] font-bold tracking-[0.22em] uppercase text-stone-400 bg-black/70 backdrop-blur-sm border border-stone-700/50 rounded-sm">
              {product.category.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">

          {/* Product name */}
          <h3 className="text-[0.78rem] font-semibold text-stone-100 leading-snug mb-4 line-clamp-2 group-hover:text-white transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price row */}
          <div className="flex items-baseline gap-2.5 mb-4 mt-auto">
            <span className="font-[Cormorant_Garamond,serif] text-[1.35rem] font-bold text-white leading-none">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[0.6rem] text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to cart — stops propagation so clicking it doesn't open modal */}
          <button
            onClick={(e) => { e.stopPropagation(); add(product); }}
            className="w-full py-2.5 text-[0.58rem] font-bold tracking-[0.14em] uppercase rounded-sm transition-all duration-200 flex items-center justify-center gap-2 bg-white text-[#0A0A0A] hover:bg-stone-200 group/btn"
          >
            {product.digital ? "Get Download" : "Add to Cart"}
            <svg
              viewBox="0 0 12 12"
              className="w-2.5 h-2.5 stroke-current transition-transform duration-200 group-hover/btn:translate-x-0.5"
              strokeWidth="2.5" strokeLinecap="round" fill="none"
            >
              <line x1="2" y1="6" x2="10" y2="6"/><polyline points="7,3 10,6 7,9"/>
            </svg>
          </button>
        </div>

        {/* Left accent bar on hover */}
        <div className="absolute top-0 left-0 w-[2px] h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
      </div>

      {/* Modal */}
      {modalOpen && <ProductModal product={product} onClose={closeModal} />}
    </>
  );
}