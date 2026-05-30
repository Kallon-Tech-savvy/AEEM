import { useState } from 'react'
import { Mail, Instagram, Twitter, Linkedin, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus('idle')

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          setStatus('success') // Treat as success if already subscribed
        } else {
          throw error
        }
      } else {
        setStatus('success')
      }
      setEmail('')
    } catch (err) {
      console.error('Subscription error:', err)
      setStatus('error')
    } finally {
      setLoading(false)
      if (status === 'success') {
        setTimeout(() => setStatus('idle'), 5000)
      }
    }
  }

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
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Mail, label: "Email" }
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold transition-all"
                >
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
            <h4 className="font-bold mb-6 text-aeem-gold uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-6">Join our newsletter for the latest impact stories and events.</p>
            <form onSubmit={handleSubscribe} className="relative mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-aeem-gold transition-colors"
              />
              <button
                disabled={loading}
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-aeem-gold hover:text-white transition-colors"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold animate-fade-in">
                <CheckCircle2 size={14} />
                Subscribed successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-400 text-xs font-bold">
                Something went wrong. Try again.
              </div>
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
