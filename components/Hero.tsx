"use client";

import { useEffect, useRef, useState } from "react";

function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const SIZE = 40;
    let raf: number;
    const pixels: { x: number; y: number; phase: number; speed: number }[] = [];
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pixels.length = 0;
      const cols = Math.ceil(canvas.width / SIZE) + 1;
      const rows = Math.ceil(canvas.height / SIZE) + 1;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          if (Math.random() < 0.09)
            pixels.push({ x: c * SIZE, y: r * SIZE, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.8 });
    };
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      pixels.forEach((p) => {
        const a = ((Math.sin(t * p.speed + p.phase) + 1) / 2) * 0.22;
        ctx.fillStyle = `rgba(0,255,100,${a})`;
        ctx.fillRect(p.x, p.y, SIZE - 2, SIZE - 2);
      });
      raf = requestAnimationFrame(draw);
    };
    init(); draw();
    window.addEventListener("resize", () => { cancelAnimationFrame(raf); init(); draw(); });
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let v = 0;
      const step = to / 60;
      const tick = () => { v = Math.min(v + step, to); setVal(Math.floor(v)); if (v < to) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const SERVICES = [
  { icon: "◈", title: "Brand Identity & Logo Design", desc: "Cohesive, memorable identities that speak louder than words." },
  { icon: "⬡", title: "Web UI/UX Design", desc: "Intuitive, conversion-driven experiences users love." },
  { icon: "▶", title: "Motion & Animation", desc: "Fluid motion graphics that bring your brand to life." },
  { icon: "◉", title: "Social Media Design", desc: "Scroll-stopping visuals that grow your audience." },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  * { font-family: 'Space Grotesk', sans-serif; }
  .mono { font-family: 'Space Mono', monospace !important; }

  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes glow     { 0%,100%{text-shadow:0 0 24px rgba(0,255,100,.55),0 0 70px rgba(0,255,100,.18)} 50%{text-shadow:0 0 55px rgba(0,255,100,1),0 0 130px rgba(0,255,100,.35)} }
  @keyframes bpulse   { 0%,100%{border-color:rgba(0,255,100,.22)} 50%{border-color:rgba(0,255,100,.65);box-shadow:0 0 22px rgba(0,255,100,.14)} }
  @keyframes dotpulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(.65);opacity:.5} }
  @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes floatpx  { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.22} 50%{transform:translateY(-20px) rotate(45deg);opacity:.7} }
  @keyframes scanline { 0%{top:-30%} 100%{top:130%} }
  @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }
  @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spinRev  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes pingRing { 0%{transform:scale(.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }

  .f1{animation:fadeUp .75s .08s both} .f2{animation:fadeUp .75s .22s both}
  .f3{animation:fadeUp .75s .36s both} .f4{animation:fadeUp .75s .5s both} .f5{animation:fadeUp .75s .65s both}
  .glow-green{animation:glow 3s ease-in-out infinite}
  .badge-pulse{animation:bpulse 2.5s ease-in-out infinite}
  .dot-pulse{animation:dotpulse 2s ease-in-out infinite}
  .cursor-blink{animation:blink 1s step-end infinite}
  .scan-anim{animation:scanline 9s linear infinite}
  .spin-slow{animation:spinSlow 18s linear infinite}
  .spin-rev{animation:spinRev 12s linear infinite}
  .ping-ring{animation:pingRing 2s ease-out infinite}

  .btn-green {
    position:relative; overflow:hidden; background:#00ff64; color:#000; font-weight:700;
    padding:14px 34px; border-radius:9999px; font-size:14px; border:none; cursor:pointer;
    text-decoration:none; font-family:'Space Grotesk',sans-serif;
    transition:transform .3s,box-shadow .3s; display:inline-flex; align-items:center; gap:8px;
  }
  .btn-green:hover{transform:translateY(-3px);box-shadow:0 0 50px rgba(0,255,100,.5),0 10px 30px rgba(0,255,100,.3)}

  .btn-outline {
    display:inline-flex; align-items:center; gap:8px; background:transparent; color:#00ff64;
    font-weight:600; padding:13px 32px; border-radius:9999px; font-size:14px;
    border:1px solid rgba(0,255,100,.35); cursor:pointer; text-decoration:none;
    font-family:'Space Grotesk',sans-serif; transition:all .3s;
  }
  .btn-outline:hover{background:rgba(0,255,100,.07);border-color:rgba(0,255,100,.75);box-shadow:0 0 28px rgba(0,255,100,.18);transform:translateY(-2px)}

  .nav-link{color:rgba(180,255,200,.42);text-decoration:none;font-size:13px;font-weight:500;position:relative;padding-bottom:3px;transition:color .25s}
  .nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:#00ff64;transition:width .3s}
  .nav-link:hover{color:#00ff64} .nav-link:hover::after{width:100%}

  .service-card{position:relative;overflow:hidden;background:rgba(6,20,10,.85);border:1px solid rgba(0,255,100,.1);border-radius:20px;padding:28px 24px;transition:all .4s;cursor:default}
  .service-card::before{content:'';position:absolute;top:0;right:0;width:32px;height:32px;border-bottom:1px solid rgba(0,255,100,.22);border-left:1px solid rgba(0,255,100,.22);background:rgba(0,255,100,.03)}
  .service-card:hover{transform:translateY(-8px);border-color:rgba(0,255,100,.38);box-shadow:0 0 50px rgba(0,255,100,.08),0 20px 40px rgba(0,0,0,.3)}

  .stat-item{position:relative;transition:background .3s;cursor:default}
  .stat-item::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:1px;background:#00ff64;transition:width .4s}
  .stat-item:hover{background:rgba(0,255,100,.03)} .stat-item:hover::after{width:65%}

  ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#060d08} ::-webkit-scrollbar-thumb{background:rgba(0,255,100,.3);border-radius:2px}
`;

export default function PixelHero() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const floats = [
    { size:14,left:"7%",top:"18%",dur:"3.5s",delay:".2s"},{size:9,left:"16%",top:"58%",dur:"4s",delay:".8s"},
    { size:20,left:"79%",top:"20%",dur:"3.2s",delay:"0s"},{size:10,left:"88%",top:"64%",dur:"4.5s",delay:"1s"},
    { size:24,left:"4%",top:"76%",dur:"3.8s",delay:".5s"},{size:12,left:"93%",top:"38%",dur:"2.9s",delay:"1.5s"},
    { size:8,left:"54%",top:"87%",dur:"4.2s",delay:".3s"},{size:16,left:"32%",top:"11%",dur:"3.6s",delay:".9s"},
    { size:11,left:"67%",top:"81%",dur:"3.3s",delay:".6s"},{size:18,left:"43%",top:"5%",dur:"5s",delay:"1.2s"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="bg-[#060d08] text-[#f0fff4] min-h-screen overflow-x-hidden">

        {/* NAV */}

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 90% 60% at 50% -5%, rgba(0,255,100,0.08), transparent)"}}/>
            <div className="absolute inset-0" style={{background:"radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,140,55,0.05), transparent)"}}/>
            <div className="absolute inset-0 opacity-[0.035]" style={{backgroundImage:"radial-gradient(rgba(0,255,100,0.9) 1px, transparent 1px)",backgroundSize:"32px 32px"}}/>
            <PixelGrid/>
            <div className="scan-anim absolute left-0 right-0 pointer-events-none" style={{height:280,background:"linear-gradient(to bottom, transparent, rgba(0,255,100,0.016), transparent)"}}/>
            {floats.map((sq,i)=>(
              <div key={i} className="absolute border border-[rgba(0,255,100,0.2)] bg-[rgba(0,255,100,0.04)]"
                style={{width:sq.size,height:sq.size,left:sq.left,top:sq.top,animation:`floatpx ${sq.dur} ${sq.delay} ease-in-out infinite`}}/>
            ))}
          </div>

          {/* Orbital rings */}
          <div className="absolute right-[6%] top-[15%] opacity-20 pointer-events-none hidden lg:block">
            <div className="spin-slow w-48 h-48 rounded-full border border-[rgba(0,255,100,0.3)] flex items-center justify-center">
              <div className="spin-rev w-32 h-32 rounded-full border border-dashed border-[rgba(0,255,100,0.25)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#00ff64] opacity-60" style={{boxShadow:"0 0 16px #00ff64"}}/>
              </div>
            </div>
          </div>
          <div className="absolute left-[5%] bottom-[20%] opacity-15 pointer-events-none hidden lg:block">
            <div className="spin-rev w-36 h-36 rounded-full border border-[rgba(0,255,100,0.25)] flex items-center justify-center">
              <div className="spin-slow w-20 h-20 rounded-full border border-dashed border-[rgba(0,255,100,0.2)]"/>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl w-full">
            <div className="f1 badge-pulse inline-flex items-center gap-2.5 border rounded-full px-4 py-[7px] mb-9 bg-[rgba(0,255,100,0.05)] backdrop-blur-md" style={{borderColor:"rgba(0,255,100,0.28)"}}>
              <span className="dot-pulse w-2 h-2 rounded-full bg-[#00ff64]" style={{boxShadow:"0 0 8px #00ff64"}}/>
              <span className="mono text-[10px] tracking-[3px] text-[#00ff64] opacity-85">MarkBrand</span>
              <span className="w-px h-3 bg-[rgba(0,255,100,0.3)]"/>
              <span className="text-[11px] text-[rgba(180,255,200,0.45)] tracking-wide">Creative Branding Agency</span>
            </div>

            <div className="f2 mb-6">
              <h1 className="font-extrabold leading-[1.04]" style={{letterSpacing:"-1.5px"}}>
                <span className="block text-[clamp(40px,7.5vw,82px)] text-[#f0fff4]">Turning Visions into</span>
                <span className="glow-green block text-[clamp(40px,7.5vw,82px)] text-[#00ff64]">Iconic Brands<span className="cursor-blink">_</span></span>
              </h1>
            </div>

            <p className="f3 text-[rgba(180,255,200,0.42)] text-base md:text-lg leading-relaxed max-w-[460px] mx-auto mb-11">
              Helping businesses stand out through bold design and strategic branding — built to be remembered long after first glance.
            </p>

            <div className="f4 flex gap-4 justify-center flex-wrap">
              <a href="#" className="btn-green">Get Started <span style={{opacity:.7}}>→</span></a>
              <a href="#" className="btn-outline">See Our Work ↗</a>
            </div>

            <div className="f5 mt-5 flex items-center justify-center gap-2">
              <div className="relative w-2 h-2">
                <span className="ping-ring absolute inset-0 rounded-full border border-[#00ff64] opacity-75"/>
                <span className="block w-2 h-2 rounded-full bg-[#00ff64]"/>
              </div>
              <span className="text-[11px] text-[rgba(0,255,100,0.5)] tracking-widest mono">AVAILABLE FOR NEW PROJECTS</span>
            </div>

            <div className="f5 mt-14 flex flex-col items-center gap-2 opacity-30">
              <span className="mono text-[9px] tracking-[5px] text-[#00ff64] uppercase">Scroll</span>
              <div className="w-px h-10 bg-gradient-to-b from-[#00ff64] to-transparent"/>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="border-t border-b border-[rgba(0,255,100,0.12)] bg-[rgba(6,13,8,0.9)] backdrop-blur-md">
          <div className="max-w-4xl mx-auto grid grid-cols-3">
            {[{n:500,s:"+",label:"Projects Completed"},{n:600,s:"+",label:"Happy Clients"},{n:7,s:"+",label:"Industry Awards"}].map((st,i)=>(
              <div key={i} className={`stat-item px-8 py-12 text-center ${i<2?"border-r border-[rgba(0,255,100,0.1)]":""}`}>
                <div className="mono text-[clamp(34px,5vw,56px)] font-bold text-[#00ff64] leading-none mb-2.5"><Counter to={st.n} suffix={st.s}/></div>
                <div className="text-[11px] tracking-[2px] text-[rgba(180,255,200,0.28)] uppercase">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden border-b border-[rgba(0,255,100,0.07)] py-4 bg-black/30">
          <div className="flex whitespace-nowrap" style={{animation:"marquee 26s linear infinite"}}>
            {Array.from({length:3}).flatMap((_,gi)=>
              ["Brand Identity","Web Design","Motion Graphics","Creative Strategy","Logo Design","UI/UX Design","Art Direction","Print & Packaging"].map((t,i)=>(
                <span key={`${gi}-${i}`} className="mono inline-flex items-center gap-3 mx-8 text-[10px] tracking-[3px] text-[rgba(0,255,100,0.28)] uppercase">
                  <span className="w-1 h-1 rounded-full bg-[rgba(0,255,100,0.4)] inline-block flex-shrink-0"/>{t}
                </span>
              ))
            )}
          </div>
        </div>

       

       

      </div>
    </>
  );
}