import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export const BestsellersCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestsellers = products.filter((p) => p.isBestseller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-[#EEE8E1]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7453] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
              Client Favourites
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F]">
              Showroom Bestsellers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6670] mt-1">
              The pieces our Facebook followers and showroom visitors fall in love with first.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous bestsellers"
              className="p-2.5 rounded-full border border-[#EEE8E1] hover:border-[#9F7453] bg-white hover:bg-[#FBF9F6] text-[#1C1B1F] shadow-xs transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next bestsellers"
              className="p-2.5 rounded-full border border-[#EEE8E1] hover:border-[#9F7453] bg-white hover:bg-[#FBF9F6] text-[#1C1B1F] shadow-xs transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              className="w-[280px] sm:w-[320px] lg:w-[340px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9F7453]"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
