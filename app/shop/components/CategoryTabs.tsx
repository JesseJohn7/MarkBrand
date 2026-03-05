"use client";
import { CATEGORIES, PRODUCTS, type Category } from "./Products";

interface Props {
  active: "all" | Category;
  onChange: (cat: "all" | Category) => void;
}

export default function CategoryTabs({ active, onChange }: Props) {
  return (
    <div className="sticky top-[52px] z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-stone-800/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
        <div className="flex min-w-max">
          {CATEGORIES.map(cat => {
            const count = cat.id === "all"
              ? PRODUCTS.length
              : PRODUCTS.filter(p => p.category === cat.id).length;
            const isActive = active === cat.id;
            return (
              <button key={cat.id}
                onClick={() => onChange(cat.id as "all" | Category)}
                className={`px-4 sm:px-6 py-4 text-[0.5rem] tracking-[0.26em] uppercase font-medium border-b-2 transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  isActive ? "border-[#00ff64] text-[#00ff64]" : "border-transparent text-stone-500 hover:text-stone-300"
                }`}>
                {cat.label}
                <span className={`text-[0.4rem] px-1.5 py-0.5 rounded-sm font-bold transition-colors ${
                  isActive ? "bg-[#00ff64]/15 text-[#00ff64]" : "bg-stone-800 text-stone-600"
                }`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}