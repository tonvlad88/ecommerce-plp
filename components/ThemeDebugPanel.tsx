"use client";
import { useTheme } from "@/app/provider/ThemeProvider";
import { useEffect, useState } from "react";

type VarInfo = { name: string; value: string; isColor: boolean };

export default function ThemeDebugPanel() {
  const [vars, setVars] = useState<VarInfo[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const varNames = [
      "--color-primary",
      "--color-primary-light",
      "--color-primary-dark",
      "--color-secondary",
      "--color-secondary-light",
      "--color-secondary-dark",
      "--color-accent",
      "--color-background",
      "--color-surface",
      "--color-text-primary",
      "--color-text-secondary",
      "--color-error",
      "--color-success",
      "--color-warning",
      "--gradient-from",
      "--gradient-to",
    ];

    const collected: VarInfo[] = varNames.map((name) => {
      const value = rootStyles.getPropertyValue(name).trim();
      const isColor = /^\d+\s+\d+\s+\d+$/.test(value);
      return { name, value, isColor };
    });

    setVars(collected);
  }, [theme]); // re-run when theme changes

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "1rem",
        fontSize: "0.8rem",
        maxHeight: "50vh",
        overflowY: "auto",
        zIndex: 9999,
        borderTopLeftRadius: "8px",
      }}
    >
      <strong style={{ display: "block", marginBottom: "0.5rem" }}>
        Theme Debug Panel
      </strong>
      {vars.map((v) => (
        <div
          key={v.name}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.25rem",
          }}
        >
          <code style={{ flex: "0 0 180px" }}>{v.name}</code>
          <span style={{ flex: "1 1 auto", marginRight: "0.5rem" }}>
            {v.value}
          </span>
          {v.isColor && (
            <span
              style={{
                width: "1.2rem",
                height: "1.2rem",
                background: `rgb(${v.value})`,
                border: "1px solid #fff",
                borderRadius: "3px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
