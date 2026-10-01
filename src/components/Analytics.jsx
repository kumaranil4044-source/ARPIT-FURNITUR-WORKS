/* ============================================================
   Analytics — har page aur WhatsApp/Call button ka hisab
   - page khulne par page_view bhejta hai
   - wa.me link dabane par whatsapp_click
   - tel: link dabane par call_click
   ============================================================ */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPage, trackEvent } from "../utils/analytics";

export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  /* page badalne par hisab */
  useEffect(() => {
    trackPage(pathname + search);
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
