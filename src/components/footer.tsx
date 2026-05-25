import { Link } from 'react-router-dom'
import SubscribeToUpdate from './SubscribeToUpdate';
import '../assets/styles/footer.css';

export default function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-grid'>
        <section className='brand'>
          <h3>AEEM</h3>
          <h4>Africa Education Empowerment Movement</h4>
          <div>
            <i>
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </i>
          </div>
        </section>
          <div className="subscribe">
            <SubscribeToUpdate />
          </div>
        <section className='footer-nav'>
          
          <div className='footer-links'>
            <p className='footer-links__title'>Navigation</p>
            <nav aria-label='Footer navigation'>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/Event'>Attend an Event</Link></li>
                <li><Link to='/GetInvolve'>Get Involve</Link></li>
                <li><Link to='/Blog'>Blog</Link></li>
              </ul>
            </nav>
          </div>

          <div className='footer-links'>
            <p className='footer-links__title'>Resources</p>
            <nav aria-label='Footer policies'>
              <ul>
                <li><Link to='/AwardsandRecognition'>Awards and Recognition</Link></li>
                <li><Link to='/toc'>Theory of Change</Link></li>
                <li><Link to='/tos'>Terms of Service</Link></li>
                <li><Link to='/privacy'>Privacy Policy</Link></li>
              </ul>
            </nav>
          </div>

        </section>
      </div>
      <p>
        <span>Youth-led. community-empowered.</span>
        <span>&copy; 2026 AEEM</span>
      </p>
    </footer>
  );
}
