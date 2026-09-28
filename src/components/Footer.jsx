import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SITE, FULL_ADDRESS, TEL_LINK, MAPS_LINK, waLink } from "../data/site";

export default function Footer() {
  const { currentWood, currentAccent } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div className="foot-col foot-brand">
          <img
            className="foot-logo-img"
            src="/images/logo.svg"
            alt={`${SITE.name} logo`}
            loading="lazy"
            width="52"
            height="52"
          />
          <img
            className="foot-owner"
            src={SITE.ownerPhoto}
            alt={SITE.ownerName}
            loading="lazy"
            width="160"
            height="160"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <p className="foot-owner-name">{SITE.ownerName}</p>
          <h3 className="foot-logo">{SITE.name}</h3>
          <p>
            {SITE.address.line1} ke paas, {SITE.address.city} me hamari chhoti si
            dukaan. Lakdi ka charpai, bed, singardan, kursi aur mez — sab haath se
            banaye jaate hain, har size me.
          </p>
          <p className="foot-theme-note">
            Aap <strong>{currentWood.name}</strong> lakdi ka theme dekh rahe ho,
            accent <strong>{currentAccent.name}</strong>.
          </p>
        </div>

        <div className="foot-col">
          <h4>Saamaan</h4>
          <ul>
            <li><Link to="/shop?cat=Charpai">Charpai / Khatia</Link></li>
            <li><Link to="/shop?cat=Bed">Bed</Link></li>
            <li><Link to="/shop?cat=Singardan">Singardan / Almirah</Link></li>
            <li><Link to="/shop?cat=Takhat">Takhat</Link></li>
            <li><Link to="/shop">Sab kuch dekhein</Link></li>
          </ul>
        </div>

        <div className="foot-col">
          <h4>Humare baare me</h4>
          <ul>
            <li><Link to="/about">Dukan aur kaam</Link></li>
            <li><Link to="/enquiry">Apna size batayein</Link></li>
            <li><a href={waLink("Namaste, mujhe furniture ke baare me jaanna hai.")} target="_blank" rel="noreferrer">WhatsApp karein</a></li>
            {SITE.social.instagram && (
              <li><a href={SITE.social.instagram} target="_blank" rel="noreferrer">Instagram par dekhein</a></li>
            )}
            {SITE.social.facebook && (
              <li><a href={SITE.social.facebook} target="_blank" rel="noreferrer">Facebook par dekhein</a></li>
            )}
          </ul>
          {(SITE.social.instagram || SITE.social.facebook) && (
            <div className="foot-social">
              {SITE.social.instagram && (
                <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
                  </svg>
                </a>
              )}
              {SITE.social.facebook && (
                <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3H10v7h3v-7h2.5l.5-3H13V9a1 1 0 0 1 1-1z" fill="currentColor" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="foot-col">
          <h4>Pata kahan hai</h4>
          <ul className="foot-contact">
            <li>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                {SITE.address.line1},<br />
                {SITE.address.line2},<br />
                {SITE.address.city}, {SITE.address.district}<br />
                {SITE.address.state} – {SITE.address.pincode}
              </a>
            </li>
            <li>
              <a href={TEL_LINK}>{SITE.phoneDisplay}</a>
              <br />
              <a
                className="foot-wa"
                href={waLink("Namaste Arpit Furniture!")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp karein
              </a>
            </li>
            <li>{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container foot-bottom">
        <p>© {year} {SITE.fullName}. Saare dam par 18% GST shamil.</p>
        <p className="foot-made">{FULL_ADDRESS}</p>
      </div>
    </footer>
  );
}
