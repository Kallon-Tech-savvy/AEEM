import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#F8F7F4]">
      {/* Background Micro-interaction Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-aeem-gold/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-aeem-gold/10 text-aeem-gold rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            Education for All
          </motion.span>
          <h1 className="text-fluid-h1 font-black leading-[1] mb-8 tracking-tighter text-aeem-charcoal">
            Empowering the <br className="hidden md:block" />
            <motion.span
              initial={{ color: "#1A1A1A" }}
              animate={{ color: "#D4AF37" }}
              transition={{ delay: 1, duration: 1 }}
            >
              Future
            </motion.span> of Africa
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed font-medium">
            Pioneering inclusive, equitable, and quality education across the continent through community-led action and innovative mentorship.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-aeem-charcoal text-white rounded-full font-black text-sm uppercase tracking-widest shadow-2xl transition-colors duration-300"
            >
              Explore our Impact
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#D4AF37", color: "#D4AF37" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-aeem-charcoal text-aeem-charcoal rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300"
            >
              Watch Vision
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} />
            <Sphere args={[1, 100, 200]} scale={2.2}>
              <MeshDistortMaterial
                color="#D4AF37"
                attach="material"
                distort={0.4}
                speed={2.5}
                roughness={0.1}
                metalness={0.8}
              />
            </Sphere>
          </Canvas>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-aeem-gold/20"
             />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-aeem-gold/10 border-dashed"
             />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator Micro-interaction */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-aeem-charcoal/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-aeem-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
