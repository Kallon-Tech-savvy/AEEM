import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Globe() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer wireframe */}
      <Sphere args={[1.65, 36, 36]}>
        <meshStandardMaterial
          color="#D4AF37"
          wireframe
          transparent
          opacity={0.2}
        />
      </Sphere>

      {/* Mid shell */}
      <Sphere args={[1.55, 48, 48]}>
        <meshStandardMaterial
          color="#D4AF37"
          transparent
          opacity={0.08}
          side={THREE.FrontSide}
        />
      </Sphere>

      {/* Main body */}
      <Sphere args={[1.5, 80, 80]}>
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.7}
          roughness={0.25}
          envMapIntensity={1}
        />
      </Sphere>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 16, 120]} />
        <meshStandardMaterial color="#D4AF37" opacity={0.4} transparent />
      </mesh>

      {/* Tilted orbital ring */}
      <mesh rotation={[0.4, 0.3, 0]}>
        <torusGeometry args={[1.75, 0.005, 16, 120]} />
        <meshStandardMaterial color="#D4AF37" opacity={0.25} transparent />
      </mesh>
    </group>
  )
}

const REGIONS = [
  { label: 'West Africa',    count: 9,  side: 'left',  top: '18%' },
  { label: 'North Africa',   count: 3,  side: 'left',  top: '40%' },
  { label: 'East Africa',    count: 7,  side: 'right', top: '25%' },
  { label: 'Central Africa', count: 3,  side: 'right', top: '48%' },
  { label: 'Southern Africa', count: 5, side: 'right', top: '70%' },
]

const BOTTOM_STATS = [
  { val: '24',  label: 'Countries' },
  { val: '14M', label: 'People Impacted' },
  { val: '8',   label: 'Years Active' },
  { val: '3',   label: 'Sub-Regions' },
]

export default function GlobalReach() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Our Reach
          </span>
          <h2 className="text-5xl font-black mb-4">
            Expanding our <span className="text-aeem-gold">Footprint</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From West Africa to the entire continent, we are building bridges
            to better futures — one community at a time.
          </p>
        </motion.div>

        {/* Globe + floating chips */}
        <div className="relative h-[560px] w-full bg-gradient-to-b from-gray-50 to-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm">
          {/* Canvas */}
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <pointLight position={[-10, -5, -10]} intensity={0.4} color="#D4AF37" />
            <Globe />
            <OrbitControls enableZoom={false} autoRotate={false} />
          </Canvas>

          {/* Centre badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center bg-white/70 backdrop-blur-xl px-10 py-8 rounded-3xl border border-gray-100 shadow-xl"
            >
              <p className="text-7xl font-black text-aeem-charcoal leading-none">24</p>
              <p className="text-xs font-bold uppercase tracking-widest text-aeem-gold mt-2">
                Countries Reached
              </p>
            </motion.div>
          </div>

          {/* Region chips */}
          {REGIONS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: r.side === 'left' ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className={`absolute pointer-events-none ${r.side === 'left' ? 'left-6' : 'right-6'}`}
              style={{ top: r.top }}
            >
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full px-4 py-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-aeem-gold flex-shrink-0" />
                <span className="text-xs font-bold text-gray-700">{r.label}</span>
                <span className="text-xs font-black text-aeem-gold ml-1">{r.count}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {BOTTOM_STATS.map((s) => (
            <div
              key={s.label}
              className="text-center py-8 px-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-aeem-gold/30 hover:bg-aeem-gold/5 transition-all group"
            >
              <p className="text-4xl font-black text-aeem-charcoal group-hover:text-aeem-gold transition-colors">
                {s.val}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}