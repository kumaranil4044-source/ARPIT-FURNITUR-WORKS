import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products";
import { getWood } from "../data/woodTypes";
import ProductCard from "../components/ProductCard";

const SORTS = [
  { id: "popular", label: "Sabse zyada bikne wala" },
  { id: "low", label: "Daam: kam se zyada" },
  { id: "high", label: "Daam: zyada se kam" },
  { id: "rating", label: "Sabse acche rating" },
  { id: "new", label: "Naya" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const catFromUrl = params.get("cat");
  const woodFromUrl = params.get("wood");

  const [cat, setCat] = useState(catFromUrl || "All");
  const [wood, setWood] = useState(woodFromUrl || "");
  const [sort, setSort] = useState("popular");
  const [q, setQ] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  /* link se aaye cat/wood (jaise /shop?cat=Sofa) ko state me lagao —
     Home se dusri category dabane par bhi filter turant badle */
  useEffect(() => {
    const next = catFromUrl || "All";
    setCat((prev) => (prev === next ? prev : next));
  }, [catFromUrl]);

  useEffect(() => {
    const next = woodFromUrl || "";
    setWood((prev) => (prev === next ? prev : next));
  }, [woodFromUrl]);

  /* keep the URL in sync so links like /shop?cat=Sofa work */
  const setCategory = (c) => {
    setCat(c);
    const next = new URLSearchParams(params);
    c === "All" ? next.delete("cat") : next.set("cat", c);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let out = [...PRODUCTS];

    if (cat !== "All") out = out.filter((p) => p.category === cat);
    if (wood) out = out.filter((p) => p.wood.includes(wood));
    if (inStockOnly) out = out.filter((p) => p.stock > 0);

    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.category.toLowerCase().includes(needle) ||
          p.material.toLowerCase().includes(needle) ||
          p.tags.some((t) => t.includes(needle))
      );
    }

    const sorters = {
      low: (a, b) => a.basePrice - b.basePrice,
      high: (a, b) => b.basePrice - a.basePrice,
      rating: (a, b) => b.rating - a.rating,
      new: (a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0),
      popular: (a, b) => b.reviews - a.reviews,
    };
    return out.sort(sorters[sort]);
  }, [cat, wood, sort, q, inStockOnly]);

  const allWoods = [...new Set(PRODUCTS.flatMap((p) => p.wood))];

  return (
    <div className="shop">
      <div className="pagehead">
        <div className="container">
          <h1>Saara saamaan</h1>
          <p>
            Har cheez ka daam usi lakdi ke hisaab se badalta hai. Product page
            par lakdi chun kar asli daam dekh sakte hain. Koi bhi size apne
            hisaab se ban jaata hai.
          </p>
        </div>
      </div>

      <div className="container shop-body">
        {/* ---------- filters ---------- */}
        <aside className="filters">
          <div className="filter-block">
            <h3>Dhoondhein</h3>
            <input
              className="input"
              placeholder="charpai, sheesham, mez…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="filter-block">
            <h3>Kya hai</h3>
            <div className="filter-list">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={cat === c ? "is-active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  <em>
                    {c === "All"
                      ? PRODUCTS.length
                      : PRODUCTS.filter((p) => p.category === c).length}
                  </em>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>Lakdi</h3>
            <div className="filter-list">
              <button
                className={wood === "" ? "is-active" : ""}
                onClick={() => setWood("")}
              >
                Koi bhi lakdi
              </button>
              {allWoods.map((w) => (
                <button
                  key={w}
                  className={wood === w ? "is-active" : ""}
                  onClick={() => setWood(wood === w ? "" : w)}
                >
                  <i
                    className="mini-chip"
                    style={{ background: getWood(w).swatch }}
                  />
                  {getWood(w).name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <label className="switch">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span className="switch-track" />
              <span>Sirf stock me mojood</span>
            </label>
          </div>

          {woodFromUrl && (
            <p className="filter-note">
              Aap {getWood(woodFromUrl).name} lakdi ke filter se aaye hain.
            </p>
          )}
        </aside>

        {/* ---------- results ---------- */}
        <div className="results">
          <div className="results-top">
            <p className="results-count">
              <strong>{PRODUCTS.length}</strong> me se {list.length} dikha rahe hain
            </p>
            <div className="results-sort">
              <label htmlFor="sort">Sort</label>
              <select
                id="sort"
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {wood && (
            <div className="active-filter">
              <span>
                Wood: <strong>{getWood(wood).name}</strong>
              </span>
              <button onClick={() => setWood("")} aria-label="Remove wood filter">
                ✕
              </button>
            </div>
          )}

          {list.length === 0 ? (
            <div className="empty-state">
              <div aria-hidden="true">🪑</div>
              <h3>Kuch nahi mila</h3>
              <p>Filter hata kar dekhein, ya hamein apne liye enquiry bhej dein.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCategory("All");
                  setWood("");
                  setQ("");
                  setInStockOnly(false);
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid product-grid">
              {list.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
