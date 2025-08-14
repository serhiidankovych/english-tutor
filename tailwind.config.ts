/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        noto: ["var(--font-noto)"],
      },
      colors: {
        "step-1-bg": "rgba(var(--step-1-bg), 0.3)",
        "step-2-bg": "rgba(var(--step-2-bg), 0.3)",
        "step-3-bg": "rgba(var(--step-3-bg), 0.3)",
        "step-4-bg": "rgba(var(--step-4-bg), 0.3)",
      },
    },
  },
  plugins: [],
};
