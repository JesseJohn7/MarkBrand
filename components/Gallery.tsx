"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const GALLERY = [
  { src: "/img1.jpg", label: "Brand Identity",   span: "lg:col-span-2 lg:row-span-2" },
  { src: "/img2.jpg", label: "Print Design",      span: "" },
  { src: "/img3.jpg", label: "Creative Studio",   span: "" },
  { src: "/img4.jpg", label: "Visual Design",     span: "lg:col-span-2" },
  { src: "/img5.jpg", label: "Photography",       span: "" },
  { src: "/img6.jpg", label: "Media Production",  span: "" },
];

export default function GallerySection() {
  const section  = useInView(0.05);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn  { from { opacity:0; transform:scale(0.92); }       to { opacity:1; transform:scale(1); } }
        .fadeUp   { animation: fadeUp   0.75s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft { animation: fadeLeft 0.75s cubic-bezier(0.4,0,0.2,1) both; }
        .scaleIn  { animation: scaleIn  0.25s cubic-bezier(0.4,0,0.2,1) both; }

        .gal-img  { transition: transform 0.55s cubic-bezier(0.4,0,0.2,1); }
        .gal-cell:hover .gal-img { transform: scale(1.06); }

        .gal-overlay {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .gal-cell:hover .gal-overlay { opacity: 1; }

        .gal-label {
          transform: translateY(8px);
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .gal-cell:hover .gal-label { transform: translateY(0); opacity: 1; }

        /* lightbox backdrop */
        .lb-backdrop {
          animation: fadeUp 0.2s ease both;
        }

        /* shimmer btn */
        .shimmer-btn { position: relative; overflow: hidden; }
        .shimmer-btn::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%);
          transform: translateX(-100%); transition: transform 0.5s ease;
        }
        .shimmer-btn:hover::after { transform: translateX(100%); }
      `}</style>

      <section
        ref={section.ref as React.RefObject<HTMLElement>}
        className="sans bg-[#0D0D0D] py-24 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── HEADER ── */}
          <div className={`mb-14 ${section.inView ? "fadeLeft" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#00ff64] shrink-0" />
              <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#00ff64]">Our Work in the World</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <h2 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                Crafted With <span className="italic text-[#00ff64]">Precision.</span>
              </h2>
              <p className="text-[0.75rem] text-stone-500 max-w-xs leading-relaxed">
                A glimpse into the brands, prints and campaigns we've brought to life.
              </p>
            </div>
          </div>

          {/* ── MASONRY-STYLE BENTO GRID ── */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3 sm:gap-4
              ${section.inView ? "fadeUp" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            {GALLERY.map((item, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`gal-cell relative rounded-sm overflow-hidden cursor-pointer
                  ${item.span}
                  ${i === 0 ? "aspect-square lg:aspect-auto" : "aspect-square"}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="gal-img w-full h-full object-cover"
                />
                {/* dark overlay */}
                <div className="gal-overlay absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/20 to-transparent" />
                {/* green top shimmer */}
                <div className="gal-overlay absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff64]/70 to-transparent" />
                {/* label */}
                <div className="gal-label absolute bottom-4 left-4">
                  <p className="text-[0.52rem] tracking-[0.28em] uppercase text-[#00ff64] mb-0.5 font-medium">{item.label}</p>
                  <div className="h-px w-6 bg-[#00ff64]/50" />
                </div>
                {/* expand icon */}
                <div className="gal-overlay absolute top-3 right-3">
                  <div className="w-7 h-7 rounded-sm border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-white/70" strokeWidth="1.5" fill="none">
                      <polyline points="7,1 11,1 11,5" /><line x1="11" y1="1" x2="6" y2="6" />
                      <polyline points="5,11 1,11 1,7" /><line x1="1" y1="11" x2="6" y2="6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── SEE MORE BUTTON ── */}
          <div className={`flex justify-center mt-12 ${section.inView ? "fadeUp" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
            <a
              href="https://www.facebook.com/MarkBrandNigeria/photos"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn group inline-flex items-center gap-4 px-8 py-4 border border-[#00ff64]/30 hover:border-[#00ff64]/70 hover:bg-[#00ff64]/5 transition-all duration-300 rounded-sm"
            >
              <span className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-[#00ff64]">
                See More on Facebook
              </span>
              <span className="flex items-center gap-1.5">
                {/* Facebook icon */}
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#00ff64]/70 group-hover:fill-[#00ff64] transition-colors duration-200">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-[#00ff64]/70 group-hover:stroke-[#00ff64] transition-all duration-300 group-hover:translate-x-1" strokeWidth="2" strokeLinecap="round" fill="none">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {active !== null && (
        <div
          className="lb-backdrop fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <div className="scaleIn relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* close */}
            <button
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 text-[0.55rem] tracking-[0.3em] uppercase text-stone-400 hover:text-[#00ff64] transition-colors flex items-center gap-2"
            >
              Close
              <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2" fill="none">
                <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
              </svg>
            </button>

            {/* image */}
            <div className="rounded-sm overflow-hidden border border-stone-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY[active].src}
                alt={GALLERY[active].label}
                className="w-full max-h-[80vh] object-contain bg-[#0A0A0A]"
              />
            </div>

            {/* caption + nav */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div className="flex items-center gap-2">
                <span className="h-px w-5 bg-[#00ff64]/50" />
                <span className="text-[0.55rem] tracking-[0.28em] uppercase text-[#00ff64]">{GALLERY[active].label}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
                  className="w-8 h-8 border border-stone-700 hover:border-[#00ff64]/50 flex items-center justify-center rounded-sm transition-colors duration-200"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-stone-400" strokeWidth="2" strokeLinecap="round" fill="none">
                    <line x1="10" y1="6" x2="2" y2="6" /><polyline points="5,3 2,6 5,9" />
                  </svg>
                </button>
                <span className="text-[0.52rem] text-stone-600 tracking-widest">{active + 1} / {GALLERY.length}</span>
                <button
                  onClick={() => setActive((active + 1) % GALLERY.length)}
                  className="w-8 h-8 border border-stone-700 hover:border-[#00ff64]/50 flex items-center justify-center rounded-sm transition-colors duration-200"
                >
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-stone-400" strokeWidth="2" strokeLinecap="round" fill="none">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}