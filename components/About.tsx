"use client";

import { useState, useEffect, useRef } from "react";

const SLIDES = [
  { image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80", tag: "Commercial Printing" },
  { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80", tag: "Creative Branding" },
  { image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&q=80", tag: "Media Production" },
  { image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80", tag: "Photography" },
];

const SUBSIDIARIES = [
  { name: "MarkStudio", desc: "Artistic and professional photography" },
  { name: "MarkTV", desc: "Engaging media content production" },
  { name: "MarkWash", desc: "Premium laundry and dry-cleaning" },
  { name: "MarkJoels", desc: "Expert mens fashion and tailoring" },
  { name: "MarkFilms", desc: "Compelling documentary filmmaking" },
  { name: "Swift Trading Academy", desc: "Crypto trading education" },
];

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "200+", label: "Satisfied Clients" },
  { value: "1500+", label: "Hours of Work" },
  { value: "6", label: "Subsidiaries" },
];

const MARQUEE_ITEMS = [
  "Branding", "Photography", "Media Production", "Fashion",
  "Laundry", "Digital Education", "Commercial Printing", "Creative Solutions",
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState("short");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { ref: sectionRef, inView } = useInView(0.1);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 400);
  };
  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative bg-[#0A0A0A] overflow-hidden py-24 lg:py-32"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #C8973A 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8973A]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Label */}
        <div className={`flex items-center gap-4 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="block w-10 h-px bg-[#C8973A]" />
          <span className="text-[0.65rem] tracking-[0.35em] uppercase text-[#C8973A] font-medium">Who We Are</span>
          <span className="block flex-1 h-px bg-stone-800" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* SLIDER */}
          <div className={`relative transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="absolute -top-3 -left-3 w-full h-full border border-[#C8973A]/10 rounded-sm pointer-events-none" />
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <div className="absolute inset-0 border border-[#C8973A]/20 rounded-sm z-10 pointer-events-none" />
              {SLIDES.map((slide, i) => (
                <div key={i} className={`absolute inset-0 transition-all duration-500 ease-in-out ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}>
                  <img src={slide.image} alt={slide.tag} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/10 to-transparent" />
                </div>
              ))}
              <div className="absolute bottom-6 left-6 z-20">
                <span className={`inline-block px-3 py-1.5 text-[0.6rem] tracking-[0.25em] uppercase bg-[#C8973A] text-[#0A0A0A] font-bold rounded-sm transition-all duration-300 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                  {SLIDES[current].tag}
                </span>
              </div>
              <div className="absolute top-5 right-5 z-20">
                <span className="text-[0.62rem] tracking-widest text-stone-400">{String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
              </div>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-[#C8973A]/30 rounded-sm hover:bg-[#C8973A]/20 hover:border-[#C8973A]/60 transition-all duration-200" aria-label="Previous">
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-[#C8973A]" strokeWidth="2" strokeLinecap="round" fill="none"><polyline points="8,2 4,6 8,10" /></svg>
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center bg-[#0A0A0A]/70 border border-[#C8973A]/30 rounded-sm hover:bg-[#C8973A]/20 hover:border-[#C8973A]/60 transition-all duration-200" aria-label="Next">
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-[#C8973A]" strokeWidth="2" strokeLinecap="round" fill="none"><polyline points="4,2 8,6 4,10" /></svg>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-5">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} className={`transition-all duration-300 rounded-full ${i === current ? "w-7 h-1.5 bg-[#C8973A]" : "w-1.5 h-1.5 bg-[#C8973A]/25 hover:bg-[#C8973A]/50"}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-10 -right-2 lg:-right-10 bg-[#0F0F0F] border border-[#C8973A]/20 rounded-sm px-5 py-5 shadow-[0_25px_70px_rgba(0,0,0,0.7)] z-20 min-w-[200px]">
              <p className="text-[0.56rem] tracking-[0.28em] uppercase text-[#C8973A] mb-4 flex items-center gap-2"><span className="w-3 h-px bg-[#C8973A]" />At a Glance</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-[#C8973A] leading-none" style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.value}</p>
                    <p className="text-[0.56rem] tracking-[0.15em] uppercase text-stone-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className={`pt-14 lg:pt-0 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <h2 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-bold leading-[1.08] text-stone-100 mb-6" style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Creating Brands<br /><span className="text-[#C8973A]">That Stand Out</span>
            </h2>
            <p className="text-sm leading-relaxed text-stone-400 mb-8 max-w-lg">
              Markbrand Nigeria Limited is a leading commercial printing and creative solutions company based in Adamawa, Nigeria. With over 10 years of excellence, we specialize in branding, photography, media production, fashion, laundry, and digital education.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { label: "Our Vision", text: "To develop local businesses and organizations to have a competitive advantage in the local and international market." },
                { label: "Our Mission", text: "To achieve this through the power of ideas, quality innovation, partnership, and focus." },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 p-4 border border-[#C8973A]/12 rounded-sm bg-[#C8973A]/[0.03] hover:border-[#C8973A]/30 hover:bg-[#C8973A]/[0.06] transition-all duration-300 group">
                  <span className="text-[#C8973A] text-sm mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">◆</span>
                  <div>
                    <p className="text-[0.58rem] tracking-[0.28em] uppercase text-[#C8973A] mb-1.5">{item.label}</p>
                    <p className="text-xs text-stone-400 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-7">
              <div className="flex border-b border-stone-800 mb-5">
                {["short", "long"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 text-[0.62rem] tracking-[0.2em] uppercase font-medium transition-all duration-200 border-b-2 -mb-px ${activeTab === tab ? "text-[#C8973A] border-[#C8973A]" : "text-stone-500 border-transparent hover:text-[#A0742A] hover:border-[#A0742A]/40"}`}>
                    {tab === "short" ? "Short Bio" : "Our Subsidiaries"}
                  </button>
                ))}
              </div>
              <div className="min-h-[120px]">
                {activeTab === "short" ? (
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Guided by the vision to give local businesses a competitive global edge, Markbrand delivers innovation, quality, and impact across all services — from commercial printing and creative branding to media production and fashion. We are committed to marking every client out in their market.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SUBSIDIARIES.map((sub) => (
                      <div key={sub.name} className="flex items-start gap-2.5 p-3 rounded-sm border border-stone-800/80 hover:border-[#C8973A]/30 hover:bg-[#C8973A]/[0.04] transition-all duration-200 group cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-[#C8973A] mt-1.5 flex-shrink-0 group-hover:scale-[2] transition-transform duration-200" />
                        <div>
                          <p className="text-[0.68rem] font-semibold tracking-wide text-[#C8973A]">{sub.name}</p>
                          <p className="text-[0.6rem] text-stone-500 mt-0.5 leading-relaxed">{sub.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-5 pt-1">
              <a href="#services" className="inline-flex items-center gap-2.5 px-6 py-3 text-[0.68rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#C8973A] rounded-sm hover:bg-[#7A5518] transition-all duration-200 shadow-[0_4px_20px_rgba(200,151,58,0.25)]">
                Our Services
                <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-current" strokeWidth="2.5" strokeLinecap="round" fill="none"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="7,3 10,6 7,9" /></svg>
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 text-[0.68rem] font-medium tracking-[0.14em] uppercase text-[#C8973A] hover:text-[#7A5518] transition-colors duration-200 group">
                Let&apos;s Work
                <span className="block w-7 h-px bg-current transition-all duration-300 group-hover:w-12" />
              </a>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-32 border-t border-stone-800/50 pt-8 overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap" style={{ animation: "marquee 30s linear infinite" }}>
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-4 text-[0.6rem] tracking-[0.32em] uppercase text-stone-600 flex-shrink-0 hover:text-[#C8973A]/60 transition-colors duration-200">
                {item}<span className="w-1 h-1 rounded-full bg-[#C8973A]/30" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </section>
  );
}