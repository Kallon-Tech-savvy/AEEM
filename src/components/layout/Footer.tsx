import { Mail, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-aeem-charcoal text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/logo.jpg" alt="AEEM Logo" className="w-10 h-10 object-contain rounded shadow-md" />
              <h3 className="font-extrabold text-2xl tracking-tight">AEEM</h3>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed italic">
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-aeem-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-aeem-gold transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-aeem-gold transition-colors">Our Impact</Link></li>
              <li><Link to="/events" className="hover:text-aeem-gold transition-colors">Events</Link></li>
              <li><Link to="/get-involved" className="hover:text-aeem-gold transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/resources" className="hover:text-aeem-gold transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/press-kit" className="hover:text-aeem-gold transition-colors">Press Kit</Link></li>
              <li><Link to="/recognition-awards" className="hover:text-aeem-gold transition-colors">Awards</Link></li>
              <li><Link to="/contact" className="hover:text-aeem-gold transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2026 Africa Education Empowerment Movement. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
             <a href="#" className="hover:text-aeem-gold transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-aeem-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
