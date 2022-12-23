/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        title: "#EDECEC",
        subtitle: "#BBBBBB",
        main: "#33B37B",
        grey: "#2F2E2F",
      },
    },
  },
  plugins: [],
};
