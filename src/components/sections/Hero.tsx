import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '../ui'

// Approximate geographic projection: viewBox 0 0 440 530
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

const CITIES = [
  { name: 'Conakry', x: 24, y: 192, delay: 0.4 },
  { name: 'Monrovia', x: 46, y: 223, delay: 0.6 },
  { name: 'Dakar', x: 5, y: 160, delay: 0.8 },
  { name: 'Accra', x: 107, y: 226, delay: 1.4 },
  { name: 'Lagos', x: 133, y: 220, delay: 1.8 },
  { name: 'Kampala', x: 314, y: 266, delay: 3.6 },
  { name: 'Nairobi', x: 348, y: 276, delay: 3.8 },
]

function lineLen(x2: number, y2: number) {
  return Math.ceil(Math.hypot(x2 - FREETOWN.x, y2 - FREETOWN.y)) + 20
}

const actionLink =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-6 text-base font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-aeem-cream pt-24 dark:bg-aeem-charcoal"
    >
      <Container className="grid min-h-[calc(100vh-1rem)] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold">
            Fair access to education for all
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight text-aeem-ink dark:text-white sm:text-6xl lg:text-7xl">
            Empowering the <span className="text-aeem-gold">Future</span> of Africa
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/70 dark:text-gray-300 sm:text-xl">
            Pioneering inclusive, equitable, and quality education across the continent through
            community-led action and innovative mentorship.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/impact"
              className={`${actionLink} border-aeem-forest bg-aeem-forest text-white hover:border-aeem-forest-dark hover:bg-aeem-forest-dark`}
            >
              Explore our Impact <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/events"
              className={`${actionLink} border-aeem-forest bg-transparent text-aeem-forest hover:bg-aeem-forest/5 dark:border-aeem-gold dark:text-aeem-gold dark:hover:bg-aeem-gold/10`}
            >
              Upcoming Events
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[520px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <svg
            viewBox="0 0 440 530"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="africa-map-title"
            className="mx-auto w-full"
          >
            <title id="africa-map-title">AEEM network across Africa, originating from Freetown</title>

            <path
              d={AFRICA_PATH}
              fill="#173D28"
              stroke="#B8941A"
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />

            {CITIES.map((city) => {
              const len = lineLen(city.x, city.y)

              return (
                <motion.line
                  key={`ln-${city.name}`}
                  x1={FREETOWN.x}
                  y1={FREETOWN.y}
                  x2={city.x}
                  y2={city.y}
                  stroke="#D4AF37"
                  strokeWidth="0.8"
                  strokeOpacity="0.65"
                  strokeDasharray={len}
                  initial={{ strokeDashoffset: len }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.8, delay: city.delay, ease: 'easeOut' }}
                />
              )
            })}

            {CITIES.map((city) => (
              <motion.circle
                key={`dot-${city.name}`}
                cx={city.x}
                cy={city.y}
                r={2.5}
                fill="#D4AF37"
                initial={{ opacity: 0, r: 0 }}
                animate={{ opacity: 0.9, r: 2.5 }}
                transition={{ delay: city.delay + 0.65, duration: 0.25 }}
              />
            ))}

            <motion.circle
              cx={FREETOWN.x}
              cy={FREETOWN.y}
              r={5}
              fill="#D4AF37"
              animate={{ opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            <text
              x={FREETOWN.x + 10}
              y={FREETOWN.y - 7}
              fill="#D4AF37"
              fontSize="8"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              Freetown
            </text>
          </svg>

          <p className="mt-2 text-center text-xs text-aeem-ink/55 dark:text-white/50">
            A growing network of communities, educators, and young people.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
