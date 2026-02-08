
import React from 'react';

export const WaterDroplets: React.FC<{ liters: number }> = ({ liters }) => {
  // Logic: < 2000L = slow drip, >= 2000L = fast drip
  const isFast = liters >= 2000;

  return (
    <div className="flex flex-col items-center gap-6 py-4 w-full">
      <div className="relative w-full h-64 flex flex-col items-center justify-start overflow-hidden bg-amber-50/5 rounded-[40px]">
        
        {/* Faucet SVG matching the user's image */}
        <div className="relative z-20 mt-8">
          <svg width="160" height="100" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-12">
            {/* Horizontal Inlet Pipe */}
            <rect x="0" y="38" width="60" height="14" fill="#B0BEC5" />
            <rect x="0" y="38" width="60" height="4" fill="#CFD8DC" />
            
            {/* Connection Joint */}
            <rect x="52" y="34" width="12" height="22" rx="2" fill="#90A4AE" />
            
            {/* Main Faucet Body */}
            <path d="M60 45C90 45 115 45 115 75" stroke="#B0BEC5" strokeWidth="18" strokeLinecap="round" />
            <path d="M60 42C90 42 110 42 110 72" stroke="#CFD8DC" strokeWidth="6" strokeLinecap="round" />
            
            {/* Spout Lip */}
            <rect x="105" y="75" width="20" height="4" rx="1" fill="#78909C" />
            
            {/* Valve Base */}
            <rect x="75" y="28" width="26" height="14" rx="3" fill="#90A4AE" />
            
            {/* Handle Cross - Using a circular spin animation */}
            <g className="animate-handle-spin" style={{ transformOrigin: '88px 24px' }}>
              <rect x="73" y="22" width="30" height="4" rx="2" fill="#B0BEC5" />
              <rect x="86" y="8" width="4" height="32" rx="2" fill="#B0BEC5" />
              <circle cx="88" cy="24" r="5" fill="#78909C" />
            </g>
          </svg>
        </div>

        {/* Water Droplets - Positioned exactly under the spout opening */}
        {/* Adjusted pl-16 to pl-10 to move water slightly left to align with spout */}
        <div className="relative flex-1 w-full flex justify-center pl-10 -mt-2">
           <div className="absolute top-0 w-10 flex justify-center">
             {/* Droplet 1 */}
             <div className={`teardrop ${isFast ? 'animate-drip-fast' : 'animate-drip-slow'}`}></div>
             {/* Droplet 2 (only for fast rate to stagger them) */}
             {isFast && (
               <div className="teardrop animate-drip-fast" style={{ animationDelay: '0.4s' }}></div>
             )}
           </div>
        </div>

        {/* Impact Ground */}
        <div className="w-40 h-2 bg-blue-100/30 rounded-full mt-auto mb-6 blur-sm" />
      </div>

      <div className="text-center">
        <div className={`text-4xl font-black transition-colors duration-500 ${isFast ? 'text-blue-600' : 'text-blue-400'}`}>
          {liters.toLocaleString()}L
        </div>
        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mt-1">
          {isFast ? 'Critical Hydrological Load' : 'Minimal Water Impact'}
        </div>
      </div>

      <style>{`
        .teardrop {
          position: absolute;
          width: 14px;
          height: 18px;
          background-color: #60A5FA;
          /* Perfect teardrop shape */
          border-radius: 50% 50% 50% 50% / 15% 15% 85% 85%;
          clip-path: polygon(50% 0%, 100% 70%, 100% 100%, 0% 100%, 0% 70%);
          opacity: 0;
        }

        @keyframes drip-anim {
          0% { transform: translateY(-5px) scale(0.2); opacity: 0; }
          10% { opacity: 1; transform: translateY(0) scale(1.1); }
          100% { transform: translateY(180px) scale(0.8); opacity: 0; }
        }

        @keyframes handle-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-drip-slow { animation: drip-anim 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-drip-fast { animation: drip-anim 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-handle-spin { animation: handle-spin 4s linear infinite; }
      `}</style>
    </div>
  );
};

export const CarbonCloud: React.FC<{ kg: number }> = ({ kg }) => {
  const intensity = kg > 15 ? 'text-gray-500' : 'text-gray-300';
  return (
    <div className="flex items-center gap-2">
      <span className={`text-2xl ${intensity} transition-transform duration-1000`} style={{ transform: `scale(${1 + kg/50})` }}>☁️</span>
      <span className="text-[10px] font-black text-gray-400">{kg}kg</span>
    </div>
  );
};

export const LaborHeart: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">❤️</span>
      <div className="h-1.5 w-16 bg-rose-50 rounded-full overflow-hidden">
        <div className="h-full bg-rose-400 rounded-full" style={{ width: `${rating}%` }} />
      </div>
    </div>
  );
};
