/* ============================================================
   ProductImage
   Renders a REAL photograph with a graceful fallback chain:

     1. src      -> your own photo  (public/images/products/<id>.jpg)
     2. fallback -> stock photo shipped with the template
     3. neutral wood placeholder

   The <img> only fades in once it has actually decoded, so a
   missing file never shows a broken-image icon or a flash.
   ============================================================ */

import { useEffect, useState } from "react";

export default function ProductImage({
  src,
  fallback,
  alt = "",
  ratio = "4 / 3",
  className = "",
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 300px",
  priority = false,
  zoom = false,
}) {
  const [stage, setStage] = useState("loading"); // loading | src | fallback | none

  /* reset whenever the source changes */
  useEffect(() => {
    setStage("loading");
  }, [src, fallback]);

  if (stage === "none" || (!src && stage === "loading")) {
    /* nothing to load yet -> placeholder */
    if (!src) return <Placeholder alt={alt} ratio={ratio} className={className} />;
  }

  const current = stage === "fallback" ? fallback : src;
  if (stage === "none") return <Placeholder alt={alt} ratio={ratio} className={className} />;

  return (
    <div
      className={`pimg ${zoom ? "pimg-zoom" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        key={current}
        src={current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        /* React 18 only forwards lowercase unknown attributes, so this is
           passed as-is. It is a real HTML attribute, not a React prop. */
        {...(priority ? { fetchpriority: "high" } : {})}
        sizes={sizes}
        className="pimg-el"
        data-state={stage}
        onLoad={() => setStage(current === fallback ? "fallback" : "src")}
        onError={() => {
          if (current !== fallback && fallback) setStage("fallback");
          else setStage("none");
        }}
      />
      {stage === "loading" && <span className="pimg-skel" aria-hidden="true" />}
    </div>
  );
}

/* Neutral placeholder in the current wood tone — never a broken icon */
function Placeholder({ alt, ratio, className }) {
  return (
    <div
      className={`pimg pimg-ph ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={alt || "Image coming soon"}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="var(--wood-50)" />
        <g stroke="var(--grain)" strokeWidth="2" opacity="0.45">
          <path d="M0 45h400M0 100h400M0 155h400M0 210h400M0 265h400" />
        </g>
        <rect x="148" y="105" width="104" height="86" rx="6" fill="var(--wood-300)" opacity="0.5" />
        <text
          x="200"
          y="222"
          textAnchor="middle"
          fill="var(--wood-700)"
          fontSize="15"
          fontFamily="'Outfit', sans-serif"
          fontWeight="600"
          opacity="0.75"
        >
          Photo coming soon
        </text>
      </svg>
    </div>
  );
}
