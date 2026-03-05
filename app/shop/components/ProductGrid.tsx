"use client";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS, type Category } from "./Products";

interface Props {
  activeCategory: "all" | Category;
}

export default function ProductGrid({ activeCategory }: Props) {
  const [search, setSearch] = useState("");
  const [sort,   setSort]   = useState("default");

  const filtered = useMemo(() => {
    let list = PRODUCTS
      .filter(p => activeCategory === "all" || p.category === activeCategory)
      .filter(p => !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()));
    if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc")   list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, search, sort]);

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-10 sm:py-14">

      {/* ── Filter bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-10">

        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg viewBox="0 0 16 16" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 stroke-stone-400" strokeWidth="1.5" fill="none">
            <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="13.5" y2="13.5"/>
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-stone-600 rounded-sm pl-9 pr-3 py-2.5 text-[0.7rem] text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-white transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
            >
              <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2" fill="none">
                <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
              </svg>
            </button>
          )}
        </div>

        {/* Count + Sort */}
        <div className="flex items-center gap-4 sm:ml-auto">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-stone-400 font-medium">
            <span className="text-white font-bold">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
          </p>

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-[#1a1a1a] border border-stone-600 rounded-sm px-3 py-2.5 text-[0.65rem] font-medium text-stone-200 focus:outline-none focus:border-white cursor-pointer transition-colors"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">A → Z</option>
          </select>
        </div>
      </div>

      {/* ── Grid or empty state ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-stone-800 rounded-sm">
          <p className="text-stone-300 text-sm font-medium mb-2">No products found</p>
          <p className="text-stone-600 text-xs mb-6">Try a different search term</p>
          <button
            onClick={() => setSearch("")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-white hover:bg-stone-200 rounded-sm transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  );
}