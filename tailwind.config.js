/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#F8CD65",
        orange: "#FB7C58",
        red: "#F64A4A",
        green: "#A4FFAF",
        grey: "#817D92",
        almostWhite: "#E6E5EA",
        darkGrey: "#24232C",
        veryDarkGrey: "#18171F",
      },
    },
  },
  plugins: [],
};
