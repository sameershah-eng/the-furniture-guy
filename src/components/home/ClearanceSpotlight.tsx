import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, Flame } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export const ClearanceSpotlight: React.FC = () => {
  const clearanceProducts = products.filter((p) => p.salePrice).slice(0, 4);

  // Countdown timer to end of current month
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 14, minutes: 22, seconds: 40 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth.getTime() - now.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with countdown */}
        <div className="bg-gradient-to-r from-[#2B1B20] via-[#1C1B1F] to-[#2B1B20] rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#4A3238]">
          <div className="text-center lg:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2566B]/30 border border-[#C2566B]/40 text-[#E57388] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Showroom Clearance Spotlight</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white">
              Limited Ex-Display &amp; Direct Outlet Offers
            </h2>
            <p className="text-xs sm:text-sm text-[#DCDDE1] max-w-lg">
              Save up to 40% on verified showroom showpieces. First come, first served with direct UK dispatch.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="bg-[#1C1B1F]/90 border border-[#4A3238] rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-center min-w-[60px] sm:min-w-[70px]"
              >
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#E8D3B9] font-mono leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#A19DA8] uppercase tracking-wider mt-1 block">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Clearance Product Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {clearanceProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/clearance"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1C1B1F] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-black transition-colors"
          >
            <span>View All Clearance Pieces</span>
            <ArrowRight className="w-4 h-4 text-[#E8D3B9]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
