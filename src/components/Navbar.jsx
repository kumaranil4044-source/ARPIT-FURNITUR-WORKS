import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import ThemePanel from "./ThemePanel";
import { SITE, waLink } from "../data/site";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Service" },
  { to: "/about", label: "About Us" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count, openCart } = useCart();
  const { toggleFinish } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPanelOpen(false);
  }, [pathname]);

  return (
    <>
      {/* top announcement strip */}
      <div className="topbar">
        <div className="container topbar-in">
          <span>₹{SITE.freeDeliveryAbove.toLocaleString("en-IN")} se upar par delivery muft</span>
          <a
            className="topbar-wa"
            href={waLink("Namaste Arpit Furniture! Mujhe jaanna hai.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp {SITE.phoneDisplay}
          </a>
        </div>
      </div>

      <header className={`nav ${scrolled ? "nav-stuck" : ""}`}>
        <div className="container nav-in">
          <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
            <span className="brand-mark">
              <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
                <path
                  d="M6 26V13l10-7 10 7v13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 26v-8h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="brand-text">
              <strong>{SITE.name}</strong>
              <em>{SITE.address.city}, {SITE.address.state}</em>
            </span>
          </Link>

          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={() => setPanelOpen((v) => !v)}
              title="Customise wood & colour"
              aria-label="Customise wood and colour"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 2.8v18.4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 2.8a9.2 9.2 0 0 1 0 18.4z" fill="currentColor" />
              </svg>
            </button>

            <button
              className="icon-btn"
              onClick={toggleFinish}
              title="Light / Dark mode"
              aria-label="Toggle light and dark mode"
            >
              <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                <path
                  d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button
              className="icon-btn cart-btn"
              onClick={openCart}
              aria-label={`Open cart, ${count} items`}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M5 7h14l-1.2 12.2a1.6 1.6 0 0 1-1.6 1.4H7.8a1.6 1.6 0 0 1-1.6-1.4L5 7z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7a3 3 0 0 1 6 0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>

            <button
              className="icon-btn burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <ThemePanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </>
  );
}
