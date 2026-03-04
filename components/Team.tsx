"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

const TEAM = [
  {
    name: "Adamu Markbrand",
    role: "Founder & CEO",
    bio: "Visionary leader with over 10 years driving Markbrand's growth across Nigeria and beyond.",
    img: "/img1.jpg",
  },
  {
    name: "Fatima Yusuf",
    role: "Creative Director",
    bio: "Award-winning designer shaping brand identities that leave a lasting impression.",
    img: "/img2.jpg",
  },
  {
    name: "Ibrahim Musa",
    role: "Head of Print",
    bio: "Master of precision print production, ensuring every project meets world-class standards.",
    img: "/img3.jpg",
  },
  {
    name: "Zainab Abubakar",
    role: "Brand Strategist",
    bio: "Crafting compelling brand narratives that connect businesses to their audience.",
    img: "/img4.jpg",
  },
  {
    name: "Emmanuel Okafor",
    role: "Media Producer",
    bio: "Bringing ideas to life through powerful visual storytelling and media production.",
    img: "/img5.jpg",
  },
  {
    name: "Hauwa Garba",
    role: "Client Relations",
    bio: "Building lasting partnerships through exceptional service and deep client understanding.",
    img: "/img6.jpg",
  },
];

export default function TeamSection() {
  const section = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans  { font-family: 'Montserrat', sans-serif; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
        .fadeUp   { animation: fadeUp   0.75s cubic-bezier(0.4,0,0.2,1) both; }
        .fadeLeft { animation: fadeLeft 0.75s cubic-bezier(0.4,0,0.2,1) both; }

        .team-card { transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease; }
        .team-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,255,100,0.08); }

        .team-img-wrap { overflow: hidden; }
        .team-img { transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .team-card:hover .team-img { transform: scale(1.05); }

        .role-line { transition: width 0.3s ease; width: 0; }
        .team-card:hover .role-line { width: 2rem; }

        .bio-reveal {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.4s ease, opacity 0.35s ease, padding 0.3s ease;
        }
        .team-card:hover .bio-reveal {
          max-height: 80px;
          opacity: 1;
        }
      `}</style>

      <section
        ref={section.ref as React.RefObject<HTMLElement>}
        className="sans bg-[#0A0A0A] py-24 sm:py-32 px-5 sm:px-8 lg:px-16 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">

          {/* ── HEADER ── */}
          <div className={`mb-16 ${section.inView ? "fadeLeft" : "opacity-0"}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#00ff64]">The People Behind the Brand</span>
            </div>
            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-4">
             <span className="italic text-[#00ff64]"> Meet Our Team.</span>
            </h2>
            <p className="text-[0.75rem] text-stone-500 max-w-sm leading-relaxed">
              A collective of creatives, strategists and print specialists dedicated to marking your brand out.
            </p>
          </div>

          {/* ── GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className={`team-card group relative bg-[#0D0D0D] border border-stone-800/70 rounded-sm overflow-hidden cursor-default
                  ${section.inView ? "fadeUp" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* image */}
                <div className="team-img-wrap relative aspect-[4/3] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-img w-full h-full object-cover object-top"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />
                  {/* green accent line top */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00ff64]/0 via-[#00ff64]/60 to-[#00ff64]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* content */}
                <div className="px-5 pb-6 pt-4">
                  {/* role */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="role-line h-px bg-[#00ff64]" />
                    <span className="text-[0.5rem] tracking-[0.3em] uppercase text-[#00ff64]/80 font-medium">
                      {member.role}
                    </span>
                  </div>

                  {/* name */}
                  <h3 className="serif text-xl sm:text-2xl font-bold text-stone-100 leading-tight mb-1">
                    {member.name}
                  </h3>

                  {/* bio — slides in on hover */}
                  <div className="bio-reveal">
                    <p className="text-[0.7rem] text-stone-500 leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* bottom green glow on hover */}
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#00ff64]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}