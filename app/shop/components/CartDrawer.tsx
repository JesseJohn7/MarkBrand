"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./Cart";
import { formatPrice } from "./Products";

export default function CartDrawer() {
  const { items, open, closeCart, remove, update, totalPrice, totalItems } = useCart();
  const delivery   = items.length === 0 ? 0 : items.every(i => i.product.digital) ? 0 : 2500;
  const grandTotal = totalPrice + delivery;

  return (
    <>
      {/* Backdrop */}
      <div onClick={closeCart} aria-hidden
        className={`fixed inset-0 bg-black/70 z-[60] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}/>

      {/* Panel */}
      <div className={`fixed top-0 right-0 h-[100dvh] w-full max-w-[360px] bg-[#0D0D0D] border-l border-stone-700 z-[70] flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Top white accent bar */}
        <div className="h-[2px] w-full bg-white shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800 shrink-0">
          <div>
            <p className="text-[0.48rem] tracking-[0.35em] uppercase text-stone-500 mb-0.5">Your Order</p>
            <h2 className="font-[Cormorant_Garamond,serif] text-2xl font-bold text-white">Cart ({totalItems})</h2>
          </div>
          <button onClick={closeCart} aria-label="Close"
            className="w-8 h-8 flex items-center justify-center border border-stone-600 hover:border-white hover:bg-white/5 rounded-sm transition-all">
            <svg viewBox="0 0 12 12" className="w-3 h-3 stroke-stone-300" strokeWidth="2" fill="none">
              <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5">
              <div className="w-16 h-16 border border-stone-700 rounded-sm flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-stone-500" strokeWidth="1.5" fill="none" strokeLinecap="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-stone-300 mb-1 font-medium">Your cart is empty</p>
                <p className="text-[0.55rem] text-stone-600">Add products to get started</p>
              </div>
              <button onClick={closeCart}
                className="px-5 py-2 text-[0.58rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-white hover:bg-stone-200 rounded-sm transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-800">
              {items.map(item => (
                <li key={item.product.id} className="flex gap-4 py-4">
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.65rem] font-semibold text-stone-100 leading-snug mb-0.5 line-clamp-2">{item.product.name}</p>
                    {item.product.digital && (
                      <span className="text-[0.42rem] tracking-widest uppercase text-stone-500 border border-stone-700 px-1.5 py-0.5 rounded-sm">Digital</span>
                    )}
                    <p className="text-[0.72rem] font-bold text-white mt-1.5">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => update(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}
                        className="w-6 h-6 border border-stone-600 rounded-sm text-stone-300 hover:border-white hover:text-white disabled:opacity-30 flex items-center justify-center text-xs transition-colors">−</button>
                      <span className="text-[0.65rem] font-bold text-white w-5 text-center">{item.quantity}</span>
                      <button onClick={() => update(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 border border-stone-600 rounded-sm text-stone-300 hover:border-white hover:text-white flex items-center justify-center text-xs transition-colors">+</button>
                      <span className="text-[0.58rem] text-stone-500 ml-1">= {formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(item.product.id)} aria-label="Remove"
                    className="text-stone-600 hover:text-red-400 transition-colors shrink-0 self-start mt-1">
                    <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 stroke-current" strokeWidth="2" fill="none">
                      <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-800 space-y-3 shrink-0">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[0.58rem] tracking-[0.16em] uppercase text-stone-400">
                <span>Subtotal</span><span className="text-stone-200">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-[0.58rem] tracking-[0.16em] uppercase text-stone-400">
                <span>Delivery</span><span className="text-stone-200">{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-stone-700">
              <span className="text-[0.58rem] tracking-[0.2em] uppercase text-stone-300 font-bold">Total</span>
              <span className="font-[Cormorant_Garamond,serif] text-2xl font-bold text-white">{formatPrice(grandTotal)}</span>
            </div>
            <Link href="/shop/checkout" onClick={closeCart}
              className="block w-full text-center py-3.5 text-[0.66rem] font-bold tracking-[0.14em] uppercase text-[#0A0A0A] bg-white hover:bg-stone-200 rounded-sm transition-colors">
              Proceed to Checkout
            </Link>
            <p className="text-[0.46rem] text-stone-600 text-center tracking-wide">
              We contact you to confirm payment after ordering.
            </p>
          </div>
        )}
      </div>
    </>
  );
}