import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Truck, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  {
    icon: Truck,
    text: 'Free Two-Man White Glove Delivery on orders over £499',
    ctaText: 'Shop Bestsellers',
    link: '/shop',
  },
  {
    icon: Sparkles,
    text: 'Showroom Clearance Now Live — Up to 40% Off Select Showpieces',
    ctaText: 'View Outlet',
    link: '/clearance',
  },
  {
    icon: Clock,
    text: 'Secure any piece today with only a £20 deposit · Pay rest on delivery',
    ctaText: 'Book Showroom Visit',
    link: '/book',
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className="relative bg-[#1C1B1F] text-[#FBF9F6] text-xs font-medium py-2 px-4 border-b border-[#323038] z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 shrink-0 hidden sm:block" />

        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <Icon className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0" />
          <span className="truncate tracking-wide">{current.text}</span>
          <Link
            to={current.link}
            className="inline-flex items-center text-[#E8D3B9] hover:text-white transition-colors ml-1 font-semibold underline underline-offset-2 shrink-0 text-[11px]"
          >
            {current.ctaText}
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss banner"
          className="text-[#A19DA8] hover:text-white transition-colors p-1 shrink-0 -mr-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
