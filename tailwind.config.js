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
        'aeem-white': '#F8F7F4',
        'aeem-success': '#10B981',
        'aeem-error': '#EF4444',
      },
      boxShadow: {
        'soft': '0 20px 50px rgba(0,0,0,0.05)',
        'gold-glow': '0 10px 30px rgba(212,175,55,0.2)',
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
