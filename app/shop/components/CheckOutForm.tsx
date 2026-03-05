"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./Cart";
import { formatPrice } from "./Products";

const STATES = [
  "Abuja (FCT)", "Lagos", "Rivers", "Kano", "Kaduna", "Oyo", "Delta", "Anambra", "Enugu", "Imo",
  "Osun", "Ogun", "Kwara", "Kogi", "Borno", "Bauchi", "Benue", "Cross River", "Ebonyi", "Edo",
  "Ekiti", "Gombe", "Jigawa", "Kebbi", "Nasarawa", "Niger", "Plateau", "Sokoto", "Taraba",
  "Yobe", "Zamfara", "Abia", "Akwa Ibom", "Bayelsa", "Ondo", "Adamawa",
];

type Form = { firstName: string; lastName: string; email: string; phone: string; address: string; city: string; state: string; note: string; };
const empty: Form = { firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", note: "" };

export default function CheckoutForm() {
  const { items, totalPrice, clear } = useCart();
  const [form, setForm] = useState<Form>(empty);
  const [submitted, setSub] = useState(false);
  const set = (k: keyof Form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const allDigital = items.length > 0 && items.every(i => i.product.digital);
  const delivery = allDigital ? 0 : 2500;
  const total = totalPrice + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSub(true);
    clear();
  };

  // Empty cart
  if (items.length === 0 && !submitted) return (
    <div className="pt-28 min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center"
      style={{ background: "#1e0f08" }}>
      <p className="font-[Cormorant_Garamond,serif] text-3xl font-bold text-amber-100">Your cart is empty</p>
      <Link href="/shop" className="text-[0.6rem] tracking-[0.25em] uppercase text-amber-400 hover:text-amber-300 font-bold transition-colors">
        ← Back to Shop
      </Link>
    </div>
  );

  // Success
  if (submitted) return (
    <div className="pt-28 min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center"
      style={{ background: "#1e0f08" }}>
      <div className="w-16 h-16 rounded-full border-2 border-amber-400 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-7 h-7" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <div>
        <p className="font-[Cormorant_Garamond,serif] text-4xl font-bold text-amber-100 mb-2">Order Received!</p>
        <p className="text-sm text-stone-400 max-w-sm mx-auto leading-relaxed">
          Thank you, <span className="text-amber-300 font-semibold">{form.firstName}</span>. We&apos;ll contact you on{" "}
          <span className="text-amber-200">{form.phone || form.email}</span> to confirm your order and arrange payment.
        </p>
      </div>
      <Link href="/shop"
        className="inline-flex items-center gap-3 px-7 py-3.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase rounded-sm transition-colors"
        style={{ background: "#f59e0b", color: "#1e0f08" }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#fbbf24")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#f59e0b")}
      >
        Continue Shopping
      </Link>
    </div>
  );

  // Shared input field style
  const fieldStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(245,158,11,0.25)",
    color: "#f5f0eb",
    fontFamily: "'DM Mono', monospace",
    fontSize: "0.78rem",
  };

  const F = ({ k, label, type = "text", req = true, span = false }: { k: keyof Form; label: string; type?: string; req?: boolean; span?: boolean; }) => (
    <div className={span ? "sm:col-span-2" : ""}>
      <label
        className="block mb-1.5 font-bold tracking-[0.18em] uppercase"
        style={{ fontSize: "0.52rem", color: "#d4a96a", fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </label>
      <input
        type={type} required={req} value={form[k]} onChange={e => set(k, e.target.value)}
        className="w-full rounded-sm px-4 py-3 outline-none transition-all duration-200"
        style={fieldStyle}
        onFocus={e => {
          (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.7)";
          (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)";
          (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)";
        }}
        onBlur={e => {
          (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.25)";
          (e.target as HTMLElement).style.boxShadow = "none";
          (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
        }}
      />
    </div>
  );

  const sectionStyle = {
    background: "#2e1a10",
    border: "1px solid rgba(245,158,11,0.15)",
    borderRadius: "4px",
  };

  return (
    <div className="pt-20 min-h-screen" style={{ background: "#1e0f08" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-12">

        {/* Header */}
        <div className="mb-10">
          <span
            className="block mb-3 tracking-[0.4em] uppercase font-bold"
            style={{ fontSize: "0.5rem", color: "#d4a96a", fontFamily: "'DM Mono', monospace" }}
          >
            Checkout
          </span>
          <h1 className="font-[Cormorant_Garamond,serif] text-4xl sm:text-5xl font-bold" style={{ color: "#f5f0eb" }}>
            Complete Your <span className="italic" style={{ color: "#d4a96a" }}>Order.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Your Details */}
            <div className="p-6" style={sectionStyle}>
              <h2
                className="font-[Cormorant_Garamond,serif] text-2xl font-bold mb-1"
                style={{ color: "#f5f0eb" }}
              >
                Your Details
              </h2>
              <p className="mb-5" style={{ fontSize: "0.52rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                We'll use these to confirm and follow up on your order
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <F k="firstName" label="First Name" />
                <F k="lastName" label="Last Name" />
                <F k="email" label="Email Address" type="email" span />
                <F k="phone" label="Phone Number" type="tel" span />
              </div>
            </div>

            {/* Delivery Address */}
            {!allDigital && (
              <div className="p-6" style={sectionStyle}>
                <h2
                  className="font-[Cormorant_Garamond,serif] text-2xl font-bold mb-1"
                  style={{ color: "#f5f0eb" }}
                >
                  Delivery Address
                </h2>
                <p className="mb-5" style={{ fontSize: "0.52rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                  Nigeria-wide delivery — flat ₦2,500 fee
                </p>
                <div className="space-y-4">
                  <F k="address" label="Street Address" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <F k="city" label="City / LGA" />
                    <div>
                      <label
                        className="block mb-1.5 font-bold tracking-[0.18em] uppercase"
                        style={{ fontSize: "0.52rem", color: "#d4a96a", fontFamily: "'DM Mono', monospace" }}
                      >
                        State
                      </label>
                      <div className="relative">
                        <select
                          required value={form.state} onChange={e => set("state", e.target.value)}
                          className="w-full appearance-none rounded-sm px-4 py-3 pr-9 outline-none cursor-pointer transition-all duration-200"
                          style={{ ...fieldStyle }}
                          onFocus={e => {
                            (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.7)";
                            (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)";
                          }}
                          onBlur={e => {
                            (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.25)";
                            (e.target as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          <option value="" style={{ background: "#2e1a10" }}>Select state...</option>
                          {STATES.map(s => <option key={s} value={s} style={{ background: "#2e1a10" }}>{s}</option>)}
                        </select>
                        <svg viewBox="0 0 8 8" className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 pointer-events-none" stroke="#d4a96a" strokeWidth="2" fill="none">
                          <polyline points="1,2 4,6 7,2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Note */}
            <div className="p-6" style={sectionStyle}>
              <h2
                className="font-[Cormorant_Garamond,serif] text-2xl font-bold mb-1"
                style={{ color: "#f5f0eb" }}
              >
                Order Note
                <span className="font-normal text-base ml-2" style={{ color: "#7a5540" }}>(optional)</span>
              </h2>
              <p className="mb-4" style={{ fontSize: "0.52rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                Custom print text, size, colour or special instructions
              </p>
              <textarea
                rows={3} value={form.note} onChange={e => set("note", e.target.value)}
                placeholder="Any special requirements?"
                className="w-full rounded-sm px-4 py-3 outline-none resize-none transition-all duration-200"
                style={{ ...fieldStyle, color: "#f5f0eb" }}
                onFocus={e => {
                  (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.7)";
                  (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(245,158,11,0.1)";
                  (e.target as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onBlur={e => {
                  (e.target as HTMLElement).style.borderColor = "rgba(245,158,11,0.25)";
                  (e.target as HTMLElement).style.boxShadow = "none";
                  (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-sm font-bold tracking-[0.14em] uppercase transition-all duration-200"
              style={{
                background: "#f59e0b",
                color: "#1e0f08",
                fontSize: "0.7rem",
                boxShadow: "0 4px 28px rgba(245,158,11,0.3)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#fbbf24";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 36px rgba(245,158,11,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#f59e0b";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 28px rgba(245,158,11,0.3)";
              }}
            >
              Place Order — {formatPrice(total)}
            </button>

            <p
              className="text-center tracking-wide"
              style={{ fontSize: "0.5rem", color: "#7a5540", fontFamily: "'DM Mono', monospace" }}
            >
              Our team will contact you to confirm payment after placing your order.
            </p>
          </form>

          {/* ── Order Summary ── */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="p-6" style={{ ...sectionStyle, border: "1px solid rgba(245,158,11,0.25)" }}>

              <h2
                className="font-[Cormorant_Garamond,serif] text-2xl font-bold mb-1"
                style={{ color: "#f5f0eb" }}
              >
                Order Summary
              </h2>
              <p className="mb-5" style={{ fontSize: "0.52rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>
                {items.length} {items.length === 1 ? "item" : "items"} in your cart
              </p>

              <ul className="space-y-4 mb-5">
                {items.map(item => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-sm overflow-hidden shrink-0" style={{ background: "#3b1f0f" }}>
                      <Image src={item.product.image} alt={item.product.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "0.65rem", color: "#f5f0eb", lineHeight: 1.4, fontFamily: "'DM Mono', monospace" }} className="line-clamp-2">
                        {item.product.name}
                      </p>
                      <p style={{ fontSize: "0.52rem", color: "#a07850", fontFamily: "'DM Mono', monospace" }} className="mt-0.5">
                        Qty: {item.quantity}
                      </p>
                      <p style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }} className="pt-4 space-y-2">
                <div className="flex justify-between" style={{ fontSize: "0.55rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  <span>Subtotal</span>
                  <span style={{ color: "#d4a96a" }}>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: "0.55rem", color: "#a07850", fontFamily: "'DM Mono', monospace", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                  <span>Delivery</span>
                  <span style={{ color: delivery === 0 ? "#6abf7a" : "#d4a96a" }}>
                    {delivery === 0 ? "Free (Digital)" : formatPrice(delivery)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-3" style={{ borderTop: "1px solid rgba(245,158,11,0.15)" }}>
                  <span style={{ fontSize: "0.56rem", color: "#d4a96a", fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
                    Total
                  </span>
                  <span className="font-[Cormorant_Garamond,serif] text-2xl font-bold" style={{ color: "#fbbf24" }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust note */}
              <div className="mt-5 pt-4 flex items-start gap-2.5" style={{ borderTop: "1px solid rgba(245,158,11,0.1)" }}>
                <svg viewBox="0 0 20 20" className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="#d4a96a" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 2L3 7v6a8 8 0 007 7 8 8 0 007-7V7l-7-5z" strokeLinejoin="round"/>
                </svg>
                <p style={{ fontSize: "0.5rem", color: "#7a5540", fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
                  No payment now. We'll reach out to confirm your order and share payment details securely.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}