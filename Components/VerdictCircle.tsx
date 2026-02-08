
import React from 'react';

interface VerdictCircleProps {
  score: number;
}

const VerdictCircle: React.FC<VerdictCircleProps> = ({ score }) => {
  const isGood = score >= 5;
  const borderColor = isGood ? 'border-amber-200' : 'border-rose-200';
  const textColor = isGood ? 'text-amber-500' : 'text-rose-400';
  const label = isGood ? 'Thriving Rose' : 'Wilted Rose';
  
  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-44 h-44 rounded-full border-[12px] ${borderColor} flex flex-col items-center justify-center bg-white apple-shadow transition-all duration-1000 ease-out ring-8 ring-white/50 overflow-visible`}>
        {/* Score Display */}
        <span className={`text-6xl font-black ${textColor}`}>{score}</span>
        <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Grade</span>

        {/* Floaties */}
        {isGood && (
           <>
            <div className="absolute -top-4 -right-2 text-2xl animate-bounce">✨</div>
            <div className="absolute -bottom-2 -left-4 text-xl animate-pulse">🌸</div>
           </>
        )}
      </div>
      
      <div className={`mt-8 flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-100 text-[10px] font-black ${textColor} uppercase tracking-[0.2em] apple-shadow`}>
        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-lg">
          {isGood ? '😊' : '🥺'}
        </div>
        {label}
      </div>
    </div>
  );
};

export default VerdictCircle;
