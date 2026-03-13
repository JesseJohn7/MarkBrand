"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type SubLink = { label: string; href: string };
type NavLink = { label: string; href: string; dropdown?: SubLink[] };

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  {
    label: "About",
    href: "#about",
    dropdown: [
      { label: "Our Story", href: "#about" },
      { label: "Our Team",  href: "/team" },
      { label: "Gallery",   href: "#gallery" },
    ],
  },
  { label: "Our Services", href: "#services" },
  {
    label: "Subsidiaries",
    href: "#subsidiaries",
    dropdown: [
      { label: "MarkStudio",            href: "#markstudio" },
      { label: "MarkTV",                href: "#marktv" },
      { label: "MarkWash",              href: "#markwash" },
      { label: "MarkJoels",             href: "#markjoels" },
      { label: "MarkFilms",             href: "#markfilms" },
      { label: "Swift Trading Academy", href: "#swift" },
    ],
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const isHome   = pathname === "/";

  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleClick = (href: string) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);

    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    const id = href.replace("#", "");

    if (isHome) {
      setTimeout(() => scrollToSection(id), wasOpen ? 350 : 0);
    } else {
      router.push(`/#${id}`);
    }
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {/* Thin accent line — appears on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 h-[3px] z-[10000] bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_24px_rgba(0,0,0,0.08)] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">

          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0 group"
            aria-label="Home"
          >
            <Image
              src="/logo.png"
              alt="MarkBrand Group Nigeria"
              width={200}
              height={60}
              className="h-17 w-auto object-contain transition-opacity duration-200 group-hover:opacity-60"
              priority
            />
          </button>

          {/* Desktop links */}
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
                      className={`group flex items-center gap-1 px-4 py-2 text-xs font-semibold tracking-widest uppercase relative transition-colors duration-200 ${
                        scrolled
                          ? "text-stone-700 hover:text-emerald-600"
                          : "text-white/90 hover:text-white drop-shadow-sm"
                      }`}
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
                      >
                        <polyline points="2,4 6,8 10,4" />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-4 right-4 h-px transition-transform duration-300 origin-left ${
                          scrolled ? "bg-emerald-500" : "bg-white"
                        } ${
                          activeDropdown === item.label
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      role="menu"
                      className={`absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[200px] bg-white border border-stone-100 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-2 z-50 transition-all duration-200 ${
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1.5 pointer-events-none"
                      }`}
                    >
                      {/* Arrow tip */}
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-stone-100 rotate-45" />
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          type="button"
                          role="menuitem"
                          onClick={() => handleClick(sub.href)}
                          className="group/sub flex items-center gap-2.5 w-full text-left px-5 py-2.5 text-xs font-medium tracking-wide text-stone-600 hover:text-emerald-600 hover:bg-emerald-50/60 transition-all duration-150"
                        >
                          <span className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-150 flex-shrink-0" />
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleClick(item.href)}
                    className={`group relative flex items-center px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                      scrolled
                        ? "text-stone-700 hover:text-emerald-600"
                        : "text-white/90 hover:text-white drop-shadow-sm"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                        scrolled ? "bg-emerald-500" : "bg-white"
                      }`}
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className={`hidden lg:inline-flex items-center px-5 py-2 text-[0.72rem] font-semibold tracking-[0.12em] uppercase rounded-md transition-all duration-200 flex-shrink-0 ${
                scrolled
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm"
                  : "bg-white text-stone-800 hover:bg-emerald-500 hover:text-white shadow-md"
              }`}
            >
              Shop Now
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
              className={`lg:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 rounded-md cursor-pointer transition-colors duration-200 flex-shrink-0 ${
                scrolled
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              <span
                className={`block h-[2px] w-5 rounded-full transition-all duration-300 origin-center ${
                  scrolled ? "bg-white" : "bg-white"
                } ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  scrolled ? "bg-white" : "bg-white"
                } ${menuOpen ? "opacity-0 w-0" : "opacity-100 w-3"}`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full transition-all duration-300 origin-center ${
                  scrolled ? "bg-white" : "bg-white"
                } ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[9997] transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── MOBILE DRAWER ── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`lg:hidden fixed top-0 right-0 h-[100dvh] w-[min(320px,85vw)] bg-white border-l border-stone-100 shadow-2xl z-[9998] flex flex-col pt-20 pb-10 px-7 overflow-y-auto transition-transform duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Logo in drawer */}
        <div className="absolute top-5 left-7">
          <button type="button" onClick={handleLogoClick} aria-label="Home">
            <Image
              src="/logo.png"
              alt="MarkBrand Group Nigeria"
              width={110}
              height={38}
              className="h-9 w-auto object-contain"
            />
          </button>
        </div>

        {/* Close X */}
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="absolute top-5 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 transition-colors duration-150"
        >
          <svg viewBox="0 0 12 12" strokeWidth="2" strokeLinecap="round" stroke="currentColor" fill="none" className="w-3.5 h-3.5 text-stone-500">
            <line x1="2" y1="2" x2="10" y2="10" />
            <line x1="10" y1="2" x2="2" y2="10" />
          </svg>
        </button>

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
                    className="flex items-center justify-between w-full py-4 border-b border-stone-100 text-sm font-semibold tracking-widest uppercase text-stone-700 hover:text-emerald-600 transition-colors duration-200 text-left"
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="currentColor"
                      fill="none"
                      className={`w-3 h-3 transition-transform duration-200 flex-shrink-0 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
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
                      <button
                        key={sub.label}
                        type="button"
                        onClick={() => handleClick(sub.href)}
                        className="flex items-center gap-3 w-full text-left pl-4 py-3 text-xs font-medium tracking-widest uppercase text-stone-500 hover:text-emerald-600 border-b border-stone-50 transition-colors duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleClick(item.href)}
                  className="flex items-center w-full text-left py-4 border-b border-stone-100 text-sm font-semibold tracking-widest uppercase text-stone-700 hover:text-emerald-600 transition-colors duration-200"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}

          <div className="mt-auto pt-8">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-full px-5 py-3 text-[0.72rem] font-bold tracking-[0.12em] uppercase rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-200 shadow-sm"
            >
              Shop Now
            </Link>
          </div>

          <p className="mt-6 text-[0.6rem] tracking-[0.2em] uppercase text-stone-400 text-center">
            Marking You Out &middot; Since 2014
          </p>
        </div>
      </div>
    </>
  );
}