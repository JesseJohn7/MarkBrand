"use client";
import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { PRODUCTS, CATEGORIES, type Category, type SubCategory } from "./Products";

const PRICE_RANGES = [
  { label: "Under ₦5,000",       min: 0,     max: 5000      },
  { label: "₦5,000 – ₦15,000",  min: 5000,  max: 15000     },
  { label: "₦15,000 – ₦30,000", min: 15000, max: 30000     },
  { label: "₦30,000 – ₦60,000", min: 30000, max: 60000     },
  { label: "Above ₦60,000",      min: 60000, max: Infinity  },
];

const BADGE_FILTERS = ["Bestseller", "New", "Sale", "Popular"] as const;

/* ── FilterSection accordion ──────────────────────────────────────────── */
function FilterSection({
  title,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-stone-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-[0.6rem] font-black tracking-[0.18em] uppercase text-stone-700 hover:text-stone-900 transition-colors"
      >
        {title}
        <svg
          viewBox="0 0 12 12"
          className={`w-3 h-3 stroke-current transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        >
          <polyline points="2,4 6,8 10,4" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? "max-h-[600px] pb-3" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

/* ── FilterChip ────────────────────────────────────────────────────────── */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A0A] text-white text-[0.55rem] font-bold tracking-[0.1em] uppercase rounded-full">
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity">
        <svg viewBox="0 0 10 10" className="w-2 h-2 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
          <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
        </svg>
      </button>
    </span>
  );
}

/* ── SidebarFilters (standalone component, NOT nested inside ProductGrid) */
interface SidebarFiltersProps {
  activeCategory:    "all" | Category;
  activeSubCategory: SubCategory | "all";
  activePriceRange:  number | null;
  activeBadges:      string[];
  expandedSections:  string[];
  onCategoryClick:   (cat: "all" | Category) => void;
  onSubCategory:     (sub: SubCategory | "all") => void;
  onPriceRange:      (i: number | null) => void;
  onToggleBadge:     (b: string) => void;
  onToggleSection:   (s: string) => void;
  onClearAll:        () => void;
  activeFilterCount: number;
}

function SidebarFilters({
  activeCategory,
  activeSubCategory,
  activePriceRange,
  activeBadges,
  expandedSections,
  onCategoryClick,
  onSubCategory,
  onPriceRange,
  onToggleBadge,
  onToggleSection,
  onClearAll,
  activeFilterCount,
}: SidebarFiltersProps) {
  const currentCatData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col gap-1">

      {/* ── CATEGORIES ── */}
      <FilterSection
        title="Category"
        expanded={expandedSections.includes("category")}
        onToggle={() => onToggleSection("category")}
      >
        <ul className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <li key={cat.id}>
              <button
                onClick={() => onCategoryClick(cat.id as "all" | Category)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-sm text-[0.65rem] font-medium transition-all duration-150 ${
                  activeCategory === cat.id
                    ? "bg-[#0A0A0A] text-white"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[0.55rem] text-stone-400">
                  {cat.id === "all"
                    ? PRODUCTS.length
                    : PRODUCTS.filter(p => p.category === cat.id).length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* ── SUB-CATEGORIES ── */}
      {currentCatData && currentCatData.subCategories.length > 0 && (
        <FilterSection
          title={currentCatData.label}
          expanded={expandedSections.includes("subcategory")}
          onToggle={() => onToggleSection("subcategory")}
        >
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => onSubCategory("all")}
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-sm text-[0.65rem] transition-all duration-150 ${
                  activeSubCategory === "all"
                    ? "bg-[#0A0A0A] text-white font-semibold"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                <span>All {currentCatData.label}</span>
                <span className="text-[0.55rem] text-stone-400">
                  {PRODUCTS.filter(p => p.category === activeCategory).length}
                </span>
              </button>
            </li>
            {currentCatData.subCategories.map(sub => (
              <li key={sub.id}>
                <button
                  onClick={() => onSubCategory(sub.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-sm text-[0.65rem] transition-all duration-150 ${
                    activeSubCategory === sub.id
                      ? "bg-[#0A0A0A] text-white font-semibold"
                      : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                  }`}
                >
                  <span>{sub.label}</span>
                  <span className="text-[0.55rem] text-stone-400">
                    {PRODUCTS.filter(p => p.category === activeCategory && p.subCategory === sub.id).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      {/* ── PRICE RANGE ── */}
      <FilterSection
        title="Price Range"
        expanded={expandedSections.includes("price")}
        onToggle={() => onToggleSection("price")}
      >
        <ul className="space-y-0.5">
          {PRICE_RANGES.map((r, i) => (
            <li key={r.label}>
              <button
                onClick={() => onPriceRange(activePriceRange === i ? null : i)}
                className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-sm text-[0.65rem] transition-all duration-150 ${
                  activePriceRange === i
                    ? "bg-[#0A0A0A] text-white font-semibold"
                    : "text-stone-500 hover:bg-stone-100 hover:text-stone-800"
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    activePriceRange === i ? "border-white bg-white" : "border-stone-300"
                  }`}
                >
                  {activePriceRange === i && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
                  )}
                </span>
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </FilterSection>

      {/* ── OFFERS / BADGES ── */}
      <FilterSection
        title="Offers & Tags"
        expanded={expandedSections.includes("badge")}
        onToggle={() => onToggleSection("badge")}
      >
        <div className="flex flex-wrap gap-2 px-3">
          {BADGE_FILTERS.map(b => (
            <button
              key={b}
              onClick={() => onToggleBadge(b)}
              className={`px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.1em] uppercase rounded-sm border transition-all duration-150 ${
                activeBadges.includes(b)
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-700"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <button
          onClick={onClearAll}
          className="mx-3 mt-2 py-2 text-[0.6rem] font-bold tracking-[0.14em] uppercase text-red-500 border border-red-200 rounded-sm hover:bg-red-50 transition-colors duration-150"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

/* ── ProductGrid (main export) ─────────────────────────────────────────── */
export default function ProductGrid() {
  const [activeCategory,    setActiveCategory]    = useState<"all" | Category>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<SubCategory | "all">("all");
  const [activePriceRange,  setActivePriceRange]  = useState<number | null>(null);
  const [activeBadges,      setActiveBadges]      = useState<string[]>([]);
  const [search,            setSearch]            = useState("");

  const [searchFocused,     setSearchFocused]     = useState(false);
  const [sidebarOpen,       setSidebarOpen]       = useState(false);
  const [expandedSections,  setExpandedSections]  = useState<string[]>(["category", "subcategory", "price", "badge"]);

  const toggleSection = (s: string) =>
    setExpandedSections(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const toggleBadge = (b: string) =>
    setActiveBadges(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);

  const handleCategoryClick = (cat: "all" | Category) => {
    setActiveCategory(cat);
    setActiveSubCategory("all");
  };

  const activeFilterCount =
    (activeCategory !== "all" ? 1 : 0) +
    (activeSubCategory !== "all" ? 1 : 0) +
    (activePriceRange !== null ? 1 : 0) +
    activeBadges.length;

  const clearAll = () => {
    setActiveCategory("all");
    setActiveSubCategory("all");
    setActivePriceRange(null);
    setActiveBadges([]);
    setSearch("");
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS
      .filter(p => activeCategory === "all" || p.category === activeCategory)
      .filter(p => activeSubCategory === "all" || p.subCategory === activeSubCategory)
      .filter(p => {
        if (activePriceRange === null) return true;
        const r = PRICE_RANGES[activePriceRange];
        return p.price >= r.min && p.price < r.max;
      })
      .filter(p => activeBadges.length === 0 || (p.badge && activeBadges.includes(p.badge)))
      .filter(p =>
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );

    return list;
  }, [activeCategory, activeSubCategory, activePriceRange, activeBadges, search]);

  /* shared props for SidebarFilters */
  const sidebarProps: SidebarFiltersProps = {
    activeCategory,
    activeSubCategory,
    activePriceRange,
    activeBadges,
    expandedSections,
    activeFilterCount,
    onCategoryClick:  handleCategoryClick,
    onSubCategory:    setActiveSubCategory,
    onPriceRange:     setActivePriceRange,
    onToggleBadge:    toggleBadge,
    onToggleSection:  toggleSection,
    onClearAll:       clearAll,
  };

  const currentCatData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12">

      {/* ── TOP BAR ── */}
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 px-4 py-3 rounded-xl border"
        style={{
          background: "#f7f4f0",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {/* Mobile filter button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 px-3.5 py-2.5 bg-[#0A0A0A] text-white rounded-lg text-[0.65rem] font-bold tracking-[0.12em] uppercase shrink-0"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current" strokeWidth="1.8" strokeLinecap="round" fill="none">
            <line x1="2" y1="4" x2="14" y2="4" />
            <line x1="4" y1="8" x2="12" y2="8" />
            <line x1="6" y1="12" x2="10" y2="12" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-white text-[#0A0A0A] rounded-full w-4 h-4 flex items-center justify-center text-[0.5rem] font-black">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Search */}
        <div className="flex flex-1 max-w-2xl">
          <div className="relative flex-1">
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
              placeholder="Search products, categories, keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full pl-9 pr-9 py-2.5 text-[0.72rem] rounded-l-xl outline-none transition-all duration-200"
              style={{
                background: "#fff",
                border: `1.5px solid ${searchFocused ? "rgba(194,65,12,0.45)" : "rgba(0,0,0,0.09)"}`,
                borderRight: "none",
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
              >
                <svg viewBox="0 0 10 10" className="w-2 h-2" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none">
                  <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
                </svg>
              </button>
            )}
          </div>
          {/* Search button */}
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-5 py-2.5 text-[0.65rem] font-bold tracking-[0.14em] uppercase rounded-r-xl shrink-0 transition-all duration-200"
            style={{
              background: searchFocused ? "#c2410c" : "#0f0f0f",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
            }}
            onMouseEnter={e => { if (!searchFocused) (e.currentTarget as HTMLElement).style.background = "#c2410c"; }}
            onMouseLeave={e => { if (!searchFocused) (e.currentTarget as HTMLElement).style.background = "#0f0f0f"; }}
          >
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 stroke-current" strokeWidth="1.8" fill="none">
              <circle cx="7" cy="7" r="4.5" /><line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
            </svg>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>


      </div>

      {/* ── ACTIVE FILTER CHIPS ── */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {activeCategory !== "all" && (
            <FilterChip
              label={CATEGORIES.find(c => c.id === activeCategory)?.label ?? ""}
              onRemove={() => handleCategoryClick("all")}
            />
          )}
          {activeSubCategory !== "all" && currentCatData && (
            <FilterChip
              label={currentCatData.subCategories.find(s => s.id === activeSubCategory)?.label ?? ""}
              onRemove={() => setActiveSubCategory("all")}
            />
          )}
          {activePriceRange !== null && (
            <FilterChip
              label={PRICE_RANGES[activePriceRange].label}
              onRemove={() => setActivePriceRange(null)}
            />
          )}
          {activeBadges.map(b => (
            <FilterChip key={b} label={b} onRemove={() => toggleBadge(b)} />
          ))}
          <button
            onClick={clearAll}
            className="text-[0.55rem] font-bold tracking-[0.12em] uppercase text-red-500 hover:text-red-700 transition-colors px-1"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-6">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden lg:block w-56 shrink-0 self-start sticky top-24" style={{ maxHeight: "calc(100vh - 7rem)" }}>
          <div className="bg-white border border-stone-100 rounded-xl overflow-hidden shadow-sm flex flex-col" style={{ maxHeight: "calc(100vh - 7rem)" }}>
            {/* Fixed header */}
            <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between shrink-0">
              <span className="text-[0.6rem] font-black tracking-[0.2em] uppercase text-stone-800">Filters</span>
              {activeFilterCount > 0 && (
                <span className="text-[0.5rem] font-bold text-stone-400">{activeFilterCount} active</span>
              )}
            </div>
            {/* Scrollable filter body */}
            <div
              className="flex-1 overflow-y-auto py-2 scrollbar-thin"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0,0,0,0.12) transparent",
              }}
            >
              <SidebarFilters {...sidebarProps} />
            </div>
          </div>
        </aside>

        {/* ── MOBILE DRAWER ── */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative ml-auto w-[min(320px,88vw)] h-full bg-white shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                <span className="text-[0.65rem] font-black tracking-[0.2em] uppercase text-stone-800">
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current text-stone-500"
                    strokeWidth="2.2" strokeLinecap="round" fill="none">
                    <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-3">
                <SidebarFilters {...sidebarProps} />
              </div>
              <div className="px-4 py-4 border-t border-stone-100">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full py-3 bg-[#0A0A0A] text-white text-[0.65rem] font-bold tracking-[0.14em] uppercase rounded-lg"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCT GRID ── */}
        <section className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div
              className="text-center py-28 rounded-2xl"
              style={{ background: "#f7f4f0", border: "1.5px dashed rgba(0,0,0,0.1)" }}
            >
              <p className="text-xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "rgba(0,0,0,0.4)" }}>
                Nothing found
              </p>
              <p className="text-[0.65rem] mb-7" style={{ color: "rgba(0,0,0,0.3)", fontFamily: "'DM Mono', monospace" }}>
                Try a different search or filter
              </p>
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-6 py-3 text-[0.62rem] font-bold tracking-[0.16em] uppercase rounded-full bg-[#0f0f0f] text-white hover:bg-[#c2410c] transition-colors duration-200"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}