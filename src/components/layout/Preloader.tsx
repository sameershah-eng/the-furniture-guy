import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('tfg_has_preloaded');
    if (!hasLoaded) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('tfg_has_preloaded', 'true');
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1B1F] flex flex-col items-center justify-center text-white transition-opacity duration-500">
      <div className="text-center space-y-3 animate-in fade-in zoom-in-95 duration-500">
        <Sparkles className="w-8 h-8 text-[#E8D3B9] mx-auto animate-pulse" />
        <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white">
          {siteConfig.businessName}
        </h2>
        <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#E8D3B9] block">
          {siteConfig.subBrand} Emporium
        </span>

        {/* Shimmer loading hairline */}
        <div className="w-48 h-0.5 bg-[#323038] mx-auto mt-4 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#E8D3B9] to-transparent animate-shimmer-sweep" />
        </div>
      </div>
    </div>
  );
};
