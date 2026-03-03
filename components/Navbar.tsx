"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Our Services", href: "#services" },
  { label: "Branding", href: "#branding" },
  {
    label: "Subsidiaries",
    href: "#subsidiaries",
    dropdown: [
      { label: "MarkStudio", href: "#markstudio" },
      { label: "MarkTV", href: "#marktv" },
      { label: "MarkWash", href: "#markwash" },
      { label: "MarkJoels", href: "#markjoels" },
      { label: "MarkFilms", href: "#markfilms" },
      { label: "Swift Trading Academy", href: "#swift" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  };

  return (
    <>
      {/* Gold accent top bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-0.5 z-[10000] bg-gradient-to-r from-transparent via-[#C8973A] to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(200,151,58,0.2),0_8px_32px_rgba(0,0,0,0.5)] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="#home" onClick={handleNavClick} className="flex items-center flex-shrink-0 group">
            <Image
              src="/logo.png"
              alt="MarkBrand Group Nigeria"
              width={140}
              height={48}
              className="h-11 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul ref={dropdownRef} className="hidden lg:flex items-center list-none m-0 p-0">
            {NAV_LINKS.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown(activeDropdown === item.label ? null : item.label)
                      }
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                      className="group flex items-center gap-1 px-4 py-2 text-xs font-medium tracking-widest uppercase relative text-[#00ff64] hover:text-[#00ff64]/60 transition-colors duration-200"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" stroke="currentColor" fill="none"
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <polyline points="2,4 6,8 10,4" />
                      </svg>
                      <span className={`absolute bottom-0 left-4 right-4 h-px bg-[#00ff64] transition-transform duration-300 origin-left ${
                        activeDropdown === item.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                    </button>

                    {/* Dropdown */}
                    <div
                      role="menu"
                      className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[210px] bg-[#111111] border border-[#C8973A]/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.7)] py-2 z-50 transition-all duration-200 ${
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1.5 pointer-events-none"
                      }`}
                    >
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111111] border-l border-t border-[#C8973A]/20 rotate-45" />
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          role="menuitem"
                          onClick={handleNavClick}
                          className="group/sub flex items-center gap-2.5 px-5 py-2.5 text-xs tracking-wide text-[#00ff64] hover:text-[#00ff64]/60 hover:bg-black/40 transition-all duration-150"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#00ff64] opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className="group relative flex items-center px-4 py-2 text-xs font-medium tracking-widest uppercase text-[#00ff64] hover:text-[#00ff64]/60 transition-colors duration-200"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-[#00ff64] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              onClick={handleNavClick}
              className="hidden lg:inline-flex items-center px-5 py-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#0D0D0D] bg-[#C8973A] rounded-sm border border-[#C8973A] hover:bg-[#7A5518] hover:border-[#7A5518] transition-all duration-200 flex-shrink-0"
            >
              Let&apos;s Talk
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-11 h-11 bg-[#C8973A] rounded-sm cursor-pointer hover:bg-[#7A5518] transition-colors duration-200 flex-shrink-0"
            >
              <span className={`block h-[2px] w-5 bg-[#0D0D0D] rounded-full transition-all duration-300 origin-center ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`} />
              <span className={`block h-[2px] bg-[#0D0D0D] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "opacity-100 w-3"}`} />
              <span className={`block h-[2px] w-5 bg-[#0D0D0D] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 bg-black/70 z-[9997] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed top-0 right-0 h-[100dvh] w-[min(320px,85vw)] bg-[#0D0D0D] border-l-2 border-[#C8973A]/40 z-[9998] flex flex-col pt-20 pb-10 px-7 overflow-y-auto transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer logo */}
        <div className="absolute top-5 left-7">
          <Link href="#home" onClick={handleNavClick}>
            <Image
              src="/logo.jpg"
              alt="MarkBrand Group Nigeria"
              width={110}
              height={38}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-col flex-1">
          {NAV_LINKS.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    aria-expanded={mobileExpanded === item.label}
                    className="flex items-center justify-between w-full py-4 border-b border-stone-800 text-sm font-medium tracking-widest uppercase text-[#00ff64] hover:text-[#00ff64]/60 transition-colors duration-200 text-left"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" stroke="currentColor" fill="none"
                      className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <polyline points="2,4 6,8 10,4" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileExpanded === item.label ? "max-h-96" : "max-h-0"
                  }`}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={handleNavClick}
                        className="flex items-center gap-3 pl-4 py-3 text-xs tracking-widest uppercase text-[#00ff64]/70 hover:text-[#00ff64]/40 border-b border-stone-800/50 transition-colors duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#00ff64] flex-shrink-0" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center py-4 border-b border-stone-800 text-sm font-medium tracking-widest uppercase text-[#00ff64] hover:text-[#00ff64]/60 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          <div className="mt-auto pt-8">
            <Link
              href="#contact"
              onClick={handleNavClick}
              className="block text-center py-3.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#0D0D0D] bg-[#C8973A] rounded-sm hover:bg-[#7A5518] transition-colors duration-200"
            >
              Let&apos;s Talk
            </Link>
          </div>

          <p className="mt-6 text-[0.6rem] tracking-[0.2em] uppercase text-stone-700 text-center">
            Marking You Out &middot; Since 2014
          </p>
        </div>
      </div>
    </>
  );
}