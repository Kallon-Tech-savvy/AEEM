import { Mail, Globe, Users } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-aeem-charcoal flex items-center justify-center rounded font-bold text-white text-lg">A</div>
              <h3 className="font-extrabold text-2xl">AEEM</h3>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed italic">
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </p>
            <div className="flex gap-4">
              {[Globe, Users, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Our Impact</a></li>
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Initiatives</a></li>
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Theory of Change</a></li>
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-aeem-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:row-span-1 md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">© 2026 Africa Education Empowerment Movement. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
