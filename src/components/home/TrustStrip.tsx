import React from 'react';
import { Truck, Wrench, Eye, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/config/site';

const features = [
  {
    icon: Truck,
    title: `Free Delivery Over £${siteConfig.freeDeliveryThreshold}`,
    subtitle: 'Two-man specialist handling',
  },
  {
    icon: Wrench,
    title: 'White Glove Assembly',
    subtitle: 'Optional unboxing & room positioning',
  },
  {
    icon: Eye,
    title: 'Showroom Viewing',
    subtitle: 'Visit our Manchester gallery',
  },
  {
    icon: ShieldCheck,
    title: 'Reserve with £20 Deposit',
    subtitle: 'Pay remaining balance on delivery',
  },
];

export const TrustStrip: React.FC = () => {
  return (
    <div className="border-y border-[#EEE8E1] bg-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#FBF9F6] border border-[#EEE8E1] flex items-center justify-center text-[#9F7453] group-hover:bg-[#E8D3B9]/30 group-hover:border-[#C9A27E] transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1B1F] truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6670] truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
