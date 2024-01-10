/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#3F72AF",
        hprimary: "#2c5b8a",
        Secondary: "#EEEEEE",
        Third: "#DBE2EF",
        Fourth: "#112D4E",
        black: "#000",
        // white:'#fff'
      },
      darkMode: 'class',
      fontFamily: {
        primary: ["Space Grotesk", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
        third: ["Roboto", "sans-serif"],
        fourth: ["Rubik", " sans-serif"],
      },
    },
  },
  plugins: [ require('preline/plugin'), require('@codaworks/react-glow/tailwind')],
};
