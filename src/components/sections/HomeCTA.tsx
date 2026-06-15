import { Link } from 'react-router-dom'

export default function HomeCTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-[#0f1115] dark:to-[#1a1d24] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aeem-gold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-aeem-charcoal dark:text-white mb-10 drop-shadow-sm">
          Ready to make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-500">difference?</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/get-involved"
            className="px-10 py-5 bg-gradient-to-r from-aeem-gold to-yellow-500 text-aeem-charcoal rounded-full font-black hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all active:scale-95 text-lg"
          >
            Join the Movement
          </Link>
          <Link
            to="/contact"
            className="px-10 py-5 bg-white dark:bg-white/5 backdrop-blur-md border-2 border-gray-200 dark:border-white/10 text-aeem-charcoal dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-xl transition-all active:scale-95 text-lg"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  )
}
