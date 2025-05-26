import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       animation: {
        'dot-flashing': 'dotFlashing 1s infinite linear alternate',
      },
         keyframes: {
        dotFlashing: {
          '0%': { backgroundColor: 'var(--clr-main)' },
          '50%, 100%': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
        },
         line: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
