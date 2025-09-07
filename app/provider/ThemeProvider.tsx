/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { applyThemeJSON } from "@/lib/theme-utils";
import { db } from "@/lib/firebase";

type ThemeJSON = any;

const ThemeContext = createContext<{
  theme: ThemeJSON | null;
  loading: boolean;
}>({
  theme: null,
  loading: true,
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeJSON | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply from localStorage immediately
    const stored = localStorage.getItem("themeDoc");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        applyThemeJSON(parsed);
        setTheme(parsed);
      } catch {}
    }

    // Fetch latest from Firebase
    (async () => {
      try {
        const ref = doc(db, "config", "theme");
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          applyThemeJSON(data);
          setTheme(data);
          localStorage.setItem("themeDoc", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load theme:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
