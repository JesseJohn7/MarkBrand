"use client";

import { useEffect, useRef, useState } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

const MARQUEE = ["Commercial Printing","Creative Branding","Photography","Media Production","Fashion & Tailoring","Digital Education","Marking You Out!","The World Is Your Market"];

const TIMELINE = [
  { year: "2014", event: "Founded in Yola, Adamawa State" },
  { year: "2016", event: "Expanded into media production & photography" },
  { year: "2018", event: "Launched digital education subsidiary" },
  { year: "2020", event: "Reached 500+ satisfied clients milestone" },
  { year: "2022", event: "6 subsidiaries operating across Nigeria" },
  { year: "2024", event: "1500+ projects delivered nationally" },
];

const VALUES = [
  { icon: "◆", title: "Excellence", desc: "Every print, every brand, every pixel — held to a standard that speaks for itself." },
  { icon: "◈", title: "Innovation", desc: "We push boundaries so your brand stays ahead, not behind." },
  { icon: "◇", title: "Impact", desc: "We don't measure success in projects. We measure it in legacies built." },
  { icon: "◉", title: "Integrity", desc: "Trusted by 200+ brands across Nigeria. Our word is our guarantee." },
];

export default function AboutPage() {
  const hero   = useReveal(0.05);
  const story  = useReveal(0.1);
  const values = useReveal(0.1);
  const tl     = useReveal(0.1);
  const cta    = useReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        :root {
          --g: #00ff64;
          --g2: rgba(0,255,100,0.08);
          --bk: #080808;
          --sf: #0f0f0f;
          --br: rgba(255,255,255,0.07);
          --mu: #5a5a5a;
          --tx: #e2e2e2;
        }

        .ab * { box-sizing: border-box; margin: 0; padding: 0; }
        .ab { font-family: 'Outfit', sans-serif; background: var(--bk); color: var(--tx); overflow-x: hidden; }

        /* NOISE */
        .ab::before {
          content: ''; position: fixed; inset: 0; z-index: 0;
          pointer-events: none; opacity: 0.25;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
        }

        /* REVEAL */
        .reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.75s ease, transform 0.75s ease; }
        .reveal.left  { transform: translateX(-36px); }
        .reveal.right { transform: translateX(36px); }
        .reveal.vis   { opacity: 1; transform: translate(0); }
        .d1 { transition-delay: 0s; }
        .d2 { transition-delay: 0.1s; }
        .d3 { transition-delay: 0.2s; }
        .d4 { transition-delay: 0.3s; }
        .d5 { transition-delay: 0.4s; }

        /* ═══════════════════════════
           HERO PANEL
        ═══════════════════════════ */
        .ab-hero {
          position: relative; min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr;
        }

        /* Left dark panel */
        .ah-left {
          position: relative; z-index: 2;
          background: var(--bk);
          display: flex; flex-direction: column; justify-content: center;
          padding: 10rem 4rem 6rem;
        }

        .ah-tag {
          display: flex; align-items: center; gap: 0.7rem;
          margin-bottom: 2.5rem;
        }
        .ah-tag-line { width: 2rem; height: 1.5px; background: var(--g); }
        .ah-tag-text { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--g); }

        .ah-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 8vw, 9rem);
          line-height: 0.9;
          letter-spacing: 0.01em;
          color: white;
          margin-bottom: 2.5rem;
        }
        .ah-title span { color: var(--g); display: block; }

        .ah-desc {
          font-size: 0.95rem; font-weight: 400; line-height: 1.85;
          color: rgba(226,226,226,0.65); max-width: 44ch;
          margin-bottom: 1.5rem;
        }
        .ah-desc strong { color: white; font-weight: 700; }
        .ah-desc .g { color: var(--g); font-weight: 600; }

        .ah-punch {
          font-size: 0.88rem; font-weight: 500; line-height: 1.7;
          color: rgba(226,226,226,0.5); max-width: 40ch;
          margin-bottom: 3rem;
          font-style: italic;
          border-left: 2px solid var(--g);
          padding-left: 1.2rem;
        }
        .ah-punch strong { color: rgba(226,226,226,0.85); font-style: normal; }

        /* Stats grid */
        .ah-stats {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid var(--br);
          width: fit-content;
        }
        .ah-stat {
          padding: 1.2rem 2rem;
          border-right: 1px solid var(--br);
          border-bottom: 1px solid var(--br);
        }
        .ah-stat:nth-child(even) { border-right: none; }
        .ah-stat:nth-child(n+3) { border-bottom: none; }
        .ah-stat-n {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.6rem; line-height: 1;
          color: var(--g); letter-spacing: 0.04em;
        }
        .ah-stat-l {
          font-size: 0.56rem; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--mu); margin-top: 0.25rem;
        }

        /* Right image panel */
        .ah-right {
          position: relative; overflow: hidden;
        }
        .ah-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(0.8) contrast(1.05);
          animation: kb 20s ease-out both;
        }
        @keyframes kb { from { transform: scale(1); } to { transform: scale(1.07); } }
        .ah-img-over1 { position: absolute; inset: 0; background: linear-gradient(to right, var(--bk) 0%, rgba(8,8,8,0.2) 40%, transparent 70%); }
        .ah-img-over2 { position: absolute; inset: 0; background: linear-gradient(to top, var(--bk) 0%, transparent 40%); }
        .ah-img-over3 { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(0,255,100,0.06) 0%, transparent 55%); }

        /* Floating card on image */
        .ah-float {
          position: absolute; bottom: 3rem; right: 3rem; z-index: 5;
          background: rgba(8,8,8,0.85); backdrop-filter: blur(20px);
          border: 1px solid var(--br);
          padding: 1.5rem 2rem;
          min-width: 200px;
          clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        }
        .ah-float-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g); margin-bottom: 0.7rem; }
        .ah-float-val {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem; line-height: 1; color: white; letter-spacing: 0.04em;
        }
        .ah-float-sub { font-size: 0.62rem; font-weight: 500; letter-spacing: 0.15em; color: var(--mu); margin-top: 0.3rem; text-transform: uppercase; }

        /* ═══════════════════════════
           MARQUEE
        ═══════════════════════════ */
        .mq { background: #0b0b0b; border-top: 1px solid var(--br); border-bottom: 1px solid var(--br); overflow: hidden; padding: 1rem 0; position: relative; }
        .mq::before { content:''; position:absolute; left:0; top:0; bottom:0; width:80px; background: linear-gradient(to right, #0b0b0b, transparent); z-index:2; }
        .mq::after  { content:''; position:absolute; right:0; top:0; bottom:0; width:80px; background: linear-gradient(to left, #0b0b0b, transparent); z-index:2; }
        .mq-track { display:flex; gap:3.5rem; white-space:nowrap; animation: mq 30s linear infinite; }
        @keyframes mq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-item { display:flex; align-items:center; gap:1.2rem; flex-shrink:0; }
        .mq-text { font-size:0.65rem; font-weight:600; letter-spacing:0.3em; text-transform:uppercase; color:#424242; }
        .mq-text.a { color:var(--g); }
        .mq-dot { width:4px; height:4px; border-radius:50%; background:rgba(0,255,100,0.2); }

        /* ═══════════════════════════
           STORY SECTION
        ═══════════════════════════ */
        .story-sec {
          position: relative; z-index: 1;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; min-height: 80vh;
        }

        /* Left image collage */
        .story-img-wrap {
          position: relative; overflow: hidden;
          background: var(--sf);
        }
        .story-img-main {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          filter: brightness(0.75) saturate(0.9);
        }
        .story-img-over { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,255,100,0.05) 0%, transparent 60%); }

        /* Overlapping small image */
        .story-img-thumb {
          position: absolute; bottom: 3rem; right: -2rem; z-index: 5;
          width: 42%;
          border: 3px solid var(--bk);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          filter: brightness(0.9);
        }

        /* Label badge */
        .story-label {
          position: absolute; top: 2.5rem; left: 2.5rem; z-index: 5;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem; letter-spacing: 0.3em;
          color: rgba(255,255,255,0.25);
          writing-mode: vertical-rl; text-orientation: mixed;
          transform: rotate(180deg);
        }

        /* Right text panel */
        .story-text {
          padding: 6rem 5rem;
          display: flex; flex-direction: column; justify-content: center;
          background: var(--sf);
          border-left: 1px solid var(--br);
        }
        .story-eyebrow { display:flex; align-items:center; gap:0.7rem; margin-bottom:2rem; }
        .story-eye-line { width:2rem; height:1.5px; background:var(--g); }
        .story-eye-text { font-size:0.65rem; font-weight:700; letter-spacing:0.35em; text-transform:uppercase; color:var(--g); }

        .story-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 5vw, 5.5rem);
          line-height: 0.95; letter-spacing: 0.01em;
          color: white; margin-bottom: 2rem;
        }
        .story-title em { color: var(--g); font-style: normal; }

        .story-body { font-size: 0.9rem; line-height: 1.9; color: rgba(226,226,226,0.6); margin-bottom: 1.5rem; }
        .story-body strong { color: white; font-weight: 700; }

        /* Pull quote */
        .story-quote {
          margin: 2rem 0;
          padding: 1.5rem 2rem;
          border: 1px solid var(--br);
          background: rgba(0,255,100,0.03);
          position: relative;
        }
        .story-quote::before {
          content: '"';
          font-family: 'Bebas Neue', sans-serif;
          font-size: 6rem; line-height: 1;
          color: rgba(0,255,100,0.15);
          position: absolute; top: -1rem; left: 1rem;
        }
        .story-quote p {
          font-size: 1rem; font-style: italic; font-weight: 400;
          line-height: 1.75; color: rgba(226,226,226,0.8);
          position: relative; z-index: 1;
        }
        .story-quote cite { display:block; margin-top:0.6rem; font-style:normal; font-size:0.65rem; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--g); }

        /* ═══════════════════════════
           VALUES
        ═══════════════════════════ */
        .val-sec {
          position: relative; z-index: 1;
          padding: 7rem 4rem;
          background: var(--bk);
          border-top: 1px solid var(--br);
        }
        .val-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:4rem; }
        .val-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 0.95; letter-spacing: 0.01em; color: white;
        }
        .val-title em { color: var(--g); font-style: normal; display: block; }
        .val-sub { max-width: 36ch; font-size: 0.85rem; line-height: 1.75; color: rgba(226,226,226,0.5); }

        .val-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--br); }
        .val-card {
          background: var(--sf);
          padding: 2.5rem 2rem;
          display: flex; flex-direction: column; gap: 1.2rem;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .val-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: var(--g);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s ease;
        }
        .val-card:hover { background: #131313; }
        .val-card:hover::after { transform: scaleX(1); }
        .val-icon { font-size: 1.4rem; color: var(--g); }
        .val-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem; letter-spacing: 0.05em; color: white;
        }
        .val-desc { font-size: 0.82rem; line-height: 1.8; color: rgba(226,226,226,0.5); }

        /* ═══════════════════════════
           TIMELINE
        ═══════════════════════════ */
        .tl-sec {
          position: relative; z-index: 1;
          padding: 7rem 4rem;
          background: var(--sf);
          border-top: 1px solid var(--br);
          display: grid; grid-template-columns: 38% 1fr; gap: 5rem;
        }

        .tl-left { display: flex; flex-direction: column; justify-content: center; }
        .tl-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: var(--g); margin-bottom: 1.5rem; display:flex; align-items:center; gap:0.7rem; }
        .tl-label::before { content:''; display:block; width:2rem; height:1.5px; background:var(--g); }
        .tl-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 5.5vw, 6rem);
          line-height: 0.92; letter-spacing: 0.01em;
          color: white;
        }
        .tl-title em { color: var(--g); font-style: normal; display: block; }
        .tl-body { margin-top: 1.5rem; font-size: 0.88rem; line-height: 1.85; color: rgba(226,226,226,0.5); }

        /* Timeline items */
        .tl-right { display: flex; flex-direction: column; justify-content: center; }
        .tl-list { list-style: none; }
        .tl-item {
          display: grid; grid-template-columns: 72px 24px 1fr;
          gap: 1rem; align-items: start;
          padding-bottom: 2rem; position: relative;
        }
        .tl-item::before {
          content: '';
          position: absolute; left: calc(72px + 11px); top: 28px; bottom: 0;
          width: 1px; background: var(--br);
        }
        .tl-item:last-child::before { display: none; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.15rem; letter-spacing: 0.1em; color: var(--g);
          padding-top: 2px; text-align: right;
        }
        .tl-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--g); margin-top: 6px;
          box-shadow: 0 0 12px rgba(0,255,100,0.5);
          position: relative; z-index: 1;
        }
        .tl-event { font-size: 0.88rem; font-weight: 500; line-height: 1.5; color: rgba(226,226,226,0.75); padding-top: 2px; }

        /* ═══════════════════════════
           CTA BANNER
        ═══════════════════════════ */
        .cta-sec {
          position: relative; z-index: 1;
          overflow: hidden;
          min-height: 50vh;
          display: flex; align-items: center; justify-content: center;
          border-top: 1px solid var(--br);
        }
        .cta-bg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center 40%;
          filter: brightness(0.25) saturate(0.7);
        }
        .cta-over { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,255,100,0.08) 0%, transparent 60%); }
        .cta-inner {
          position: relative; z-index: 5;
          text-align: center; padding: 5rem 2rem;
          max-width: 800px;
        }
        .cta-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.38em; text-transform: uppercase; color: var(--g); margin-bottom: 2rem; }
        .cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3.5rem, 7vw, 7rem);
          line-height: 0.95; letter-spacing: 0.01em; color: white;
          margin-bottom: 2rem;
        }
        .cta-title em { color: var(--g); font-style: normal; }
        .cta-sub { font-size: 0.95rem; font-weight: 400; line-height: 1.8; color: rgba(226,226,226,0.6); margin-bottom: 3rem; }
        .cta-btns { display: flex; align-items: center; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
        .btn-green {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 0.7rem;
          background: var(--g); color: var(--bk);
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 1.1rem 2.4rem; border: none; cursor: pointer; text-decoration: none;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
          box-shadow: 0 0 40px rgba(0,255,100,0.2);
        }
        .btn-green::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%); transform:translateX(-100%); transition:transform 0.55s ease; }
        .btn-green:hover::after { transform:translateX(100%); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 0.8rem;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(226,226,226,0.7); text-decoration: none;
          border: 1px solid var(--br); padding: 1.1rem 2.4rem;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: var(--g); color: var(--g); }

        /* RESPONSIVE */
        @media (max-width: 960px) {
          .ab-hero { grid-template-columns: 1fr; }
          .ah-right { display: none; }
          .ah-left { padding: 8rem 2rem 4rem; }
          .story-sec { grid-template-columns: 1fr; }
          .story-img-wrap { height: 50vw; }
          .story-text { padding: 4rem 2rem; }
          .val-grid { grid-template-columns: 1fr 1fr; }
          .tl-sec { grid-template-columns: 1fr; padding: 4rem 2rem; gap: 3rem; }
          .val-sec { padding: 4rem 2rem; }
          .val-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .ah-stats { grid-template-columns: repeat(4, 1fr); }
          .ah-stat:nth-child(even) { border-right: 1px solid var(--br); }
          .ah-stat:nth-child(4) { border-right: none; }
        }
        @media (max-width: 540px) {
          .val-grid { grid-template-columns: 1fr; }
          .ah-stats { grid-template-columns: 1fr 1fr; }
          .ah-stat:nth-child(even) { border-right: none; }
          .cta-btns { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="ab">

        {/* ═══ HERO ═══ */}
        <section className="ab-hero" id="about">
          <div
            ref={hero.ref as React.RefObject<HTMLDivElement>}
            className="ah-left"
          >
            <div className={`ah-tag reveal d1 ${hero.vis ? "vis" : ""}`}>
              
              <span className="ah-tag-text">Our Story</span>
            </div>
            <h1 className={`ah-title reveal d2 ${hero.vis ? "vis" : ""}`}>
              About<br /><span>Markbrand.</span>
            </h1>
            <p className={`ah-desc reveal d3 ${hero.vis ? "vis" : ""}`}>
              We are <strong>Markbrand Nigeria Limited</strong> — Adamawa's most respected commercial printing and branding powerhouse. For over a decade we've helped businesses <span className="g">stand out, speak louder,</span> and compete on a global stage.
            </p>
            <p className={`ah-punch reveal d4 ${hero.vis ? "vis" : ""}`}>
              From world-class print to bold identity design — we don't just build brands, we build <strong>legacies.</strong>
            </p>
            <div className={`ah-stats reveal d5 ${hero.vis ? "vis" : ""}`}>
              {[["10+","Years"],["200+","Clients"],["1500+","Projects"],["6","Subsidiaries"]].map(([v,l]) => (
                <div key={l} className="ah-stat">
                  <div className="ah-stat-n">{v}</div>
                  <div className="ah-stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ah-right">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=90" alt="Markbrand studio" className="ah-img" />
            <div className="ah-img-over1" />
            <div className="ah-img-over2" />
            <div className="ah-img-over3" />
            <div className="ah-float">
              <div className="ah-float-label">Established</div>
              <div className="ah-float-val">2014</div>
              <div className="ah-float-sub">Yola, Adamawa State</div>
            </div>
          </div>
        </section>

        {/* ═══ MARQUEE ═══ */}
        <div className="mq">
          <div className="mq-track">
            {[...Array(2)].flatMap((_, a) =>
              MARQUEE.map((item, i) => (
                <span key={`${a}-${i}`} className="mq-item">
                  <span className={`mq-text ${item === "Creative Branding" || item === "Marking You Out!" ? "a" : ""}`}>{item}</span>
                  <span className="mq-dot" />
                </span>
              ))
            )}
          </div>
        </div>

        {/* ═══ STORY ═══ */}
        <section className="story-sec" ref={story.ref as React.RefObject<HTMLDivElement>}>
          <div className="story-img-wrap">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85" alt="Markbrand work" className="story-img-main" />
            <div className="story-img-over" />
            <img
              src="https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=500&q=80"
              alt="Brand work"
              className="story-img-thumb"
            />
            <div className="story-label">Markbrand Nigeria</div>
          </div>

          <div className="story-text">
            <div className={`story-eyebrow reveal d1 ${story.vis ? "vis" : ""}`}>
              <span className="story-eye-line" />
              <span className="story-eye-text">Our Mission</span>
            </div>
            <h2 className={`story-title reveal d2 ${story.vis ? "vis" : ""}`}>
              Marking You<br /><em>Out.</em>
            </h2>
            <p className={`story-body reveal d3 ${story.vis ? "vis" : ""}`}>
              Founded in 2014 in the heart of <strong>Yola, Adamawa State</strong>, Markbrand Nigeria Limited was born from a simple but radical belief: that every business, no matter its size, deserves a brand that commands attention.
            </p>
            <p className={`story-body reveal d4 ${story.vis ? "vis" : ""}`}>
              We've grown from a single printing press to a multi-subsidiary powerhouse spanning <strong>commercial printing, media production, photography, fashion, and digital education</strong> — serving 200+ brands across Nigeria and beyond.
            </p>
            <div className={`story-quote reveal d5 ${story.vis ? "vis" : ""}`}>
              <p>"We don't just put ink on paper. We put your story in front of the people who need to hear it most."
                <cite>— Markbrand Team</cite>
              </p>
            </div>
          </div>
        </section>

        {/* ═══ VALUES ═══ */}
        <section className="val-sec" ref={values.ref as React.RefObject<HTMLDivElement>}>
          <div className={`val-header reveal ${values.vis ? "vis" : ""}`}>
            <div className="val-title">
              What We<br /><em>Stand For</em>
            </div>
            <p className="val-sub">The principles that drive every project, every print, every brand we touch.</p>
          </div>
          <div className="val-grid">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`val-card reveal d${i + 1} ${values.vis ? "vis" : ""}`}
              >
                <span className="val-icon">{v.icon}</span>
                <div className="val-name">{v.title}</div>
                <p className="val-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ TIMELINE ═══ */}
        <section className="tl-sec" ref={tl.ref as React.RefObject<HTMLDivElement>}>
          <div className="tl-left">
            <div className={`reveal ${tl.vis ? "vis" : ""}`}>
              <div className="tl-label">Our Journey</div>
              <h2 className="tl-title">A Decade<br />of <em>Impact</em></h2>
              <p className="tl-body">From a single storefront in Yola to a nationally recognised brand studio — this is how we got here.</p>
            </div>
          </div>
          <div className="tl-right">
            <ul className="tl-list">
              {TIMELINE.map((item, i) => (
                <li key={item.year} className={`tl-item reveal d${Math.min(i + 1, 5)} ${tl.vis ? "vis" : ""}`}>
                  <span className="tl-year">{item.year}</span>
                  <span className="tl-dot" />
                  <span className="tl-event">{item.event}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="cta-sec" ref={cta.ref as React.RefObject<HTMLDivElement>}>
          <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80" alt="" className="cta-bg" />
          <div className="cta-over" />
          <div className={`cta-inner reveal ${cta.vis ? "vis" : ""}`}>
            <div className="cta-label">Ready to Grow?</div>
            <h2 className="cta-title">
              Let's Build Your<br /><em>Legacy Together</em>
            </h2>
            <p className="cta-sub">
              Whether you need a bold rebrand, world-class printing, or a complete creative overhaul — we're ready. Your brand deserves more.
            </p>
            <div className="cta-btns">
              <a href="#contact" className="btn-green">
                Start a Project
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="0" y1="5" x2="12" y2="5"/><polyline points="8,1 12,5 8,9"/>
                </svg>
              </a>
              <a href="#services" className="btn-outline">Explore Services</a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}