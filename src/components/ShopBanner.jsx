/* ============================================================
   ShopBanner
   Homepage ka sabse upar ka block — dukaan ki photo, uske upar
   shop ka naam, aur bed banne ka kaam.

   ★ Apni dukaan ki asli photo lagani ho to:
     public/images/catalog/shop-main-wide.webp
     ko apni photo se replace kar do. Naam wahi rakhna.
   ============================================================ */

import { SITE, TEL_LINK, waLink, MAPS_LINK } from "../data/site";

export default function ShopBanner() {
  return (
    <section className="shopbanner">
      <img
        className="shopbanner-bg"
        src="/images/catalog/shop-1-wide.webp"
        alt="Arpit Furniture Works ki dukaan me lakdi ka kaam chal raha hai"
        width="2000"
        height="1125"
        fetchpriority="high"
        decoding="async"
      />
      <div className="shopbanner-veil" aria-hidden="true" />

      <div className="container shopbanner-in">
        <div className="shopbanner-text">
          <span className="shopbadge">
            <i className="dot-live" /> {SITE.address.line2}
          </span>

          <p className="shopbanner-kicker">Chhoti si dukaan, {SITE.address.city}</p>

          <h1 className="shopbanner-title">
            Arpit Furniture
            <span>Works &amp; Service</span>
          </h1>

          <p className="shopbanner-sub">
            Aaj hi ek <strong>lakdi ka bed</strong> ban raha hai. Charpai,
            singardan, takhat, kursi aur mez — sab aapke ghar ke naap ke hisaab
            se. Naap bhejein, hum bana denge.
          </p>

          <div className="shopbanner-btns">
            <a className="btn btn-accent btn-lg" href={TEL_LINK}>
              {SITE.phoneDisplay}
            </a>
            <a
              className="btn btn-wa btn-lg"
              href={waLink("Namaste! Mujhe ek lakdi ka bed banwana hai.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp par baat karein
            </a>
          </div>

          <ul className="shopbanner-points">
            <li>Apne size ka bed</li>
            <li>Asli lakdi, particle board nahi</li>
            <li>10–20 din me taiyaar</li>
          </ul>
        </div>

        {/* bed card hataya — banner ab full-screen single text */}
      </div>

      <div className="shopbanner-bar">
        <div className="container shopbanner-bar-in">
          <span>
            <b>Pata:</b> {SITE.address.line1}, {SITE.address.city},{" "}
            {SITE.address.district} – {SITE.address.pincode}
          </span>
          <span>
            <b>Time:</b> {SITE.hours}
          </span>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer">
            Map par dekhein →
          </a>
        </div>
      </div>
    </section>
  );
}
