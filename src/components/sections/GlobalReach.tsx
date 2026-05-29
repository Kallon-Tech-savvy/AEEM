import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'

export default function GlobalReach() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-4">Expanding our <span className="text-aeem-gold">Footprint</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">From West Africa to the entire continent, we are building bridges to better futures.</p>

        <div className="h-[600px] w-full bg-gray-50 rounded-[3rem] relative overflow-hidden group">
           <Canvas camera={{ position: [0, 0, 4] }}>
             <ambientLight intensity={1} />
             <pointLight position={[10, 10, 10]} />

             {/* Wireframe Outer Globe */}
             <Sphere args={[1.6, 32, 32]}>
               <meshStandardMaterial
                 color="#D4AF37"
                 wireframe
                 transparent
                 opacity={0.3}
               />
             </Sphere>

             {/* Main Globe Body */}
             <Sphere args={[1.5, 64, 64]}>
                <meshStandardMaterial
                  color="#D4AF37"
                  metalness={0.8}
                  roughness={0.2}
                />
             </Sphere>

             {/* Inner Core Glow */}
             <Sphere args={[1.4, 32, 32]}>
               <meshStandardMaterial
                 color="#FFFFFF"
                 transparent
                 opacity={0.1}
               />
             </Sphere>

             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
           </Canvas>

           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-white/10 backdrop-blur-md p-10 rounded-full border border-white/20">
                <p className="text-7xl font-black text-aeem-charcoal">24</p>
                <p className="text-sm font-bold uppercase tracking-widest text-aeem-gold">Countries reached</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
