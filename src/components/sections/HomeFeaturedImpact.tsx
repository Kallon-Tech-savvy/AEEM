import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function HomeFeaturedImpact() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0f1115]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#1a1d24] to-black rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative border border-white/10">
          <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <span className="inline-block w-max py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-aeem-gold font-bold uppercase tracking-[0.2em] text-xs mb-8">
                Featured Case Study
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-md">
                I AM SOMEBODY <br />Initiative
              </h2>
              <p className="text-gray-300 text-lg mb-12 leading-relaxed font-medium">
                Our flagship 2-day empowerment workshop for the first time implemented in 2025,
                trained 42 participants from six schools, addressing leadership, civic awareness,
                resilience, and public health.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">42</div>
                  <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Youth</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">6</div>
                  <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Schools</div>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                  <div className="text-3xl font-black text-white mb-1">2</div>
                  <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Days</div>
                </div>
              </div>
              <Link
                to="/impact/i-am-somebody"
                className="group flex w-max items-center gap-3 px-6 py-3 bg-aeem-gold text-aeem-charcoal rounded-full font-bold hover:bg-white transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
              >
                Read Full Report{' '}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative h-[400px] lg:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d24] via-transparent to-transparent z-10 hidden lg:block" />
              <img
                src="/assets/gallery/Participant_Group_Picture.jpg"
                alt="Youth empowerment workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
