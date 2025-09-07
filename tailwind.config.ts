import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          light: "#818CF8",
          dark: "#3730A3",
        },
        secondary: {
          DEFAULT: "#9333EA",
          light: "#C084FC",
          dark: "#7E22CE",
        },
        accent: "#06B6D4",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        text: {
          primary: "#111827",
          secondary: "#4B5563",
        },
        error: "#DC2626",
        success: "#16A34A",
        warning: "#D97706",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(to bottom right, #6366F1, #9333EA)",
      },
    },
  },
  plugins: [],
};

export default config;
