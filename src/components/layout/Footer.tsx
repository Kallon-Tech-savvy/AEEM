import React from 'react'
import { Mail, Twitter, Linkedin, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {


  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-aeem-cream py-16 text-aeem-ink dark:border-white/10 dark:bg-aeem-charcoal dark:text-white">

      {/* Background illustration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-full w-full select-none opacity-[0.04] dark:opacity-[0.03]"
      >
        <picture>
          <source srcSet="/assets/Illustrate africa.avif" type="image/avif" />
          <source srcSet='/assets/Illustrate africa.webp' type="image/webP" />
          <img
            src="/assets/Illustrate africa.webp"
            alt=""
            className="h-full w-full object-contain object-left-bottom"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
                <picture className="rounded-xl bg-white p-1 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
                  <source src="/assets/logo.webp" type='image/webp' width={44} height={36} />
                  <img src="/assets/logo_converted.avif" alt="AEEM Logo" width={44} height={36} className="h-9 w-11 rounded-lg object-cover" />
                </picture>
              <h3 className="text-2xl font-bold tracking-tight">AEEM</h3>
            </div>
            <p className="mb-8 max-w-sm leading-relaxed text-aeem-ink/70 dark:text-white/70">
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </p>
            <div className="flex gap-4">
              {([
                { Icon: Twitter,   label: 'Twitter', src: 'https://twitter.com/' },
                { Icon: Facebook, label: 'Facebook', src: 'https://www.facebook.com/profile.php?id=61569341634943' },
                { Icon: Linkedin,  label: 'LinkedIn', src: 'https://www.linkedin.com/company/africa-education-empowerment-movement' },
                { Icon: Mail,      label: 'Email' , src: 'mailto:africaseducationempowermentmov@gmail.com' },
              ] as const).map(({ Icon, label, src }, i) => (
                <a
                  key={i}
                  href={src}
                  aria-label={label}
                  target={src.startsWith('http') ? '_blank' : undefined}
                  rel={src.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-aeem-ink transition-colors hover:border-aeem-forest hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-aeem-gold dark:hover:text-aeem-gold-light"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-extrabold mb-4 text-aeem-charcoal dark:text-aeem-gold uppercase tracking-widest text-xs drop-shadow-sm">Navigation</h4>
            <ul className="space-y-3 text-md md:grid md:grid-cols-2 md:gap-2">
              {[
                { to: '/',                   label: 'Home'                },
                { to: '/about',              label: 'About Us'            },
                { to: '/impact',             label: 'Our Impact'          },
                { to: '/events',             label: 'Events'              },
                { to: '/get-involved',       label: 'Get Involved'        },
                { to: '/contact',            label: 'Contact'             },
                { to: '/press-kit',          label: 'Press Kit'           },
                { to: '/resources',          label: 'Resource Hub'       },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-block font-medium text-aeem-ink/65 transition-colors hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:text-white/60 dark:hover:text-aeem-gold-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay connected */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-aeem-forest dark:text-aeem-gold-light">Stay Connected</h4>
            <p className="mb-5 text-sm leading-relaxed text-aeem-ink/65 dark:text-white/65">
              Follow our work through impact stories, events, and direct conversation with the AEEM team.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/resources" className="inline-flex items-center rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-aeem-ink transition-colors hover:border-aeem-forest hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-aeem-gold dark:hover:text-aeem-gold-light">Resources</Link>
              <Link to="/contact" className="inline-flex items-center rounded-xl bg-aeem-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:bg-aeem-gold dark:text-aeem-forest-dark">Contact us</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-medium text-aeem-ink/55 dark:text-white/50">
            © 2026 | Africa Education Empowerment Movement. | All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-medium text-aeem-ink/55 dark:text-white/50">
            <Link to="/privacy" className="hover:text-aeem-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">Privacy Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
