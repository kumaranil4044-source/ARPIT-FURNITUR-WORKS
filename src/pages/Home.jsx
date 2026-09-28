import { Link } from "react-router-dom";
import { PRODUCTS, CATEGORY_IMAGE } from "../data/products";
import { WOOD_TYPES } from "../data/woodTypes";
import { SITE, TEL_LINK, waLink } from "../data/site";
import { useTheme } from "../context/ThemeContext";
import ProductCard from "../components/ProductCard";
import ShopBanner from "../components/ShopBanner";

const STEPS = [
  { t: "Consultation & Measurement", d: "Phone/WhatsApp par baat, phir ghar ya dukaan par aakar naap lete hain." },
  { t: "Design & Price Fix", d: "Lakdi, design aur daam pehle hi fix — baad me koi extra charge nahi." },
  { t: "Bana kar Fit karna", d: "Haath se taiyaar karke ghar par laakar fit kar dete hain." },
];

export const SERVICES = ["Kitchen", "Sofa", "Bed", "Dining", "Chair", "Door", "Window"];

const TRUST = [
  { ic: "🪵", t: "Asli lakdi", d: "Koi particle board nahi. Jo lakdi dikhti hai wahi sachchi hai." },
  { ic: "✂️", t: "Size aapki", d: "Chhota ho ya bada — aapke ghar ke hisaab se banayenge." },
  { ic: "🧵", t: "Haath ka kaam", d: "Charpai ka rassi har ghar me alag tarah se bhara jaata hai." },
  { ic: "🛵", t: "Pahunchai", d: "Prayagraj aur aas-paas ke gharon tak, chhota bade ghar bhi." },
];

const REVIEWS = [
  { name: "Ramesh Patel", place: "Phulpur", text: "Bed aur singardan banwaya tha. Naap ekdum fit baitha. 2 saal ho gaye, ek keel bhi dheeli nahi hui.", item: "Bed + Singardan", stars: 5 },
  { name: "Sunita Devi", place: "Prayagraj", text: "Sofa ka kapda aur lakdi dono badhiya. Bacche roz kudte hain phir bhi majboot hai.", item: "Wooden Sofa", stars: 5 },
  { name: "Mohd. Salim", place: "Saray Mamrej", text: "4 darwaze aur 3 khidki lagwaye. Chaukhat (kapat) ki fitting safai se ki, deewar bhi nahi tooti.", item: "Door + Window", stars: 5 },
  { name: "Anita Yadav", place: "Handia", text: "Phone par naap bheja tha, 15 din me singardan ghar pahunch gaya. Daam pehle hi bata diya tha.", item: "Singardan", stars: 4 },
];

