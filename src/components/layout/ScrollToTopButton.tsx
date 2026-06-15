import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../../services/hooks';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0;

      setProgress(nextProgress);
      setIsVisible(scrollTop > 400);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={reducedMotion ? undefined : { scale: 1.08, y: -4 }}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[90] p-4 bg-gradient-to-tr from-aeem-charcoal to-aeem-focus dark:from-aeem-focus dark:to-gray-800 text-white hover:from-aeem-gold hover:to-yellow-500 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.5)] transition-all duration-300 border border-white/20 backdrop-blur-md group focus:outline-none"
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.18)" strokeWidth="6" fill="none" />
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray={276} strokeDashoffset={276 * (1 - progress)} />
          </svg>
          <ArrowUp size={22} className="relative z-10 group-hover:animate-bounce drop-shadow-md" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;