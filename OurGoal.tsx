
import React, { useState, useEffect } from 'react';

const OurGoal: React.FC<{ onStartAudit: () => void }> = ({ onStartAudit }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 pb-40 overflow-visible">
      {/* Page Title */}
      <div className="text-center py-24 animate-in fade-in duration-1000">
        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] mb-4 block">Our Mission</span>
        <h2 className="text-6xl font-black text-gray-800 tracking-tighter leading-[0.9]">
          Our <br/><span className="text-amber-400">Goal.</span>
        </h2>
      </div>

      <div className="space-y-48">
        {/* Section 1: The Deceptive Price Tag - ROBUST CSS FIX */}
        <section className="flex flex-col items-center">
          <div className="flip-card w-64 h-80 cursor-pointer">
            <div className="flip-card-inner">
              
              {/* Front Side */}
              <div className="flip-card-front bg-white rounded-[40px] apple-shadow border-2 border-amber-50 flex flex-col items-center justify-center p-8">
                <div className="w-6 h-6 rounded-full bg-gray-100 mb-10 shadow-inner relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                </div>
                <div className="text-6xl font-black text-gray-800 tracking-tighter">$9.99</div>
                <div className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] mt-8">Fashion Tee</div>
                <div className="mt-12 text-[9px] font-black text-amber-300 animate-pulse tracking-widest uppercase">Hover to peek</div>
              </div>

              {/* Back Side */}
              <div className="flip-card-back bg-rose-400 rounded-[40px] apple-shadow flex flex-col items-center justify-center p-8">
                <div className="text-5xl font-black text-white tracking-tighter">$150.00</div>
                <div className="text-[10px] font-black text-rose-100 uppercase tracking-widest mt-4">The True Debt</div>
                
                <div className="mt-16 flex flex-col items-center gap-4">
                   <div className="text-white/40 text-[9px] font-black uppercase tracking-widest">Peeking Behind...</div>
                   <div className="animate-bounce">
                     <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="30" r="22" fill="#FDD835" />
                        <circle cx="43" cy="25" r="3" fill="#333" />
                        <circle cx="57" cy="25" r="3" fill="#333" />
                        <path d="M42 38C42 38 50 43 58 38" stroke="#333" strokeWidth="3" strokeLinecap="round" />
                        <path d="M50 45C50 45 48 70 58 90" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                     </svg>
                   </div>
                </div>
              </div>

            </div>
          </div>
          <p className="mt-20 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] leading-relaxed max-w-xs">
            The Real Cost of <br/> Cheap Consumption
          </p>
        </section>

        {/* Section 2: Chapter 1 - Economic Ripple */}
        <section className="bg-white rounded-[64px] p-16 apple-shadow border border-amber-50/50">
          <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mb-12">The Economic Illusion</h3>
          <div className="space-y-8">
             <div className="relative h-20 bg-amber-50/20 rounded-[32px] overflow-hidden group">
                <div className="absolute inset-y-0 left-0 bg-amber-400 w-[85%] transition-all duration-1000 ease-out" />
                <div className="absolute inset-0 flex items-center justify-between px-10 z-10">
                   <span className="text-[11px] font-black text-white uppercase tracking-widest">Corporate Growth</span>
                   <span className="text-2xl">📈</span>
                </div>
             </div>
             <div className="relative h-20 bg-amber-50/20 rounded-[32px] overflow-hidden group">
                <div className="absolute inset-y-0 left-0 bg-blue-300 w-[14%] transition-all duration-1000 ease-out delay-200" />
                <div className="absolute inset-0 flex items-center justify-between px-10 z-10">
                   <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Resource Cost</span>
                   <span className="text-2xl">🧵</span>
                </div>
             </div>
             <div className="relative h-20 bg-amber-50/20 rounded-[32px] overflow-hidden group">
                <div className="absolute inset-y-0 left-0 bg-rose-300 w-[1%] transition-all duration-1000 ease-out delay-500" />
                <div className="absolute inset-0 flex items-center justify-between px-10 z-10">
                   <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest">Worker Wages</span>
                   <span className="text-2xl">🤲</span>
                </div>
             </div>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 opacity-30">
            <div className="w-1 h-12 bg-gray-400 rounded-full" />
            <p className="text-[9px] font-black uppercase tracking-widest">Externalized Debt</p>
          </div>
        </section>

        {/* Section 3: Chapter 2 - Environmental Echo */}
        <section className="space-y-32">
          <div className="text-center">
            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em] mb-12">Earth's Hidden Thirst</h3>
            <div className="relative w-full h-80 flex flex-col items-center justify-end overflow-hidden bg-white rounded-[64px] apple-shadow border border-blue-50/50">
               <div 
                 className="absolute bottom-0 w-full bg-blue-100/50 transition-all duration-700 ease-out" 
                 style={{ height: `${Math.min(100, scrollProgress * 150)}%` }}
               />
               <div className="z-10 text-center pb-12">
                  <div className="text-7xl font-black text-blue-600 mb-4 tracking-tighter">2,700L</div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">For a single cotton t-shirt</div>
                  <p className="mt-6 text-[9px] font-bold text-gray-300 uppercase tracking-widest">3 years of drinking water</p>
               </div>
            </div>
          </div>

          <div className="text-center relative py-20">
             <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-[100px] transition-all duration-1000 ease-out"
               style={{ transform: `translate(-50%, -50%) scale(${0.5 + scrollProgress * 1.5})`, opacity: Math.min(1, scrollProgress * 1.5) }}
             />
             <h3 className="relative z-10 text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-16">Carbon Suffocation</h3>
             <div className="relative z-10 text-8xl mb-8 animate-pulse">☁️</div>
             <div className="relative z-10 text-6xl font-black text-gray-800 tracking-tighter">3kg CO2</div>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-6">A typical 10km morning commute</p>
          </div>
        </section>

        {/* Section 4: Chapter 4 - Social Threads */}
        <section className="bg-white rounded-[72px] p-24 apple-shadow border border-rose-50 relative overflow-hidden">
          <div className="flex flex-col items-center gap-16 text-center">
             <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em]">The Human Cost</h3>
             
             <div className="flex gap-12">
                {['🧵', '🤲', '🪡'].map((e, i) => (
                  <div key={i} className="text-7xl animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{e}</div>
                ))}
             </div>

             <div className="p-12 bg-rose-50 rounded-[48px] max-w-xl border border-rose-100 relative">
                <div className="absolute -top-6 -left-6 text-5xl">🥺</div>
                <p className="text-2xl font-bold text-rose-900 leading-[1.3] italic">
                  "Speed over safety. Volume over humanity. This is the invisible price we pay with our health."
                </p>
             </div>

             <div className="relative group cursor-help">
                <div className="w-44 h-44 bg-gray-50 rounded-full flex items-center justify-center text-6xl border-4 border-dashed border-rose-100 transition-all group-hover:scale-110 group-hover:border-rose-400 grayscale group-hover:grayscale-0">
                   💔
                </div>
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mt-8 group-hover:text-rose-400 transition-colors">Shattered Ethics</div>
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-40 bg-amber-50/20 rounded-[100px] border border-amber-100/30">
          <div className="mb-20">
            <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.6em] mb-12">The Power of Blooming</h3>
            <div className="flex justify-center gap-10 mb-20">
               {['🌻', '🌸', '✨', '🌼', '🌱'].map((e, i) => (
                 <div key={i} className="text-6xl animate-wiggle" style={{ animationDelay: `${i * 0.1}s` }}>{e}</div>
               ))}
            </div>
            <h4 className="text-6xl font-black text-gray-800 mb-8 tracking-tighter leading-none">Your Choice, <br/> Our Future.</h4>
            <p className="text-gray-400 font-bold max-w-sm mx-auto leading-relaxed px-10">Every audit is a vote for a more compassionate world.</p>
          </div>
          
          <button 
            onClick={onStartAudit}
            className="group relative px-16 py-9 bg-amber-400 text-white rounded-[48px] text-[11px] font-black uppercase tracking-[0.6em] shadow-2xl shadow-amber-200/50 hover:bg-amber-500 transition-all hover:scale-105 active:scale-95"
          >
            Start Audit Journey!
            <div className="absolute -top-4 -right-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity animate-bounce">✨</div>
          </button>
        </section>
      </div>

      <style>{`
        /* Flip Card Base */
        .flip-card {
          background-color: transparent;
          perspective: 1200px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default OurGoal;
