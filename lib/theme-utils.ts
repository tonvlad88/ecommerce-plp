// lib/theme-utils.ts

export interface ThemeJSON {
  colors?: Record<string, string>;
  gradients?: Record<string, { from?: string; to?: string }>;
}

export function applyThemeJSON(theme: ThemeJSON) {
  const root = document.documentElement;

  // Apply colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  // Apply gradients
  if (theme.gradients) {
    Object.entries(theme.gradients).forEach(([_, gradValues]) => {
      if (gradValues.from) {
        root.style.setProperty(`--gradient-from`, gradValues.from);
      }
      if (gradValues.to) {
        root.style.setProperty(`--gradient-to`, gradValues.to);
      }
    });
  }
}
