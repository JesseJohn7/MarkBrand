"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./Cart";

export default function ShopNavbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { totalItems, openCart }  = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#3b2318]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] py-2"
          : "bg-[#2e1a10] border-b border-[#5c3d2e]/60 py-3"
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">

          {/* Back to main site */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-stone-400 group-hover:stroke-amber-300 group-hover:-translate-x-0.5 transition-all" strokeWidth="2" strokeLinecap="round" fill="none">
              <line x1="10" y1="6" x2="2" y2="6"/><polyline points="5,3 2,6 5,9"/>
            </svg>
            <span className="hidden sm:inline text-[0.5rem] tracking-[0.3em] uppercase text-stone-200 group-hover:text-amber-300 transition-colors">
              Main Site
            </span>
          </Link>

          {/* Wordmark */}
          <Link href="/shop" className="flex flex-col items-center group">
            <span className="font-[Cormorant_Garamond,serif] text-xl sm:text-2xl font-bold text-stone-100 leading-none group-hover:text-amber-200 transition-colors">
              Markbrand
            </span>
            <span className="text-[0.4rem] tracking-[0.45em] uppercase text-amber-400/80 mt-0.5">Shop</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <Link href="/shop" className="hidden md:block text-[0.52rem] tracking-[0.28em] uppercase text-stone-200 hover:text-amber-300 transition-colors">
              Products
            </Link>
            <Link href="/shop/checkout" className="hidden md:block text-[0.52rem] tracking-[0.28em] uppercase text-stone-200 hover:text-amber-300 transition-colors">
              Checkout
            </Link>

            {/* Cart icon */}
            <button onClick={openCart} aria-label="Open cart" className="relative text-stone-400 hover:text-amber-300 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-amber-400 text-[#2e1a10] text-[0.42rem] font-bold flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button onClick={() => setMenuOpen(p => !p)} aria-label="Menu" className="md:hidden flex flex-col gap-[5px] items-center justify-center w-6">
              <span className={`block h-[2px] w-5 bg-stone-400 rounded transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}/>
              <span className={`block h-[2px] bg-stone-400 rounded transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-3"}`}/>
              <span className={`block h-[2px] w-5 bg-stone-400 rounded transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}/>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div className={`md:hidden fixed inset-0 bg-[#2e1a10] z-[49] flex flex-col items-center justify-center gap-8 transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        {[
          { href:"/shop",          label:"Products" },
          { href:"/shop/checkout", label:"Checkout" },
          { href:"/",              label:"← Main Site" },
        ].map(l => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
            className="text-sm tracking-[0.3em] uppercase text-stone-300 hover:text-amber-300 transition-colors">
            {l.label}
          </Link>
        ))}
        <button onClick={() => { openCart(); setMenuOpen(false); }}
          className="text-sm tracking-[0.3em] uppercase text-amber-400">
          Cart ({totalItems})
        </button>
      </div>
    </>
  );
}