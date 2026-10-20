import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, MapPin } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { clientImages } from '@/data/images';
import { siteConfig } from '@/config/site';

interface HeroSectionProps {
  onOpenBooking?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F7E7E1]/50 via-[#FBF9F6] to-[#ECEAF2]/40 pt-4 pb-12 sm:pt-8 sm:pb-20 lg:pt-12 lg:pb-28">
      {/* Subtle ambient shimmer orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8D3B9]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D9A89A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#EEE8E1] text-[#9F7453] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Glam Furniture · Est. UK · {siteConfig.subBrand}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium tracking-tight text-[#1C1B1F] leading-[1.08] text-balance">
              Furniture that{' '}
              <span className="relative inline-block text-champagne-gradient italic">
                catches the light.
                <span className="absolute inset-0 animate-shimmer-sweep pointer-events-none" />
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#6B6670] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Bespoke crushed crystal fireplaces, bevelled Venetian mirrored consoles, and opulent Ariana marble dining sets. Hand-selected British showstoppers delivered with two-man white glove care.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-semibold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 text-[#1C1B1F] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/book"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/90 border border-[#EEE8E1] hover:border-[#9F7453] text-[#1C1B1F] font-semibold text-xs uppercase tracking-wider shadow-xs hover:bg-white active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#9F7453]" />
                <span>Book a Showroom Visit</span>
              </Link>
            </div>

            {/* Proof Badges Below Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#6B6670] border-t border-[#EEE8E1]/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9F7453]" />
                <span>Reserve with £20 Deposit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#9F7453]" />
                <span>Greater Manchester Showroom</span>
              </div>
            </div>
          </div>

          {/* Right Column: Overlapping Layered Real Photos */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Primary Large Showroom Photo */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <SmartImage
                  src={clientImages.heroShowroomDining.src}
                  alt={clientImages.heroShowroomDining.alt}
                  priority={true}
                  focalPoint="center 40%"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white text-xs font-medium backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/20">
                  Real Showroom Display · Manchester
                </div>
              </div>

              {/* Secondary Overlapping Inset Card */}
              <div className="hidden sm:block absolute -bottom-6 -left-8 z-20 w-52 sm:w-60 rounded-xl overflow-hidden shadow-xl border-3 border-white">
                <SmartImage
                  src={clientImages.heartConsoleTable.src}
                  alt={clientImages.heartConsoleTable.alt}
                  aspectRatio="square"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-2.5 bg-white/95 backdrop-blur-xs text-left border-t border-[#EEE8E1]">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-[#9F7453]">
                    Signature Design
                  </p>
                  <p className="text-xs font-semibold text-[#1C1B1F] truncate">
                    Illuminated Heart Console
                  </p>
                </div>
              </div>

              {/* Floating Social Proof Pill */}
              <div className="absolute -top-4 sm:-top-6 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-[#EEE8E1] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E8D3B9] to-[#C9A27E] flex items-center justify-center text-[#1C1B1F] shrink-0 font-bold">
                  ★
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-[#1C1B1F] mt-0.5">
                    4.9★ From 300+ Homes
                  </p>
                  <p className="text-[10px] text-[#6B6670]">Verified UK Facebook Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
