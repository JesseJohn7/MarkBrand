import { CartProvider } from "./components/Cart";
import ShopNavbar from "./components/ShopNavbar";
import CartDrawer from "./components/CartDrawer";

export const metadata = {
  title: "Markbrand Shop — Marking You Out",
  description: "Official store of Markbrand Nigeria Limited.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ShopNavbar />
      <CartDrawer />
      {children}
      <footer className="border-t border-stone-800/50 bg-[#0D0D0D] py-10 px-5 sm:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-[Cormorant_Garamond,serif] text-lg font-bold text-white">
              Markbrand <span className="italic text-stone-400">Shop</span>
            </p>
            <p className="text-[0.48rem] tracking-[0.22em] uppercase text-stone-600 mt-0.5">
              Marking You Out · Since 2014
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="/"              className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 hover:text-white transition-colors">Main Site</a>
            <a href="/shop"          className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 hover:text-white transition-colors">All Products</a>
            <a href="/shop/checkout" className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 hover:text-white transition-colors">Checkout</a>
            <a href="https://www.facebook.com/MarkBrandNigeria" target="_blank" rel="noopener noreferrer"
              className="text-[0.5rem] tracking-[0.22em] uppercase text-stone-500 hover:text-white transition-colors">Facebook</a>
          </div>
          <p className="text-[0.46rem] text-stone-700">
            © {new Date().getFullYear()} Markbrand Nigeria Limited
          </p>
        </div>
      </footer>
    </CartProvider>
  );
}