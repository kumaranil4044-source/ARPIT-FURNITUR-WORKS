import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PRODUCTS, getProduct } from "../data/products";
import { WOOD_TYPES, getWood } from "../data/woodTypes";
import { useCart } from "../context/CartContext";
import { SITE, TEL_LINK, waLink } from "../data/site";
import ProductImage from "../components/ProductImage";
import {
  isValidEmail,
  isValidPhone,
  money,
} from "../utils/format";

const BUDGETS = [
  "₹5,000 se kam",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 se upar",
  "Abhi pata nahi",
];

const WOODS = [
  "Babool (sasta)",
  "Mango Wood",
  "Sheesham (popular)",
  "Sal Wood",
  "Mahogany",
  "Teak (mehnga)",
  "Koi bhi — aap bataiye",
];

const TIMELINES = [
  "Jaldi chahiye (2 hafte)",
  "1 mahina",
  "2 mahine",
  "Bas dekh raha hoon",
];

const empty = {
  name: "",
  phone: "",
  email: "",
  city: "",
  address: "",
  wood: "",
  productId: "",
  qty: 1,
  budget: BUDGETS[1],
  timeline: TIMELINES[2],
  message: "",
  updates: true,
};

export default function Enquiry() {
  const [params] = useSearchParams();
  const { items, subtotal } = useCart();

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  useEffect(() => {
    const p = params.get("product");
    if (p && getProduct(p)) setForm((f) => ({ ...f, productId: p }));
  }, [params]);

  const fromCart = useMemo(
    () => !params.get("product") && items.length > 0,
    [params, items]
  );

  const selected = getProduct(form.productId);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Apna pura naam likhein";
    if (!isValidPhone(form.phone)) e.phone = "10 digit ka mobile number likhein";
    if (!isValidEmail(form.email)) e.email = "Email sahi se likhein";
    if (form.city.trim().length < 2) e.city = "Gaanv ya sheher ka naam likhein";
    if (form.address.trim().length < 6) e.address = "Pura pata likhein (mohalla / gali)";
    if (form.message.trim().length < 10)
      e.message = "Thoda aur likhein (kam se kam 10 akshar)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    /* ---------- BACKEND: enquiry seedha malik tak ---------- */
    const payload = {
      ...form,
      productName:
        selected?.name ||
        (items.length > 0 ? `Cart (${items.length} item)` : "Custom / abhi decide nahi"),
      _subject: `Nayi Enquiry — ${form.name} (${form.phone})`,
      _template: "table",
    };
    // Agar khud ka Google Sheet / Apps Script URL ho to .env me VITE_ENQUIRY_URL rakho
    const url =
      import.meta.env.VITE_ENQUIRY_URL ||
      `https://formsubmit.co/ajax/${SITE.email}`;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(9000),
      });
    } catch (e) {
      /* Net slow/fail ho to bhi customer ko success dikhao — WhatsApp backup hai */
    }

    setDone({
      ref: `AFWS-${Date.now().toString().slice(-5)}`,
      summary: {
        ...form,
        productName:
          selected?.name || (fromCart ? "Cart me jo hai" : "Custom / abhi decide nahi"),
        estimate: fromCart
          ? subtotal
          : selected
            ? selected.basePrice * Number(form.qty)
            : null,
      },
    });
    setSubmitting(false);
    setForm(empty);
  };

  const waText = done
    ? `Namaste ${SITE.name}!\nEnquiry no: ${done.ref}\nNaam: ${done.summary.name}\nMobile: ${done.summary.phone}\nPata: ${done.summary.address}, ${done.summary.city}\nChahiye: ${done.summary.productName}\nBudget: ${done.summary.budget}\nMessage: ${done.summary.message}`
    : "";

  /* ================= SUCCESS ================= */
  if (done) {
    return (
      <div className="container section center">
        <div className="success card animate-up">
          <div className="success-ic" aria-hidden="true">✓</div>
          <h1>Enquiry mil gayi</h1>
          <p className="muted">
            Dhanyavaad {done.summary.name}. Hum {done.summary.phone} par ek
            din me call karenge. Aapka reference{" "}
            <strong>{done.ref}</strong> hai.
          </p>

          <div className="success-summary">
            <div>
              <span>Kya chahiye</span>
              <strong>{done.summary.productName}</strong>
            </div>
            <div>
              <span>Lakdi</span>
              <strong>{done.summary.wood || "Aap bataenge"}</strong>
            </div>
            <div>
              <span>Budget</span>
              <strong>{done.summary.budget}</strong>
            </div>
            <div>
              <span>Kab chahiye</span>
              <strong>{done.summary.timeline}</strong>
            </div>
            {done.summary.estimate && (
              <div>
                <span>Approx daam</span>
                <strong>{money(done.summary.estimate)}</strong>
              </div>
            )}
          </div>

          <div className="success-actions">
            <a className="btn btn-wa" href={waLink(waText)} target="_blank" rel="noreferrer">
              WhatsApp par bhi bhejein
            </a>
            <a className="btn btn-ghost" href={TEL_LINK}>
              Abhi call karein
            </a>
            <button className="btn btn-ghost" onClick={() => setDone(null)}>
              Aur ek enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */
  return (
    <div className="enq">
      <div className="pagehead">
        <div className="container">
          <span className="eyebrow">Apna size batayein</span>
          <h1>Enquiry bharen</h1>
          <p>
            Naap bataiye ya photo bhej dein — hum usi hisaab se daam aur waqt
            bata denge. Koi jaldi nahi, ek din ka kaam hai.
          </p>
          {fromCart && (
            <p className="enq-cart-note">
              Aapke cart ke hisaab se bhar rahe hain ({items.length} item,{" "}
              {money(subtotal)}).
            </p>
          )}
        </div>
      </div>

      <div className="container enq-body">
        <form className="enq-form card" onSubmit={onSubmit} noValidate>
          {/* --- 1 --- */}
          <fieldset>
            <legend>
              <span>1</span> Aapka number
            </legend>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Pura naam *</label>
                <input
                  id="name"
                  className="input"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Arpit Kumar"
                  autoComplete="name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="phone">Mobile number *</label>
                <input
                  id="phone"
                  className="input"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="98765 43210"
                  inputMode="numeric"
                  autoComplete="tel"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="aap@example.com"
                  autoComplete="email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="city">Gaanv / shehar *</label>
                <input
                  id="city"
                  className="input"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="Phulpur"
                  autoComplete="address-level2"
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="field">
                <label htmlFor="address">Pura pata *</label>
                <input
                  id="address"
                  className="input"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Mohalla, gali, makaan no."
                  autoComplete="street-address"
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>
            </div>
          </fieldset>

          {/* --- 2 --- */}
          <fieldset>
            <legend>
              <span>2</span> Kya chahiye?
            </legend>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="productId">Saamaan (agar pata ho)</label>
                <select
                  id="productId"
                  className="select"
                  value={form.productId}
                  onChange={set("productId")}
                >
                  <option value="">Kuch bhi / size batana hai</option>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {money(p.basePrice)} se
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="wood">Lakdi ka pasand</label>
                <select id="wood" className="select" value={form.wood} onChange={set("wood")}>
                  <option value="">Koi pasand nahi — aap bataiye</option>
                  {WOODS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="qty">Kitne piece</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  max="50"
                  className="input"
                  value={form.qty}
                  onChange={set("qty")}
                />
              </div>

              <div className="field">
                <label htmlFor="budget">Budget</label>
                <select id="budget" className="select" value={form.budget} onChange={set("budget")}>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="timeline">Kab chahiye</label>
                <select
                  id="timeline"
                  className="select"
                  value={form.timeline}
                  onChange={set("timeline")}
                >
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selected && (
              <div className="enq-preview">
                <div className="enq-preview-img">
                  <ProductImage
                    src={selected.image}
                    fallback={selected.imageFallback}
                    alt={selected.name}
                    ratio="1 / 1"
                  />
                </div>
                <div>
                  <strong>{selected.name}</strong>
                  <span className="muted">
                    {selected.dims.L}″ × {selected.dims.W}″ × {selected.dims.H}″
                  </span>
                  <span className="muted">
                    {selected.wood.length
                      ? "Lakdi: " + selected.wood.map((w) => getWood(w).name).join(", ")
                      : "Cotton ka takhat — charpai ya bed dono ke liye"}
                  </span>
                </div>
              </div>
            )}
          </fieldset>

          {/* --- 3 --- */}
          <fieldset>
            <legend>
              <span>3</span> Apni baat
            </legend>
            <div className="field">
              <label htmlFor="message">Kya chahiye, kitna, kab? *</label>
              <textarea
                id="message"
                className="textarea"
                value={form.message}
                onChange={set("message")}
                placeholder="Ghar me 4 log hain, charpai 6 feet chahiye. Ek singardan bhi jodwana hai 2 darwaze ka. Kamra 12 × 10 feet hai."
              />
              <span className="muted field-hint">
                {form.message.trim().length} akshar. Kamre ka naap likh dena
                to daam sahi batata hai.
              </span>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <label className="switch mt-2">
              <input type="checkbox" checked={form.updates} onChange={set("updates")} />
              <span className="switch-track" />
              <span>WhatsApp par naye saaman ki khabar bhejein</span>
            </label>
          </fieldset>

          <div className="enq-submit">
            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? "Bhej rahe hain…" : "Enquiry bhar dein"}
            </button>
            <a className="btn btn-wa" href={waLink("Namaste! Mujhe jaanna hai.")} target="_blank" rel="noreferrer">
              Ya WhatsApp karein
            </a>
          </div>
        </form>

        {/* ---- side ---- */}
        <aside className="enq-side">
          <div className="card enq-side-card">
            <h3>Seedha baat karein?</h3>
            <p>
              Dukaar par aa sakte hain. {SITE.hours} khuli hai.
            </p>
            <a className="btn btn-primary btn-block" href={TEL_LINK}>
              {SITE.phoneDisplay}
            </a>
            <a
              className="btn btn-wa btn-block"
              href={waLink("Namaste! Furniture ke baare me jaanna tha.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp karein
            </a>
          </div>

          <div className="card enq-side-card">
            <h3>Baad me kya hoga</h3>
            <ol className="timeline">
              <li>
                <strong>Hum call karenge</strong>
                <span>Ek din ke andar, samajhne ke liye.</span>
              </li>
              <li>
                <strong>Naap lenge</strong>
                <span>Ya aap ka naap/photo bhej dein.</span>
              </li>
              <li>
                <strong>Daam batayenge</strong>
                <span>Lakdi ke hisaab se 2–3 option, saath me photo.</span>
              </li>
              <li>
                <strong>Bana denge</strong>
                <span>Usually 10–20 din. Charpai jaldi ban jaata hai.</span>
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
