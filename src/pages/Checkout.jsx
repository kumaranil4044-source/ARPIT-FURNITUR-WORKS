import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { isValidEmail, isValidPhone, makeOrderId, money, whatsappLink } from "../utils/format";

const PAY = [
  { id: "upi", label: "UPI / QR code", ic: "📱", note: "GPay, PhonePe, Paytm — instant" },
  { id: "card", label: "Card", ic: "💳", note: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", ic: "🏦", note: "All major Indian banks" },
  { id: "emi", label: "EMI", ic: "📆", note: "From 3 to 24 months" },
  { id: "cod", label: "Pay on delivery", ic: "🛵", note: "₹2,000 advance only" },
];

export default function Checkout() {
  const { items, subtotal, delivery, gst, total, count, clear } = useCart();

  const [step, setStep] = useState(1);
  const [pay, setPay] = useState("upi");
  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", pin: "", notes: "",
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  if (items.length === 0 && !order) return <Navigate to="/shop" replace />;

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validateAddress = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Full name required";
    if (!isValidPhone(form.phone)) e.phone = "10-digit mobile required";
    if (!isValidEmail(form.email)) e.email = "Valid email required";
    if (form.address.trim().length < 8) e.address = "Full address required";
    if (form.city.trim().length < 2) e.city = "City required";
    if (!/^\d{6}$/.test(form.pin)) e.pin = "6-digit PIN code required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (e) => {
    e.preventDefault();
    if (step === 1 && !validateAddress()) return;
    setStep(2);
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);

    /* ---------- REAL PAYMENT: Razorpay / Stripe ----------
       const res = await fetch("/api/create-order", { method: "POST" });
       const data = await res.json();
       // then open the payment gateway and verify on the server
    ------------------------------------------------------ */

    await new Promise((r) => setTimeout(r, 1400));
    setOrder({
      id: makeOrderId(),
      total,
      email: form.email,
      phone: form.phone,
      address: `${form.address}, ${form.city} - ${form.pin}`,
      payLabel: PAY.find((p) => p.id === pay).label,
      items: items.map((i) => ({
        name: i.product.name,
        wood: i.wood,
        finish: i.finish,
        qty: i.qty,
        lineTotal: i.lineTotal,
      })),
    });
    setPlacing(false);
    clear();
  };

  /* ================= ORDER SUCCESS ================= */
  if (order) {
    const wa = `Hello Darbaar, I just placed order ${order.id} for ${money(order.total)}. Items:\n` +
      order.items.map((i) => `• ${i.name} x${i.qty}`).join("\n") +
      `\nAddress: ${order.address}`;

    return (
      <div className="container section center">
        <div className="success card animate-up">
          <div className="success-ic" aria-hidden="true">✓</div>
          <h1>Order placed</h1>
          <p className="muted">
            Thank you, {order.email}. Order number{" "}
            <strong>{order.id}</strong>. A confirmation email is on its way and
            we will call {order.phone} to confirm the delivery date.
          </p>

          <div className="order-box">
            <div className="order-box-head wood-panel">
              <span>Order {order.id}</span>
              <span>{order.payLabel}</span>
            </div>
            <ul className="order-items">
              {order.items.map((i, idx) => (
                <li key={idx}>
                  <span>
                    {i.name} <em>× {i.qty}</em>
                  </span>
                  <strong>{money(i.lineTotal)}</strong>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Paid / payable</span>
              <strong>{money(order.total)}</strong>
            </div>
            <p className="order-address">Delivering to: {order.address}</p>
          </div>

          <div className="success-actions">
            <a className="btn btn-accent" href={whatsappLink(wa)} target="_blank" rel="noreferrer">
              Send details on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-ghost">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ================= CHECKOUT ================= */
  return (
    <div className="cart-page">
      <div className="pagehead">
        <div className="container">
          <h1>Checkout</h1>
          <p>{count} {count === 1 ? "piece" : "pieces"} · {money(total)} total</p>
        </div>
      </div>

      <div className="container cart-body">
        <div className="cart-items">
          {/* steps */}
          <ol className="csteps">
            <li className={step >= 1 ? "is-active" : ""}>
              <span>1</span> Delivery address
            </li>
            <li className={step >= 2 ? "is-active" : ""}>
              <span>2</span> Payment
            </li>
            <li className="is-active">
              <span>3</span> Confirmation
            </li>
          </ol>

          {step === 1 && (
            <form className="card ck-card" onSubmit={next} noValidate>
              <h3>Where should we deliver?</h3>
              <div className="form-grid">
                <div className="field">
                  <label>Full name *</label>
                  <input className="input" value={form.name} onChange={set("name")} />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="field">
                  <label>Mobile *</label>
                  <input className="input" inputMode="numeric" value={form.phone} onChange={set("phone")} />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input className="input" value={form.email} onChange={set("email")} />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                <div className="field">
                  <label>PIN code *</label>
                  <input className="input" inputMode="numeric" maxLength={6} value={form.pin} onChange={set("pin")} />
                  {errors.pin && <span className="error-text">{errors.pin}</span>}
                </div>
                <div className="field field-full">
                  <label>Full address *</label>
                  <textarea
                    className="textarea"
                    style={{ minHeight: 90 }}
                    placeholder="Flat / house no, building, street, landmark"
                    value={form.address}
                    onChange={set("address")}
                  />
                  {errors.address && <span className="error-text">{errors.address}</span>}
                </div>
                <div className="field">
                  <label>City *</label>
                  <input className="input" value={form.city} onChange={set("city")} />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div className="field">
                  <label>Delivery notes (optional)</label>
                  <input
                    className="input"
                    placeholder="Call before arriving, 2nd floor lift…"
                    value={form.notes}
                    onChange={set("notes")}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Continue to payment →
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="card ck-card" onSubmit={placeOrder}>
              <h3>How would you like to pay?</h3>

              <div className="pay-list">
                {PAY.map((p) => (
                  <label key={p.id} className={`pay ${pay === p.id ? "is-active" : ""}`}>
                    <input
                      type="radio"
                      name="pay"
                      value={p.id}
                      checked={pay === p.id}
                      onChange={(e) => setPay(e.target.value)}
                    />
                    <span className="pay-ic" aria-hidden="true">{p.ic}</span>
                    <span className="pay-meta">
                      <strong>{p.label}</strong>
                      <em>{p.note}</em>
                    </span>
                    <span className="pay-radio" aria-hidden="true" />
                  </label>
                ))}
              </div>

              {pay === "cod" && (
                <p className="pay-note">
                  ₹2,000 advance now, balance on delivery. Our team will confirm
                  the date with you.
                </p>
              )}
              {pay === "emi" && (
                <p className="pay-note">
                  Available from {money(Math.round(total / 12))}/month for 12
                  months, subject to approval.
                </p>
              )}

              <div className="ck-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button type="submit" className="btn btn-accent" disabled={placing}>
                  {placing ? "Placing order…" : `Pay ${money(total)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="cart-summary card">
          <h3>Order summary</h3>
          <ul className="sum-items">
            {items.map((i) => (
              <li key={i.id}>
                <span>
                  {i.product.name} <em>× {i.qty}</em>
                </span>
                <strong>{money(i.lineTotal)}</strong>
              </li>
            ))}
          </ul>
          <dl className="sum-list">
            <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd className={delivery === 0 ? "is-free" : ""}>{delivery === 0 ? "FREE" : money(delivery)}</dd></div>
            <div><dt>GST (18%)</dt><dd>{money(gst)}</dd></div>
          </dl>
          <div className="sum-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
