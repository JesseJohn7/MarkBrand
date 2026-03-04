"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
        @keyframes kenBurns  { from { transform:scale(1); } to { transform:scale(1.07); } }
        @keyframes pulseLine { 0%,100% { opacity:0.6; } 50% { opacity:0.15; } }
        @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        .hero-img  { animation: kenBurns 14s ease-out both; }
        .fadeUp    { animation: fadeUp    0.85s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeRight { animation: fadeRight 0.85s cubic-bezier(0.4,0,0.2,1) both; }
        .pulse-ln  { animation: pulseLine 2.2s ease-in-out infinite; }

        .shimmer-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);
          transform:translateX(-100%); transition:transform 0.55s ease;
        }
        .shimmer-btn:hover::after { transform:translateX(100%); }
      `}</style>

      <section className="sans relative min-h-screen flex items-end overflow-hidden bg-[#0A0A0A]">

        {/* ── BG IMAGE ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="Markbrand hero"
          className="hero-img absolute inset-0 w-full h-full object-cover object-center opacity-40"
        />

        {/* ── LAYERED OVERLAYS ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[520px] h-[320px] bg-[#00ff64]/6 blur-[130px] pointer-events-none" />

        {/* ── TOP-RIGHT FLOATING STAT ── */}
        <div
          className={`absolute top-32 right-8 lg:right-16 text-right ${isLoaded ? "fadeRight" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-[0.52rem] tracking-[0.35em] uppercase text-[#00ff64]/70 mb-1">Adamawa, Nigeria</p>
          <p className="serif text-5xl font-bold text-[#00ff64] leading-none">10+</p>
          <p className="text-[0.52rem] tracking-[0.2em] uppercase text-stone-500 mt-1">Years of Excellence</p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-28 pt-48">

          <div
            className={`flex items-center gap-3 mb-5 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <span className="h-px w-8 bg-[#00ff64]" />
            <span className="text-[0.56rem] tracking-[0.4em] uppercase text-[#00ff64]">
              Commercial Printing &amp; Branding
            </span>
          </div>

          <h1
            className={`serif leading-[1.0] mb-6 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.35s" }}
          >
            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] font-bold text-stone-100">
              Marking You
            </span>
            <span className="block text-[clamp(3.2rem,9vw,7.5rem)] font-bold italic text-[#00ff64]">
              Out.
            </span>
          </h1>

          <p
            className={`text-sm text-stone-300/70 max-w-md leading-relaxed mb-8 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            Adamawa's most respected commercial printing and branding powerhouse — over a decade of excellence, innovation, and true partnership.
          </p>

          <div
            className={`flex flex-wrap gap-2.5 mb-10 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.62s" }}
          >
            {["Est. 2014", "Adamawa, Nigeria", "6 Subsidiaries"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[0.55rem] tracking-[0.2em] uppercase border border-stone-700 text-stone-400 bg-black/30 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`flex flex-wrap items-center gap-4 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.75s" }}
          >
            <a
              href="#contact"
              className="shimmer-btn relative overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] hover:bg-[#00e85a] transition-colors duration-200 shadow-[0_4px_24px_rgba(0,255,100,0.3)] rounded-sm"
            >
              Start a Project
              <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
              </svg>
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#00ff64] hover:text-[#00e85a] transition-colors duration-200"
            >
              View Our Work
              <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-11" />
            </a>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 ${isLoaded ? "fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "1.1s" }}
        >
          <span className="text-[0.48rem] tracking-[0.4em] uppercase text-stone-600">Scroll</span>
          <div className="pulse-ln w-px h-9 bg-gradient-to-b from-[#00ff64]/60 to-transparent" />
        </div>

        {/* ── BOTTOM STAT STRIP ── */}
        <div
          className={`absolute bottom-0 right-0 hidden lg:grid grid-cols-3 divide-x divide-stone-800/60 border-t border-l border-stone-800/50 backdrop-blur-md bg-[#0A0A0A]/50 ${isLoaded ? "fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.9s" }}
        >
          {[
            { value: "200+", label: "Satisfied Clients" },
            { value: "1500+", label: "Projects Delivered" },
            { value: "6",    label: "Subsidiaries" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center px-8 py-4">
              <span className="serif text-2xl font-bold text-[#00ff64] leading-none mb-1">{s.value}</span>
              <span className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── VERTICAL SIDE LABEL ── */}
        <div
          className={`absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 ${isLoaded ? "fadeRight" : "opacity-0"}`}
          style={{ animationDelay: "1s" }}
        >
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-[#00ff64]/25 to-transparent" />
          <span className="text-stone-600 text-[0.48rem] tracking-[0.35em] uppercase" style={{ writingMode: "vertical-rl" }}>
            Premium Brand Studio
          </span>
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-[#00ff64]/25 to-transparent" />
        </div>

      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="sans border-y border-stone-800/60 py-3.5 bg-[#0D0D0D] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, arr) =>
            ["Commercial Printing", "Creative Branding", "Photography", "Media Production", "Fashion & Tailoring", "Digital Education", "Marking You Out!", "The World Is Your Market"].map((item, i) => (
              <span key={`${arr}-${item}-${i}`} className="flex items-center gap-5 text-[0.55rem] tracking-[0.35em] uppercase text-stone-600 flex-shrink-0">
                {item}<span className="w-1 h-1 rounded-full bg-[#00ff64]/40 flex-shrink-0" />
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}