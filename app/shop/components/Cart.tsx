"use client";
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { CartItem, Product } from "./Products";

interface State { items: CartItem[]; open: boolean; }
type Action =
  | { type:"ADD";    product:Product; qty?:number }
  | { type:"REMOVE"; id:string }
  | { type:"UPDATE"; id:string; qty:number }
  | { type:"CLEAR" } | { type:"OPEN" } | { type:"CLOSE" };

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "ADD": {
      const found = state.items.find(i => i.product.id === a.product.id);
      if (found) return { ...state, open:true, items: state.items.map(i =>
        i.product.id === a.product.id ? { ...i, quantity: i.quantity + (a.qty ?? 1) } : i) };
      return { ...state, open:true, items:[...state.items, { product:a.product, quantity:a.qty ?? 1 }] };
    }
    case "REMOVE": return { ...state, items: state.items.filter(i => i.product.id !== a.id) };
    case "UPDATE": return { ...state, items: state.items.map(i =>
      i.product.id === a.id ? { ...i, quantity: Math.max(1, a.qty) } : i) };
    case "CLEAR":  return { ...state, items:[] };
    case "OPEN":   return { ...state, open:true };
    case "CLOSE":  return { ...state, open:false };
    default:       return state;
  }
}

interface Ctx {
  items:CartItem[]; open:boolean;
  add:(p:Product, qty?:number)=>void;
  remove:(id:string)=>void;
  update:(id:string, qty:number)=>void;
  clear:()=>void;
  openCart:()=>void;
  closeCart:()=>void;
  totalItems:number;
  totalPrice:number;
}

const CartCtx = createContext<Ctx|null>(null);

export function CartProvider({ children }:{ children:ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items:[], open:false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mb_cart");
      if (saved) JSON.parse(saved).forEach((i:CartItem) =>
        dispatch({ type:"ADD", product:i.product, qty:i.quantity }));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("mb_cart", JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  return (
    <CartCtx.Provider value={{
      items:state.items, open:state.open,
      add:    (p,qty) => dispatch({ type:"ADD",    product:p, qty }),
      remove: id      => dispatch({ type:"REMOVE", id }),
      update: (id,qty)=> dispatch({ type:"UPDATE", id, qty }),
      clear:  ()      => dispatch({ type:"CLEAR" }),
      openCart:  ()   => dispatch({ type:"OPEN" }),
      closeCart: ()   => dispatch({ type:"CLOSE" }),
      totalItems: state.items.reduce((s,i) => s + i.quantity, 0),
      totalPrice: state.items.reduce((s,i) => s + i.product.price * i.quantity, 0),
    }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}