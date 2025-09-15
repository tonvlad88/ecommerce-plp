"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { applyThemeJSON } from "@/lib/theme-utils";

type ThemeJSON = {
  colors?: Record<string, string>;
  gradients?: Record<string, { from: string; to: string }>;
};

interface ThemeContextType {
  theme: ThemeJSON | null;
  loading: boolean;
  setThemeKey: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  loading: true,
  setThemeKey: () => {},
});

export default function ThemeProvider({
  children,
  initialKey = "clientA",
}: {
  children: React.ReactNode;
  initialKey?: string;
}) {
  const [theme, setTheme] = useState<ThemeJSON | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeKey, setThemeKey] = useState(initialKey);

  useEffect(() => {
    setLoading(true);

    // Load from localStorage first
    const stored = localStorage.getItem(`themeDoc:${themeKey}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        applyThemeJSON(parsed);
        setTheme(parsed);
      } catch {}
    }

    // Listen to Realtime DB changes
    const themeRef = ref(rtdb, `themes/${themeKey}`);
    const unsubscribe = onValue(
      themeRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          applyThemeJSON(data); // ✅ set CSS vars first
          setTheme(data);
          localStorage.setItem(`themeDoc:${themeKey}`, JSON.stringify(data));
        }
        setLoading(false);
      },
      (error) => {
        console.error("Failed to load theme:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [themeKey]);

  return (
    <ThemeContext.Provider value={{ theme, loading, setThemeKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
