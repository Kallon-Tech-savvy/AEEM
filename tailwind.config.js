/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aeem-gold': '#D4AF37',
        'aeem-charcoal': '#1A1A1A',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': 'var(--font-xs)',
        'sm': 'var(--font-sm)',
        'base': 'var(--font-base)',
        'lg': 'var(--font-lg)',
        'xl': 'var(--font-xl)',
        '2xl': 'var(--font-2xl)',
        '3xl': 'var(--font-3xl)',
        '4xl': 'var(--font-4xl)',
        '5xl': 'var(--font-5xl)',
        '6xl': 'var(--font-6xl)',
        '7xl': 'var(--font-7xl)',
      },
    },
  },
  plugins: [],
}
