import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, FileText, Image as ImageIcon, Briefcase } from 'lucide-react';

const PressKit: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Press Kit | AEEM</title>
        <meta name="description" content="Official AEEM media assets, logos, and organizational profiles for media and partnerships." />
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem text-aeem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Media Resources</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Press <span className="text-aeem-gold">Kit</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Official resources and assets for media inquiries and partnership collaborations. All materials are available for download and use in accordance with our brand guidelines.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-aeem-focus/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black mb-8">Organizational Profile</h2>
              <div className="space-y-6">
                <div className="bg-aeem p-8 rounded-2xl border border-aeem flex items-center justify-between group hover:border-aeem-gold transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/80 rounded-xl shadow-sm flex items-center justify-center text-aeem-gold">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">AEEM Briefing Document</h3>
                      <p className="text-sm text-gray-500">PDF, 2.4 MB</p>
                    </div>
                  </div>
                  <button className="p-3 rounded-full hover:bg-aeem-gold hover:text-white transition-all">
                    <Download size={20} />
                  </button>
                </div>

                <div className="bg-aeem p-8 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-aeem-gold transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/80 rounded-xl shadow-sm flex items-center justify-center text-aeem-gold">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">Fact Sheet 2026</h3>
                      <p className="text-sm text-gray-500">PDF, 1.1 MB</p>
                    </div>
                  </div>
                  <button className="p-3 rounded-full hover:bg-aeem-gold hover:text-white transition-all">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.077] dark:opacity-[0.03] pointer-events-none z-1 mix-blend-luminosity select-none">
              <img 
                src="/assets/Illustrate africa.png" 
                alt="" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-8">Brand Assets</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-aeem-focus/30 p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:border-aeem-gold transition-colors">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-aeem-gold mb-6">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="font-bold mb-2">Logo Pack</h3>
                  <p className="text-sm text-gray-500 mb-6">SVG, PNG, EPS</p>
                  <button className="mt-auto px-6 py-2 bg-aeem-gold/70 text-white rounded-full text-xs font-bold hover:bg-aeem-gold transition-colors">
                    Download
                  </button>
                </div>

                <div className="bg-aeem-focus/30 p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:border-aeem-gold transition-colors">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-aeem-gold mb-6">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="font-bold mb-2">Impact Photos</h3>
                  <p className="text-sm text-gray-500 mb-6">High Res JPG</p>
                  <button className="mt-auto px-6 py-2 bg-aeem-gold/70 text-white rounded-full text-xs font-bold hover:bg-aeem-gold transition-colors">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-24 bg-aeem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-aeem-gold rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-black mb-6">Media Inquiries</h2>
            <p className="max-w-2xl mx-auto mb-8 text-aeem">
              For interviews, press access, or official statements, please reach out to our communications team.
            </p>
            <a href="mailto:press@aeem.org" className="text-2xl text-white font-black border-b-2 border-aeem-focus hover:text-aeem-charcoal hover:border-aeem-charcoal transition-colors pb-2">
              press@aeem.org
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default PressKit;