export default function Home() {
  const { currentWood, setWood } = useTheme();

  const featured = ["sofa-01", "bed-01", "dining-01", "kitchen-01"].map(
    (id) => PRODUCTS.find((p) => p.id === id)
  );

  return (
    <>
      {/* ===== DUKAAN KA BANNER (sabse upar) ===== */}
      <ShopBanner />

      {/* ==================== HERO (image upar, text neeche) ==================== */}
      <section className="hero-plain">
        <div className="container">
          <div className="hero-plain-img">
            <img
              src="/images/catalog/sofa-2.webp"
              alt="Arpit Furniture Works — sofa furniture set"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div className="hero-plain-in animate-up">
            <span className="pill hero-pill">
              <i className="dot-live" /> {SITE.address.city} · {SITE.address.state}
            </span>
            <h1>
              High Quality Furniture Set
            </h1>
            <p className="hero-sub">
              <strong>Arpit Furniture Works</strong> — Kitchen, sofa, bed, dining
              table, chair, door aur window. Naap par banta hai, ghar par fit hota hai.
            </p>
            <div className="hero-btns">
              <a className="btn btn-primary btn-lg" href={TEL_LINK}>
                Call: {SITE.phoneDisplay}
              </a>
              <a
                className="btn btn-wa btn-lg"
                href={waLink("Namaste! Mujhe furniture ka daam jaanna hai.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp karein
              </a>
              <Link to="/shop" className="btn btn-accent btn-lg">
                Our Service
              </Link>
            </div>
            <dl className="hero-stats">
              <div><dt>10+</dt><dd>saal ka kaam</dd></div>
              <div><dt>1000+</dt><dd>ghar sajaaye</dd></div>
              <div><dt>7</dt><dd>services, naap par</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* ==================== LAKDI SWITCH ==================== */}
      <section className="woodband">
        <div className="container woodband-in">
          <div className="woodband-copy">
            <h3>Apni pasand ki lakdi dekhein</h3>
            <p>
              Koi bhi lakdi chunein — poori website ka rang usi hisaab se badal
              jaata hai. Abhi aap <strong>{currentWood.name}</strong> dekh rahe hain.
            </p>
          </div>
          <div className="woodband-chips">
            {WOOD_TYPES.map((w) => (
              <button
                key={w.id}
                className={`wchip ${currentWood.id === w.id ? "is-active" : ""}`}
                onClick={() => setWood(w.id)}
                aria-pressed={currentWood.id === w.id}
                title={w.tagline}
              >
                <span
                  className="wchip-sw"
                  style={{
                    background: `repeating-linear-gradient(92deg, ${w.grain} 0 2px, transparent 2px 6px), linear-gradient(150deg, ${w.swatch}, ${w.grain})`,
                  }}
                />
                {w.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Services</span>
            <h2>Kya banate hain</h2>
            <p>Kitchen se khidki tak — 7 kaam, sab naap par.</p>
          </div>

          <div className="cat-grid">
            {SERVICES.map((c, i) => (
              <Link
                key={c}
                to={`/shop?cat=${c}`}
                className="cat-card animate-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <div className="cat-card-img">
                  <img
                    src={`/images/catalog/${CATEGORY_IMAGE[c]}.webp`}
                    alt={c}
                    loading="lazy"
                    width="600"
                    height="450"
                  />
                </div>
                <div className="cat-card-body">
                  <h3>{c}</h3>
                  <span>
                    {PRODUCTS.filter((p) => p.category === c).length} kind →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED ==================== */}
      <section className="section bg-alt-band">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Sabse zyada bikne wala</span>
            <h2>Log ye lekar jaate hain</h2>
            <p>Pichle 30 din ki asli orders.</p>
          </div>

          <div className="grid product-grid">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>

          <div className="center mt-4">
            <Link to="/shop" className="btn btn-primary btn-lg">
              Saara saamaan dekhein
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== TRUST ==================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Hum kyun theek hain</span>
            <h2>Chhoti dukaan, seedha kaam</h2>
          </div>
          <div className="why-grid">
            {TRUST.map((f) => (
              <div className="why-card" key={f.t}>
                <span className="why-ic" aria-hidden="true">{f.ic}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section bg-alt-band">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Log kya kehte hain</span>
            <h2>Customer reviews</h2>
            <p>Asli ghar, asli naam — Phulpur aur aas-paas ke grahak.</p>
          </div>
          <div className="grid review-grid">
            {REVIEWS.map((r) => (
              <figure className="card review-card" key={r.name}>
                <div className="review-stars" aria-label={`${r.stars} star`}>
                  {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                </div>
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span className="muted">{r.place} · {r.item}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="center mt-3">
            <Link to="/enquiry" className="btn btn-ghost">
              Aap bhi enquiry karein
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="section-sm">
        <div className="container">
          <div className="how-panel">
            <div className="how-copy">
              <h1 className="how-kicker">Our Process</h1>
              <h2 className="how-title">3 step. Bas itna hi.</h2>
              <p>
                Na online payment ka jhagda, na koi form bhari. Ek message karo,
                hum baat kar lenge.
              </p>
              <a
                className="btn btn-wa mt-2"
                href={waLink("Namaste! Mujhe apne kamre ke hisaab se furniture banwana hai.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp pe shuru karein
              </a>
            </div>

            <ol className="how-steps">
              {STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className="how-num">{i + 1}</span>
                  <div>
                    <strong>{s.t}</strong>
                    <em>{s.d}</em>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Samajh nahi aa raha?</h2>
              <p>
                Lakdi ka daam, size, ya delivery — jo bhi sawaal ho, ek baar
                phone kar lo. Free salah hai.
              </p>
            </div>
            <div className="flex gap-1 wrap">
              <a className="btn btn-primary btn-lg" href={TEL_LINK}>
                Call karein
              </a>
              <Link to="/enquiry" className="btn btn-ghost btn-lg">
                Enquiry bharen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
