import { motion } from 'framer-motion'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

const images = [
  { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200', title: 'The AEEM Team', category: 'Community' },
  { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800', title: 'Learning in Action', category: 'Education' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800', title: 'Recognition', category: 'Success' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800', title: 'Future Leaders', category: 'Youth' },
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', title: 'Empowering Girls', category: 'Equity' },
  { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200', title: 'Collaborative Learning', category: 'Education' },
  { src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800', title: 'Excellence Awards', category: 'Success' },
  { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', title: 'Mentorship', category: 'Education' },
]

export default function ModernGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Capturing the Movement</h2>
          <p className="text-gray-500 max-w-xl">A visual journey through our impact across Africa.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                 <p className="text-white font-bold text-lg">{img.title}</p>
                 <p className="text-aeem-gold text-sm font-medium uppercase tracking-widest">{img.category}</p>
                 <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white">
                    <ZoomIn size={18} />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-aeem-gold">
            <X size={40} />
          </button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
          />
        </motion.div>
      )}
    </section>
  )
}
