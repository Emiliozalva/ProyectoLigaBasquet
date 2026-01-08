/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cyber-1': ['"Lacquer"', 'display'],
        'cyber-2': ['"Quintessential"', 'cursive'],
      },
    },
  },
  plugins: [],
}