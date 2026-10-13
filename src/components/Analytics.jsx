/* ============================================================
   Analytics — har page aur WhatsApp/Call button ka hisab
   - page khulne par page_view bhejta hai
   - wa.me link dabane par whatsapp_click
   - tel: link dabane par call_click
   ============================================================ */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPage, trackEvent } from "../utils/analytics";

/* har page ka Google/browser title + description */
const PAGE_META = {
  "/": [
    "Arpit Furniture Works & Service — Lakdi ka Charpai, Bed, Singardan | Phulpur, Prayagraj",
    "Phulpur, Prayagraj me lakdi ke charpai, bed, singardan, takhat, kursi aur mez — apne size ke hisaab se banaye jaate hain.",
  ],
  "/shop": [
    "Saara Saamaan — Kitchen, Sofa, Bed, Dining | Arpit Furniture, Phulpur",
    "Kitchen, sofa, bed, dining, chair, door, window — sab lakdi ka, sab naap par. Daam sahit poori list dekhein.",
  ],
  "/about": [
    "Dukaan Aur Kaam — Arpit Furniture Works, Phulpur",
    "Mahajudwa, Phulpur me lakdi furniture ki dukaan — naap, design aur fitting sab khud dekhte hain.",
  ],
  "/gallery": [
    "Kaam Ki Photos — Arpit Furniture Works",
    "Charpai rassi bharna, lakdi kaatna, jodna — dukaan aur kaam ki asli photos.",
  ],
  "/reviews": [
    "Customer Reviews — Arpit Furniture Works, Phulpur",
    "Phulpur aur aas-paas ke grahakon ke asli reviews — bed, sofa, darwaza, khidki.",
  ],
  "/contact": [
    "Sampark — Arpit Furniture Works, Phulpur, Prayagraj",
    "Mahajudwa, Near Hanuman Mandir, Phulpur — Call +91 90052 79049, Mon–Sat 9am–8pm.",
  ],
  "/enquiry": [
    "Apna Size Batayein — Arpit Furniture Works",
    "Naap, photo ya message bhejein — lakdi furniture ka sahi daam turant jaanein.",
  ],
  "/cart": ["Aapki Tokri — Arpit Furniture Works", "Chune hue lakdi furniture ki list."],
};

function setMeta(title, desc) {
  document.title = title;
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute("content", desc);
}

export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  /* page badalne par hisab + title */
  useEffect(() => {
    trackPage(pathname + search);
    /* product page apna title khud lagata hai */
    if (!pathname.startsWith("/product/")) {
      const meta = PAGE_META[pathname] || PAGE_META["/"];
      setMeta(meta[0], meta[1]);
    }
  }, [pathname, search]);

  /* WhatsApp / Call button dabane par hisab (poori site par) */
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target.closest("a");
      if (!link || !link.href) return;
      if (link.href.includes("wa.me")) {
        trackEvent("whatsapp_click", { page: pathname });
      } else if (link.href.startsWith("tel:")) {
        trackEvent("call_click", { page: pathname });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
