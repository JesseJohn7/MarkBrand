"use client";

import { useEffect, useRef, useState } from "react";

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

const PrintIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="14" width="28" height="18" rx="2" /><path d="M12 14V8h16v6" />
    <rect x="12" y="22" width="16" height="6" rx="1" /><circle cx="30" cy="19" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const BrandIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="13" /><path d="M20 7v6M20 27v6M7 20h6M27 20h6" /><circle cx="20" cy="20" r="4" />
  </svg>
);
const PhotoIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="11" width="32" height="22" rx="3" /><circle cx="20" cy="22" r="6" /><circle cx="20" cy="22" r="3" />
    <path d="M14 11l2-4h8l2 4" /><circle cx="31" cy="16" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const MediaIcon  = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="24" height="20" rx="2" /><path d="M28 16l8-4v16l-8-4V16z" />
    <path d="M12 17l6 3-6 3V17z" fill="currentColor" stroke="none" />
  </svg>
);
const FashionIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 6l-8 8 6 2v18h16V16l6-2-8-8" /><path d="M14 6c0 3.314 2.686 6 6 6s6-2.686 6-6" />
  </svg>
);
const EduIcon    = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L4 14l16 8 16-8-16-8z" /><path d="M4 22l16 8 16-8" /><path d="M4 18l16 8 16-8" />
    <line x1="36" y1="14" x2="36" y2="24" />
  </svg>
);

