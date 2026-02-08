
import React, { useState } from 'react';
import { MaterialInfo } from '../types';

interface MaterialCardProps {
  material: MaterialInfo;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'organic': return '🌱';
      case 'synthetic': return '🧪';
      case 'natural': return '☁️';
      case 'recycled': return '♻️';
      default: return '🧵';
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'organic': return 'bg-green-50';
      case 'synthetic': return 'bg-purple-50';
      case 'natural': return 'bg-amber-50';
      case 'recycled': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer"
      >
        <div className={`w-24 h-32 ${getBg(material.type)} rounded-[32px] flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}>
          <span className="text-4xl">{getIcon(material.type)}</span>
          <div className="text-center">
            <div className="text-[12px] font-black text-gray-400">{material.percentage}%</div>
            <div className="text-[10px] font-black text-gray-600 leading-tight uppercase truncate w-16">{material.name}</div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-amber-950/20 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsOpen(false)}>
          <div 
            className="w-full max-w-lg bg-white rounded-[56px] apple-shadow p-12 border border-amber-50 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-8 right-8 cursor-pointer text-gray-300 hover:text-amber-500 transition-colors" onClick={() => setIsOpen(false)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </div>

            <div className="flex items-center gap-6 mb-10">
              <div className={`w-24 h-24 ${getBg(material.type)} rounded-[40px] flex items-center justify-center text-5xl`}>
                {getIcon(material.type)}
              </div>
              <div>
                <div className="text-[12px] font-black text-amber-500 uppercase tracking-[0.4em] mb-2">Material Insight</div>
                <h3 className="text-3xl font-black text-gray-800">{material.percentage}% {material.name}</h3>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-4">Disposal Guide</span>
                <p className="text-xl text-gray-600 leading-relaxed font-medium">
                  {material.disposalGuide}
                </p>
              </div>
              
              <div className="p-6 bg-amber-50/50 rounded-[32px] border border-amber-100/50">
                <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Eco Tip</div>
                <p className="text-sm text-amber-700 font-bold">Choosing {material.type === 'synthetic' ? 'natural' : 'organic'} alternatives reduces microplastic shedding during washing.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialCard;
