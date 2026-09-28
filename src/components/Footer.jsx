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
            className="foot-owner"
            src="/images/owner.jpg"
            alt="Arpit Furniture Works ke malik"
            loading="lazy"
            width="160"
            height="160"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
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
          </ul>
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
