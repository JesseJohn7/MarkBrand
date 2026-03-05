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
    <div className="pt-28 min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="font-[Cormorant_Garamond,serif] text-3xl font-bold text-black">Your cart is empty</p>
      <Link href="/shop" className="text-[0.6rem] tracking-[0.25em] uppercase text-stone-800 hover:text-stone-500 font-bold transition-colors">
        ← Back to Shop
      </Link>
    </div>
  );

  // Success
  if (submitted) return (
    <div className="pt-28 min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="w-16 h-16 rounded-full border-2 border-[#00ff64] flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-[#00ff64]" strokeWidth="2.5" fill="none" strokeLinecap="round">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>
      <div>
        <p className="font-[Cormorant_Garamond,serif] text-4xl font-bold text-stone-100 mb-2">Order Received!</p>
        <p className="text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
          Thank you, {form.firstName}. We&apos;ll contact you on{" "}
          <span className="text-stone-300">{form.phone || form.email}</span> to confirm your order and arrange payment.
        </p>
      </div>
      <Link href="/shop" className="inline-flex items-center gap-3 px-7 py-3.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] rounded-sm hover:bg-[#00e85a] transition-colors">
        Continue Shopping
      </Link>
    </div>
  );

  const F = ({ k, label, type = "text", req = true, span = false }: { k: keyof Form; label: string; type?: string; req?: boolean; span?: boolean; }) => (
    <div className={span ? "sm:col-span-2" : ""}>
      <label className="block text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 mb-1.5">{label}</label>
      <input type={type} required={req} value={form[k]} onChange={e => set(k, e.target.value)}
        className="w-full bg-stone-900/40 border border-stone-800 rounded-sm px-4 py-2.5 text-sm text-stone-200 focus:outline-none focus:border-[#00ff64]/60 transition-colors" />
    </div>
  );

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {/* <span className="h-px w-8 bg-[#00ff64] shrink-0" /> */}
            <span className="text-[0.52rem] tracking-[0.4em] uppercase text-slate-500">Checkout</span>
          </div>
          <h1 className="font-[Cormorant_Garamond,serif] text-4xl sm:text-5xl font-bold text-stone-100">
             <span className="italic text-slate-700">Complete Your Order.</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="bg-[#0D0D0D] border border-stone-800/60 rounded-sm p-6">
              <h2 className="font-[Cormorant_Garamond,serif] text-xl font-bold text-stone-200 mb-5">Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <F k="firstName" label="First Name" />
                <F k="lastName" label="Last Name" />
                <F k="email" label="Email" type="email" span />
                <F k="phone" label="Phone Number" type="tel" span />
              </div>
            </div>

            {!allDigital && (
              <div className="bg-[#0D0D0D] border border-stone-800/60 rounded-sm p-6">
                <h2 className="font-[Cormorant_Garamond,serif] text-xl font-bold text-stone-200 mb-5">Delivery Address</h2>
                <div className="space-y-4">
                  <F k="address" label="Street Address" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <F k="city" label="City / LGA" />
                    <div>
                      <label className="block text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 mb-1.5">State</label>
                      <select required value={form.state} onChange={e => set("state", e.target.value)}
                        className="w-full bg-stone-900/40 border border-stone-800 rounded-sm px-4 py-2.5 text-sm text-stone-400 focus:outline-none focus:border-[#00ff64]/60 cursor-pointer transition-colors">
                        <option value="">Select state...</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#0D0D0D] border border-stone-800/60 rounded-sm p-6">
              <h2 className="font-[Cormorant_Garamond,serif] text-xl font-bold text-stone-200 mb-1">
                Order Note <span className="text-stone-600 font-normal text-sm">(optional)</span>
              </h2>
              <p className="text-[0.52rem] text-stone-600 mb-4">Custom print text, size, colour or special instructions</p>
              <textarea rows={3} value={form.note} onChange={e => set("note", e.target.value)} placeholder="Any special requirements?"
                className="w-full bg-stone-900/40 border border-stone-800 rounded-sm px-4 py-2.5 text-sm text-stone-200 placeholder:text-stone-700 focus:outline-none focus:border-[#00ff64]/60 resize-none transition-colors" />
            </div>

            <button type="submit"
              className="w-full py-4 text-[0.7rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#00ff64] hover:bg-[#00e85a] rounded-sm transition-colors shadow-[0_4px_28px_rgba(0,255,100,0.25)]">
              Place Order — {formatPrice(total)}
            </button>
            <p className="text-[0.5rem] text-stone-700 text-center tracking-wide">
              Our team will contact you to confirm payment after placing your order.
            </p>
          </form>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#0D0D0D] border border-stone-800/60 rounded-sm p-6">
              <h2 className="font-[Cormorant_Garamond,serif] text-xl font-bold text-stone-200 mb-5">Order Summary</h2>
              <ul className="space-y-4 mb-5">
                {items.map(item => (
                  <li key={item.product.id} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-sm overflow-hidden shrink-0 bg-stone-900">
                      <Image src={item.product.image} alt={item.product.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.63rem] text-stone-300 leading-snug line-clamp-2">{item.product.name}</p>
                      <p className="text-[0.52rem] text-stone-600 mt-0.5">Qty: {item.quantity}</p>
                      <p className="text-[0.65rem] font-bold text-[#00ff64]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-stone-800/60 pt-4 space-y-2">
                <div className="flex justify-between text-[0.55rem] tracking-[0.16em] uppercase text-stone-600">
                  <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[0.55rem] tracking-[0.16em] uppercase text-stone-600">
                  <span>Delivery</span><span>{delivery === 0 ? "Free (Digital)" : formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-800/60">
                  <span className="text-[0.56rem] tracking-[0.2em] uppercase text-stone-400">Total</span>
                  <span className="font-[Cormorant_Garamond,serif] text-xl font-bold text-[#00ff64]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}