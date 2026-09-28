/* ============================================================
   ThemePanel
   The "Customise" drawer. Customer picks:
     1. Wood type   -> Walnut / Teak / Oak / Mahogany / Ash / Ebony
     2. Accent      -> brass / copper / sage / slate / burgundy
     3. Finish      -> light / dark
   The whole website recolours instantly. Choice is remembered.
   ============================================================ */

import { useEffect } from "react";
import { ACCENTS, WOOD_TYPES } from "../data/woodTypes";
import { useTheme } from "../context/ThemeContext";

export default function ThemePanel({ open, onClose }) {
  const {
    wood,
    accent,
    finish,
    setWood,
    setAccent,
    setFinish,
    reset,
    currentWood,
    currentAccent,
  } = useTheme();

  /* close on Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="tp-backdrop animate-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`tp ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Customise appearance"
      >
        <div className="tp-head">
          <div>
            <h3>Rang badlein</h3>
            <p>Apni pasand ki lakdi aur rang chunein.</p>
          </div>
          <button className="icon-btn on-wood" onClick={onClose} aria-label="Band karein">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="tp-body">
          {/* live preview */}
          <div className="tp-preview">
            <div className="tp-preview-card">
              <div className="tp-preview-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="tp-preview-lines">
                <i />
                <i />
                <i />
              </div>
              <div className="tp-preview-actions">
                <b />
                <b />
              </div>
            </div>
            <p className="tp-preview-label">
              Live preview · <strong>{currentWood.name}</strong> +{" "}
              <strong>{currentAccent.name}</strong>
            </p>
          </div>

          {/* 1. wood type */}
          <section className="tp-block">
            <h4>
              <span className="tp-num">1</span> Lakdi ka rang
            </h4>
            <p className="tp-hint">
              Website ka rang aur har product ki photo isi hisaab se badlegi.
            </p>
            <div className="sw-grid">
              {WOOD_TYPES.map((w) => (
                <button
                  key={w.id}
                  className={`sw ${wood === w.id ? "is-active" : ""}`}
                  onClick={() => setWood(w.id)}
                  aria-pressed={wood === w.id}
                >
                  <span
                    className="sw-chip"
                    style={{
                      background: `repeating-linear-gradient(92deg, ${w.grain} 0 2px, transparent 2px 6px), linear-gradient(150deg, ${w.swatch}, ${w.grain})`,
                    }}
                  />
                  <span className="sw-meta">
                    <strong>
                      {w.name} <em className="sw-hindi">{w.hindi}</em>
                    </strong>
                    <em>{w.tagline}</em>
                  </span>
                  {wood === w.id && <span className="sw-tick">✓</span>}
                </button>
              ))}
            </div>
          </section>

          {/* 2. accent */}
          <section className="tp-block">
            <h4>
              <span className="tp-num">2</span> Button ka rang
            </h4>
            <p className="tp-hint">Site ke buttons aur highlight badal jaate hain.</p>
            <div className="dot-grid">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  className={`dot ${accent === a.id ? "is-active" : ""}`}
                  onClick={() => setAccent(a.id)}
                  aria-pressed={accent === a.id}
                  title={a.name}
                >
                  <span style={{ background: a.swatch }} />
                  <em>{a.name}</em>
                </button>
              ))}
            </div>
          </section>

          {/* 3. finish */}
          <section className="tp-block">
            <h4>
              <span className="tp-num">3</span> Roshni
            </h4>
            <div className="seg">
              {[
                { id: "light", label: "Ujala", ic: "☀" },
                { id: "dark", label: "Andhera", ic: "☾" },
              ].map((f) => (
                <button
                  key={f.id}
                  className={finish === f.id ? "is-active" : ""}
                  onClick={() => setFinish(f.id)}
                  aria-pressed={finish === f.id}
                >
                  <span aria-hidden="true">{f.ic}</span> {f.label}
                </button>
              ))}
            </div>
          </section>

          <button className="btn btn-ghost btn-block mt-2" onClick={reset}>
            Sab wapas Babool par
          </button>

          <p className="tp-foot">
            Aapki pasand isi device par save ho jaati hai, isliye agli baar bhi
            wahi rehti hai.
          </p>
        </div>
      </aside>
    </>
  );
}
