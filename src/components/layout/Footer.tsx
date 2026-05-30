import { Mail, Globe, Users, Instagram, Twitter, Linkedin, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../../services/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          setError('You are already subscribed!')
        } else {
          throw error
        }
      } else {
        setSubmitted(true)
        setEmail('')
      }
    } catch (err: any) {
      console.error('Subscription error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-aeem-charcoal text-white py-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-aeem-gold/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand and Mission */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-aeem-gold flex items-center justify-center rounded font-bold text-white text-lg shadow-lg shadow-aeem-gold/20">A</div>
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

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-[10px]">Navigation</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-aeem-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-aeem-gold transition-colors">About Us</Link></li>
              <li><Link to="/impact" className="hover:text-aeem-gold transition-colors">Our Impact</Link></li>
              <li><Link to="/events" className="hover:text-aeem-gold transition-colors">Events</Link></li>
              <li><Link to="/get-involved" className="hover:text-aeem-gold transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-[10px]">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/resources" className="hover:text-aeem-gold transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/press-kit" className="hover:text-aeem-gold transition-colors">Press Kit</Link></li>
              <li><Link to="/recognition-awards" className="hover:text-aeem-gold transition-colors">Awards</Link></li>
              <li><Link to="/contact" className="hover:text-aeem-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-[10px]">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-6">Join our movement and stay updated with our latest impact stories and initiatives.</p>

            {submitted ? (
              <div className="flex items-center gap-3 text-green-400 bg-green-400/5 p-4 rounded-xl border border-green-400/10 animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 size={20} />
                <span className="text-sm font-bold">You're on the list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative group">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-aeem-gold transition-all text-sm group-hover:border-white/20"
                  />
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-aeem-gold text-white p-2.5 rounded-lg hover:bg-white hover:text-aeem-gold transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                  </button>
                </div>
                {error && <p className="text-[10px] text-red-400 font-bold ml-1">{error}</p>}
                <p className="text-[10px] text-gray-500 ml-1">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            )}
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
