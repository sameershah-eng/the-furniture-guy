import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { products, Product } from '@/data/products';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/formatPrice';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  'Crushed Diamond TV Unit',
  'Ariana Marble Dining Table',
  'Diamond Crush Fireplace',
  'Heart Console Table',
  'Venice Display Cabinet',
  'Lion Knocker Chairs',
  '120x80 Mirror',
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.colours.some((c) => c.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleProductSelect = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1B1F]/80 backdrop-blur-md flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#FBF9F6] rounded-xl shadow-2xl border border-[#EEE8E1] overflow-hidden my-auto sm:my-0">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-5 border-b border-[#EEE8E1] bg-white">
          <Search className="w-6 h-6 text-[#A19DA8] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mirrored furniture, fireplaces, marble tables, lighting..."
            className="w-full bg-transparent text-lg text-[#1C1B1F] placeholder:text-[#A19DA8] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#6B6670] hover:text-[#1C1B1F] mr-3 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B6670] hover:text-[#1C1B1F] hover:bg-[#F5F5F7] rounded-lg transition-colors ml-2"
            aria-label="Close search overlay"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {!query && (
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B6670] font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#F5F5F7] border border-[#EEE8E1] rounded-full text-xs font-medium text-[#1C1B1F] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="border-t border-[#EEE8E1] pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#6B6670] font-semibold mb-4">
                  Browse by Finish
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Crushed Diamond', slug: 'crushed-diamond' },
                    { name: 'Mirrored Glass', slug: 'mirrored-furniture' },
                    { name: 'Ariana Marble', slug: 'dining-sets' },
                    { name: 'Electric Fireplaces', slug: 'fireplaces' },
                    { name: 'Plush Velvet Seating', slug: 'chairs-seating' },
                    { name: 'Crystal Lighting', slug: 'lighting-decor' },
                  ].map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/collections/${cat.slug}`}
                      onClick={onClose}
                      className="p-3 bg-white border border-[#EEE8E1] rounded-lg hover:border-[#C9A27E] transition-all flex items-center justify-between text-sm font-medium text-[#1C1B1F] group"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A27E] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-12">
              <p className="font-serif text-2xl text-[#1C1B1F] mb-2">No matching showpieces found</p>
              <p className="text-sm text-[#6B6670] mb-6">
                We couldn't find anything matching "{query}". Try searching for "mirror", "TV unit", "fireplace", or "marble".
              </p>
              <Link
                to="/shop"
                onClick={onClose}
                className="inline-flex items-center px-5 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Browse All 28 Products
              </Link>
            </div>
          )}

          {query && results.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#6B6670] mb-4">
                Found {results.length} {results.length === 1 ? 'Showpiece' : 'Showpieces'}
              </p>
              <div className="divide-y divide-[#EEE8E1]">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product.slug)}
                    className="flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-white transition-colors cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]">
                      <SmartImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="square"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#C9A27E] font-medium tracking-wide uppercase">
                        {product.finish}
                      </p>
                      <h4 className="text-sm font-semibold text-[#1C1B1F] truncate group-hover:text-[#9F7453] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#6B6670] truncate">{product.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {product.salePrice ? (
                        <div>
                          <span className="text-sm font-bold text-[#C2566B]">
                            {formatPrice(product.salePrice)}
                          </span>
                          <span className="block text-xs line-through text-[#6B6670]">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-[#1C1B1F]">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
