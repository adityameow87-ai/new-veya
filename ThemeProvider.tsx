"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from "@/lib/theme";

interface ThemeContextValue {
  preference: ThemePreference;
  resolved: ResolvedTheme;
  setPreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  preference: "system",
  resolved: "dark",
  setPreference: () => {},
});

function readDom(): { preference: ThemePreference; resolved: ResolvedTheme } {
  if (typeof document === "undefined")
    return { preference: "system", resolved: "dark" };
  const el = document.documentElement;
  const p = el.getAttribute("data-theme-preference");
  const r = el.getAttribute("data-theme");
  return {
    preference: p === "light" || p === "dark" ? p : "system",
    resolved: r === "light" ? "light" : "dark",
  };
}

function applyDom(preference: ThemePreference, resolved: ResolvedTheme) {
  const el = document.documentElement;
  el.setAttribute("data-theme", resolved);
  el.setAttribute("data-theme-preference", preference);
  el.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    preference: ThemePreference;
    resolved: ResolvedTheme;
  }>({ preference: "system", resolved: "dark" });

  // Sync with the pre-paint inline script on mount.
  useEffect(() => {
    setState(readDom());
  }, []);

  const setPreference = useCallback((pref: ThemePreference) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, pref);
    } catch {
      /* storage unavailable (private mode) — still apply for session */
    }
    const resolved: ResolvedTheme =
      pref === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : pref;
    applyDom(pref, resolved);
    setState({ preference: pref, resolved });
    // Notify non-React listeners (e.g. the 3D scene reads this).
    window.dispatchEvent(
      new CustomEvent("veya-theme", { detail: { resolved, preference: pref } })
    );
  }, []);

  // Follow the OS while preference is "system".
  useEffect(() => {
    if (state.preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved: ResolvedTheme = mq.matches ? "dark" : "light";
      applyDom("system", resolved);
      setState({ preference: "system", resolved });
      window.dispatchEvent(
        new CustomEvent("veya-theme", { detail: { resolved, preference: "system" } })
      );
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [state.preference]);

  return (
    <ThemeContext.Provider value={{ ...state, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
