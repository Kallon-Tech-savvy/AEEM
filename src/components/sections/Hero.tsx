import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-aeem-gold/10 text-aeem-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Education for All
          </span>
          <h1 className="text-7xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
            Empowering the <span className="text-aeem-gold">Future</span> of Africa
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mb-10 leading-relaxed">
            Pioneering inclusive, equitable, and quality education across the continent through community-led action and innovative mentorship.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:bg-aeem-gold transition-all shadow-2xl">
              Explore our Impact
            </button>
            <button className="px-10 py-4 border-2 border-aeem-charcoal rounded-full font-bold hover:bg-aeem-charcoal hover:text-white transition-all">
              Watch Vision
            </button>
          </div>
        </motion.div>

        <div className="relative h-[600px] w-full hidden lg:block">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Sphere args={[1, 100, 200]} scale={2.4}>
              <MeshDistortMaterial
                color="#D4AF37"
                attach="material"
                distort={0.4}
                speed={2}
                roughness={0.2}
              />
            </Sphere>
          </Canvas>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <div className="w-[500px] h-[500px] rounded-full border border-aeem-gold/20 animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
