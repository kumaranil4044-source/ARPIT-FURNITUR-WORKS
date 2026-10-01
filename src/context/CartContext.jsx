/* ============================================================
   CartContext
   - add / remove / update qty
   - line item = product + chosen wood + chosen finish
   - persisted in localStorage
   ============================================================ */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../data/products";
import { trackEvent } from "../utils/analytics";

const CartContext = createContext(null);
const STORAGE_KEY = "darbaar-cart-v1";

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const lineId = (productId, wood, finish) => `${productId}__${wood}__${finish}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStored);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (productId, { wood, finish, qty = 1 } = {}) => {
    const product = getProduct(productId);
    if (!product) return;

    const chosenWood = wood || product.wood[0];
    const chosenFinish = finish || product.finish[0];
    const id = lineId(productId, chosenWood, chosenFinish);

    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) {
        return prev.map((i) =>
          i.id === id
            ? { ...i, qty: Math.min(i.qty + qty, 20) }
            : i
        );
      }
      return [
        ...prev,
        { id, productId, wood: chosenWood, finish: chosenFinish, qty },
      ];
    });
    setIsOpen(true);
    trackEvent("add_to_cart", { item: productId, wood: chosenWood });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 20) } : i))
    );
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clear = () => setItems([]);

  /* Attach live product data + price for display */
  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.productId);
          if (!product) return null;
          const multiplier = product.wood.includes(i.wood)
            ? 1
            : 1.1; /* off-catalogue wood costs a bit more */
          return {
            ...i,
            product,
            unitPrice: Math.round(product.basePrice * multiplier),
            lineTotal: Math.round(product.basePrice * multiplier) * i.qty,
          };
        })
        .filter(Boolean),
    [items]
  );

  const totals = useMemo(() => {
    const subtotal = detailed.reduce((s, i) => s + i.lineTotal, 0);
    const delivery = subtotal === 0 || subtotal >= 50000 ? 0 : 2500;
    const gst = Math.round(subtotal * 0.18);
    return {
      subtotal,
      delivery,
      gst,
      total: subtotal + delivery + gst,
      count: detailed.reduce((s, i) => s + i.qty, 0),
    };
  }, [detailed]);

  const value = useMemo(
    () => ({
      items: detailed,
      count: totals.count,
      ...totals,
      add,
      updateQty,
      remove,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [detailed, totals, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart() must be used inside <CartProvider>");
  return ctx;
}
