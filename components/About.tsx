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

const MARQUEE_ITEMS = [
  { text: "Commercial Printing",      accent: false },
  { text: "Creative Branding",        accent: true  },
  { text: "Photography",              accent: false },
  { text: "Media Production",         accent: false },
  { text: "Fashion & Tailoring",      accent: false },
  { text: "Digital Education",        accent: false },
  { text: "Marking You Out!",         accent: true  },
  { text: "The World Is Your Market", accent: false },
];

export default function AboutPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const hero = useInView(0.05);
  const cta  = useInView(0.1);

  useEffect(() => { setHeroLoaded(true); }, []);

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
        @keyframes kenBurns  { from { transform:scale(1); } to { transform:scale(1.06); } }

        .fadeUp    { animation: fadeUp    0.8s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft  { animation: fadeLeft  0.8s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeRight { animation: fadeRight 0.8s cubic-bezier(0.4,0,0.2,1) both; }
        .hero-img  { animation: kenBurns 16s ease-out both; }
        .marquee-track { animation: marquee 28s linear infinite; }
      `}</style>

      <main className="sans bg-[#0A0A0A] text-stone-100 overflow-x-hidden">

        {/* ══════════════════════════════════
            HERO — text left / image right
        ══════════════════════════════════ */}
        <section
          ref={hero.ref as React.RefObject<HTMLElement>}
          className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden"
        >
          {/* ── LEFT: text panel ── */}
          <div className="relative z-10 flex flex-col justify-center px-7 sm:px-12 lg:px-16 pt-32 pb-20 bg-[#0A0A0A]">

            <div className={`flex items-center gap-3 mb-6 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              {/* <span className="h-px w-8 bg-[#00ff64] shrink-0" /> */}
              <span className="text-[0.52rem] sm:text-[0.56rem] tracking-[0.4em] uppercase text-[#00ff64]">Our Story</span>
            </div>

            <h1 className={`serif leading-[1.0] mb-5 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.22s" }}>
              <span className="block text-[clamp(3rem,6vw,6rem)] font-bold text-stone-100 tracking-tight">About</span>
              <span className="block text-[clamp(3rem,6vw,6rem)] font-bold italic text-[#00ff64] tracking-tight">Markbrand.</span>
            </h1>

            <div className={`flex items-center gap-3 mb-7 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.32s" }}>
              {/* <span className="h-px w-10 bg-[#00ff64]/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff64]/60" /> */}
            </div>

            <p className={`text-[0.8rem] sm:text-sm text-stone-300/85 max-w-sm leading-relaxed mb-4 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.42s" }}>
              We are <span className="text-white font-semibold">Markbrand Nigeria Limited</span>  Adamawa's most respected commercial printing and branding powerhouse. For over a decade we've helped businesses{" "}
              <span className="text-[#00ff64] font-medium">stand out, speak louder,</span> and compete on a global stage.
            </p>

            <p className={`text-[0.76rem] sm:text-[0.8rem] text-stone-400/80 max-w-xs leading-relaxed mb-8 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
              From world-class print to bold identity design — we don't just build brands,{" "}
              <span className="text-stone-200 font-medium">we build legacies.</span>
            </p>

            <div className={`flex flex-wrap gap-2 mb-10 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.58s" }}>
              {["Est. 2014", "Adamawa, Nigeria", "6 Subsidiaries"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 text-[0.52rem] tracking-[0.2em] uppercase border border-stone-700/70 text-stone-400 bg-stone-900/50 backdrop-blur-sm rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <div className={`flex flex-wrap items-center gap-4 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.66s" }}>
              <a href="#contact" className="inline-flex items-center gap-3 px-7 py-3.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] hover:bg-[#00e85a] transition-colors duration-200 shadow-[0_4px_24px_rgba(0,255,100,0.3)] rounded-sm">
                Start a Project
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" /></svg>
              </a>
              <a href="#services" className="group inline-flex items-center gap-3 text-[0.66rem] font-semibold tracking-[0.14em] uppercase text-[#00ff64] hover:text-[#00e85a] transition-colors duration-200">
                Our Services
                <span className="block w-5 h-px bg-current transition-all duration-300 group-hover:w-10" />
              </a>
            </div>

            {/* mini stats */}
            <div className={`flex flex-wrap gap-8 mt-12 pt-10 border-t border-stone-800/60 ${heroLoaded ? "fadeLeft" : "opacity-0"}`} style={{ animationDelay: "0.78s" }}>
              {[
                { value: "10+",   label: "Years" },
                { value: "200+",  label: "Clients" },
                { value: "1500+", label: "Projects" },
                { value: "6",     label: "Subsidiaries" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="serif text-2xl sm:text-3xl font-bold text-[#00ff64] leading-none">{s.value}</p>
                  <p className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: image panel ── */}
          <div className="relative hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=90"
              alt="Markbrand studio"
              className="hero-img absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-bl from-[#0A1A0F]/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff64]/6 via-transparent to-transparent" />

            <div className={`absolute top-10 right-8 text-right ${heroLoaded ? "fadeRight" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
              <p className="text-[0.48rem] tracking-[0.35em] uppercase text-[#00ff64]/70 mb-1">Adamawa, Nigeria</p>
              <p className="serif text-5xl font-bold text-[#00ff64] leading-none">10+</p>
              <p className="text-[0.48rem] tracking-[0.2em] uppercase text-stone-400 mt-1">Years of Excellence</p>
            </div>

            <div className="absolute bottom-8 left-8">
              <p className="text-[0.48rem] tracking-[0.35em] uppercase text-[#00ff64]/60 mb-1">Est. 2014</p>
              <p className="serif text-lg font-bold text-stone-200/80">Marking You Out.</p>
            </div>
          </div>

          {/* mobile image banner */}
          <div className="relative lg:hidden h-56 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
              alt="Markbrand studio"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
          </div>
        </section>

        {/* ══════════ MARQUEE ══════════ */}
        <div className="relative sans border-y border-stone-700/50 bg-[#0D0D0D] overflow-hidden py-4 sm:py-5">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex gap-10 sm:gap-14 whitespace-nowrap">
            {[...Array(2)].flatMap((_, arr) =>
              MARQUEE_ITEMS.map((item, i) => (
                <span key={`${arr}-${i}`} className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                  <span className={`text-[0.62rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.38em] uppercase font-medium ${item.accent ? "text-[#00ff64]" : "text-stone-300"}`}>
                    {item.text}
                  </span>
                  <span className={`w-1 h-1 rounded-full shrink-0 ${item.accent ? "bg-[#00ff64]" : "bg-stone-600"}`} />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ══════════ QUOTE BANNER ══════════ */}
        <div className="relative h-64 lg:h-80 overflow-hidden my-8">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80" alt="Markbrand office" className="w-full h-full object-cover object-center" />
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

        {/* ══════════ CTA ══════════ */}
        <section ref={cta.ref as React.RefObject<HTMLElement>} className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #00ff64 1px, transparent 0)", backgroundSize: "36px 36px" }} />
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
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" /></svg>
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