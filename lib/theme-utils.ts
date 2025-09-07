/* eslint-disable @typescript-eslint/no-explicit-any */
// Map your theme.json to CSS variables with a consistent --color-* prefix
export function themeToCSS(theme: any) {
  let css = ":root{";
  const { colors, gradient, anim } = theme;

  if (colors) {
    css += `--color-primary:${colors.primary.base};`;
    css += `--color-primary-light:${colors.primary.light};`;
    css += `--color-primary-dark:${colors.primary.dark};`;

    css += `--color-secondary:${colors.secondary.base};`;
    css += `--color-secondary-light:${colors.secondary.light};`;
    css += `--color-secondary-dark:${colors.secondary.dark};`;

    css += `--color-accent:${colors.accent};`;
    css += `--color-background:${colors.background};`;
    css += `--color-surface:${colors.surface};`;
    css += `--color-text-primary:${colors.text.primary};`;
    css += `--color-text-secondary:${colors.text.secondary};`;
    css += `--color-error:${colors.error};`;
    css += `--color-success:${colors.success};`;
    css += `--color-warning:${colors.warning};`;
  }

  if (gradient) {
    css += `--gradient-from:${gradient.from};`;
    css += `--gradient-to:${gradient.to};`;
  }

  if (anim) {
    css += `--fade-in-duration:${anim.fadeInDurationMs}ms;`;
    css += `--fade-in-easing:${anim.fadeInEasing};`;
    css += `--scale-from:${anim.scaleFrom};`;
  }

  css += "}";
  return css;
}

export function applyThemeJSON(theme: any) {
  const style = document.createElement("style");
  style.textContent = themeToCSS(theme);
  document.head.appendChild(style);
}
