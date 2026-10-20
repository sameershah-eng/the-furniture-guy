import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('404 Page Not Found');

  return (
    <div className="bg-[#FBF9F6] min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#EEE8E1] shadow-xl text-center">
        <span className="font-serif text-6xl sm:text-7xl font-bold text-[#E8D3B9] block mb-2 font-mono">
          404
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1B1F] mb-3">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6670] mb-8 leading-relaxed">
          The showroom page or collection you are looking for has moved or does not exist. Browse our complete glamour collection below.
        </p>

        <div className="space-y-3">
          <Link
            to="/shop"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Browse All 28 Showpieces</span>
          </Link>

          <Link
            to="/"
            className="w-full py-3 px-6 rounded-xl bg-[#F5F5F7] hover:bg-[#EEE8E1] text-[#1C1B1F] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
