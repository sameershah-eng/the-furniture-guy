import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Gem, SunMedium, Shield } from 'lucide-react';
import { clientImages } from '@/data/images';
import { SmartImage } from '@/components/ui/SmartImage';

export const EditorialCrushedDiamond: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#1C1B1F] text-white overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8D3B9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real photo presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#3A3842] aspect-[4/3] sm:aspect-[16/11]">
              <SmartImage
                src={clientImages.styledCrushedDiamondLivingRoom.src}
                alt={clientImages.styledCrushedDiamondLivingRoom.alt}
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 text-xs font-semibold text-[#E8D3B9] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Styled in a UK Home</span>
              </div>
            </div>

            {/* Inset Detail Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-[#26242B] border border-[#3A3842] p-4 rounded-xl shadow-2xl items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#E8D3B9]/20 flex items-center justify-center text-[#E8D3B9] shrink-0">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Faceted Optical Crystals</p>
                <p className="text-[11px] text-[#A19DA8]">Reflects ambient lighting at 360°</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Craftsmanship Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26242B] border border-[#3A3842] text-[#E8D3B9]">
              <Sparkles className="w-3.5 h-3.5 text-[#E8D3B9]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold">
                The Crushed Diamond Edit
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              Thousands of precision crystals sealed beneath bevelled glass.
            </h2>

            <p className="text-sm sm:text-base text-[#DCDDE1] leading-relaxed font-light">
              We started King of Bling because British homes deserved glamour without compromise. Every crushed diamond piece in our showroom is meticulously hand-assembled with high-grade optical crystals protected behind tempered bevelled glass panels. Dust never penetrates, and the sparkle never fades.
            </p>

            {/* 3 Craftsmanship Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#26242B] border border-[#323038]">
                <Gem className="w-5 h-5 text-[#E8D3B9] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Hermetically Sealed
                </h4>
                <p className="text-[11px] text-[#A19DA8] mt-1">
                  100% dust-proof crystal chambers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#26242B] border border-[#323038]">
                <SunMedium className="w-5 h-5 text-[#E8D3B9] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Bevelled Optics
                </h4>
                <p className="text-[11px] text-[#A19DA8] mt-1">
                  Diamond cut perimeter edges catch light.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#26242B] border border-[#323038]">
                <Shield className="w-5 h-5 text-[#E8D3B9] mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Solid Reinforcement
                </h4>
                <p className="text-[11px] text-[#A19DA8] mt-1">
                  Engineered heavy core beneath mirror.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/collections/crushed-diamond"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-semibold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Shop the Crushed Diamond Range</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
