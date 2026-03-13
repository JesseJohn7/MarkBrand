"use client";

import { useEffect, useRef } from "react";

const MARQUEE_ITEMS = [
  "Commercial Printing",
  "Creative Branding",
  "Photography",
  "Media Production",
  "Fashion & Tailoring",
  "Digital Education",
  "Marking You Out!",
  "The World Is Your Market",
];

const STATS = [
  { value: "10+",    label: "Years of Excellence" },
  { value: "200+",   label: "Satisfied Clients"   },
  { value: "1,500+", label: "Projects Delivered"  },
  { value: "6",      label: "Subsidiaries"        },
];

const TAGS = ["Est. 2014", "Adamawa, Nigeria", "6 Subsidiaries", "1,500+ Projects"];

export default function HeroSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
    marqueeRef.current.innerHTML = doubled
      .map(
        (item) =>
          `<span style="display:inline-flex;align-items:center;gap:1rem;padding:0 1.8rem;font-size:0.63rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#d1d5db;white-space:nowrap;font-family:'DM Sans',sans-serif;">
            ${item}
            <span style="width:5px;height:5px;border-radius:50%;background:#00ff64;flex-shrink:0;display:inline-block;"></span>
          </span>`
      )
      .join("");
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes revealUp {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseGreen {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,255,100,.5); }
          60%     { box-shadow: 0 0 0 10px rgba(0,255,100,0); }
        }
        @keyframes kenBurns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }

        .hero-font { font-family: 'DM Sans', sans-serif; }

        /* Headline — DM Serif Display for the big words */
        .hl-clip { overflow: hidden; line-height: 1; }
        .hl-line {
          display: block;
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: clamp(3.4rem, 7.5vw, 7.5rem);
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #ffffff;
          opacity: 0;
          animation: revealUp 0.9s cubic-bezier(.22,1,.36,1) forwards;
        }
        .hl-line.hl-accent {
          font-style: italic;
          color: #00ff64;
        }

        .anim-fade-up { opacity: 0; animation: fadeUp 0.75s cubic-bezier(.22,1,.36,1) forwards; }
        .anim-fade-in { opacity: 0; animation: fadeIn 0.8s ease forwards; }

        .eyebrow-dot { animation: pulseGreen 2.2s ease-in-out infinite; }
        .bg-image { animation: kenBurns 20s ease-out both; }
        .marquee-track { animation: marquee 30s linear infinite; }

        .divider-line {
          height: 1px;
          background: linear-gradient(to right, #00ff64, transparent);
          animation: lineExpand 0.8s ease forwards;
          opacity: 0;
        }

        .stat-num {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 3vw, 2.6rem);
          color: #ffffff;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-top: 0.35rem;
        }

        .cta-green {
          background: #00ff64;
          color: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 3px;
          transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
          box-shadow: 0 6px 28px rgba(0,255,100,0.3);
        }
        .cta-green:hover {
          background: #00e85a;
          box-shadow: 0 10px 36px rgba(0,255,100,0.45);
          transform: translateY(-1px);
        }
        .cta-outline {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 3px;
          border: 1.5px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.85);
          transition: border-color 0.18s, color 0.18s, background 0.18s;
        }
        .cta-outline:hover {
          border-color: #00ff64;
          color: #ffffff;
          background: rgba(0,255,100,0.04);
        }

        .pill-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 5px 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(6px);
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#0A0A0A] hero-font"
      >
        {/* ── BACKGROUND ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/heroiii.jpg"
          alt="Markbrand Nigeria"
          className="bg-image absolute inset-0 w-full h-full object-cover object-[center_25%]"
        />

        {/* Layered overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/30 to-transparent" />

        {/* ── CONTENT ── */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 xl:px-20 pb-12 pt-32">

          {/* Eyebrow tag */}
          <div
            className="anim-fade-in flex items-center gap-3 mb-7"
            style={{ animationDelay: "0.15s" }}
          >
           
          </div>

          {/* ── HEADLINE ── */}
          <div className="mb-8 space-y-0.5">
            {[
              { text: "Your Brand",     accent: false, delay: "0.3s"  },
              { text: "Deserves To Be", accent: true,  delay: "0.46s" },
              { text: "Unforgettable.", accent: false, delay: "0.62s" },
            ].map(({ text, accent, delay }) => (
              <div className="hl-clip" key={text}>
                <span className={`hl-line${accent ? " hl-accent" : ""}`} style={{ animationDelay: delay }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
         

          {/* ── COPY BLOCK — full width, single column ── */}

          {/* Who we are */}
          <div
            className="anim-fade-up mb-7 max-w-[640px]"
            style={{ animationDelay: "0.88s" }}
          >
            {/* Company name line — big and unmissable */}
            <p
              className="mb-4 leading-tight"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                fontWeight: 400,
                color: "#ffffff",
                letterSpacing: "0.01em",
              }}
            >
              We are{" "}
              <span
                style={{
                  fontWeight: 800,
                  color: "#ffffff",
                  fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Markbrand Nigeria Limited
              </span>
            </p>

            {/* Description — broken into readable punchy lines */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.35vw, 1.05rem)",
                fontWeight: 400,
                lineHeight: 1.9,
                color: "#ffffff",
              }}
            >
              Nigeria's most respected{" "}
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                commercial printing &amp; branding powerhouse
              </span>{" "}
              — helping businesses{" "}
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                stand out, speak louder,
              </span>{" "}
              and compete on a global stage for over a decade.
              <br />
              <span
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "clamp(0.97rem, 1.4vw, 1.08rem)",
                  letterSpacing: "0.005em",
                }}
              >
                We don't just build brands {" "}
                <span style={{ color: "#00ff64" }}>we build legacies.</span>
              </span>
            </p>
          </div>

          {/* CTAs */}
          <div
            className="anim-fade-up flex flex-wrap items-center gap-3 mb-7"
            style={{ animationDelay: "1.02s" }}
          >
            <a href="#contact" className="cta-green">
              Start a Project
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                <line x1="2" y1="8" x2="14" y2="8" />
                <polyline points="9,3 14,8 9,13" />
              </svg>
            </a>
            <a href="#work" className="cta-outline">
              See Our Work
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3 h-3 opacity-60">
                <line x1="2" y1="8" x2="14" y2="8" />
                <polyline points="9,3 14,8 9,13" />
              </svg>
            </a>
          </div>

          {/* Pill tags */}
          <div
            className="anim-fade-up flex flex-wrap gap-2 mb-10"
            style={{ animationDelay: "1.14s" }}
          >
            {TAGS.map((tag) => (
              <span key={tag} className="pill-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff64] flex-shrink-0" />
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row — horizontal, border-top like original */}
          <div
            className="anim-fade-up flex flex-wrap gap-0 border-t border-white/[0.1] pt-8"
            style={{ animationDelay: "1.28s" }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`pr-8 mr-8 ${i < STATS.length - 1 ? "border-r border-white/[0.1]" : ""}`}
              >
                <span className="stat-num">{s.value}</span>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARQUEE BAR ── */}
        <div className="relative z-10 bg-[#0f0f0f] border-t border-[#00ff64]/15 overflow-hidden py-4">
          <div
            ref={marqueeRef}
            className="marquee-track flex whitespace-nowrap"
            style={{ width: "max-content" }}
          />
        </div>
      </section>
    </>
  );
}