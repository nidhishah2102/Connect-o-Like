/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#675db2",
        hprimary: "#52488d",
        Secondary: "#EEEEEE",
        Third: "#DBE2EF",
        Fourth: "#112D4E",
        black: "#000",
        // white:'#fff'
      },
      darkMode: "class",
      fontFamily: {
        primary: ["Space Grotesk", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
        third: ["Roboto", "sans-serif"],
        fourth: ["Rubik", " sans-serif"],
      },
      zIndex: {
        99: "999",
        98: "900",
        97: "800",
      },
    },
  },
  plugins: [
    require("preline/plugin"),
    require("flowbite/plugin"),
    require("@codaworks/react-glow/tailwind"),
  ],
};
