import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-50 dark:from-[#2a2d35] dark:to-aeem-charcoal text-aeem-charcoal dark:text-aeem-white transition-colors duration-500">
      
      {/* Elevated glowing progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-aeem-gold z-[110] origin-left shadow-[0_0_10px_rgba(212,175,55,0.8)]"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default Layout;