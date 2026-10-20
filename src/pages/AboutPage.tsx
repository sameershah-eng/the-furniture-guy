import React from 'react';
import { Sparkles, MapPin, Award, Users, Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { clientImages } from '@/data/images';
import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  useDocumentTitle('About The Furniture Guy & King of Bling');

  const stats = [
    { number: '3,000+', label: 'Happy Homes Across the UK', icon: Users },
    { number: '500+', label: 'Bespoke Showpieces in Stock', icon: Sparkles },
    { number: '10+', label: 'Years of Luxury Curation', icon: Award },
    { number: '300+', label: '5-Star Verified Reviews', icon: Star },
  ];

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Story Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
            Our Story &amp; Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C1B1F] tracking-tight mb-6">
            Light Luxe Glamour for Britain's Proudest Living Rooms
          </h1>
          <p className="text-base sm:text-lg text-[#6B6670] leading-relaxed font-normal">
            Started from a genuine love for optical crystal sparkle and Italian-inspired bevelled glass, <strong>The Furniture Guy</strong> (celebrated on Facebook as the <strong>King of Bling</strong>) was born to bring high-end showroom opulence within reach of every British homeowner.
          </p>
        </div>

        {/* Real Showroom Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#EEE8E1] shadow-xs">
            <SmartImage
              src={clientImages.heroShowroomDining.src}
              alt="The Furniture Guy Manchester Showroom Floor"
              aspectRatio="landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#EEE8E1] shadow-xs">
            <SmartImage
              src={clientImages.styledCrushedDiamondLivingRoom.src}
              alt="Crushed diamond suite styled in customer living room"
              aspectRatio="landscape"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#EEE8E1] shadow-xs">
            <SmartImage
              src={clientImages.styledArianaMarbleDining.src}
              alt="Ariana marble dining setup"
              aspectRatio="landscape"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats Strip */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EEE8E1] shadow-xl mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#EEE8E1]">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="pt-4 lg:pt-0 px-2 first:pt-0">
                  <Icon className="w-6 h-6 text-[#9F7453] mx-auto mb-2" />
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1B1F] font-mono block">
                    {s.number}
                  </span>
                  <span className="text-xs text-[#6B6670] mt-1 block font-medium">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl border border-[#EEE8E1] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E8D3B9]/30 flex items-center justify-center text-[#9F7453]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              Real Crystals, Never Plastic
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
              We never cut corners with cheap acrylic glitter. Our crushed diamond lines use thousands of optical glass crystal prisms hermetically sealed behind bevelled glass for eternal reflection.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EEE8E1] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E8D3B9]/30 flex items-center justify-center text-[#9F7453]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              Two-Man White Glove Care
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
              Heavy mirrors and solid marble cannot be left curbside. Our trained two-man team carries every piece into your desired room and lets you inspect every angle before signing.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#EEE8E1] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#E8D3B9]/30 flex items-center justify-center text-[#9F7453]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              £20 Deposit Security
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
              We stand behind our stock. Lock in any piece with a small £20 deposit and settle the rest only after it arrives safely in your home.
            </p>
          </div>
        </div>

        {/* Visit Callout */}
        <div className="text-center bg-gradient-to-r from-[#24171A] to-[#1C1B1F] text-white p-10 sm:p-14 rounded-3xl border border-[#442C33] shadow-xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-3">
            Come visit our Greater Manchester Showroom
          </h2>
          <p className="text-xs sm:text-sm text-[#DCDDE1] max-w-xl mx-auto mb-6">
            Open Monday to Saturday from 10:00 to 18:00. Call us directly on{' '}
            <strong className="text-[#E8D3B9]">{siteConfig.phoneDisplay}</strong> or book a private appointment online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
            >
              Book Showroom Viewing
            </Link>
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Browse All Furniture
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
