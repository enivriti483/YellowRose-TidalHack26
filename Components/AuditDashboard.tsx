
import React, { useState, useRef } from 'react';
import { AuditResult } from '../types';
import VerdictCircle from './VerdictCircle';
import MaterialCard from './MaterialCard';
import { WaterDroplets, CarbonCloud, LaborHeart } from './DataVisuals';

interface AuditDashboardProps {
  result: AuditResult;
}

const RatingBar: React.FC<{ label: string; value: number; icon: string; colorClass: string; inverse?: boolean }> = ({ label, value, icon, colorClass, inverse }) => (
  <div className="w-full">
    <div className="flex justify-between items-end mb-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px]">{icon}</span>
        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-[10px] font-black ${colorClass.replace('bg-', 'text-')}`}>{value}%</span>
    </div>
    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
      <div 
        className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
    {inverse && (
      <p className="text-[7px] font-bold text-gray-300 uppercase mt-1 text-right italic">Higher is more impact</p>
    )}
  </div>
);

const AuditDashboard: React.FC<AuditDashboardProps> = ({ result }) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);
  const [isFinalFallback, setIsFinalFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isBad = result.score < 5;
  const materialSum = result.materials.reduce((acc, m) => acc + m.percentage, 0);

  const images = result.imageCandidates && result.imageCandidates.length > 0 
    ? result.imageCandidates 
    : [result.imageUrl];

  const currentImageUrl = userUploadedImage 
    ? userUploadedImage 
    : (isFinalFallback ? null : images[candidateIndex]);

  const handleImageError = () => {
    if (candidateIndex < images.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setIsFinalFallback(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 px-6 space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Hero Squircle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-12 rounded-[56px] apple-shadow border border-amber-50/40">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full max-w-[280px] aspect-[3/4] rounded-[48px] overflow-hidden apple-shadow bg-amber-50/10 ring-8 ring-amber-50/5 relative group">
            {currentImageUrl ? (
              <img 
                src={currentImageUrl} 
                alt={result.productName} 
                className="w-full h-full object-cover transition-all duration-700"
                onError={handleImageError}
                key={currentImageUrl}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-50/50 p-8 text-center">
                 <svg viewBox="0 0 100 100" className="w-24 h-24 mb-4" fill="none">
                    <path d="M50 45C50 45 48 70 58 90" stroke="#78B159" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="50" cy="30" r="22" fill="#FDD835" />
                 </svg>
                 <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Image Unavailable</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2.5 bg-white text-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
               >
                 Upload photo
               </button>
               <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*"
               />
            </div>
          </div>
          <VerdictCircle score={result.score} />
        </div>
        
        <div className="flex flex-col gap-8">
          <div>
             <div className="text-[10px] font-black text-amber-500/50 uppercase tracking-[0.5em] mb-3">Audit Details</div>
             <h2 className="text-4xl font-black text-gray-800 tracking-tight leading-tight mb-2">
              {result.brandName}
            </h2>
            <div className="text-sm font-bold text-gray-400">{result.productName}</div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <RatingBar 
              label="Earth Impact (Negative)" 
              value={result.carbonRating} 
              icon="🌍" 
              colorClass={result.carbonRating > 60 ? "bg-rose-400" : "bg-amber-400"}
              inverse
            />
            <RatingBar 
              label="Labor Kindness (Positive)" 
              value={result.laborRating} 
              icon="🤝" 
              colorClass={result.laborRating < 40 ? "bg-rose-400" : "bg-green-400"}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="px-4 py-1.5 bg-amber-50 rounded-2xl text-[9px] font-black text-amber-600 uppercase tracking-widest">
              {result.brandSustainabilityRating}
            </div>
            {result.certifications.slice(0, 2).map((cert, i) => (
              <div key={i} className="px-4 py-1.5 bg-white rounded-2xl text-[9px] font-black text-gray-400 border border-amber-50 uppercase tracking-widest">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Composition */}
        <div className="bg-white rounded-[48px] p-10 apple-shadow border border-amber-50/20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Composition 🧵</h3>
            <span className="text-[8px] font-black text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">{materialSum}% Audit</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {result.materials.map((m, i) => (
              <MaterialCard key={i} material={m} />
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-amber-50 text-center">
             {materialSum !== 100 && (
               <div className="text-[8px] font-bold text-rose-400 uppercase tracking-widest mb-2">⚠️ Inconsistent Material Data</div>
             )}
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Click card for disposal guide</p>
          </div>
        </div>

        {/* Impact Visuals */}
        <div className="bg-white rounded-[48px] p-10 apple-shadow border border-amber-50/20">
          <h3 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mb-8">Water Life 💧</h3>
          <div className="space-y-12">
            <div>
              <div className="text-[8px] font-black text-blue-300 uppercase tracking-widest mb-4">Volume Consumed</div>
              <WaterDroplets liters={result.waterUsageLiters} />
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-3xl bg-blue-50 flex items-center justify-center text-xl">🏠</div>
               <div>
                 <div className="text-[8px] font-black text-gray-300 uppercase">Home Comparison</div>
                 <div className="text-xs font-black text-gray-700">{Math.round(result.waterUsageLiters / 2)} days of drinking</div>
               </div>
            </div>
          </div>
        </div>

        {/* Final Goodbye */}
        <div className="bg-white rounded-[48px] p-10 apple-shadow border border-rose-50/20 flex flex-col justify-between">
          <div>
            <h3 className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] mb-8">Final Goodbye 👋</h3>
            <p className="text-lg font-bold text-gray-700 leading-relaxed mb-8">
              {result.totalDisposalVerdict}
            </p>
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${result.recyclable ? 'bg-green-50' : 'bg-rose-50'}`}>
                    {result.recyclable ? '♻️' : '🚫'}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{result.recyclable ? 'Recyclable' : 'Non-Recyclable'}</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-lg">⏳</div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Durability: {result.longevity}</span>
               </div>
            </div>
          </div>

          {isBad && (
            <button 
              onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(result.alternativeSearchQuery)}`, '_blank')}
              className="mt-12 w-full py-6 bg-amber-400 text-white rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-amber-500 shadow-xl shadow-amber-100 transition-all active:scale-95"
            >
              Better Choices 🌻
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditDashboard;