const SERVICES = [
  {
    num: "01", Icon: PrintIcon,
    img: "/services/commercial-printing.jpg",
    title: "Commercial Printing", tagline: "World-Class Print, Every Time",
    description: "From business cards to large-format banners — vibrant, precision output at any scale for any brand.",
    features: ["Large-Format Printing", "Digital & Offset", "Packaging & Labels", "Corporate Stationery"],
  },
  {
    num: "02", Icon: BrandIcon,
    img: "/services/creative-branding.jpg",
    title: "Creative Branding", tagline: "Identities That Endure",
    description: "We craft bold, strategic brand identities that communicate who you are before you say a word.",
    features: ["Logo & Identity Design", "Brand Guidelines", "Visual Systems", "Packaging Design"],
  },
  {
    num: "03", Icon: PhotoIcon,
    img: "/services/photography.jpg",
    title: "Photography", tagline: "Visuals That Tell Your Story",
    description: "Professional photography for brands — product shoots, corporate portraits, event coverage and more.",
    features: ["Product Photography", "Corporate Portraits", "Event Coverage", "Editorial Shoots"],
  },
  {
    num: "04", Icon: MediaIcon,
    img: "/services/media-production.jpg",
    title: "Media Production", tagline: "Content That Moves People",
    description: "Full-service media production from concept to final cut — commercials, social content, motion graphics.",
    features: ["Brand Films & Commercials", "Social Media Content", "Motion Graphics", "Post-Production"],
  },
  {
    num: "05", Icon: FashionIcon,
    img: "/services/fashion-tailoring.jpg",
    title: "Fashion & Tailoring", tagline: "Style That Represents Your Brand",
    description: "Custom uniforms, branded corporate wear, and fashion pieces crafted to make your team look the part.",
    features: ["Corporate Uniforms", "Branded Apparel", "Event Outfits", "Bespoke Tailoring"],
  },
  {
    num: "06", Icon: EduIcon,
    img: "/services/digital-education.jpg",
    title: "Digital Education", tagline: "Knowledge That Empowers Growth",
    description: "Through our Swift Trading Academy and digital learning programmes, we equip people to grow and compete.",
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .svc-serif { font-family: 'Playfair Display', serif; }
        .svc-sans  { font-family: 'DM Sans', sans-serif; }

        @keyframes svcFadeUp   { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes svcFadeLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        .svcFadeUp   { animation: svcFadeUp   0.75s cubic-bezier(0.4,0,0.2,1) both; }
        .svcFadeLeft { animation: svcFadeLeft 0.75s cubic-bezier(0.4,0,0.2,1) both; }

        /* card */
        .svc-card {
          transition: border-color .35s ease, box-shadow .35s ease, transform .35s cubic-bezier(.4,0,.2,1);
          background: #0D0D0D;
        }
        .svc-card:hover, .svc-card.is-active {
          border-color: rgba(107,191,31,0.45) !important;
          box-shadow: 0 24px 64px rgba(107,191,31,0.10);
          transform: translateY(-5px);
        }

        /* image zoom */
        .svc-img { transition: transform 0.6s cubic-bezier(.4,0,.2,1); }
        .svc-card:hover .svc-img, .svc-card.is-active .svc-img { transform: scale(1.07); }

        /* green top bar reveal */
        .svc-topbar {
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.38s ease;
        }
        .svc-card:hover .svc-topbar, .svc-card.is-active .svc-topbar { transform: scaleX(1); }

        /* icon */
        .svc-icon { transition: color .3s, background .3s, border-color .3s; }
        .svc-card:hover .svc-icon, .svc-card.is-active .svc-icon {
          color: #6BBF1F;
          background: rgba(107,191,31,0.1);
          border-color: rgba(107,191,31,0.25);
        }

        /* ghost number */
        .svc-num { transition: color .3s; }
        .svc-card:hover .svc-num, .svc-card.is-active .svc-num { color: rgba(107,191,31,0.08); }

        /* pills */
        .svc-pill { transition: border-color .25s, color .25s; }
        .svc-card:hover .svc-pill, .svc-card.is-active .svc-pill {
          border-color: rgba(107,191,31,0.28);
          color: #c8c8c8;
        }

        /* arrow */
        .svc-arrow { opacity:0; transform:translateX(-4px); transition: opacity .3s, transform .3s; }
        .svc-card:hover .svc-arrow, .svc-card.is-active .svc-arrow { opacity:1; transform:translateX(0); }
      `}</style>

      <section
        id="services"
        className="svc-sans bg-[#0A0A0A] py-24 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── HEADER ── */}
          <div
            ref={headerRef.ref}
            className={`mb-16 ${headerRef.inView ? "svcFadeLeft" : "opacity-0"}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[#6BBF1F] shrink-0" />
              <span className="text-[0.6rem] tracking-[0.4em] uppercase text-[#6BBF1F] font-bold">What We Do</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <h2 className="svc-serif text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.0] text-white">
                Our <em className="text-[#6BBF1F]">Services.</em>
              </h2>
              <p className="text-sm text-stone-400 max-w-sm leading-relaxed lg:text-right font-medium">
                From the first print to a full brand identity — world-class creative and production services under one roof.
              </p>
            </div>
          </div>

          {/* ── GRID ── */}
          <div
            ref={gridRef.ref}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.num}
                onClick={() => setActive(active === i ? null : i)}
                className={[
                  "svc-card group relative border border-stone-800/80 rounded-sm overflow-hidden cursor-pointer",
                  active === i ? "is-active" : "",
                  gridRef.inView ? "svcFadeUp" : "opacity-0",
                ].join(" ")}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* ── IMAGE HEADER ── */}
                <div className="relative h-44 overflow-hidden bg-stone-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="svc-img w-full h-full object-cover object-center brightness-75"
                  />
                  {/* dark gradient over image so text below reads clearly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />

                  {/* green top bar */}
                  <div className="svc-topbar absolute top-0 left-0 right-0 h-[3px] bg-[#6BBF1F]" />

                  {/* ghost number — sits on image */}
                  <span className="svc-num absolute bottom-2 right-4 svc-serif text-6xl font-black text-white/10 leading-none select-none pointer-events-none">
                    {svc.num}
                  </span>

                  {/* icon badge on image */}
                  <div className="svc-icon absolute bottom-3 left-4 inline-flex items-center justify-center w-11 h-11 rounded-sm border border-stone-700 text-stone-300 bg-black/60 backdrop-blur-sm">
                    <svc.Icon />
                  </div>
                </div>

                {/* ── CARD BODY ── */}
                <div className="p-6">
                  {/* title + tagline */}
                  <div className="mb-3">
                    <h3 className="svc-serif text-2xl font-black text-white leading-tight mb-1">
                      {svc.title}
                    </h3>
                    <p className="text-[0.55rem] tracking-[0.3em] uppercase text-[#6BBF1F] font-bold">
                      {svc.tagline}
                    </p>
                  </div>

                  {/* description */}
                  <p className="text-sm text-stone-300 font-medium leading-relaxed mb-5">
                    {svc.description}
                  </p>

                  {/* feature pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {svc.features.map((f) => (
                      <span key={f} className="svc-pill px-2.5 py-1 text-[0.5rem] tracking-[0.16em] uppercase border border-stone-700 text-stone-400 rounded-sm font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* learn more */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-800">
                    <span className="text-[0.6rem] tracking-[0.22em] uppercase text-[#6BBF1F] font-bold">Learn More</span>
                    <svg viewBox="0 0 12 12" className="svc-arrow w-3 h-3 stroke-[#6BBF1F]" strokeWidth="2.2" strokeLinecap="round" fill="none">
                      <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA STRIP ── */}
          <div
            ref={ctaRef.ref}
            className={[
              "mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-7 border border-stone-800/60 rounded-sm bg-[#0D0D0D]",
              ctaRef.inView ? "svcFadeUp" : "opacity-0",
            ].join(" ")}
          >
            <div>
              <p className="svc-serif text-2xl sm:text-3xl font-black text-white mb-1">
                Not sure which service fits?
              </p>
              <p className="text-sm text-stone-400 font-medium">
                Let&apos;s talk — we&apos;ll figure out exactly what your brand needs.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.14em] uppercase text-white bg-[#6BBF1F] hover:bg-[#5aaa14] transition-colors duration-200 shadow-[0_4px_28px_rgba(107,191,31,0.3)] rounded-sm"
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