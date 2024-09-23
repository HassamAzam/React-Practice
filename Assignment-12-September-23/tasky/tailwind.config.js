/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],

  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#0d1117",
        columnBackgroundColor: "#161C22",
      },
    },
  },
  plugins: [],
};
