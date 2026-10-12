import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
        arabicDisplay: ["var(--font-arabic-display)", "var(--font-arabic)", "serif"],
        bangla: ["var(--font-bangla)", "var(--font-arabic)", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f6f6f7",
          100: "#ececee",
          200: "#d6d6da",
          300: "#b3b3ba",
          400: "#8a8a94",
          500: "#6b6b76",
          600: "#54545e",
          700: "#43434b",
          800: "#2c2c33",
          900: "#1a1a1f",
          950: "#101014",
        },
        sand: {
          50: "#faf8f5",
          100: "#f4efe7",
          200: "#e8ddcb",
          300: "#d9c6a8",
          400: "#c6a97f",
          500: "#b78f5c",
          600: "#a87a4c",
          700: "#8c6140",
          800: "#725039",
          900: "#5e4332",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e6ede6",
          200: "#cdddcd",
          300: "#a8c3a8",
          400: "#7da27d",
          500: "#5c845c",
          600: "#486948",
          700: "#3b543b",
          800: "#314431",
          900: "#2a382a",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,16,20,0.04), 0 8px 24px -12px rgba(16,16,20,0.12)",
        card: "0 1px 3px rgba(16,16,20,0.06), 0 12px 40px -20px rgba(16,16,20,0.18)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
        "fade-in": "fade-in 0.25s ease-out both",
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
