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
    <div className="relative min-h-screen font-sans bg-white dark:bg-aeem-charcoal text-aeem-charcoal dark:text-aeem-white transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-aeem-gold z-[110] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
