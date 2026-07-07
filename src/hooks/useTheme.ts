import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "weverton-theme";

export type Theme = "light" | "dark";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0A0A0A",
  light: "#FAFAFA",
};

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "dark";
}

let theme = getStoredTheme();
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return theme;
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.style.colorScheme = next;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", THEME_COLORS[next]);
  }
}

function setTheme(next: Theme) {
  theme = next;
  applyTheme(theme);
  localStorage.setItem(STORAGE_KEY, theme);
  notify();
}

export function useTheme() {
  const currentTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [currentTheme]);

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    isDark: currentTheme === "dark",
  };
}
