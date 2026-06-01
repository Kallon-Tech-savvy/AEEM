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

      <section className="min-h-screen bg-aeem text-aeem flex items-center justify-center pt-20 overflow-hidden relative">
        {/* Ambient bloom background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aeem-gold/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />

        <div className="max-w-md w-full mx-auto px-6 text-center relative z-10 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Warning Icon Badge */}
            <div className="w-20 h-20 bg-aeem-gold/10 border border-aeem-gold/20 text-aeem-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-aeem-gold/5">
              <AlertTriangle size={36} />
            </div>

            {/* Huge 404 Typography */}
            <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-aeem-gold to-white">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-aeem">
              Lost your way?
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let us guide you back to the right track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-4 bg-aeem-gold text-aeem-charcoal rounded-full font-black hover:bg-white hover:text-aeem-focus transition-all shadow-xl shadow-aeem-gold/20 active:scale-95 text-sm"
              >
                <Home size={16} /> Back to Home
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-aeem-focus/50 text-aeem rounded-full font-bold hover:border-aeem-gold hover:text-aeem-gold transition-all active:scale-95 text-sm"
              >
                <ArrowLeft size={16} /> Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
