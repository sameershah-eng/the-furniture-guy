import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const t = testimonials[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[#FBF9F6] border-b border-[#EEE8E1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
          Real Customer Homes
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F] mb-12">
          Loved in over 3,000 living rooms across the UK
        </h2>

        {/* Featured Testimonial Card */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-[#EEE8E1] transition-all duration-300">
          <Quote className="w-12 h-12 text-[#E8D3B9] mx-auto mb-6 opacity-60" />

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 text-amber-500 mb-6">
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Quote Body */}
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1C1B1F] italic leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
            &ldquo;{t.review}&rdquo;
          </p>

          {/* Customer Meta */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-sm font-bold text-[#1C1B1F]">{t.name}</h4>
            <div className="flex items-center gap-2 text-xs text-[#6B6670] mt-0.5">
              <span>{t.location}, UK</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Order
              </span>
            </div>
            <p className="text-[11px] text-[#9F7453] mt-2 font-medium tracking-wide">
              Purchased: {t.productPurchased}
            </p>
          </div>

          {/* Prev / Next controls */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-[#EEE8E1]">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="p-2 rounded-full border border-[#EEE8E1] hover:border-[#9F7453] hover:bg-[#FBF9F6] text-[#1C1B1F] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#6B6670]">
              {currentIndex + 1} of {testimonials.length}
            </span>
            <button
              onClick={next}
              aria-label="Next review"
              className="p-2 rounded-full border border-[#EEE8E1] hover:border-[#9F7453] hover:bg-[#FBF9F6] text-[#1C1B1F] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
