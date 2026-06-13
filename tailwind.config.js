/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      offbit101: ["OffBit-101"],
      offbit101Bold: ["OffBit-101-Bold"],
      offbit: ["OffBit-Regular"],
      offbitBold: ["OffBit-Bold"],
      offbitDot: ["OffBit-Dot"],
      plumpelo: ["Plumpelo"],
    },
    extend: {
      colors: {
        acid: "#F1F43B",
        ultra: "#3e3bf4",
      },
      boxShadow: {
        hard: "6px 6px 0 0 #3e3bf4",
        "hard-sm": "3px 3px 0 0 #3e3bf4",
        "hard-acid": "6px 6px 0 0 #F1F43B",
      },
    },
  },
  plugins: [],
};
