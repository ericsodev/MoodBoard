/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        display: ["Metropolis", "Oswald"],
      },
      width: {
        70: "17.5rem",
        84: "21rem",
        112: "28rem",
        "75c": "75ch",
        "16c": "16ch",
      },
    },
  },
  plugins: [],
};
