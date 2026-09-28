import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Jab bhi page change ho, scroll top pe le aao */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
