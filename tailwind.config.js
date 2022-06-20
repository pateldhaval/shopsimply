/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: 20,
        center: true
      },
      fontFamily: {
        'sans': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
