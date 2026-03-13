"use client";

import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

const STATS = [
  { value: "10+",    label: "Years" },
  { value: "200+",   label: "Clients" },
  { value: "1,500+", label: "Projects" },
  { value: "6",      label: "Subsidiaries" },
];

export default function AboutSection() {
  const sec = useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&display=swap');

        :root {
          --g: #00ff64;
          --g-dim: rgba(0,255,100,0.12);
          --bk: #080808;
          --sf: #0e0e0e;
          --br: rgba(255,255,255,0.08);
          --tx: #e8e8e8;
          --mu: rgba(232,232,232,0.45);
        }

        .ab-wrap {
          font-family: 'Urbanist', sans-serif;
          background: var(--bk);
          color: var(--tx);
          overflow-x: hidden;
          position: relative;
        }

        /* ── Scroll reveal ── */
        .rv { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .rv.in { opacity: 1; transform: none; }
        .rv.d1 { transition-delay: 0s; }
        .rv.d2 { transition-delay: 0.1s; }
        .rv.d3 { transition-delay: 0.2s; }
        .rv.d4 { transition-delay: 0.3s; }
        .rv.d5 { transition-delay: 0.4s; }
        .rv.d6 { transition-delay: 0.5s; }

        /* ════════════════════════════
           ABOUT HERO — 2 col split
        ════════════════════════════ */
        .ab-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 92vh;
          border-bottom: 1px solid var(--br);
        }

        /* LEFT col */
        .ab-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 9rem 5rem 6rem 5rem;
          background: var(--bk);
          position: relative;
        }

        /* subtle green glow bottom left */
        .ab-left::before {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 340px; height: 340px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,255,100,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* eyebrow */
        .ab-eye {
          display: flex; align-items: center; gap: 0.8rem;
          margin-bottom: 2.2rem;
        }
        .ab-eye-bar { width: 28px; height: 2px; background: var(--g); border-radius: 2px; }
        .ab-eye-txt {
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.38em; text-transform: uppercase;
          color: var(--g);
        }

        /* Main title */
        .ab-title {
          font-family: 'Fraunces', serif;
          font-size: clamp(3rem, 5.5vw, 5.2rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .ab-title-sub {
          font-family: 'Fraunces', serif;
          font-size: clamp(3rem, 5.5vw, 5.2rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: var(--g);
          margin-bottom: 2.4rem;
        }

        /* Who we are pill */
        .ab-who {
          display: inline-flex; align-items: center; gap: 0.6rem;
          margin-bottom: 1.8rem;
          padding: 0.5rem 1rem;
          background: var(--g-dim);
          border: 1px solid rgba(0,255,100,0.2);
          border-radius: 4px;
          width: fit-content;
        }
        .ab-who-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--g); flex-shrink: 0; }
        .ab-who-name {
          font-size: 0.72rem; font-weight: 800;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--g);
        }

        /* Description */
        .ab-desc {
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          font-weight: 400;
          line-height: 1.85;
          color: rgba(232,232,232,0.65);
          max-width: 46ch;
          margin-bottom: 1.4rem;
        }
        .ab-desc b { color: #ffffff; font-weight: 700; }
        .ab-desc .hi { color: var(--g); font-weight: 600; }

        /* Legacy line */
        .ab-legacy {
          font-family: 'Fraunces', serif;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          font-weight: 700;
          font-style: italic;
          line-height: 1.5;
          color: #ffffff;
          padding-left: 1.2rem;
          border-left: 2.5px solid var(--g);
          margin-bottom: 3rem;
        }
        .ab-legacy span { color: var(--g); }

        /* Stats row */
        .ab-stats {
          display: flex; gap: 0;
          border: 1px solid var(--br);
          width: fit-content;
        }
        .ab-stat {
          padding: 1rem 1.8rem;
          border-right: 1px solid var(--br);
          min-width: 90px;
        }
        .ab-stat:last-child { border-right: none; }
        .ab-stat-n {
          font-family: 'Urbanist', sans-serif;
          font-size: 1.9rem; font-weight: 900;
          line-height: 1; letter-spacing: -0.03em;
          color: var(--g);
        }
        .ab-stat-l {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(232,232,232,0.35);
          margin-top: 0.3rem;
        }

        /* RIGHT col — image */
        .ab-right {
          position: relative; overflow: hidden;
          background: #0a0a0a;
        }
        .ab-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(0.7) saturate(0.85);
          animation: kb 22s ease-out both;
        }
        @keyframes kb { from { transform: scale(1); } to { transform: scale(1.06); } }

        .ab-img-o1 { position:absolute; inset:0; background: linear-gradient(to right, var(--bk) 0%, rgba(8,8,8,0.1) 35%, transparent 65%); }
        .ab-img-o2 { position:absolute; inset:0; background: linear-gradient(to top, var(--bk) 0%, transparent 40%); }
        .ab-img-o3 { position:absolute; inset:0; background: radial-gradient(ellipse at 70% 30%, rgba(0,255,100,0.05) 0%, transparent 55%); }

        /* Floating "Est." badge */
        .ab-badge {
          position: absolute; bottom: 2.5rem; right: 2.5rem; z-index: 5;
          background: rgba(8,8,8,0.82);
          backdrop-filter: blur(16px);
          border: 1px solid var(--br);
          padding: 1.4rem 1.8rem;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        }
        .ab-badge-lbl {
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--g); margin-bottom: 0.5rem;
        }
        .ab-badge-year {
          font-family: 'Fraunces', serif;
          font-size: 2.8rem; font-weight: 700; line-height: 1;
          color: #ffffff; letter-spacing: -0.02em;
        }
        .ab-badge-place {
          font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(232,232,232,0.35); margin-top: 0.4rem;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ab-hero { grid-template-columns: 1fr; min-height: auto; }
          .ab-right { height: 55vw; min-height: 280px; }
          .ab-left { padding: 7rem 2rem 4rem; }
          .ab-stats { flex-wrap: wrap; }
          .ab-img-o1 { background: linear-gradient(to top, var(--bk) 0%, rgba(8,8,8,0.3) 40%, transparent 70%); }
        }
        @media (max-width: 500px) {
          .ab-stat { padding: 0.9rem 1.2rem; min-width: 70px; }
          .ab-stat-n { font-size: 1.5rem; }
        }
      `}</style>

      <div className="ab-wrap">
        <section className="ab-hero" id="about">

          {/* ── LEFT ── */}
          <div
            ref={sec.ref as React.RefObject<HTMLDivElement>}
            className="ab-left"
          >
            {/* Eyebrow */}
            <div className={`ab-eye rv d1 ${sec.vis ? "in" : ""}`}>
              <div className="ab-eye-bar" />
              <span className="ab-eye-txt">Our Story</span>
            </div>

            {/* Title */}
            <div className={`rv d2 ${sec.vis ? "in" : ""}`}>
              <h2 className="ab-title">About</h2>
              <h2 className="ab-title-sub">Markbrand.</h2>
            </div>

            {/* Company name chip */}
            <div className={`ab-who rv d3 ${sec.vis ? "in" : ""}`}>
              <span className="ab-who-dot" />
              <span className="ab-who-name">Markbrand Nigeria Limited</span>
            </div>

            {/* Description */}
            <p className={`ab-desc rv d3 ${sec.vis ? "in" : ""}`}>
              Adamawa's most respected{" "}
              <b>commercial printing &amp; branding powerhouse</b> — helping
              businesses{" "}
              <span className="hi">stand out, speak louder,</span> and compete
              on a global stage for over a decade.
            </p>

            {/* Legacy pull quote */}
            <p className={`ab-legacy rv d4 ${sec.vis ? "in" : ""}`}>
              We don't just build brands —{" "}
              <span>we build legacies.</span>
            </p>

            {/* Stats */}
            <div className={`ab-stats rv d5 ${sec.vis ? "in" : ""}`}>
              {STATS.map((s) => (
                <div key={s.label} className="ab-stat">
                  <div className="ab-stat-n">{s.value}</div>
                  <div className="ab-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="ab-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/heroiii.jpg"
              alt="Markbrand Nigeria studio"
              className="ab-img"
            />
            <div className="ab-img-o1" />
            <div className="ab-img-o2" />
            <div className="ab-img-o3" />

            {/* Floating Est. card */}
            <div className="ab-badge">
              <div className="ab-badge-lbl">Established</div>
              <div className="ab-badge-year">2014</div>
              <div className="ab-badge-place">Yola, Adamawa State</div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}