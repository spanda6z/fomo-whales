import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Fomo Whales brand palette
        whale: {
          black: "#050505",
          charcoal: "#0c0c0e",
          surface: "#121215",
          elevated: "#1a1a1f",
          border: "#2a2a32",
          muted: "#8b8b9a",
          soft: "#b4b4c0",
        },
        neon: {
          DEFAULT: "#00ff9d",
          dim: "#00cc7d",
          glow: "#00ff9d33",
          soft: "#00ff9d1a",
        },
        accent: {
          green: "#00ff9d",
          cyan: "#00e5ff",
          amber: "#ffb800",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 157, 0.15)",
        "glow-lg": "0 0 40px rgba(0, 255, 157, 0.2)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 157, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 255, 157, 0.12), transparent)",
        "card-gradient": "linear-gradient(180deg, rgba(26,26,31,0.9) 0%, rgba(18,18,21,0.95) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
