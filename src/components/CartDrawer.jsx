import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import ProductImage from "./ProductImage";
import { getWood } from "../data/woodTypes";

function Qty({ value, onChange }) {
  return (
    <div className="qty">
      <button onClick={() => onChange(value - 1)} aria-label="Decrease qty">
        −
      </button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} aria-label="Increase qty">
        +
      </button>
    </div>
  );
}

/* Slide-in mini cart used by the navbar cart button */
export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, remove, subtotal, count } =
    useCart();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeCart();
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      {isOpen && <div className="cd-backdrop animate-in" onClick={closeCart} />}

      <aside
        className={`cd ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="cd-head wood-panel">
          <h3>Your cart {count > 0 && <span className="cd-count">{count}</span>}</h3>
          <button className="icon-btn on-wood" onClick={closeCart} aria-label="Close cart">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cd-empty">
            <div className="cd-empty-ic" aria-hidden="true">
              🪑
            </div>
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-primary" onClick={closeCart}>
              Browse furniture
            </Link>
          </div>
        ) : (
          <>
            <div className="cd-list">
              {items.map((i) => (
                <div className="cd-item" key={i.id}>
                  <div className="cd-item-img">
                    <ProductImage
                      src={i.product.image}
                      fallback={i.product.imageFallback}
                      alt={i.product.name}
                      ratio="1 / 1"
                    />
                  </div>
                  <div className="cd-item-info">
                    <Link
                      to={`/product/${i.productId}`}
                      onClick={closeCart}
                      className="cd-item-name"
                    >
                      {i.product.name}
                    </Link>
                    <span className="cd-item-variant">
                      {getWood(i.wood).name} · {i.finish}
                    </span>
                    <div className="cd-item-row">
                      <Qty value={i.qty} onChange={(q) => updateQty(i.id, q)} />
                      <span className="cd-item-price">{money(i.lineTotal)}</span>
                    </div>
                    <button
                      className="cd-remove"
                      onClick={() => remove(i.id)}
                      aria-label={`Remove ${i.product.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cd-foot">
              <div className="cd-sub">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="cd-note">GST and delivery added at checkout.</p>
              <Link to="/checkout" className="btn btn-accent btn-block" onClick={closeCart}>
                Proceed to checkout
              </Link>
              <Link to="/enquiry" className="btn btn-ghost btn-block mt-1" onClick={closeCart}>
                Send enquiry instead
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
