/* ============================================================
   Gallery — dukaan aur kaam ki photos
   Lightbox ke saath: photo par click karo, badi dikhegi.
   ============================================================ */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE, TEL_LINK, waLink } from "../data/site";

const SHOTS = [
  { file: "shop-1", title: "Dukaan me kaam", tag: "Workshop", ratio: "16 / 9" },
  { file: "charpai-1", title: "Charpai — rassi bharna", tag: "Charpai", ratio: "4 / 3" },
  { file: "shop-2", title: "Lakdi kaatna", tag: "Workshop", ratio: "4 / 3" },
  { file: "charpai-2", title: "Rassi se bichhuna", tag: "Detail", ratio: "4 / 3" },
  { file: "bed-1", title: "Lakdi ka bed", tag: "Bed", ratio: "4 / 3" },
  { file: "singardan-1", title: "Singardan", tag: "Singardan", ratio: "4 / 3" },
  { file: "chair-1", title: "Kursi — kanp ki peeth", tag: "Chair", ratio: "4 / 3" },
  { file: "dining-1", title: "Dining set", tag: "Dining", ratio: "4 / 3" },
  { file: "takhat-1", title: "Cotton ka takhat", tag: "Takhat", ratio: "4 / 3" },
  { file: "table-1", title: "Lakdi ka mez", tag: "Table", ratio: "4 / 3" },
  { file: "shop-4", title: "Screwing aur jodna", tag: "Workshop", ratio: "4 / 3" },
  { file: "village-1", title: "Gaon ka kamra", tag: "Village", ratio: "4 / 3" },
];

export default function Gallery() {
  const [open, setOpen] = useState(null);

  /* lightbox — Escape se band */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % SHOTS.length);
      if (e.key === "ArrowLeft") setOpen((i) => (i - 1 + SHOTS.length) % SHOTS.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="gal">
      <div className="pagehead">
        <div className="container">
          <span className="eyebrow">Gallery</span>
          <h1>Dukaan aur hamara kaam</h1>
          <p>
            Dukan par kya kya hota hai — charpai ka rassi bharna, lakdi kaatna,
            jodna. Photo par click karke badi dekh sakte hain.
          </p>
        </div>
      </div>

      <div className="container section-sm">
        <div className="gal-grid">
          {SHOTS.map((s, i) => (
            <button
              key={s.file + i}
              className={`gal-item ${i === 0 ? "gal-wide" : ""}`}
              onClick={() => setOpen(i)}
              aria-label={`${s.title} — badi photo dekhein`}
            >
              <img
                src={`/images/catalog/${s.file}.webp`}
                alt={s.title}
                loading="lazy"
                width="1200"
                height="900"
              />
              <span className="gal-overlay">
                <span className="pill pill-accent">{s.tag}</span>
                <strong>{s.title}</strong>
              </span>
            </button>
          ))}
        </div>

        <div className="cta-panel mt-4">
          <div>
            <h2>Apna saamaan bhi aisa banwana hai?</h2>
            <p>
              Naap bhejein ya ghar aa kar dikha lein. {SITE.address.city} aur aas
              paas me delivery karte hain.
            </p>
          </div>
          <div className="flex gap-1 wrap">
            <a className="btn btn-primary btn-lg" href={TEL_LINK}>
              {SITE.phoneDisplay}
            </a>
            <Link to="/enquiry" className="btn btn-ghost btn-lg">
              Enquiry bharen
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------- lightbox ---------------- */}
      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={SHOTS[open].title}>
          <button className="lb-back" onClick={() => setOpen(null)} aria-label="Band karein" />
          <figure className="lb-fig">
            <img src={`/images/catalog/${SHOTS[open].file}.webp`} alt={SHOTS[open].title} />
            <figcaption>
              <span className="pill pill-accent">{SHOTS[open].tag}</span>
              <strong>{SHOTS[open].title}</strong>
            </figcaption>
          </figure>

          <button
            className="lb-nav lb-prev"
            onClick={() => setOpen((i) => (i - 1 + SHOTS.length) % SHOTS.length)}
            aria-label="Pichli photo"
          >
            ‹
          </button>
          <button
            className="lb-nav lb-next"
            onClick={() => setOpen((i) => (i + 1) % SHOTS.length)}
            aria-label="Agli photo"
          >
            ›
          </button>
          <button className="lb-close" onClick={() => setOpen(null)} aria-label="Band karein">
            ✕
          </button>
          <span className="lb-count">
            {open + 1} / {SHOTS.length}
          </span>
        </div>
      )}

      <div className="container section-sm">
        <div className="card enq-side-card center">
          <h3>Apni dukaan ki photo banwana hai?</h3>
          <p>
            WhatsApp par apni dukaan, machine ya kaam ka photo bhej dein — hum
            gallery me lagana chahenge to bataiye.
          </p>
          <a
            className="btn btn-wa"
            href={waLink("Namaste! Meri dukaan ki photo bhejni hai.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp karein
          </a>
        </div>
      </div>
    </div>
  );
}
