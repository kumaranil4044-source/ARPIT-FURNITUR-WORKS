/* ============================================================
   analytics.js — Google Analytics (GA4) ka chhota sa helper
   - ID .env me VITE_GA_ID=G-XXXXXXX likhne par hi chalega
   - ID nahi hai to sab function chup-chaap kuch nahi karte
   ============================================================ */

const GA_ID = import.meta.env.VITE_GA_ID;
let loaded = false;

export function initAnalytics() {
  if (!GA_ID || loaded) return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

/* har page khulne par — kaunsa page dekha gaya */
export function trackPage(path) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: path });
}

/* button dabane par — whatsapp, call, add_to_cart */
export function trackEvent(name, params = {}) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", name, params);
}
