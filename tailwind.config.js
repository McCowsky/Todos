/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./*.{html,js}", "./dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        permanent: ["Permanent Marker", "sans-serif"],
        sora: ["Sora"],
      },
    },
  },
  plugins: [],
};
