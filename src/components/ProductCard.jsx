import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { money } from "../utils/format";
import ProductImage from "./ProductImage";

const CHIP = {
  babool: "#8a6b45",
  mango: "#b08654",
  sheesham: "#8b5a2b",
  sal: "#6f4526",
  mahogany: "#7d3a2c",
  teak: "#96692f",
};

export default function ProductCard({ product, index = 0, priority = false }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(product.id, {
      wood: product.wood[0],
      finish: product.finish[0],
      qty: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const oos = product.stock === 0;
  const low = !oos && product.stock <= 4;

  return (
    <article
      className="pcard animate-up"
      style={{ animationDelay: `${Math.min(index * 55, 440)}ms` }}
    >
      <Link to={`/product/${product.id}`} className="pcard-media">
        <ProductImage
          src={product.image}
          fallback={product.imageFallback}
          alt={product.name}
          ratio="4 / 3"
          priority={priority}
          zoom
        />
        <div className="pcard-flags">
          {product.badge && <span className="flag flag-dark">{product.badge}</span>}
          {oos && <span className="flag flag-muted">Out of stock</span>}
          {!oos && low && <span className="flag flag-accent">Only {product.stock} left</span>}
        </div>
      </Link>

      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pcard-cat">{product.category}</span>
          <span className="pcard-rating" title={`${product.rating} out of 5`}>
            <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
              <path
                d="M10 1.6l2.5 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.1 2.6 1-5.8L1.7 7.7l5.8-.8z"
                fill="currentColor"
              />
            </svg>
            {product.rating}
            <em>({product.reviews})</em>
          </span>
        </div>

        <h3 className="pcard-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="pcard-dims">
          {product.dims.L}″ × {product.dims.W}″ × {product.dims.H}″
        </p>

        <div className="pcard-foot">
          <div className="pcard-price-wrap">
            <span className="pcard-from">from</span>
            <span className="pcard-price">{money(product.basePrice)}</span>
          </div>
          <div className="pcard-woods" title="Available woods">
            {product.wood.slice(0, 4).map((w) => (
              <i key={w} style={{ background: CHIP[w] }} />
            ))}
          </div>
        </div>

        <div className="pcard-actions">
          <button
            className={`btn btn-sm btn-primary grow ${added ? "is-done" : ""}`}
            onClick={onAdd}
            disabled={oos}
          >
            {added ? "Added ✓" : oos ? "Unavailable" : "Add to cart"}
          </button>
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-ghost"
            aria-label={`View ${product.name}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
