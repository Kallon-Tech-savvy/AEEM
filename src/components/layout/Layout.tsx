import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-aeem-cream font-sans text-aeem-ink transition-colors duration-300 dark:bg-aeem-dark-bg dark:text-aeem-dark-text">
      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
