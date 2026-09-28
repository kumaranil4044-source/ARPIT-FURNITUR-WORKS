import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { WOOD_TYPES } from "../data/woodTypes";
import { SITE, FULL_ADDRESS, TEL_LINK, MAPS_LINK, waLink } from "../data/site";
import { AddressMap } from "../components/AddressMap";

export default function About() {
  const { currentWood, currentAccent } = useTheme();
  const a = SITE.address;

  return (
    <div className="about">
      <div className="about-hero">
        <div className="container about-hero-in">
          <div>
            <span className="eyebrow">{a.line1} · {a.city}</span>
            <h1>Dukaandar bhi, mistri bhi</h1>
            <p>
              {SITE.fullName} — {a.city}, {a.district} me ek chhoti si dukaan.
              Yahan lakdi ka saman banta hai: charpai, bed, singardan, takhat,
              kursi aur mez. Sab kuch apne size ke hisaab se, aur koi bhi size
              apne hisaab se ban jaata hai.
            </p>
            <p>
              Bade showroom nahi hain humare paas, par kaam asli hai. Naap lijiye
              ya WhatsApp kijiye — baat kar lenge.
            </p>
          </div>
          <div className="about-hero-art">
            <img
              src="/images/catalog/charpai-2.webp"
              alt="Charpai ka rassi se bharna"
              loading="lazy"
              width="1200"
              height="900"
            />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container about-split">
          <div>
            <div className="card owner-card">
              <img
                className="owner-photo-lg"
                src={SITE.ownerPhoto}
                alt={SITE.ownerName}
                loading="lazy"
                width="400"
                height="400"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div>
                <h2>{SITE.ownerName}</h2>
                <p className="muted">Dukaan ke malik — naap, design aur fitting sab khud dekhte hain.</p>
              </div>
            </div>
            <h2 className="mt-3">Hum kya-kya karte hain</h2>
            <ul className="tick-list">
              <li>Kitchen — dabba, shelf, slab fitting</li>
              <li>Sofa — lakdi frame, gadda-kapda</li>
              <li>Bed — single/double, box wala</li>
              <li>Dining table — 4/6 kursi set</li>
              <li>Chair — kursi, chowki</li>
              <li>Door & Window — darwaza, khidki, kapat</li>
              <li>Purane furniture ki marammat</li>
            </ul>
            <h2 className="mt-3">Ek saman kaise banta hai</h2>
            <ol className="timeline">
              <li>
                <strong>Aap batayein kya chahiye</strong>
                <span>Naap, photo, ya bas itna ki "charpai chahiye" — itna kaafi hai shuru karne ke liye.</span>
              </li>
              <li>
                <strong>Lakdi chunna</strong>
                <span>
                  Sheesham, sal, mango, babool, teak — jo mojood ho woh dikha
                  denge, saath me uska daam. Aap jo chahein woh.
                </span>
              </li>
              <li>
                <strong>Naap lena aur kaam shuru</strong>
                <span>Gaon me jaake deewar, darwaza, khidki — har cheez naap li jaati hai.</span>
              </li>
              <li>
                <strong>Rassi bharna aur jodamn</strong>
                <span>Charpai ka bichhuna haath se bhara jaata hai. Jo har ghar me alag hota hai.</span>
              </li>
              <li>
                <strong>Ghar pe pahunchai</strong>
                <span>Upar laga diya jata hai. Purana saaman nikalna ho to woh bhi uthayenge.</span>
              </li>
            </ol>
          </div>

          <aside className="about-side">
            <div className="card about-stat">
              <strong>10+</strong>
              <span>saal ka kaam</span>
            </div>
            <div className="card about-stat">
              <strong>1000+</strong>
              <span>ghar sajaaye</span>
            </div>
            <div className="card about-stat">
              <strong>Any</strong>
              <span>size me banta hai</span>
            </div>
            <div className="card about-side-cta">
              <a className="btn btn-primary btn-block" href={TEL_LINK}>
                {SITE.phoneDisplay}
              </a>
              <a
                className="btn btn-wa btn-block"
                href={waLink("Namaste! Furniture ke baare me jaanna tha.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-alt-band">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Lakdi ke baare me</span>
            <h2>Hamare paas jo lakdi milti hai</h2>
            <p>
              Daam har lakdi ke hisaab se alag hota hai. Jo aapke budget ko
              theek lage, wahi acchi lakdi hai.
            </p>
          </div>

          <div className="wood-table">
            {WOOD_TYPES.map((w) => (
              <div
                className={`wood-row ${currentWood.id === w.id ? "is-active" : ""}`}
                key={w.id}
              >
                <span
                  className="wood-row-sw"
                  style={{
                    background: `repeating-linear-gradient(92deg, ${w.grain} 0 2px, transparent 2px 6px), linear-gradient(150deg, ${w.swatch}, ${w.grain})`,
                  }}
                />
                <div>
                  <strong>
                    {w.name} <em className="wood-hindi">{w.hindi}</em>
                  </strong>
                  <span className="muted">{w.tagline}</span>
                </div>
                <div className="wood-row-price">
                  {currentWood.id === w.id && <span className="pill">Aap chuna hua</span>}
                  <em>
                    {w.priceIndex >= 1.35
                      ? "Mehngi"
                      : w.priceIndex <= 0.8
                        ? "Sabse sasti"
                        : w.priceIndex <= 1.0
                          ? "Sasta"
                          : "Darmi"}
                  </em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Dukan par aaiye</h2>
              <p>
                {a.line1}, {a.line2}, {a.city} — {a.district}, {a.state} {a.pincode}.
                {SITE.hours}. Apne kamre ki ek photo lekar aana, wohi se shuru
                karte hain.
              </p>
            </div>
            <div className="flex gap-1 wrap">
              <a className="btn btn-primary btn-lg" href={MAPS_LINK} target="_blank" rel="noreferrer">
                Map par dekhein
              </a>
              <Link to="/enquiry" className="btn btn-ghost btn-lg">
                Naap bhejein
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <AddressMap height={340} />
          </div>

          <p className="about-foot">
            Abhi aap <strong>{currentWood.name}</strong> lakdi ka theme dekh rahe
            ho ({currentAccent.name} rang). Ise badalne ke liye upar wale
            rang wale button ko dabaayein.
          </p>
          <p className="about-foot">{FULL_ADDRESS}</p>
        </div>
      </section>
    </div>
  );
}
