/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");


module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        manrope : ["Manrope","sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};