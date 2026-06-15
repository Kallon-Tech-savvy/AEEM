import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | AEEM</title>
        <meta name="description" content="The page you are looking for does not exist on the AEEM platform." />
      </Helmet>

      <section className="min-h-screen bg-gray-50 dark:bg-[#111] text-aeem-charcoal dark:text-white flex items-center justify-center pt-20 overflow-hidden relative perspective-[1000px]">
        
        {/* Ambient bloom backgrounds for depth */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-aeem-gold/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-aeem-focus/10 dark:bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle dot grid with perspective fade */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />

        <div className="max-w-xl w-full mx-auto px-6 text-center relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 10, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
            className="bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 p-10 md:p-14 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] ring-1 ring-black/5 dark:ring-white/5"
          >
            {/* Warning Icon Badge - Elevated */}
            <div className="w-24 h-24 bg-gradient-to-br from-aeem-gold/20 to-aeem-gold/5 border border-aeem-gold/30 text-aeem-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              <AlertTriangle size={42} className="drop-shadow-lg" />
            </div>

            {/* Huge 404 Typography - Extruded effect */}
            <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500 drop-shadow-2xl">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 drop-shadow-sm">
              Lost your way?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-12 font-medium">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let us guide you back to the right track.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-aeem-gold to-yellow-500 text-aeem-charcoal rounded-full font-bold hover:shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all active:scale-95 text-sm ring-1 ring-yellow-400/50"
              >
                <Home size={18} /> Back to Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 text-aeem-charcoal dark:text-white rounded-full font-bold hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl transition-all active:scale-95 text-sm"
              >
                <ArrowLeft size={18} /> Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;