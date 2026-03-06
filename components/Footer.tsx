"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = {
  company: [
    { label: "Our Story",    href: "#about" },
    { label: "Our Team",     href: "/team" },
    { label: "Gallery",      href: "#gallery" },
    { label: "Our Services", href: "#services" },
  ],
  subsidiaries: [
    { label: "MarkStudio",            href: "#markstudio" },
    { label: "MarkTV",                href: "#marktv" },
    { label: "MarkWash",              href: "#markwash" },
    { label: "MarkJoels",             href: "#markjoels" },
    { label: "MarkFilms",             href: "#markfilms" },
    { label: "Swift Trading Academy", href: "#swift" },
  ],
  shop: [
    { label: "Shop All",    href: "/shop" },
    { label: "New Arrivals",href: "/shop" },
    { label: "Bestsellers", href: "/shop" },
    { label: "Digital",     href: "/shop" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
}

export default function Footer() {
  const router   = useRouter();
  const pathname = usePathname();
  const isHome   = pathname === "/";
  const [email, setEmail]     = useState("");
  const [subbed, setSubbed]   = useState(false);

  const handleNav = (href: string) => {
    if (href.startsWith("/")) { router.push(href); return; }
    const id = href.replace("#", "");
    if (isHome) scrollToSection(id);
    else router.push(`/#${id}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubbed(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');
        .footer-serif { font-family: 'Cormorant Garamond', serif; }
        .footer-sans  { font-family: 'Montserrat', sans-serif; }

        .footer-link {
          position: relative;
          display: inline-block;
          color: #78716c;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          transition: color 0.2s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00ff64;
          transition: width 0.25s ease;
        }
        .footer-link:hover { color: #00ff64; }
        .footer-link:hover::after { width: 100%; }

        .social-btn {
          display: flex; align-items: center; justify-content: center;
          width: 2.25rem; height: 2.25rem;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 2px;
          color: #57534e;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .social-btn:hover {
          color: #00ff64;
          border-color: rgba(0,255,100,0.4);
          background: rgba(0,255,100,0.06);
        }

        .newsletter-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e7e5e4;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          outline: none;
          transition: border-color 0.2s;
        }
        .newsletter-input::placeholder { color: #57534e; }
        .newsletter-input:focus { border-color: rgba(0,255,100,0.5); }

        .footer-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(0,255,100,0.2), transparent);
        }

        @keyframes footerPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }
        .glow-dot { animation: footerPulse 3s ease-in-out infinite; }
      `}</style>

      <footer className="footer-sans relative bg-[#080808] overflow-hidden">

        {/* Ambient glow top-left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#00ff64]/4 blur-[120px] pointer-events-none" />
        {/* Ambient glow bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#00ff64]/3 blur-[100px] pointer-events-none" />

        {/* ── TOP ACCENT LINE ── */}
        <div className="footer-divider" />

        {/* ── NEWSLETTER BAND ── */}
        <div className="relative border-b border-stone-900 py-10 px-5 sm:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[0.48rem] tracking-[0.4em] uppercase text-[#00ff64] mb-2">Stay in the loop</p>
              <h3 className="footer-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                Mark Your Inbox.
              </h3>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-0">
              {subbed ? (
                <div className="flex items-center gap-2 text-[#00ff64] text-[0.6rem] tracking-[0.14em] uppercase font-semibold">
                  <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <polyline points="2,6 5,9 10,3"/>
                  </svg>
                  You're subscribed!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="newsletter-input flex-1 sm:w-64 px-4 py-3 rounded-l-sm"
                  />
                  <button type="submit"
                    className="px-5 py-3 bg-[#00ff64] text-[#080808] text-[0.58rem] font-bold tracking-[0.18em] uppercase rounded-r-sm hover:bg-[#00e55a] transition-colors duration-200 whitespace-nowrap flex-shrink-0">
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* ── MAIN FOOTER BODY ── */}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* ── BRAND COL (spans 2 on lg) ── */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <button onClick={() => handleNav("#home")} className="mb-5 block group" aria-label="Home">
                <Image src="/logo.png" alt="MarkBrand Group Nigeria" width={160} height={54}
                  className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-200"/>
              </button>

              <p className="text-[0.68rem] text-stone-500 leading-relaxed max-w-xs mb-6">
                Nigeria's premier brand experience company. From print to media, strategy to retail — we mark you out from the crowd.
              </p>

              {/* Contact details */}
              <div className="space-y-2.5 mb-7">
                {[
                  { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", text: "Kano, Nigeria" },
                  { icon: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z", text: "+234 800 000 0000" },
                  { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6", text: "hello@markbrandgroup.com" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#00ff64] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={icon}/>
                    </svg>
                    <span className="text-[0.62rem] text-stone-500">{text}</span>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label} className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* ── COMPANY ── */}
            <div>
              <p className="text-[0.46rem] font-bold tracking-[0.32em] uppercase text-stone-600 mb-5">Company</p>
              <ul className="space-y-3">
                {LINKS.company.map(l => (
                  <li key={l.label}>
                    <button onClick={() => handleNav(l.href)} className="footer-link text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── SUBSIDIARIES ── */}
            <div>
              <p className="text-[0.46rem] font-bold tracking-[0.32em] uppercase text-stone-600 mb-5">Subsidiaries</p>
              <ul className="space-y-3">
                {LINKS.subsidiaries.map(l => (
                  <li key={l.label}>
                    <button onClick={() => handleNav(l.href)} className="footer-link text-left">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── SHOP ── */}
            <div>
              <p className="text-[0.46rem] font-bold tracking-[0.32em] uppercase text-stone-600 mb-5">Shop</p>
              <ul className="space-y-3">
                {LINKS.shop.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="footer-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Business hours */}
              <div className="mt-8">
                <p className="text-[0.46rem] font-bold tracking-[0.32em] uppercase text-stone-600 mb-4">Hours</p>
                <div className="space-y-1.5">
                  {[
                    { day: "Mon – Fri", hrs: "8am – 6pm" },
                    { day: "Saturday",  hrs: "9am – 3pm" },
                    { day: "Sunday",    hrs: "Closed" },
                  ].map(({ day, hrs }) => (
                    <div key={day} className="flex items-center justify-between gap-4">
                      <span className="text-[0.58rem] text-stone-600">{day}</span>
                      <span className={`text-[0.58rem] ${hrs === "Closed" ? "text-stone-700" : "text-stone-400"}`}>{hrs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="footer-divider" />
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            {/* Pulsing green dot */}
            <span className="glow-dot w-1.5 h-1.5 rounded-full bg-[#00ff64] block"/>
            <p className="text-[0.52rem] text-stone-700 tracking-[0.12em]">
              © {new Date().getFullYear()} MarkBrand Group Nigeria Ltd. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(item => (
              <button key={item}
                className="text-[0.48rem] tracking-[0.1em] text-stone-700 hover:text-stone-400 transition-colors duration-200 uppercase">
                {item}
              </button>
            ))}
          </div>

          <p className="text-[0.48rem] tracking-[0.24em] uppercase text-stone-800 italic footer-serif">
            Marking You Out · Since 2014
          </p>
        </div>
      </footer>
    </>
  );
}