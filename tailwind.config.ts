import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#af1626",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4B5563",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#fb0918",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["ArabotoNormal", "sans-serif"],
        araboto: {
          thin: ["ArabotoThin", "sans-serif"],
          light: ["ArabotoLight", "sans-serif"],
          normal: ["ArabotoNormal", "sans-serif"],
          bold: ["ArabotoBold", "sans-serif"],
        },
      },
      fontSize: {
        'heading-1': ['32px', { lineHeight: '48px', fontWeight: '400' }],
        'heading-2': ['28px', { lineHeight: '42px', fontWeight: '400' }],
        'heading-3': ['20px', { lineHeight: '30px', fontWeight: '400' }],
        'body-large': ['18px', { lineHeight: '22px', fontWeight: '500' }],
        'body': ['14px', { lineHeight: '26px', fontWeight: '400' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      gradientColorStops: {
        'primary-start': '#af1626',
        'primary-end': '#fb0918',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;