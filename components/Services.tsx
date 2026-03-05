"use client";

import { useEffect, useRef, useState } from "react";

// ── Generic hook — works with any HTML element, zero casting needed ─────────
function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.08) {
  const ref = useRef<T>(null);
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

// ── Icons as render functions (not JSX at module level = no hydration mismatch)
const PrintIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="14" width="28" height="18" rx="2" /><path d="M12 14V8h16v6" />
    <rect x="12" y="22" width="16" height="6" rx="1" /><circle cx="30" cy="19" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const BrandIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="13" /><path d="M20 7v6M20 27v6M7 20h6M27 20h6" /><circle cx="20" cy="20" r="4" />
  </svg>
);
const PhotoIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="32" height="22" rx="3" /><circle cx="20" cy="22" r="6" /><circle cx="20" cy="22" r="3" />
    <path d="M14 11l2-4h8l2 4" /><circle cx="31" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const MediaIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="24" height="20" rx="2" /><path d="M28 16l8-4v16l-8-4V16z" />
    <path d="M12 17l6 3-6 3V17z" fill="currentColor" stroke="none" />
  </svg>
);
const FashionIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6l-8 8 6 2v18h16V16l6-2-8-8" /><path d="M14 6c0 3.314 2.686 6 6 6s6-2.686 6-6" />
  </svg>
);
const EduIcon    = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L4 14l16 8 16-8-16-8z" /><path d="M4 22l16 8 16-8" /><path d="M4 18l16 8 16-8" />
    <line x1="36" y1="14" x2="36" y2="24" />
  </svg>
);

const SERVICES = [
  {
    num: "01", Icon: PrintIcon,
    title: "Commercial Printing", tagline: "World-Class Print, Every Time",
    description: "From business cards to large-format banners, our sheet-fed vibrant output at any scale.",
    features: ["Large-Format Printing", "Digital & Offset", "Packaging & Labels", "Corporate Stationery"],
  },
  {
    num: "02", Icon: BrandIcon,
    title: "Creative Branding", tagline: "Identities That Endure",
    description: "We craft bold, strategic brand identities that communicate who you are before you say a word.",
    features: ["Logo & Identity Design", "Brand Guidelines", "Visual Systems", "Packaging Design"],
  },
  {
    num: "03", Icon: PhotoIcon,
    title: "Photography", tagline: "Visuals That Tell Your Story",
    description: "Professional photography tailored for brands  product shoots, corporate portraits, event coverage. ",
    features: ["Product Photography", "Corporate Portraits", "Event Coverage", "Editorial Shoots"],
  },
  {
    num: "04", Icon: MediaIcon,
    title: "Media Production", tagline: "Content That Moves People",
    description: "Full-service media production from concept to final cut. We produce commercials",
    features: ["Brand Films & Commercials", "Social Media Content", "Motion Graphics", "Post-Production"],
  },
  {
    num: "05", Icon: FashionIcon,
    title: "Fashion & Tailoring", tagline: "Style That Represents Your Brand",
    description: "Custom uniforms, branded corporate wear, and fashion pieces crafted to make your team look unified and professional. From fabric selection to final stitch, every garment reflects your brand's identity with precision.",
    features: ["Corporate Uniforms", "Branded Apparel", "Event Outfits", "Bespoke Tailoring"],
  },
  {
    num: "06", Icon: EduIcon,
    title: "Digital Education", tagline: "Knowledge That Empowers Growth",
    description: "Through our Swift Trading Academy and digital learning programmes, we equip entrepreneurs and professionals with the skills to thrive — from business development and digital marketing to financial literacy.",
    features: ["Business Development", "Digital Marketing", "Financial Literacy", "Entrepreneurship"],
  },
];

