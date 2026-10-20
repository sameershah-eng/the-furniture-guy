import React, { useState } from 'react';
import { Camera, X, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { siteConfig } from '@/config/site';

const galleryPhotos = [
  {
    src: '/images/client/styled-crushed-diamond-living-room.jpg',
    title: 'Crushed Diamond Lounge Suite',
    location: 'Styled in a client living room, Cheshire',
  },
  {
    src: '/images/client/styled-home-marble-dining-room.jpg',
    title: 'Ariana Marble Dining Table & Knocker Chairs',
    location: 'Customer home setup, Manchester',
  },
  {
    src: '/images/client/hero-showroom-dining-set.jpg',
    title: 'Round Crushed Diamond Glass Dining Suite',
    location: 'King of Bling Showroom Floor',
  },
  {
    src: '/images/client/crushed-diamond-fireplace-electric-flame.jpg',
    title: 'Diamond Crush Electric Fireplace Feature',
    location: 'Evening mood lighting, Liverpool',
  },
  {
    src: '/images/client/heart-console-table-led-crushed-diamond.jpg',
    title: 'Illuminated Heart Console Hallway',
    location: 'Client hallway entryway, Bolton',
  },
  {
    src: '/images/client/venice-mirrored-display-cabinet-led.jpg',
    title: 'Venice Display Cabinet with LED Showcases',
    location: 'Dining room display, Stockport',
  },
  {
    src: '/images/client/ariana-marble-dining-table-bench-set.jpg',
    title: 'Ariana Marble Table & Plush Velvet Bench',
    location: 'Open-plan kitchen diner, Leeds',
  },
  {
    src: '/images/client/crushed-diamond-mirrored-coffee-table-living-room.jpg',
    title: 'Crushed Diamond Coffee Table with Fresh Roses',
    location: 'Lounge centerpiece, Birmingham',
  },
];

export const RealHomesGallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<{ src: string; title: string; location: string } | null>(null);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-[#EEE8E1]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7453] mb-2">
              <Camera className="w-4 h-4 text-[#C9A27E]" />
              Real UK Showcases
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F]">
              Styled in Real Homes
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6670] mt-1 max-w-xl">
              Every photograph is from our showroom or real customers who tagged @thefurnitureguy.co.uk on Facebook.
            </p>
          </div>

          <a
            href={siteConfig.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1B1F] text-white text-xs font-semibold hover:bg-black transition-colors shrink-0 group"
          >
            <span>Follow on Facebook</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E8D3B9] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryPhotos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-xl overflow-hidden aspect-square bg-[#F5F5F7] cursor-pointer border border-[#EEE8E1] hover:border-[#9F7453] transition-all shadow-xs hover:shadow-lg"
            >
              <SmartImage
                src={photo.src}
                alt={photo.title}
                aspectRatio="square"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#E8D3B9] font-bold">
                  Click to Expand
                </span>
                <p className="font-serif text-sm sm:text-base font-semibold leading-tight mt-0.5 truncate">
                  {photo.title}
                </p>
                <p className="text-[11px] text-[#DCDDE1] truncate">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-[#1C1B1F]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1C1B1F] rounded-2xl overflow-hidden border border-[#3A3842] shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain client-photo-treatment"
              />
            </div>

            <div className="p-5 bg-[#26242B] border-t border-[#3A3842] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-xl font-medium text-white">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-[#E8D3B9]">{activePhoto.location}</p>
              </div>

              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E8D3B9] hover:text-white transition-colors"
              >
                <span>View on Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
