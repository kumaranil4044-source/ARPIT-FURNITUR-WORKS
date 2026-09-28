/* ============================================================
   ThemeContext
   - wood type  (data-wood)   -> whole site colour changes
   - accent     (data-accent) -> buttons / highlights
   - finish     (data-finish) -> light or dark mode
   Selection is saved to localStorage so it survives refresh.
   ============================================================ */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ACCENTS, WOOD_TYPES, getAccent, getWood } from "../data/woodTypes";

const ThemeContext = createContext(null);
const STORAGE_KEY = "darbaar-theme-v1";

const DEFAULTS = { wood: "sheesham", accent: "sindoor", finish: "light" };

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      wood: WOOD_TYPES.some((w) => w.id === parsed.wood)
        ? parsed.wood
        : DEFAULTS.wood,
      accent: ACCENTS.some((a) => a.id === parsed.accent)
        ? parsed.accent
        : DEFAULTS.accent,
      finish: ["light", "dark"].includes(parsed.finish)
        ? parsed.finish
        : DEFAULTS.finish,
    };
  } catch {
    return DEFAULTS;
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readStored);

  /* Apply the theme to <html> so CSS variables swap instantly */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-wood", theme.wood);
    root.setAttribute("data-accent", theme.accent);
    root.setAttribute("data-finish", theme.finish);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } catch {
      /* private mode – ignore */
    }
  }, [theme]);

  /* Expose a ready-to-use CSS gradient for previews/cards */
  const woodGradient = useMemo(
    () =>
      `repeating-linear-gradient(92deg, var(--grain) 0 2px, transparent 2px 7px, var(--grain) 9px 11px, transparent 11px 18px), linear-gradient(160deg, var(--wood-700), var(--wood-900))`,
    []
  );

  const value = useMemo(
    () => ({
      ...theme,
      setWood: (wood) => setTheme((t) => ({ ...t, wood })),
      setAccent: (accent) => setTheme((t) => ({ ...t, accent })),
      setFinish: (finish) => setTheme((t) => ({ ...t, finish })),
      toggleFinish: () =>
        setTheme((t) => ({ ...t, finish: t.finish === "light" ? "dark" : "light" })),
      reset: () => setTheme(DEFAULTS),
      currentWood: getWood(theme.wood),
      currentAccent: getAccent(theme.accent),
      woodGradient,
    }),
    [theme, woodGradient]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/* Custom hook – use anywhere below <ThemeProvider> */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme() must be used inside <ThemeProvider>");
  return ctx;
}
