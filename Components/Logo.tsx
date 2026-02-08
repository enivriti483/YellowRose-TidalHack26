
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-1 group cursor-default">
      <div className="relative w-24 h-24 bg-white rounded-[32px] flex items-center justify-center apple-shadow border border-amber-50 transition-transform duration-500 group-hover:scale-110">
        {/* Recreated the user's rose image in clean SVG */}
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem */}
          <path d="M50 45C50 45 48 70 58 90" stroke="#78B159" strokeWidth="3" strokeLinecap="round" />
          
          {/* Leaves */}
          <path d="M50 55C42 55 35 50 40 45C45 40 50 48 50 55Z" fill="#78B159" />
          <path d="M50 72C58 72 65 67 60 62C55 57 50 65 50 72Z" fill="#78B159" />
          
          {/* Rose Petals (simplified layering to match the flat style) */}
          <circle cx="50" cy="30" r="22" fill="#FDD835" />
          <path d="M35 25C35 15 65 15 65 25C65 35 35 35 35 25Z" fill="#FEEB3B" />
          <circle cx="50" cy="25" r="10" fill="#FFF176" />
          
          {/* Decorative accents to match the provided image's petal gaps */}
          <path d="M40 15C45 10 55 10 60 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M32 30C35 40 65 40 68 30" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
        <div className="absolute -top-1 -right-1 animate-bounce text-xs">✨</div>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-800 font-[Quicksand] mt-2">Yellow Rose</h1>
      <div className="h-0.5 w-6 bg-amber-300 rounded-full"></div>
    </div>
  );
};

export default Logo;
