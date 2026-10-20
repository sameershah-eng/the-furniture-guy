import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { collections } from '@/data/collections';
import { SmartImage } from '@/components/ui/SmartImage';

export const CollectionBento: React.FC = () => {
  const featuredCols = collections.slice(0, 5);

  return (
    <section className="py-16 sm:py-24 bg-[#FBF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#EEE8E1]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7453] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
              Signature Ranges
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F]">
              Shop by Curated Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9F7453] hover:text-[#1C1B1F] transition-colors group"
          >
            <span>Explore All 8 Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Hero Tile (Crushed Diamond) */}
          <Link
            to={`/collections/${featuredCols[0].slug}`}
            className="md:col-span-8 group relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[460px] bg-[#1C1B1F] shadow-md border border-[#EEE8E1]"
          >
            <SmartImage
              src={featuredCols[0].image}
              alt={featuredCols[0].imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />
            
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#E8D3B9] font-bold">
                Showcase Collection
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white mt-1 mb-2">
                {featuredCols[0].name}
              </h3>
              <p className="text-xs sm:text-sm text-[#DCDDE1] max-w-md line-clamp-2 mb-4 font-normal">
                {featuredCols[0].description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#E8D3B9] group-hover:text-white transition-colors">
                <span>View Range</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Right Top Tile (Ariana Marble Dining) */}
          <Link
            to={`/collections/${featuredCols[2].slug}`}
            className="md:col-span-4 group relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[460px] bg-[#1C1B1F] shadow-md border border-[#EEE8E1]"
          >
            <SmartImage
              src={featuredCols[2].image}
              alt={featuredCols[2].imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] font-bold">
                Heavy Veined Marble
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1 mb-1">
                {featuredCols[2].name}
              </h3>
              <p className="text-xs text-[#DCDDE1] line-clamp-2 mb-3">
                {featuredCols[2].tagline}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D3B9]">
                <span>Discover Suites</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Bottom Left (Mirrored Furniture) */}
          <Link
            to={`/collections/${featuredCols[1].slug}`}
            className="md:col-span-4 group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#1C1B1F] shadow-md border border-[#EEE8E1]"
          >
            <SmartImage
              src={featuredCols[1].image}
              alt={featuredCols[1].imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] font-bold">
                Venetian Glass
              </span>
              <h3 className="font-serif text-2xl font-medium text-white mt-1 mb-1">
                {featuredCols[1].name}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D3B9]">
                <span>View Mirrored Pieces</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Bottom Middle (Living Room & TV Units) */}
          <Link
            to={`/collections/${featuredCols[3].slug}`}
            className="md:col-span-4 group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#1C1B1F] shadow-md border border-[#EEE8E1]"
          >
            <SmartImage
              src={featuredCols[3].image}
              alt={featuredCols[3].imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] font-bold">
                Lounge Focal Points
              </span>
              <h3 className="font-serif text-2xl font-medium text-white mt-1 mb-1">
                {featuredCols[3].name}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D3B9]">
                <span>View TV Units &amp; Tables</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>

          {/* Bottom Right (Electric Fireplaces) */}
          <Link
            to={`/collections/${featuredCols[4].slug}`}
            className="md:col-span-4 group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#1C1B1F] shadow-md border border-[#EEE8E1]"
          >
            <SmartImage
              src={featuredCols[4].image}
              alt={featuredCols[4].imageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D3B9] font-bold">
                Warmth &amp; Sparkle
              </span>
              <h3 className="font-serif text-2xl font-medium text-white mt-1 mb-1">
                {featuredCols[4].name}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E8D3B9]">
                <span>View Suites</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
