import React, { useState } from 'react'
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
    <footer className="relative overflow-hidden dark:bg-aeem-charcoal bg-aeem-focus/20 dark:text-white text-aeem-charcoal py-20 z-10">
      
      {/* BACKGROUND VECTOR 1: Organic Education Tree (Left Anchor) */}
      <div className="absolute left-0 bottom-[1%] w-full h-full opacity-[0.1] dark:opacity-[0.08] pointer-events-none -z-10 mix-blend-luminosity select-none transition-opacity duration-300">
        <img 
          src="/assets/Illustrate africa.png" 
          alt="" 
          className="w-full h-full object-contain object-left-bottom"
        />
      </div>

      {/* Content Canvas */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Vector Focus Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/logo.jpg" alt="AEEM Logo" className="w-12 h-10 object-fill rounded shadow-md" />
              <h3 className="font-extrabold text-2xl tracking-tight">AEEM</h3>
            </div>
            <p className="max-w-sm mb-8 leading-relaxed italic opacity-90">
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
                  className="w-10 h-10 border border-black/90 dark:border-gray-600 rounded-full flex items-center justify-center text-aeem-charcoal dark:text-gray-400 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold dark:hover:text-white dark:hover:border-aeem-gold transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-bold mb-6 text-aeem-charcoal dark:text-aeem-gold uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-md">
              <li><Link to="/" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Home</Link></li>
              <li><Link to="/about" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">About Us</Link></li>
              <li><Link to="/impact" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Our Impact</Link></li>
              <li><Link to="/events" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Events</Link></li>
              <li><Link to="/get-involved" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Get Involved</Link></li>
              <li><Link to="/recognition-awards" className='text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium'>Awards & Recognition</Link></li>
              <li><Link to="/Contact" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Contact</Link></li>
              <li><Link to="/press-kit" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Press Kit</Link></li>
              <li><Link to="/resources" className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium">Knowledge Hub</Link></li>
            </ul>
          </div>

          {/* Subscription Action Column */}
          <div>
            <h4 className="font-bold mb-6 text-aeem-focus dark:text-aeem-gold uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-aeem-charcoal/90 dark:text-aeem-surface/90 text-sm mb-4">Join our newsletter for the latest impact stories and events.</p>
            <form onSubmit={handleSubscribe} className="relative mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full text-black bg-white/90 border border-aeem-focus dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 text-md focus:outline-none focus:border-aeem-gold focus:ring-1 focus:ring-aeem-gold transition-all"
              />
              <button
                disabled={loading}
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aeem-gold hover:text-aeem-charcoal dark:hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-bold animate-fade-in">
                <CheckCircle2 size={14} />
                Subscribed successfully!
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-500 dark:text-red-400 text-xs font-bold">
                Something went wrong. Try again.
              </div>
            )}
          </div>
        </div>

        {/* Legal/Copyright Row */}
        <div className="pt-8 border-t text-white/80 border-aeem-charcoal/10 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="dark:text-gray-500 text-black/80 text-xs">© 2026 Africa Education Empowerment Movement. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-black/80 dark:text-gray-400">
             <a href="#" className="hover:text-aeem-gold transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-aeem-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}