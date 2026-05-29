import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const FREETOWN: [number, number] = [-13.2344, 8.4844] // Longitude, Latitude
const SCALE = 0.22
const CENTER_OFFSET: [number, number] = [18, 2]
const COLOR_CHARCOAL = new THREE.Color("#333333")
const COLOR_GOLD = new THREE.Color("#D4AF37")

function Country({ feature, index, activeCount }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  const shape = useMemo(() => {
    const s = new THREE.Shape()

    const project = (coord: [number, number]) => {
      return [(coord[0] - CENTER_OFFSET[0]) * SCALE, (coord[1] - CENTER_OFFSET[1]) * SCALE]
    }

    const processPolygon = (coordinates: any[]) => {
      coordinates.forEach((ring: any[], idx: number) => {
        if (idx === 0) {
          const start = project(ring[0])
          s.moveTo(start[0], start[1])
          ring.slice(1).forEach((p: any) => {
            const pt = project(p)
            s.lineTo(pt[0], pt[1])
          })
        } else {
          const hole = new THREE.Path()
          const start = project(ring[0])
          hole.moveTo(start[0], start[1])
          ring.slice(1).forEach((p: any) => {
            const pt = project(p)
            hole.lineTo(pt[0], pt[1])
          })
          s.holes.push(hole)
        }
      })
    }

    if (feature.geometry.type === 'Polygon') {
      processPolygon(feature.geometry.coordinates)
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach((polygon: any) => {
        processPolygon(polygon)
      })
    }

    return s
  }, [feature])

  useFrame(() => {
    if (!meshRef.current) return
    const isActive = activeCount.get() > index

    const targetColor = isActive ? COLOR_GOLD : COLOR_CHARCOAL
    const targetOpacity = isActive ? 1 : 0.3

    const material = meshRef.current.material as THREE.MeshStandardMaterial
    material.color.lerp(targetColor, 0.1)
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1)
  })

  return (
    <mesh ref={meshRef}>
      <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: false }]} />
      <meshStandardMaterial
        color="#333333"
        metalness={0.7}
        roughness={0.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

function ImpactLabel({ impact, index, activeCount, lineProgress }: any) {
  const [isVisible, setIsVisible] = useState(false)

  const position = useMemo(() => [
    (impact.coords[0] - CENTER_OFFSET[0]) * SCALE,
    (impact.coords[1] - CENTER_OFFSET[1]) * SCALE,
    0.12
  ], [impact])

  useFrame(() => {
    const active = activeCount.get() > index
    if (active !== isVisible) setIsVisible(active)
  })

  if (!isVisible) return null

  return (
    <group>
      <ConnectionLine
        start={FREETOWN}
        end={impact.coords}
        progress={lineProgress}
      />
      <Html position={[position[0], position[1], 0.2]} center distanceFactor={10}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/80 backdrop-blur-md p-2 rounded border border-aeem-gold/30 whitespace-nowrap pointer-events-none"
        >
          <p className="text-[10px] font-bold text-aeem-gold uppercase tracking-tighter">{impact.name}</p>
          <p className="text-[8px] text-white/70 font-medium">{impact.impact}</p>
        </motion.div>
      </Html>
    </group>
  )
}

function ConnectionLine({ start, end, progress }: any) {
  const lineRef = useRef<THREE.Line>(null)

  const points = useMemo(() => {
    const project = (coord: [number, number]) => [
        (coord[0] - CENTER_OFFSET[0]) * SCALE,
        (coord[1] - CENTER_OFFSET[1]) * SCALE
    ]
    const p1 = project(start)
    const p2 = project(end)

    const midX = (p1[0] + p2[0]) / 2
    const midY = (p1[1] + p2[1]) / 2
    const dist = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
    const pMid = [midX, midY, dist * 0.5]

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(p1[0], p1[1], 0.12),
      new THREE.Vector3(pMid[0], pMid[1], pMid[2]),
      new THREE.Vector3(p2[0], p2[1], 0.12)
    )
    return curve.getPoints(50)
  }, [start, end])

  useFrame(() => {
    if (!lineRef.current) return
    const p = progress.get()
    const visibleCount = Math.max(2, Math.floor(p * 50))
    lineRef.current.geometry.setFromPoints(points.slice(0, visibleCount))
    lineRef.current.material.opacity = p * 0.6
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#D4AF37" linewidth={2} transparent opacity={0} />
    </line>
  )
}

function MapScene({ africaData, impactData, progress }: any) {
  const activeCount = useTransform(progress, [0.1, 0.9], [0, africaData.features.length])
  const impactActiveCount = useTransform(progress, [0.1, 0.9], [0, impactData.length])
  const lineProgress = useTransform(progress, [0.2, 0.95], [0, 1])

  return (
    <group rotation={[-0.4, 0, 0]}>
      {africaData.features.map((feature: any, i: number) => (
        <Country
          key={feature.properties.ISO_A3 || feature.properties.admin || i}
          feature={feature}
          index={i}
          activeCount={activeCount}
        />
      ))}

      {impactData.map((impact: any, index: number) => (
        <ImpactLabel
          key={impact.name}
          impact={impact}
          index={index}
          activeCount={impactActiveCount}
          lineProgress={lineProgress}
        />
      ))}
    </group>
  )
}

export default function AfricaImpactMap() {
  const [africaData, setAfricaData] = useState<any>(null)
  const [impactData, setImpactData] = useState<any>(null)
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    fetch('/data/africa.json').then(res => res.json()).then(setAfricaData)
    fetch('/data/impact.json').then(res => res.json()).then(setImpactData)
  }, [])

  if (!africaData || !impactData) return null

  return (
    <section id="impact-map" ref={sectionRef} className="h-[300vh] bg-aeem-charcoal relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-20 text-center z-10 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4"
          >
            Our Impact <span className="text-aeem-gold">Across Africa</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Starting from Freetown, Sierra Leone, we are expanding our reach to empower communities continent-wide.
            Scroll to see our footprint grow.
          </motion.p>
        </div>

        <div className="w-full h-full">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 15]} intensity={1.5} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
               <MapScene
                  africaData={africaData}
                  impactData={impactData}
                  progress={smoothProgress}
               />
            </Float>

            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
          </Canvas>
        </div>

        <div className="absolute bottom-12 left-12 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded-lg border border-white/10"
            >
                <div className="w-12 h-12 rounded-full border border-aeem-gold flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-aeem-gold" />
                </div>
                <div>
                    <p className="text-white font-bold uppercase tracking-tighter text-sm">Headquarters</p>
                    <p className="text-aeem-gold text-xs font-bold">Imatt, Freetown, Sierra Leone</p>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  )
}
