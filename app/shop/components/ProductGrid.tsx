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
  const [searchFocused, setSearchFocused] = useState(false);

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

      {/* Filter bar */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 mb-12 px-4 py-3.5 rounded-2xl"
        style={{
          background: "#f7f4f0",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <svg
            viewBox="0 0 16 16"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none transition-colors duration-200"
            stroke={searchFocused ? "#c2410c" : "rgba(0,0,0,0.32)"}
            strokeWidth="1.5"
            fill="none"
          >
            <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
          </svg>
          <input
            type="text"
            placeholder="Search collection..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-9 py-2.5 text-[0.72rem] rounded-xl outline-none transition-all duration-200"
            style={{
              background: "#fff",
              border: `1.5px solid ${searchFocused ? "rgba(194,65,12,0.45)" : "rgba(0,0,0,0.09)"}`,
              color: "#111",
              fontFamily: "'DM Mono', monospace",
              boxShadow: searchFocused ? "0 0 0 3px rgba(194,65,12,0.08)" : "none",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full transition-all duration-150"
              style={{ background: "rgba(0,0,0,0.07)" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#111")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.07)")}
            >
              <svg viewBox="0 0 10 10" className="w-2 h-2" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none">
                <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort select — pushed to right */}
        <div className="relative sm:ml-auto">
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="appearance-none pl-3.5 pr-8 py-2.5 text-[0.65rem] rounded-xl outline-none cursor-pointer transition-all duration-200"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(0,0,0,0.09)",
              color: "rgba(0,0,0,0.6)",
              fontFamily: "'DM Mono', monospace",
            }}
            onFocus={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(194,65,12,0.4)";
              (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(194,65,12,0.07)";
            }}
            onBlur={e => {
              (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.09)";
              (e.target as HTMLElement).style.boxShadow = "none";
            }}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">A → Z</option>
          </select>
          <svg viewBox="0 0 8 8" className="absolute right-2.5 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none" stroke="rgba(0,0,0,0.35)" strokeWidth="2" fill="none">
            <polyline points="1,2 4,6 7,2" />
          </svg>
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-28 rounded-2xl"
          style={{ background: "#f7f4f0", border: "1.5px dashed rgba(0,0,0,0.1)" }}
        >
          <p
            className="text-xl font-black mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "rgba(0,0,0,0.4)" }}
          >
            Nothing found
          </p>
          <p className="text-[0.65rem] mb-7" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'DM Mono', monospace" }}>
            Try a different search term
          </p>
          <button
            onClick={() => setSearch("")}
            className="inline-flex items-center gap-2 px-6 py-3 text-[0.62rem] font-bold tracking-[0.16em] uppercase rounded-full transition-all duration-200"
            style={{
              background: "#0f0f0f",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#c2410c")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#0f0f0f")}
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