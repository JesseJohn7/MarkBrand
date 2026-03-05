"use client";

import { useState } from "react";
import CategoryTabs from "./components/CategoryTabs";
import ProductGrid  from "./components/ProductGrid";
import type { Category } from "./components/Products";

// Marquee strip — inline since it's tiny
function Marquee() {
  const ITEMS = [
    "Branded Merchandise","Custom Print Jobs","Fashion & Apparel",
    "Digital Products","Fast Turnaround","Quality Guaranteed",
    "Marking You Out!","Nigeria's Branding Experts",
  ];
  return (
    <div className="relative border-y border-stone-800/50 bg-[#0D0D0D] overflow-hidden py-3.5">
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none"/>
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none"/>
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
        {[0,1].flatMap(a => ITEMS.map((t,i) => (
          <span key={`${a}-${i}`} className="flex items-center gap-4 shrink-0">
            <span className={`text-[0.54rem] tracking-[0.35em] uppercase font-medium ${i%3===0 ? "text-[#00ff64]" : "text-stone-500"}`}>{t}</span>
            <span className="w-1 h-1 rounded-full bg-stone-700 shrink-0"/>
          </span>
        )))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | Category>("all");

  return (
    <>
      {/* 1 — Hero with category shortcut buttons */}
      

      {/* 2 — Scrolling marquee */}
      <Marquee />

      {/* 3 — Sticky category tabs */}
      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {/* 4 — Product grid with search + sort */}
      <ProductGrid activeCategory={activeCategory} />
    </>
  );
}