export default function ServicesSection() {
  const headerRef = useInView<HTMLDivElement>(0.05);
  const gridRef   = useInView<HTMLDivElement>(0.05);
  const ctaRef    = useInView<HTMLDivElement>(0.1);
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        .fadeUp   { animation: fadeUp   0.75s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft { animation: fadeLeft 0.75s cubic-bezier(0.4,0,0.2,1) both; }

        .svc-card {
          transition: border-color .35s ease, background .35s ease,
                      transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s ease;
        }
        .svc-card:hover, .svc-card.is-active {
          border-color: rgba(0,255,100,0.35);
          background: rgba(0,255,100,0.03);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,255,100,0.07);
        }
        .svc-icon { transition: color .3s ease, background .3s ease, border-color .3s ease; }
        .svc-card:hover .svc-icon, .svc-card.is-active .svc-icon {
          color: #00ff64; background: rgba(0,255,100,0.08); border-color: rgba(0,255,100,0.2);
        }
        .svc-num { transition: color .3s ease; }
        .svc-card:hover .svc-num, .svc-card.is-active .svc-num { color: rgba(0,255,100,0.1); }
        .feature-pill { transition: border-color .25s ease, color .25s ease; }
        .svc-card:hover .feature-pill, .svc-card.is-active .feature-pill {
          border-color: rgba(0,255,100,0.22); color: #a8a29e;
        }
        .bottom-line { opacity:0; transition: opacity .3s ease; }
        .svc-card:hover .bottom-line, .svc-card.is-active .bottom-line { opacity:1; }
        .arrow-wrap { opacity:0; transform:translateX(0); transition: opacity .3s ease, transform .3s ease; }
        .svc-card:hover .arrow-wrap, .svc-card.is-active .arrow-wrap { opacity:1; transform:translateX(4px); }
      `}</style>

      <section
        id="services"
        className="sans bg-[#0A0A0A] py-24 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div
            ref={headerRef.ref}
            className={`mb-16 ${headerRef.inView ? "fadeLeft" : "opacity-0"}`}
          >
            <div className="flex items-center gap-3 mb-5">
             {/*  <span className="h-px w-8 bg-[#00ff64] shrink-0" /> */}
              <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#00ff64]">What We Do</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <h2 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
                 <span className="italic text-[#00ff64]"> Our Services.</span>
              </h2>
              <p className="text-[0.75rem] text-stone-500 max-w-sm leading-relaxed lg:text-right">
                From the first print to a full brand identity — world-class creative and production services under one roof.
              </p>
            </div>
          </div>

          {/* GRID */}
          <div
            ref={gridRef.ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
                onClick={() => setActive(active === i ? null : i)}
                className={[
                  "svc-card group relative bg-[#0D0D0D] border border-stone-800/70 rounded-sm p-7 cursor-pointer overflow-hidden",
                  active === i ? "is-active" : "",
                  gridRef.inView ? "fadeUp" : "opacity-0",
                ].join(" ")}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* ghost number */}
                <span className="svc-num absolute top-4 right-5 serif text-7xl font-bold text-stone-800 leading-none select-none pointer-events-none">
                  {svc.num}
                </span>

                {/* icon */}
                <div className="svc-icon relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-sm border border-stone-800 text-stone-400 mb-6 bg-[#0A0A0A]">
                  <svc.Icon />
                </div>

                {/* title + tagline */}
                <div className="relative z-10 mb-4">
                  <h3 className="serif text-2xl sm:text-[1.6rem] font-bold text-stone-100 leading-tight mb-1">
                    {svc.title}
                  </h3>
                  <p className="text-[0.52rem] tracking-[0.3em] uppercase text-[#00ff64]/70 font-medium">
                    {svc.tagline}
                  </p>
                </div>

                {/* description */}
                <p className="relative z-10 text-[0.74rem] text-white leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* feature pills */}
                <div className="relative z-10 flex flex-wrap gap-2 mb-5">
                  {svc.features.map((f) => (
                    <span key={f} className="feature-pill px-3 py-1 text-[0.46rem] tracking-[0.18em] uppercase border border-stone-800 text-stone-600 rounded-sm">
                      {f}
                    </span>
                  ))}
                </div>

                {/* learn more */}
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-[0.58rem] tracking-[0.22em] uppercase text-[#00ff64]/60 font-medium">Learn More</span>
                  <svg viewBox="0 0 12 12" className="arrow-wrap w-3 h-3 stroke-[#00ff64]/60" strokeWidth="2" strokeLinecap="round" fill="none">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                  </svg>
                </div>

                {/* bottom accent line */}
                <div className="bottom-line absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#00ff64]/40 to-transparent" />
              </div>
            ))}
          </div>

          {/* CTA STRIP */}
          <div
            ref={ctaRef.ref}
            className={[
              "mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6 border border-stone-800/60 rounded-sm bg-[#0D0D0D]",
              ctaRef.inView ? "fadeUp" : "opacity-0",
            ].join(" ")}
          >
            <div>
              <p className="serif text-xl sm:text-2xl font-bold text-stone-100 mb-1">
                Not sure which service fits?
              </p>
              <p className="text-[0.72rem] text-stone-500">
                Let&apos;s talk — we&apos;ll figure out exactly what your brand needs.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-3 px-7 py-3.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] hover:bg-[#00e85a] transition-colors duration-200 shadow-[0_4px_24px_rgba(0,255,100,0.25)] rounded-sm"
            >
              Get in Touch
              <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}