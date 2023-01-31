/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

// Rotate X utilities
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotatey(180deg)",
    },
  });
});

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    fontSize: {
      h1_sm: " 4rem",
      h1_md: "4.5rem",
      h1_lg: "5rem",
      h1_xl: "6rem",
      h1_xxl: "8rem",
      h2_sm: " 2.5rem",
      h2_md: "3rem",
      h2_lg: "3.5rem",
      h2_xl: "4rem",
      h2_xxl: "5rem",
      "link-sm": "1rem",
      "link-md": ".8rem",
      "link-xl": ".6rem",
    },
    colors: {
      // Background Colors
      background: "var(--background)",
      backgroundSecondary: "var(--background-secondary)",
      // Colors Theme
      text: "var(--text)",
      primaryColor: "var(--primary)",
      secondaryColor: "var(--secondary)",
      // Conditional colors
      error: "var(--error)",
      // Default Color
      transparent: "transparent",
      green: "rgb(10,242,203)",
      salmon: "#ff0057",
      white: "#fff",
      grey: "#787f85",
      violet: "#5a5271",
      lightViolet: "#2e205b",
      violet50: "#beb1e7",
      black: "#000",
      lightBlack: "#333",

      inputBg: "var(--bg-input)",
      inputBorder: "var(--input-border)",
      imputColor: "var(--input-color)",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    extend: {
      spacing: {
        "nav-items-lg": "4rem",
        "nav-items-md": "2rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      margin: {
        "4xl": "-21px 0 0",
      },
    },
  },
  plugins: [rotateX],
};
