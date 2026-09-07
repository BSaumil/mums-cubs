"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/Icon";

const STORAGE_KEY = "mc-theme";
type ThemePreference = "light" | "dark";

function getSystemPreference(): ThemePreference {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the active theme depends on localStorage/matchMedia, which only exist client-side; reading them during render would mismatch the server-rendered HTML.
    setTheme(stored === "light" || stored === "dark" ? stored : getSystemPreference());
  }, []);

  function toggle() {
    const next: ThemePreference = (theme ?? getSystemPreference()) === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can fail (private browsing, quota) — the toggle still applies for this session.
    }
  }

  if (theme === null) {
    return <span className="inline-block h-11 w-11" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--text-secondary)] hover:bg-wood-100 hover:text-[var(--text-primary)]"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} className="h-5 w-5" />
    </button>
  );
}
