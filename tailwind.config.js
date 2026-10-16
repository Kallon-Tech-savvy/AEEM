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
        // Canonical AEEM brand palette. Use semantic variants for text and controls.
        'aeem-forest':       '#2C5F2D',
        'aeem-forest-dark':  '#173D28',
        'aeem-forest-light': '#EAF2E8',
        'aeem-gold':         '#FFC72C',
        'aeem-gold-light':   '#FFD966',
        'aeem-gold-dark':    '#765500',
        'aeem-pink':         '#E94E77',
        'aeem-pink-dark':    '#A91F49',

        // Transitional aliases for existing page classes; migrate consumers to forest tokens.
        'aeem-blue':         '#2C5F2D',
        'aeem-blue-dark':    '#173D28',

        // Content and surfaces
        'aeem-ink':           '#17201A',
        'aeem-cream':         '#F7F5EF',
        'aeem-white':         '#FFFFFF',
        'aeem-charcoal':      '#17201A',
        'aeem-charcoal-mid':  '#3D3D3D',
        'aeem-charcoal-soft': '#5C5750',
        'aeem-bg':            '#F7F5EF',
        'aeem-surface':       '#FFFFFF',
        'aeem-border':        '#D6D3CC',

        // Dark-theme surfaces and text
        'aeem-dark-bg':      '#111110',
        'aeem-dark-surface': '#1C1C1A',
        'aeem-dark-border':  '#3B3B38',
        'aeem-dark-text':    '#F0EDE6',
        'aeem-dark-muted':   '#CFC6B8',

        // Semantic states
        'aeem-success':      '#0D7957',
        'aeem-success-bg':   '#D1FAE5',
        'aeem-error':        '#B42318',
        'aeem-error-bg':     '#FEE2E2',
        'aeem-warning':      '#8A4B08',
        'aeem-warning-bg':   '#FEF3C7',
        'aeem-info':         '#1A6BCC',
        'aeem-info-bg':      '#EFF6FF',
        'aeem-focus':        '#1A6BCC',
      },

      boxShadow: {
        // Light mode
        'soft':       '0 20px 50px rgba(0,0,0,0.06)',
        'card':       '0 4px 24px rgba(0,0,0,0.08)',
        'gold-glow':  'none',
        // Dark mode
        'dark-card':  '0 4px 24px rgba(0,0,0,0.4)',
        'dark-gold':  'none',
        // Focus ring
        'focus-ring': '0 0 0 3px rgba(26,107,204,0.5)',
        'focus-gold': '0 0 0 3px rgba(118,85,0,0.45)',
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