import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-aeem-charcoal flex items-center justify-center px-6 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-aeem-gold rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aeem-gold rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-white/5 tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
            404
          </h1>

          <div className="space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6">Lost in <span className="text-aeem-gold">Space</span>?</h2>
              <p className="text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
                The page you're looking for has moved to a different continent or doesn't exist anymore.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                to="/"
                className="flex items-center gap-3 bg-aeem-gold text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-aeem-gold/20"
              >
                <Home size={20} /> Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-3 border-2 border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-aeem-charcoal transition-all"
              >
                <ArrowLeft size={20} /> Go Back
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
