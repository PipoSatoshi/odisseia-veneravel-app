/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'eerie-black': '#1D1D1B',
        'neutral-gray': '#9C9B9B',
      },
      fontFamily: {
        'heading': ['"Great Vibes"', 'cursive'], // Alternativa gratuita para Edwardian Script
        'body': ['"Poppins"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}