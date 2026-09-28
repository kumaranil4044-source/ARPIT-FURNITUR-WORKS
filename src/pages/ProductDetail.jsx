import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PRODUCTS, getProduct } from "../data/products";
import { WOOD_TYPES, getWood } from "../data/woodTypes";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import { money, whatsappLink } from "../utils/format";

const CHIP = {
  babool: "#8a6b45",
  mango: "#b08654",
  sheesham: "#8b5a2b",
  sal: "#6f4526",
  mahogany: "#7d3a2c",
  teak: "#96692f",
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const { setWood } = useTheme();

  const [wood, setLocalWood] = useState(product?.wood[0] || "");
  const [finish, setFinish] = useState(product?.finish[0] || "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState("details");

  /* reset selections when the route changes */
  useEffect(() => {
    if (product) {
      setLocalWood(product.wood[0]);
      setFinish(product.finish[0]);
      setQty(1);
      setTab("details");
    }
  }, [product]);

  const unitPrice = useMemo(() => {
    if (!product) return 0;
    const w = WOOD_TYPES.find((x) => x.id === wood) || WOOD_TYPES[0];
    return Math.round(product.basePrice * w.priceIndex);
  }, [product, wood]);

  if (!product) return <Navigate to="/shop" replace />;

  const oos = product.stock === 0;
  /* step numbers — agar is product me lakdi nahi hai to finish se shuru */
  const hasWood = product.wood.length > 0;
  const nFinish = hasWood ? 2 : 1;
  const nQty = hasWood ? 3 : 2;
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const onAdd = () => {
    add(product.id, { wood, finish, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const waMsg = `Hello Darbaar, I am interested in "${product.name}" in ${getWood(wood).name} wood (${finish} finish). Listed price ${money(unitPrice * qty)}. Is it available?`;

  return (
    <div className="pd">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span>
          <Link to={`/shop?cat=${product.category}`}>{product.category}</Link>{" "}
          <span>/</span>
          <em>{product.name}</em>
        </nav>

        <div className="pd-grid">
          {/* ---------- gallery ---------- */}
          <div className="pd-media">
            <div className="pd-frame">
              <ProductImage
                src={product.image}
                fallback={product.imageFallback}
                alt={product.name}
                ratio="4 / 3"
                priority
              />
              <div className="pd-flags">
                {product.badge && <span className="flag flag-dark">{product.badge}</span>}
                {oos && <span className="flag flag-muted">Out of stock</span>}
              </div>
            </div>

            <div className="pd-spec-strip">
              <div>
                <span>Dimensions</span>
                <strong>
                  {product.dims.L}″ L × {product.dims.W}″ W × {product.dims.H}″ H
                </strong>
              </div>
              <div>
                <span>Stock</span>
                <strong className={oos ? "is-out" : "is-in"}>
                  {oos ? "Unavailable" : `${product.stock} in stock`}
                </strong>
              </div>
            </div>
          </div>

          {/* ---------- buy column ---------- */}
          <div className="pd-info">
            <div className="pd-tags">
              <span className="pcard-cat">{product.category}</span>
              <span className="pcard-rating">
                <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                  <path d="M10 1.6l2.5 5.3 5.8.8-4.2 4.1 1 5.8L10 15l-5.1 2.6 1-5.8L1.7 7.7l5.8-.8z" fill="currentColor" />
                </svg>
                {product.rating} <em>{product.reviews} reviews</em>
              </span>
            </div>

            <h1>{product.name}</h1>
            <p className="pd-desc">{product.desc}</p>

            {/* 1. wood — sirf tab jab is product me lakdi ho */}
            {product.wood.length > 0 && (
              <section className="pd-block">
                <h3>
                  <span className="pd-num">1</span> Lakdi chunein
                </h3>
                <div className="pd-woods">
                  {product.wood.map((w) => {
                    const meta = getWood(w);
                    const price = Math.round(product.basePrice * meta.priceIndex);
                    return (
                      <button
                        key={w}
                        className={`pd-wood ${wood === w ? "is-active" : ""}`}
                        onClick={() => setLocalWood(w)}
                        aria-pressed={wood === w}
                      >
                        <span className="pd-wood-sw" style={{ background: CHIP[w] }} />
                        <span className="pd-wood-meta">
                          <strong>{meta.name}</strong>
                          <em>{meta.hindi} · {money(price)}</em>
                        </span>
                        {wood === w && <span className="pd-wood-tick">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <button className="linkish" onClick={() => setWood(wood)}>
                  Puri site {getWood(wood).name} rang ki karein →
                </button>
              </section>
            )}

            {/* 2. finish */}
            <section className="pd-block">
              <h3>
                <span className="pd-num">{nFinish}</span> Colour / finish
              </h3>
              <div className="seg seg-inline">
                {product.finish.map((f) => (
                  <button
                    key={f}
                    className={finish === f ? "is-active" : ""}
                    onClick={() => setFinish(f)}
                    aria-pressed={finish === f}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </section>

            {/* 3. qty + total */}
            <section className="pd-block">
              <h3>
                <span className="pd-num">{nQty}</span> Kitne chahiye?
              </h3>
              <div className="pd-buy">
                <div className="qty qty-lg">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                    −
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase">
                    +
                  </button>
                </div>
                <div className="pd-price">
                  <span>
                    {money(unitPrice)} <em>× {qty}</em>
                  </span>
                  <strong>{money(unitPrice * qty)}</strong>
                </div>
              </div>
              <p className="pd-gst">Inclusive of 18% GST · free delivery above ₹50,000</p>
            </section>

            <div className="pd-actions">
              <button
                className={`btn btn-primary grow ${added ? "is-done" : ""}`}
                onClick={onAdd}
                disabled={oos}
              >
                {added ? "Added to cart ✓" : oos ? "Currently unavailable" : "Add to cart"}
              </button>
              <a
                className="btn btn-accent"
                href={whatsappLink(waMsg)}
                target="_blank"
                rel="noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>

            <Link to={`/enquiry?product=${product.id}`} className="pd-enquire-link">
              Need a custom size or finish? Send an enquiry →
            </Link>

            <ul className="pd-assurances">
              <li>10 year frame warranty</li>
              <li>Free delivery above ₹50,000</li>
              <li>7 day returns on unused pieces</li>
              <li>Assembly included</li>
            </ul>
          </div>
        </div>

        {/* ---------- tabs ---------- */}
        <div className="pd-tabs">
          <div className="pd-tabbar" role="tablist">
            {[
              ["details", "Specification"],
              ["care", "Care & maintenance"],
              ["delivery", "Delivery & returns"],
            ].map(([id2, label]) => (
              <button
                key={id2}
                role="tab"
                aria-selected={tab === id2}
                className={tab === id2 ? "is-active" : ""}
                onClick={() => setTab(id2)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="pd-tabpanel" role="tabpanel">
            {tab === "details" && (
              <dl className="spec-table">
                <div>
                  <dt>Material</dt>
                  <dd>{product.material}</dd>
                </div>
                <div>
                  <dt>Overall size (L × W × H)</dt>
                  <dd>
                    {product.dims.L}″ × {product.dims.W}″ × {product.dims.H}″
                  </dd>
                </div>
                <div>
                  <dt>Woods available</dt>
                  <dd>{product.wood.map((w) => getWood(w).name).join(", ")}</dd>
                </div>
                <div>
                  <dt>Finishes</dt>
                  <dd>{product.finish.join(", ")}</dd>
                </div>
                <div>
                  <dt>Assembly</dt>
                  <dd>Included, our team fits it</dd>
                </div>
                <div>
                  <dt>Tags</dt>
                  <dd className="spec-tags">
                    {product.tags.map((t) => (
                      <span key={t} className="pill">
                        {t.replace("-", " ")}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            )}

            {tab === "care" && <p className="pd-tabtext">{product.care}</p>}

            {tab === "delivery" && (
              <ul className="pd-tablist">
                <li>Free delivery on orders above ₹50,000 anywhere in India.</li>
                <li>Made-to-order pieces take 15–25 working days from confirmed order.</li>
                <li>In-stock pieces usually ship within 3 working days.</li>
                <li>Our team assembles the furniture and removes all packaging.</li>
                <li>7 day return on unused pieces. Custom sizes are non-returnable.</li>
              </ul>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <div className="section-head">
              <span className="eyebrow">Goes well with</span>
              <h2>More {product.category.toLowerCase()}</h2>
            </div>
            <div className="grid product-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
