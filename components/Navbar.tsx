"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const NAV_LINKS = [
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
            ? "bg-[#0D0D0D]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(200,151,58,0.2),0_8px_32px_rgba(0,0,0,0.5)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="#home" className="flex flex-col leading-none group flex-shrink-0">
            <span
              className="font-bold text-2xl tracking-wide text-[#C8973A] group-hover:text-[#E5B96A] transition-colors duration-200"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Mark<span className="text-[#C8973A]">Brand</span>
            </span>
            <span className="text-[0.58rem] tracking-[0.28em] uppercase text-stone-500 mt-0.5 group-hover:text-[#C8973A] transition-colors duration-200">
              Group Nigeria
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul
            ref={dropdownRef}
            className="hidden lg:flex items-center list-none m-0 p-0"
          >
            {NAV_LINKS.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                      aria-expanded={activeDropdown === item.label}
                      className="group flex items-center gap-1 px-4 py-2 text-xs font-medium tracking-widest uppercase relative text-stone-400 hover:text-stone-300 transition-colors duration-200"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        stroke="currentColor"
                        fill="none"
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <polyline points="2,4 6,8 10,4" />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-px bg-[#C8973A] transition-transform duration-300 origin-left ${
                          activeDropdown === item.label
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      className={`absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 min-w-[210px] bg-[#1A1A1A] backdrop-blur-xl border border-[#C8973A]/20 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] py-2 z-50 transition-all duration-200 ${
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1.5 pointer-events-none"
                      }`}
                    >
                      {/* Arrow tip */}
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A1A1A] border-l border-t border-[#C8973A]/20 rotate-45" />

                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group/sub flex items-center gap-2.5 px-5 py-2.5 text-xs tracking-wide text-stone-400 hover:text-stone-300 hover:bg-[#C8973A]/10 transition-all duration-150"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#C8973A] opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="group relative flex items-center px-4 py-2 text-xs font-medium tracking-widest uppercase text-stone-400 hover:text-stone-300 transition-colors duration-200"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-[#C8973A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="#contact"
              className="hidden lg:inline-flex items-center px-5 py-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase text-[#0D0D0D] bg-[#C8973A] rounded-sm border border-[#C8973A] hover:bg-[#E5B96A] hover:shadow-[0_0_20px_rgba(200,151,58,0.35)] transition-all duration-200 flex-shrink-0"
            >
              Let's Talk
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="lg:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-0"
            >
              <span
                className={`block h-px bg-stone-100 rounded-sm transition-all duration-300 origin-center ${
                  menuOpen
                    ? "w-[26px] translate-y-[6px] rotate-45"
                    : "w-[26px]"
                }`}
              />
              <span
                className={`block h-px bg-stone-100 rounded-sm transition-all duration-300 ${
                  menuOpen ? "opacity-0 w-0" : "opacity-100 w-[18px]"
                }`}
              />
              <span
                className={`block h-px bg-stone-100 rounded-sm transition-all duration-300 origin-center ${
                  menuOpen
                    ? "w-[26px] -translate-y-[6px] -rotate-45"
                    : "w-[26px]"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 bg-black/65 z-[9997] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`lg:hidden fixed top-0 right-0 h-[100dvh] w-[min(340px,88vw)] bg-[#1A1A1A] border-l border-[#C8973A]/15 z-[9998] flex flex-col pt-20 pb-10 px-7 overflow-y-auto transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1">

          {NAV_LINKS.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label
                      )
                    }
                    aria-expanded={mobileExpanded === item.label}
                    className="flex items-center justify-between w-full py-3.5 border-b border-white/5 text-base font-medium tracking-wide text-stone-100 hover:text-[#E5B96A] transition-colors duration-200 text-left"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#9A9590"
                      fill="none"
                      className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <polyline points="2,4 6,8 10,4" />
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileExpanded === item.label ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2.5 pl-4 py-2.5 text-sm text-stone-400 hover:text-stone-300 border-b border-white/[0.04] transition-colors duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#C8973A] flex-shrink-0" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center py-3.5 border-b border-white/5 text-base font-medium tracking-wide text-stone-100 hover:text-[#E5B96A] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="mt-auto pt-8">
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center py-3.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#0D0D0D] bg-[#C8973A] rounded-sm hover:bg-[#E5B96A] transition-colors duration-200"
            >
              Let's Talk
            </Link>
          </div>

          <p className="mt-6 text-[0.62rem] tracking-[0.18em] uppercase text-stone-600 text-center">
            Marking You Out · Since 2014
          </p>
        </div>
      </div>
    </>
  );
}