/** @type {import('tailwindcss').Config} */
export default {
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
    },
  },
  plugins: [],
}
