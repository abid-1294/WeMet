/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Osans': ['Open Sans', 'sans-serif'],
        'Pacific': ['Pacifico', 'cursive']
      },
      maxWidth: {
        'container' : '1320px'
      }
    },
  },
  plugins: [],
}
