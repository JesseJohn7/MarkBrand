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
        @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes kenBurns  { from { transform:scale(1); } to { transform:scale(1.06); } }
        @keyframes pulseLine { 0%,100% { opacity:0.6; } 50% { opacity:0.15; } }
        @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }

        .hero-img  { animation: kenBurns 16s ease-out both; }
        .fadeUp    { animation: fadeUp    0.85s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeRight { animation: fadeRight 0.85s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft  { animation: fadeLeft  0.85s cubic-bezier(0.4,0,0.2,1) both; }
        .pulse-ln  { animation: pulseLine 2.2s ease-in-out infinite; }

        .shimmer-btn::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 50%,transparent 60%);
          transform:translateX(-100%); transition:transform 0.55s ease;
        }
        .shimmer-btn:hover::after { transform:translateX(100%); }

        .underline-green {
          position: relative;
          display: inline-block;
        }
        .underline-green::after {
          content: '';
          position: absolute;
          left: 0; bottom: -4px;
          width: 100%; height: 3px;
          background: #00ff64;
          border-radius: 2px;
        }
      `}</style>

      <section className="sans relative min-h-screen flex items-end overflow-hidden bg-[#0A0A0A]" id="home">

        {/* ── BG IMAGE ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/heroimg.jpg"
          alt="Markbrand hero"
          className="hero-img absolute inset-0 w-full h-full object-cover object-[center_20%]"
        />

        {/* ── OVERLAYS ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/75 via-[#0A0A0A]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff64]/12 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-[#0A1A0F]/55 via-transparent to-transparent" />

        {/* ── TOP-RIGHT FLOATING STAT ── */}
        <div
          className={`absolute top-32 right-8 lg:right-16 text-right ${isLoaded ? "fadeRight" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          {/* Bigger stat number + bolder label */}
          <p className="serif text-6xl lg:text-7xl font-bold text-[#00ff64] leading-none">10+</p>
          <p className="text-[0.65rem] tracking-[0.25em] uppercase text-stone-300 font-semibold mt-1.5">Years of Excellence</p>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 pb-20 lg:pb-32 pt-48">

          {/* eyebrow — bigger, bolder */}
          <div
            className={`flex items-center gap-3 mb-7 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <span className="h-px w-8 bg-[#00ff64]" />
            <span className="text-[0.7rem] tracking-[0.38em] uppercase text-[#00ff64] font-bold">
              Nigeria's Premier Branding &amp; Print Studio
            </span>
          </div>

          {/* ── HEADLINE — significantly larger + heavier ── */}
          <h1
            className={`serif leading-[1.0] mb-5 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            {/* line 1 */}
            <span className="block text-[clamp(3.4rem,9.5vw,8.2rem)] font-bold text-stone-100 tracking-tight" style={{ fontWeight: 700 }}>
              Your Brand Deserves
            </span>
            {/* line 2 — italic accent */}
            <span className="block text-[clamp(3.4rem,9.5vw,8.2rem)] font-bold italic text-[#00ff64] tracking-tight" style={{ fontWeight: 700 }}>
              To Be Unforgettable.
            </span>
          </h1>

          {/* sub-copy — bigger, brighter, heavier */}
          <p
            className={`text-[0.95rem] text-stone-200/90 max-w-xl leading-[1.9] mb-8 font-medium ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.5s" }}
          >
            We are <span className="text-white font-bold">Markbrand Nigeria Limited</span> — Nigeria's most trusted commercial printing and branding powerhouse. For over a decade, we've helped businesses, brands, and organisations{" "}
            <span className="text-[#00ff64] font-bold">stand out, speak louder,</span> and compete on a global stage.
          </p>

          {/* punchline — larger and more visible */}
          <p
            className={`text-[0.9rem] text-stone-300/90 max-w-lg leading-relaxed mb-10 font-medium ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.56s" }}
          >
            From world-class print to bold identity design — we don't just build brands, we build{" "}
            <em className="text-white not-italic font-bold">legacies.</em>
          </p>

          {/* tag pills — larger text, bolder, more visible */}
          <div
            className={`flex flex-wrap gap-2.5 mb-10 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.64s" }}
          >
            {["Est. 2014", "Adamawa, Nigeria", "6 Subsidiaries", "1500+ Projects"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-[0.65rem] tracking-[0.18em] uppercase border border-stone-600/80 text-stone-300 font-semibold bg-black/40 backdrop-blur-sm rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs — larger text */}
          <div
            className={`flex flex-wrap items-center gap-5 ${isLoaded ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.76s" }}
          >
            <a
              href="#contact"
              className="shimmer-btn relative overflow-hidden inline-flex items-center gap-3 px-9 py-4 text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#0A0A0A] bg-[#00ff64] hover:bg-[#00e85a] transition-colors duration-200 shadow-[0_4px_28px_rgba(0,255,100,0.35)] rounded-sm"
            >
              Start a Project
              <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
              </svg>
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#00ff64] hover:text-[#00e85a] transition-colors duration-200"
            >
              Explore Our Work
              <span className="block w-6 h-px bg-current transition-all duration-300 group-hover:w-12" />
            </a>
          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 ${isLoaded ? "fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "1.1s" }}
        >
          <span className="text-[0.55rem] tracking-[0.38em] uppercase text-stone-500 font-semibold">Scroll</span>
          <div className="pulse-ln w-px h-10 bg-gradient-to-b from-[#00ff64]/60 to-transparent" />
        </div>

        {/* ── BOTTOM STAT STRIP — bigger numbers and labels ── */}
        <div
          className={`absolute bottom-0 right-0 hidden lg:grid grid-cols-3 divide-x divide-stone-800/60 border-t border-l border-stone-800/50 backdrop-blur-md bg-[#0A0A0A]/65 ${isLoaded ? "fadeUp" : "opacity-0"}`}
          style={{ animationDelay: "0.95s" }}
        >
          {[
            { value: "200+",  label: "Satisfied Clients" },
            { value: "1500+", label: "Projects Delivered" },
            { value: "6",     label: "Subsidiaries" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center px-8 py-5">
              <span className="serif text-3xl font-bold text-[#00ff64] leading-none mb-1.5">{s.value}</span>
              <span className="text-[0.58rem] tracking-[0.2em] uppercase text-stone-400 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── VERTICAL SIDE LABEL ── */}
        <div
          className={`absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 ${isLoaded ? "fadeRight" : "opacity-0"}`}
          style={{ animationDelay: "1s" }}
        >
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-[#00ff64]/25 to-transparent" />
          <span className="text-stone-500 text-[0.52rem] tracking-[0.35em] uppercase font-semibold" style={{ writingMode: "vertical-rl" }}>
            Markbrand Nigeria Limited
          </span>
          <div className="h-14 w-px bg-gradient-to-b from-transparent via-[#00ff64]/25 to-transparent" />
        </div>

      </section>

      {/* ── MARQUEE STRIP — bigger, bolder ── */}
      <div className="sans border-y border-stone-800/60 py-4 bg-[#0D0D0D] overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[...Array(2)].flatMap((_, arr) =>
            ["Commercial Printing", "Creative Branding", "Photography", "Media Production", "Fashion & Tailoring", "Digital Education", "Marking You Out!", "The World Is Your Market"].map((item, i) => (
              <span key={`${arr}-${item}-${i}`} className="flex items-center gap-5 text-[0.65rem] tracking-[0.3em] uppercase text-stone-500 font-semibold flex-shrink-0">
                {item}<span className="w-1.5 h-1.5 rounded-full bg-[#00ff64]/50 flex-shrink-0" />
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}