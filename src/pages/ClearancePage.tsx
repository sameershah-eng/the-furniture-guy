import React, { useState } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Flame, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const ClearancePage: React.FC = () => {
  useDocumentTitle('Clearance Outlet & Showroom Specials');
  const clearanceProducts = products.filter((p) => p.salePrice);

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#24171A] via-[#1C1B1F] to-[#24171A] rounded-3xl p-8 sm:p-14 text-white shadow-2xl mb-12 border border-[#442C33] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2566B]/30 border border-[#C2566B]/50 text-[#E57388] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Direct Showroom Outlet</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight">
              Clearance &amp; Ex-Display Outlet
            </h1>
            <p className="text-sm sm:text-base text-[#DCDDE1] font-light leading-relaxed">
              Genuine King of Bling showpieces at factory clearance prices. Save up to 40% on discontinued lines, excess stock, and pristine showroom display models.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#E8D3B9]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Inspected Showroom Quality
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E8D3B9]" /> Immediate UK Dispatch
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9F7453]">
            {clearanceProducts.length} Outlet Showpieces Available
          </span>
          <span className="text-xs text-[#6B6670]">
            Prices as marked · While limited showroom stock lasts
          </span>
        </div>

        <ProductGrid products={clearanceProducts} />
      </div>
    </div>
  );
};
