import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "Bebas Neue", "Impact", "sans-serif"],
        space: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-space)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#e61924",
          dark: "#040203",
          card: "#0c0507",
        },
      },
      boxShadow: {
        glow: "0 0 60px rgba(230, 25, 36, 0.25)",
        "red-sm": "0 0 20px rgba(230, 25, 36, 0.35)",
        "red-lg": "0 0 80px rgba(230, 25, 36, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

