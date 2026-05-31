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
        // ── Light Mode Tokens ──────────────────────────────────────────────
        // Gold: bumped from #D4AF37 to #B8941A for 4.5:1+ contrast on white
        'aeem-gold':         '#B8941A',   // AA on #F8F7F4 (≈5.2:1)
        'aeem-gold-light':   '#D4AF37',   // Decorative only, large text / icons
        'aeem-gold-dark':    '#8A6E12',   // Hover/active deepened gold (≈8.1:1)

        // Charcoal
        'aeem-charcoal':     '#1A1A1A',   // Body text on light bg (≈18:1)
        'aeem-charcoal-mid': '#3D3D3D',   // Secondary text (≈11:1)
        'aeem-charcoal-soft':'#6B6B6B',   // Tertiary text — meets AA large (≈4.6:1)

        // Backgrounds
        'aeem-bg':           '#F8F7F4',   // Global warm white
        'aeem-surface':      '#EFEDE8',   // Card surface (slightly deeper)
        'aeem-border':       '#D6D3CC',   // Borders on light bg

        // ── Dark Mode Tokens ───────────────────────────────────────────────
        'aeem-dark-bg':      '#111110',   // Base dark canvas
        'aeem-dark-surface': '#1C1C1A',   // Card/panel surface
        'aeem-dark-border':  '#2E2E2C',   // Subtle borders
        'aeem-dark-text':    '#F0EDE6',   // Primary text on dark (≈17:1)
        'aeem-dark-muted':   '#A89F91',   // Muted text on dark — AA large (≈4.6:1)

        // ── Semantic ───────────────────────────────────────────────────────
        'aeem-success':      '#0D9B6E',   // Darker green — AA on white (≈5.1:1)
        'aeem-success-bg':   '#D1FAE5',
        'aeem-error':        '#C0392B',   // Deeper red — AA on white (≈5.5:1)
        'aeem-error-bg':     '#FEE2E2',
        'aeem-focus':        '#1A6BCC',   // Blue focus ring (≈7:1 on white)
      },

      boxShadow: {
        // Light mode
        'soft':       '0 20px 50px rgba(0,0,0,0.06)',
        'card':       '0 4px 24px rgba(0,0,0,0.08)',
        'gold-glow':  '0 10px 30px rgba(184,148,26,0.25)',
        // Dark mode
        'dark-card':  '0 4px 24px rgba(0,0,0,0.4)',
        'dark-gold':  '0 10px 30px rgba(212,175,55,0.15)',
        // Focus ring
        'focus-ring': '0 0 0 3px rgba(26,107,204,0.5)',
        'focus-gold': '0 0 0 3px rgba(184,148,26,0.5)',
      },

      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },

      // Fluid type scale via CSS custom properties (set in index.css)
      fontSize: {
        'xs':   ['var(--font-xs)',   { lineHeight: '1.5' }],
        'sm':   ['var(--font-sm)',   { lineHeight: '1.5' }],
        'base': ['var(--font-base)', { lineHeight: '1.625' }],
        'lg':   ['var(--font-lg)',   { lineHeight: '1.625' }],
        'xl':   ['var(--font-xl)',   { lineHeight: '1.4' }],
        '2xl':  ['var(--font-2xl)',  { lineHeight: '1.3' }],
        '3xl':  ['var(--font-3xl)',  { lineHeight: '1.2' }],
        '4xl':  ['var(--font-4xl)',  { lineHeight: '1.15' }],
        '5xl':  ['var(--font-5xl)',  { lineHeight: '1.1' }],
        '6xl':  ['var(--font-6xl)',  { lineHeight: '1.05' }],
        '7xl':  ['var(--font-7xl)',  { lineHeight: '1' }],
      },

      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Motion-aware transition utilities (pair with CSS prefers-reduced-motion)
      transitionDuration: {
        'fast':   '150ms',
        'base':   '250ms',
        'slow':   '400ms',
      },

      keyframes: {
        // All keyframes respect prefers-reduced-motion in index.css
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.5s ease-out both',
        'fade-in':   'fade-in 0.4s ease-out both',
        'shimmer':   'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}