import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Approximate geographic projection: viewBox 0 0 440 530
// x = (lon + 18) / 70 * 440
// y = (37 - lat) / 72 * 530
const AFRICA_PATH =
  'M 75,7 L 110,3 L 150,0 L 176,0 ' +
  'C 185,10 190,20 194,29 ' +
  'C 230,36 252,40 270,43 ' +
  'L 314,51 ' +
  'C 335,80 355,120 364,159 ' +
  'C 370,168 378,176 383,184 ' +
  'C 400,183 415,186 427,188 ' +
  'C 415,200 400,225 390,245 ' +
  'C 380,258 373,265 371,274 ' +
  'C 367,290 364,306 361,318 ' +
  'C 348,345 340,368 333,390 ' +
  'C 326,415 322,436 320,455 ' +
  'C 290,485 260,510 229,516 ' +
  'C 218,500 215,490 213,477 ' +
  'C 205,455 195,425 188,390 ' +
  'L 188,303 L 169,303 L 169,267 ' +
  'C 165,255 165,245 169,238 ' +
  'C 157,238 145,236 132,238 ' +
  'C 122,236 115,234 107,231 ' +
  'C 97,231 90,231 82,231 ' +
  'C 63,231 53,231 44,231 ' +
  'C 38,224 34,218 31,209 ' +
  'C 25,202 20,197 19,195 ' +
  'C 14,185 8,175 3,162 ' +
  'C 3,145 5,130 6,116 ' +
  'C 14,98 22,81 31,65 ' +
  'C 48,42 62,25 75,7 Z'

const FREETOWN = { x: 30, y: 206 }

// 23 impacted nations — staggered by geographic distance from Freetown
const CITIES = [
  { name: 'Conakry',       x: 24,  y: 192, delay: 0.4 },
  { name: 'Monrovia',      x: 46,  y: 223, delay: 0.6 },
  { name: 'Dakar',         x: 5,   y: 160, delay: 0.8 },
  { name: 'Bamako',        x: 63,  y: 175, delay: 1.0 },
  { name: 'Abidjan',       x: 89,  y: 228, delay: 1.2 },
  { name: 'Accra',         x: 107, y: 226, delay: 1.4 },
  { name: 'Ouagadougou',   x: 103, y: 178, delay: 1.6 },
  { name: 'Lagos',         x: 133, y: 220, delay: 1.8 },
  { name: 'Abuja',         x: 156, y: 202, delay: 2.0 },
  { name: 'Yaoundé',       x: 184, y: 242, delay: 2.2 },
  { name: 'Tunis',         x: 176, y: 2,   delay: 2.4 },
  { name: 'Cairo',         x: 267, y: 45,  delay: 2.6 },
  { name: 'Khartoum',      x: 314, y: 153, delay: 2.8 },
  { name: 'Addis Ababa',   x: 359, y: 202, delay: 3.0 },
  { name: 'Kinshasa',      x: 209, y: 302, delay: 3.2 },
  { name: 'Luanda',        x: 194, y: 324, delay: 3.4 },
  { name: 'Kampala',       x: 314, y: 266, delay: 3.6 },
  { name: 'Nairobi',       x: 348, y: 276, delay: 3.8 },
  { name: 'Dar es Salaam', x: 361, y: 311, delay: 4.0 },
  { name: 'Lusaka',        x: 291, y: 377, delay: 4.2 },
  { name: 'Harare',        x: 317, y: 421, delay: 4.4 },
  { name: 'Johannesburg',  x: 290, y: 452, delay: 4.6 },
  { name: 'Cape Town',     x: 226, y: 514, delay: 4.8 },
]

function lineLen(x2: number, y2: number) {
  return Math.ceil(Math.hypot(x2 - FREETOWN.x, y2 - FREETOWN.y)) + 20
}

const MINI_STATS = [
  { val: '24',   label: 'Countries' },
  { val: '150+', label: 'Communities' },
  { val: '2.5k', label: 'Scholarships' },
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-aeem-charcoal"
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Gold ambient bloom */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-16">

        {/* ── Left: copy ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-aeem-gold/15 text-aeem-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            Education for All
          </motion.span>

          <h1 className="text-6xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tighter text-white">
            Empowering the{' '}
            <span className="text-aeem-gold">Future</span> of Africa
          </h1>

          <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
            Pioneering inclusive, equitable, and quality education across the
            continent through community-led action and innovative mentorship.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-aeem-gold text-aeem-charcoal rounded-full font-black hover:bg-white transition-all shadow-xl shadow-aeem-gold/20"
            >
              Explore our Impact <ArrowRight size={18} />
            </Link>
            <Link
              to="/events"
              className="px-10 py-4 border-2 border-white/15 text-white rounded-full font-bold hover:border-aeem-gold hover:text-aeem-gold transition-all"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Mini stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-white/10">
            {MINI_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <p className="text-3xl font-black text-aeem-gold">{s.val}</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Africa map ─────────────────────────────────────────── */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          <svg
            viewBox="0 0 440 530"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-[520px] mx-auto"
            aria-label="Map of Africa showing AEEM's reach from Freetown"
          >
            <defs>
              <radialGradient id="mapFill" cx="40%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#181818" />
              </radialGradient>
              {/* Glow for city dots */}
              <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Glow for hub */}
              <filter id="hubGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Continent fill + border */}
            <path
              d={AFRICA_PATH}
              fill="url(#mapFill)"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />

            {/* Progressive connection lines from Freetown */}
            {CITIES.map((city) => {
              const len = lineLen(city.x, city.y)
              return (
                <motion.line
                  key={`ln-${city.name}`}
                  x1={FREETOWN.x} y1={FREETOWN.y}
                  x2={city.x}     y2={city.y}
                  stroke="#D4AF37"
                  strokeWidth="0.7"
                  strokeOpacity="0.4"
                  strokeDasharray={len}
                  initial={{ strokeDashoffset: len }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.1, delay: city.delay, ease: 'easeOut' }}
                />
              )
            })}

            {/* City endpoint dots */}
            {CITIES.map((city) => (
              <motion.circle
                key={`dot-${city.name}`}
                cx={city.x} cy={city.y}
                r={2.5}
                fill="#D4AF37"
                filter="url(#dotGlow)"
                initial={{ opacity: 0, r: 0 }}
                animate={{ opacity: 0.85, r: 2.5 }}
                transition={{ delay: city.delay + 0.85, duration: 0.35 }}
              />
            ))}

            {/* Freetown — ripple rings */}
            {[0, 0.75, 1.5].map((d, i) => (
              <motion.circle
                key={`ring-${i}`}
                cx={FREETOWN.x} cy={FREETOWN.y}
                r={5}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.2"
                animate={{ r: [5, 20], opacity: [0.8, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: d,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Freetown — solid hub dot */}
            <circle
              cx={FREETOWN.x} cy={FREETOWN.y}
              r={5}
              fill="#D4AF37"
              filter="url(#hubGlow)"
            />

            {/* Freetown label */}
            <motion.text
              x={FREETOWN.x + 10} y={FREETOWN.y - 7}
              fill="#D4AF37"
              fontSize="8" fontWeight="bold" fontFamily="sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Freetown
            </motion.text>

            {/* City count badge */}
            <motion.text
              x={420} y={520}
              textAnchor="end"
              fill="#D4AF37"
              fillOpacity="0.5"
              fontSize="9"
              fontFamily="sans-serif"
              fontWeight="bold"
              letterSpacing="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.5 }}
            >
              24 NATIONS REACHED
            </motion.text>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}