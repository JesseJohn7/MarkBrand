"use client";
import Image from "next/image";
import { useCart } from "./Cart";
import { formatPrice, type Product } from "./Products";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  return (
    <div className="group relative bg-[#5c3d2e] border border-stone-800/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:border-stone-600 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image src={product.image} alt={product.name} fill
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"/>

        {/* Dark gradient overlay on hover */}
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

        {/* Add to cart */}
        <button
          onClick={() => add(product)}
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
      <div className="absolute top-0 left-0 w-[2px] h-full bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"/>
    </div>
  );
}