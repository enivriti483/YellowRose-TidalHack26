
import React from 'react';

const OurRoots: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-4 block">Our Roots</span>
        <h2 className="text-5xl font-black text-gray-800 tracking-tight leading-tight">
          Stopping Fast <br/><span className="text-amber-400">Fashion.</span>
        </h2>
      </div>

      <div className="space-y-24">
        {/* Hidden Cost */}
        <section className="relative p-10 bg-white rounded-[40px] apple-shadow border border-amber-50">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-4xl apple-shadow border-4 border-white">💧</div>
          <h3 className="text-2xl font-black text-gray-800 mb-4">The Hidden Gulp</h3>
          <p className="text-lg text-gray-500 font-bold leading-relaxed mb-6">
            One single t-shirt takes <span className="text-blue-500">2,700 liters</span> of water to make. 
          </p>
          <div className="p-6 bg-blue-50/50 rounded-3xl">
             <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Worst Case</div>
             <p className="text-sm font-bold text-gray-600">The Aral Sea has nearly vanished, turning into a desert because of massive cotton irrigation projects.</p>
          </div>
        </section>

        {/* Labor */}
        <section className="relative p-10 bg-white rounded-[40px] apple-shadow border border-rose-50 text-left">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-4xl apple-shadow border-4 border-white">💔</div>
          <h3 className="text-2xl font-black text-gray-800 mb-4">Human Heartbeat</h3>
          <p className="text-lg text-gray-500 font-bold leading-relaxed mb-6">
            Fashion is one of the world's most labor-intensive industries, often at the cost of safety.
          </p>
          <div className="p-6 bg-rose-50/50 rounded-3xl text-left">
             <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2">Never Forget</div>
             <p className="text-sm font-bold text-gray-600">The Rana Plaza collapse in 2013 killed 1,134 garment workers. We audit so we never ignore the hands that sew our clothes.</p>
          </div>
        </section>

        {/* Mission */}
        <div className="text-center pb-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-amber-400 text-white rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-100">
            Audit for a Better Planet 🌻
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRoots;
