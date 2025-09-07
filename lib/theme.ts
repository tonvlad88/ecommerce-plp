export type RGB = `${number} ${number} ${number}`;

export type ThemeDoc = {
  name?: string;
  colors: {
    primary: { base: RGB; light: RGB; dark: RGB };
    secondary: { base: RGB; light: RGB; dark: RGB };
    accent: RGB;
    background: RGB;
    surface: RGB;
    text: { primary: RGB; secondary: RGB };
    error: RGB;
    success: RGB;
    warning: RGB;
  };
  gradient: { from: RGB; to: RGB };
  anim: { fadeInDurationMs: number; fadeInEasing: string; scaleFrom: number };
  updatedAt?: number;
};
