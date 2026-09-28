import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getWood } from "../data/woodTypes";
import ProductImage from "../components/ProductImage";
import { money } from "../utils/format";

export default function Cart() {
  const {
    items,
    subtotal,
    delivery,
    gst,
    total,
    count,
    updateQty,
    remove,
    clear,
  } = useCart();

  if (items.length === 0) return <Navigate to="/shop" replace />;

  return (
    <div className="cart-page">
      <div className="pagehead">
        <div className="container">
          <h1>Your cart</h1>
          <p>
            {count} {count === 1 ? "piece" : "pieces"} · prices already include
            GST
          </p>
        </div>
      </div>

      <div className="container cart-body">
        {/* ---------- items ---------- */}
        <div className="cart-items">
          {items.map((i) => (
            <div className="ci card" key={i.id}>
              <Link to={`/product/${i.productId}`} className="ci-img">
                <ProductImage
                  src={i.product.image}
                  fallback={i.product.imageFallback}
                  alt={i.product.name}
                  ratio="1 / 1"
                />
              </Link>

              <div className="ci-info">
                <span className="pill">{i.product.category}</span>
                <h3>
                  <Link to={`/product/${i.productId}`}>{i.product.name}</Link>
                </h3>
                <p className="ci-variant">
                  {getWood(i.wood).name} wood · {i.finish} finish
                </p>
                <p className="ci-meta">
                  {i.product.dims.L}″ × {i.product.dims.W}″ × {i.product.dims.H}″
                </p>

                <div className="ci-controls">
                  <div className="qty">
                    <button
                      onClick={() => updateQty(i.id, i.qty - 1)}
                      aria-label="Decrease qty"
                    >
                      −
                    </button>
                    <span>{i.qty}</span>
                    <button
                      onClick={() => updateQty(i.id, i.qty + 1)}
                      aria-label="Increase qty"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ci-remove"
                    onClick={() => remove(i.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="ci-price">
                <span className="ci-unit">{money(i.unitPrice)} each</span>
                <strong>{money(i.lineTotal)}</strong>
              </div>
            </div>
          ))}

          <div className="cart-extras">
            <Link to="/shop" className="linkish">
              ← Continue shopping
            </Link>
            <button className="linkish danger" onClick={clear}>
              Empty cart
            </button>
          </div>
        </div>

        {/* ---------- summary ---------- */}
        <aside className="cart-summary card">
          <h3>Order summary</h3>

          <dl className="sum-list">
            <div>
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd className={delivery === 0 ? "is-free" : ""}>
                {delivery === 0 ? "FREE" : money(delivery)}
              </dd>
            </div>
            <div>
              <dt>GST (18%)</dt>
              <dd>{money(gst)}</dd>
            </div>
          </dl>

          {delivery > 0 && (
            <p className="sum-hint">
              Add {money(50000 - subtotal)} more for free delivery.
            </p>
          )}

          <div className="sum-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>

          <Link to="/checkout" className="btn btn-accent btn-block">
            Checkout
          </Link>
          <Link to="/enquiry" className="btn btn-ghost btn-block mt-1">
            Prefer an enquiry call?
          </Link>

          <ul className="sum-assure">
            <li>✓ Secure payment</li>
            <li>✓ 10 year frame warranty</li>
            <li>✓ 7 day returns</li>
            <li>✓ Assembly included</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
