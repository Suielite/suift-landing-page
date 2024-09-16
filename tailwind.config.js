/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        suse: ["SUSE", "ui-sans-serif", "sans-serif"],
        Poppins: ["Poppins", "ui-sans-serif", "sans-serif"],
        Syne: ["Syne", "sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
