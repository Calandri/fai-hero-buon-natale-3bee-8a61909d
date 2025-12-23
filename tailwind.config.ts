import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Bee Yellow/Honey
        primary: {
          50: "#FEF9E7",
          100: "#FCF0C3",
          200: "#FAE69B",
          300: "#F8DC73",
          400: "#F7CE52",
          500: "#F7B731",
          600: "#E5A321",
          700: "#C98B15",
          800: "#A6720F",
          900: "#7A5409",
        },
        // Secondary - Gold
        secondary: {
          50: "#FFFEF5",
          100: "#FFFDE6",
          200: "#FFF9C4",
          300: "#FFF59D",
          400: "#FFEE58",
          500: "#FFD700",
          600: "#FFC107",
          700: "#FFB300",
          800: "#FFA000",
          900: "#FF8F00",
        },
        // Accent - Silver/White
        accent: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#E8E8E8",
          400: "#D4D4D4",
          500: "#C0C0C0",
          600: "#A3A3A3",
          700: "#737373",
          800: "#525252",
          900: "#262626",
        },
        // Neutral
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
        // Background
        background: {
          dark: "#1a1a2e",
          darker: "#16213e",
          darkest: "#0f0f23",
        },
        // Semantic colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        // Snow colors
        snow: {
          white: "#FFFFFF",
          soft: "#F0F4F8",
          silver: "#E8E8E8",
        },
        // Bee colors
        bee: {
          yellow: "#F7B731",
          gold: "#FFD700",
          honey: "#FFC107",
          amber: "#FFEB3B",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "hero-mobile": "2.5rem",
        "hero-desktop": "4rem",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "glow-gold": "0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)",
        "glow-honey": "0 0 20px rgba(247, 183, 49, 0.4), 0 0 40px rgba(247, 183, 49, 0.2)",
        "glow-white": "0 0 15px rgba(255, 255, 255, 0.3)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        snowfall: "snowfall 10s linear infinite",
        "particle-float": "particleFloat 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "fade-slide-up": "fadeSlideUp 0.8s ease-out forwards",
        "wing-flap": "wingFlap 0.1s ease-in-out infinite",
        "bee-cross": "beeCross 4s ease-in-out forwards",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translateY(-10vh) translateX(0)", opacity: "1" },
          "100%": { transform: "translateY(110vh) translateX(20px)", opacity: "0.6" },
        },
        particleFloat: {
          "0%, 100%": { transform: "translateY(5px)", opacity: "0.6" },
          "50%": { transform: "translateY(-5px)", opacity: "0.9" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        fadeSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        wingFlap: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.6)" },
        },
        beeCross: {
          "0%": { transform: "translateX(-100px) translateY(0)" },
          "25%": { transform: "translateX(25vw) translateY(-30px)" },
          "50%": { transform: "translateX(50vw) translateY(10px)" },
          "75%": { transform: "translateX(75vw) translateY(-20px)" },
          "100%": { transform: "translateX(calc(100vw + 100px)) translateY(0)" },
        },
      },
      zIndex: {
        background: "0",
        snow: "1",
        particles: "2",
        content: "5",
        bee: "10",
        modal: "50",
        tooltip: "100",
      },
    },
  },
  plugins: [],
};

export default config;
