import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../../assets/styles/Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/Event' },
  { label: 'Get Involved', path: '/GetInvolve' },
  { label: 'Awards', path: '/AwardsandRecognition' },
  { label: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

    useEffect(() => {
    const id = window.setTimeout(() => setIsMenuOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [location.pathname]);

  return (
    <header className={`premium-nav ${isMenuOpen ? 'nav--open' : ''}`} role='banner'>
      <div className='nav-container'>
        
        <Link to='/' className='nav-brand-lockup' aria-label='AEEM Home'>
          <span className='brand-logo'>AEEM</span>
          <div className='brand-separator' aria-hidden='true' />
          <span className='brand-subtext'>Africa Education<br/>Empowerment Movement</span>
        </Link>

        <button 
          className='nav-mobile-toggle'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label='Toggle navigation'
        >
          <span className='hamburger-line'></span>
          <span className='hamburger-line'></span>
        </button>

        <div className={`nav-drawer ${isMenuOpen ? 'drawer--active' : ''}`}>
          <nav className='nav-menu' aria-label='Primary navigation'>
            <ul className='nav-list'>
              {NAV_ITEMS.map(({ label, path }) => (
                <li key={label}>
                  <NavLink 
                    to={path} 
                    end={path === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className='nav-actions'>
            {/* Kept secure portal isolated from primary marketing routes */}
            <Link to='/portal' className='button nav-cta'>
              Secure Access
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}