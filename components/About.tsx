"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
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

const STATS = [
  { value: "10+", label: "Years of Excellence" },
  { value: "200+", label: "Satisfied Clients" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "6", label: "Subsidiaries" },
];

const PILLARS = [
  {
    label: "Vision",
    text: "Developing local businesses and organizations to have competitive advantage in the local and international market.",
    num: "01",
  },
  {
    label: "Mission",
    text: "Through the power of ideas, quality innovation, partnership and focus — we deliver excellence at every stage.",
    num: "02",
  },
  {
    label: "Slogan",
    text: "Marking You Out! — Because every brand deserves to stand apart from the crowd.",
    num: "03",
  },
  {
    label: "Motto",
    text: "The World Is Your Market — we equip businesses to compete and win beyond borders.",
    num: "04",
  },
];

// Relevant Unsplash images for a branding/printing company
const GRID_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=600&q=80",
    label: "Brand Identity",
  },
  {
    src: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=600&q=80",
    label: "Print Design",
  },
  {
    src: "https://images.unsplash.com/photo-1600210491892-03d54730b92d?w=600&q=80",
    label: "Creative Studio",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
    label: "Visual Design",
  },
];

export default function AboutPage() {
  const hero     = useInView(0.05);
  const story    = useInView(0.1);
  const pillars  = useInView(0.1);
  const statsRef = useInView(0.1);
  const gallery  = useInView(0.1);
  const cta      = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft  { from { opacity:0; transform:translateX(-28px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(28px); }  to { opacity:1; transform:translateX(0); } }
        @keyframes marquee   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes kenBurns  { from { transform:scale(1); } to { transform:scale(1.07); } }

        .fadeUp    { animation: fadeUp    0.8s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft  { animation: fadeLeft  0.8s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeRight { animation: fadeRight 0.8s cubic-bezier(0.4,0,0.2,1) both; }

        .hero-img { animation: kenBurns 12s ease-out both; }

        .gallery-img { transition: transform 0.5s ease; }
        .gallery-img:hover { transform: scale(1.04); }

        .pillar-card { transition: border-color 0.3s, background 0.3s, transform 0.3s; }
        .pillar-card:hover { border-color: rgba(0,255,100,0.35); background: rgba(0,255,100,0.03); transform: translateY(-3px); }
      `}</style>

      <main className="sans bg-[#0A0A0A] text-stone-100 overflow-x-hidden">

        {/* ── HERO ── */}
        <section
          ref={hero.ref as React.RefObject<HTMLElement>}
          className="relative min-h-screen flex items-end overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80"
            alt="Markbrand studio"
            className="hero-img absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 to-transparent" />

          {/* floating top-right badge */}
          <div className={`absolute top-32 right-8 lg:right-16 text-right ${hero.inView ? "fadeRight" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
            <p className="text-[0.55rem] tracking-[0.35em] uppercase text-[#00ff64]/70 mb-1">Adamawa, Nigeria</p>
            <p className="serif text-5xl font-bold text-[#00ff64] leading-none">10+</p>
            <p className="text-[0.55rem] tracking-[0.2em] uppercase text-stone-500 mt-1">Years of Excellence</p>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-20 pt-48 w-full">
            <div className={`${hero.inView ? "fadeUp" : "opacity-0"}`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#00ff64]" />
                <span className="text-[0.58rem] tracking-[0.4em] uppercase text-[#00ff64]">Our Story</span>
              </div>
              <h1 className="serif text-6xl sm:text-7xl lg:text-[6rem] font-bold leading-[1.0] mb-6">
                About<br />
                <span className="text-[#00ff64]">Mark</span><span className="text-[#00ff64]">brand</span>
              </h1>
              <p className="text-sm text-stone-300 max-w-md leading-relaxed mb-8">
                Adamawa's most respected commercial printing and branding powerhouse — over a decade of excellence, innovation, and true partnership.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Est. 2014", "Adamawa, Nigeria", "6 Subsidiaries"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 text-[0.58rem] tracking-[0.2em] uppercase border border-stone-700 text-stone-400 rounded-sm bg-black/30 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </section>

        {/* ── MARQUEE ── */}
        <div className="border-y border-stone-800/60 py-3.5 bg-[#0D0D0D] overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
            {[...Array(2)].flatMap(() =>
              ["Commercial Printing", "Creative Branding", "Photography", "Media Production", "Fashion & Tailoring", "Digital Education", "Marking You Out!", "The World Is Your Market"].map((item, i) => (
                <span key={`${item}-${i}`} className="flex items-center gap-5 text-[0.55rem] tracking-[0.35em] uppercase text-stone-600 flex-shrink-0">
                  {item}<span className="w-1 h-1 rounded-full bg-[#00ff64]/40 flex-shrink-0" />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ── STORY ── */}
        <section
          ref={story.ref as React.RefObject<HTMLElement>}
          className="py-28 px-6 max-w-7xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-24 items-center">

            {/* Image collage */}
            <div className={`relative ${story.inView ? "fadeLeft" : "opacity-0"}`}>
              {/* tall main image */}
              <div className="relative rounded-sm overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="Markbrand team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
                {/* overlay label */}
                <div className="absolute bottom-6 left-6">
                  <p className="text-[0.55rem] tracking-[0.28em] uppercase text-[#00ff64] mb-1">Our Team</p>
                  <p className="serif text-2xl font-bold text-stone-100">Building Brands Daily</p>
                </div>
              </div>

              {/* floating smaller image bottom-right */}
              <div className="absolute -bottom-7 -right-5 lg:-right-8 w-40 h-48 rounded-sm overflow-hidden border-[3px] border-[#0A0A0A] shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                <img
                  src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80"
                  alt="Design work"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* green badge top-right */}
              <div className="absolute -top-4 -right-4 lg:-right-6 bg-[#00ff64] text-[#0A0A0A] px-5 py-3 rounded-sm shadow-[0_8px_30px_rgba(0,255,100,0.4)]">
                <p className="text-[0.5rem] font-bold tracking-[0.2em] uppercase leading-none mb-0.5">Since</p>
                <p className="serif text-4xl font-bold leading-none">2014</p>
              </div>

              {/* subtle offset border */}
              <div className="absolute -bottom-3 -left-3 w-full h-full border border-[#C8973A]/10 rounded-sm pointer-events-none" />
            </div>

            {/* Text */}
            <div className={`pt-12 lg:pt-0 ${story.inView ? "fadeRight" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#00ff64]" />
                <span className="text-[0.58rem] tracking-[0.38em] uppercase text-[#00ff64]">Who We Are</span>
              </div>

              <h2 className="serif text-4xl lg:text-5xl font-bold leading-[1.08] mb-7">
                Nigeria's Premier<br />
                <span className="text-[#C8973A] italic">Branding Powerhouse</span>
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-stone-400">
                <p>
                  <span className="text-[#00ff64] font-semibold">Markbrand Nigeria Limited</span> is one of the leading commercial printers in Adamawa State of Nigeria, offering top-notch sheet fed and digital facilities for various products.
                </p>
                <p>
                  With more than <span className="text-stone-200 font-medium">10 years of experience</span>, Markbrand has been recognized as one of the country's most respected branding companies and advertising agencies — the preferred printer for excellent, high-quality print.
                </p>
                <p>
                  In every stage of a print assignment, we use <span className="text-stone-200 font-medium">world-class technology</span> and practice rigorous quality control, collaborating closely with clients to deliver the best partnership possible.
                </p>
              </div>

              {/* pull quote */}
              <div className="mt-8 pl-5 border-l-2 border-[#00ff64]/50 py-2">
                <p className="serif text-xl italic text-stone-300 leading-relaxed">
                  "The world is your market — and we make sure your brand is ready for it."
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#services" className="inline-flex items-center gap-2.5 px-6 py-3 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] rounded-sm hover:bg-[#00cc50] transition-all duration-200 shadow-[0_4px_20px_rgba(0,255,100,0.25)]">
                  Our Services
                  <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                  </svg>
                </a>
                <a href="#contact" className="inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#00ff64] hover:text-[#00cc50] transition-colors duration-200 group">
                  Get in Touch
                  <span className="block w-7 h-px bg-current transition-all duration-300 group-hover:w-12" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS over image ── */}
        <section
          ref={statsRef.ref as React.RefObject<HTMLElement>}
          className="relative py-24 px-6 overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1600&q=80"
            alt="Creative work"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/60" />

          <div className="relative max-w-5xl mx-auto">
            <div className={`text-center mb-14 ${statsRef.inView ? "fadeUp" : "opacity-0"}`}>
              <p className="text-[0.58rem] tracking-[0.4em] uppercase text-[#00ff64] mb-3">Our Impact</p>
              <h2 className="serif text-4xl lg:text-5xl font-bold">Numbers That Speak</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`text-center ${statsRef.inView ? "fadeUp" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="serif text-5xl lg:text-6xl font-bold text-[#00ff64] leading-none mb-2">{s.value}</p>
                  <div className="w-6 h-px bg-[#C8973A]/50 mx-auto mb-3" />
                  <p className="text-[0.58rem] tracking-[0.2em] uppercase text-stone-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISION / MISSION / SLOGAN / MOTTO ── */}
        <section
          ref={pillars.ref as React.RefObject<HTMLElement>}
          className="py-28 px-6 bg-[#0D0D0D]"
        >
          <div className="max-w-7xl mx-auto">
            <div className={`mb-16 ${pillars.inView ? "fadeUp" : "opacity-0"}`}>
              <div className="flex items-center gap-4 mb-5">
                <span className="h-px w-8 bg-[#00ff64]" />
                <span className="text-[0.58rem] tracking-[0.4em] uppercase text-[#00ff64]">What Drives Us</span>
              </div>
              <h2 className="serif text-4xl lg:text-5xl font-bold">
                Our <span className="text-[#C8973A] italic">Core</span> Beliefs
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PILLARS.map((p, i) => (
                <div
                  key={p.label}
                  className={`pillar-card group relative p-7 border border-stone-800/80 rounded-sm bg-[#0A0A0A] ${pillars.inView ? "fadeUp" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="serif text-5xl font-bold text-stone-800 group-hover:text-[#00ff64]/10 transition-colors duration-300 leading-none mb-6 select-none">{p.num}</p>
                  <p className="text-[0.58rem] tracking-[0.3em] uppercase text-[#00ff64] mb-3 font-medium">{p.label}</p>
                  <p className="text-xs text-stone-400 leading-relaxed">{p.text}</p>
                  <div className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-[#00ff64]/0 via-[#00ff64]/20 to-[#00ff64]/0 group-hover:via-[#00ff64]/50 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMAGE GALLERY GRID ── */}
        <section
          ref={gallery.ref as React.RefObject<HTMLElement>}
          className="py-16 px-6 max-w-7xl mx-auto"
        >
          <div className={`flex items-center justify-between mb-8 ${gallery.inView ? "fadeUp" : "opacity-0"}`}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-[#00ff64]" />
                <span className="text-[0.56rem] tracking-[0.38em] uppercase text-[#00ff64]">Our Work</span>
              </div>
              <h2 className="serif text-3xl lg:text-4xl font-bold">Crafted With Precision</h2>
            </div>
            <a href="#gallery" className="hidden sm:inline-flex items-center gap-2 text-[0.62rem] tracking-[0.2em] uppercase text-[#00ff64] hover:text-[#00cc50] transition-colors group">
              View All
              <span className="block w-5 h-px bg-current group-hover:w-8 transition-all duration-300" />
            </a>
          </div>

          {/* 2x2 responsive grid */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 ${gallery.inView ? "fadeUp" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
            {GRID_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-sm overflow-hidden group cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="gallery-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[0.56rem] tracking-[0.25em] uppercase text-[#00ff64]">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FULL WIDTH IMAGE QUOTE ── */}
        <div className="relative h-64 lg:h-80 overflow-hidden my-8">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80"
            alt="Markbrand office"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/70 to-[#0A0A0A]/30" />
          <div className="absolute inset-0 flex items-center px-8 lg:px-20">
            <div className="max-w-2xl">
              <p className="serif text-3xl lg:text-5xl font-bold italic text-stone-100 leading-tight">
                "Marking you out —<br /><span className="text-[#00ff64]">one brand</span> at a time."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="h-px w-8 bg-[#C8973A]" />
                <span className="text-[0.56rem] tracking-[0.3em] uppercase text-[#C8973A]">Markbrand Nigeria Limited</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <section
          ref={cta.ref as React.RefObject<HTMLElement>}
          className="relative py-28 px-6 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #00ff64 1px, transparent 0)", backgroundSize: "36px 36px" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00ff64]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className={`relative max-w-2xl mx-auto text-center ${cta.inView ? "fadeUp" : "opacity-0"}`}>
            <p className="text-[0.58rem] tracking-[0.4em] uppercase text-[#00ff64] mb-4">Ready to Stand Out?</p>
            <h2 className="serif text-4xl lg:text-6xl font-bold leading-[1.06] mb-6">
              Let's <span className="text-[#00ff64]">Mark</span> Your Brand<br />
              <span className="italic text-[#C8973A]">Outstanding</span>
            </h2>
            <p className="text-sm text-stone-400 mb-10 leading-relaxed">
              Partner with Adamawa's leading branding and commercial printing company. We bring your vision to life with world-class quality and creative precision.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#0A0A0A] bg-[#00ff64] rounded-sm hover:bg-[#00cc50] transition-all duration-200 shadow-[0_6px_30px_rgba(0,255,100,0.3)]">
                Start a Project
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" />
                </svg>
              </a>
              <a href="#services" className="inline-flex items-center gap-3 px-8 py-4 text-[0.72rem] font-bold tracking-[0.15em] uppercase text-[#00ff64] border border-[#00ff64]/30 rounded-sm hover:border-[#00ff64]/60 hover:bg-[#00ff64]/5 transition-all duration-200">
                View Services
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}