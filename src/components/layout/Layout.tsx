import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-50 dark:from-[#2a2d35] dark:to-aeem-charcoal text-aeem-charcoal dark:text-aeem-white transition-colors duration-500">
      <Navbar />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
