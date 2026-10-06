"use client";

import { useLayoutEffect, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function readPreference(): Theme | null {
  try {
    const theme = localStorage.getItem("theme");
    return theme === "light" || theme === "dark" ? theme : null;
  } catch {
    return null;
  }
}

export default function ThemeToggle() {
  const preference = useRef<Theme | null>(null);

  useLayoutEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme() {
      const dark = preference.current === "dark" || (!preference.current && systemTheme.matches);
      document.documentElement.classList.toggle("dark", dark);
    }

    function syncPreference(event: StorageEvent) {
      if (event.key === "theme" || event.key === null) {
        preference.current = readPreference();
        applyTheme();
      }
    }

    preference.current = readPreference();
    applyTheme();
    systemTheme.addEventListener("change", applyTheme);
    window.addEventListener("storage", syncPreference);

    return () => {
      systemTheme.removeEventListener("change", applyTheme);
      window.removeEventListener("storage", syncPreference);
    };
  }, []);

  function toggleTheme() {
    const theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    preference.current = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem("theme", theme);
    } catch {
      // The toggle still works when the browser blocks persistent storage.
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="ml-auto"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={toggleTheme}
    >
      <Moon className="dark:hidden" aria-hidden="true" />
      <Sun className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
