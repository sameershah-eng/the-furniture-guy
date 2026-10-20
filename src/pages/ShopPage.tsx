import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { collections } from '@/data/collections';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { formatPrice } from '@/lib/formatPrice';

export const ShopPage: React.FC = () => {
  useDocumentTitle('All Luxury Furniture & Décor');
  const [searchParams, setSearchParams] = useSearchParams();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters state
  const selectedCollection = searchParams.get('collection') || 'all';
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(1500);
  const [onlyOnSale, setOnlyOnSale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');

  const finishes = ['Mirrored', 'Crushed Diamond', 'Velvet', 'Marble', 'Chrome', 'Glass'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Collection filter
        if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
          return false;
        }
        // Finish filter
        if (selectedFinish !== 'all' && p.finish !== selectedFinish) {
          return false;
        }
        // Price filter
        const activePrice = p.salePrice ?? p.price;
        if (activePrice > priceMax) {
          return false;
        }
        // On Sale filter
        if (onlyOnSale && !p.salePrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [selectedCollection, selectedFinish, priceMax, onlyOnSale, sortBy]);

  const resetFilters = () => {
    setSearchParams({});
    setSelectedFinish('all');
    setPriceMax(1500);
    setOnlyOnSale(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCollection !== 'all' ||
    selectedFinish !== 'all' ||
    priceMax < 1500 ||
    onlyOnSale;

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Eyebrow */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#9F7453] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
            Full Showroom Catalogue
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F]">
            All Glam Furniture &amp; Home Décor
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6670] mt-1">
            Discover all 28 handcrafted mirrored cabinets, crushed diamond fireplaces, and Ariana marble dining sets.
          </p>
        </div>

        {/* Top Control Bar */}
        <div className="bg-white rounded-xl p-4 border border-[#EEE8E1] mb-8 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-[#FBF9F6] border border-[#EEE8E1] rounded-lg text-xs font-semibold text-[#1C1B1F]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#9F7453]" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            <span className="text-xs font-medium text-[#6B6670]">
              Showing <strong className="text-[#1C1B1F] font-mono">{filteredProducts.length}</strong> of{' '}
              <span className="font-mono">{products.length}</span> Showpieces
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#6B6670] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FBF9F6] border border-[#EEE8E1] rounded-lg px-3 py-2 text-xs font-medium text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
              >
                <option value="featured">Featured Showroom</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (4.9+)</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid / List Switcher */}
            <div className="hidden sm:flex items-center bg-[#FBF9F6] border border-[#EEE8E1] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#9F7453] shadow-xs'
                    : 'text-[#6B6670] hover:text-[#1C1B1F]'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list'
                    ? 'bg-white text-[#9F7453] shadow-xs'
                    : 'text-[#6B6670] hover:text-[#1C1B1F]'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl p-6 border border-[#EEE8E1] space-y-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#EEE8E1]">
              <span className="font-serif text-xl font-medium text-[#1C1B1F]">Filters</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#9F7453] hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Collection Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-3">
                Collection
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSearchParams({})}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCollection === 'all'
                      ? 'bg-[#E8D3B9]/30 text-[#9F7453] font-bold'
                      : 'text-[#6B6670] hover:bg-[#FBF9F6] hover:text-[#1C1B1F]'
                  }`}
                >
                  All Collections
                </button>
                {collections.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setSearchParams({ collection: c.slug })}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCollection === c.slug
                        ? 'bg-[#E8D3B9]/30 text-[#9F7453] font-bold'
                        : 'text-[#6B6670] hover:bg-[#FBF9F6] hover:text-[#1C1B1F]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Filter */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-3">
                Finish &amp; Material
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedFinish('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedFinish === 'all'
                      ? 'bg-[#E8D3B9]/30 text-[#9F7453] font-bold'
                      : 'text-[#6B6670] hover:bg-[#FBF9F6] hover:text-[#1C1B1F]'
                  }`}
                >
                  All Finishes
                </button>
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFinish(f)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedFinish === f
                        ? 'bg-[#E8D3B9]/30 text-[#9F7453] font-bold'
                        : 'text-[#6B6670] hover:bg-[#FBF9F6] hover:text-[#1C1B1F]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B1F]">
                  Max Price
                </h4>
                <span className="text-xs font-mono font-bold text-[#9F7453]">
                  {formatPrice(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C9A27E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A19DA8] font-mono mt-1">
                <span>£50</span>
                <span>£1,500</span>
              </div>
            </div>

            {/* On Sale Switch */}
            <div className="pt-4 border-t border-[#EEE8E1]">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOnSale}
                  onChange={(e) => setOnlyOnSale(e.target.checked)}
                  className="rounded border-[#EEE8E1] text-[#C2566B] focus:ring-0 w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#1C1B1F]">
                  Clearance &amp; Sale Items Only
                </span>
              </label>
            </div>
          </aside>

          {/* Product Listing Main Area */}
          <main className="lg:col-span-9">
            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EEE8E1]">
                <h3 className="font-serif text-2xl text-[#1C1B1F]">Refine Results</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#6B6670]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Collections */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-2">
                  Collection
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left py-1 text-xs ${
                      selectedCollection === 'all' ? 'text-[#9F7453] font-bold' : 'text-[#6B6670]'
                    }`}
                  >
                    All Collections
                  </button>
                  {collections.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSearchParams({ collection: c.slug });
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left py-1 text-xs ${
                        selectedCollection === c.slug ? 'text-[#9F7453] font-bold' : 'text-[#6B6670]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finishes */}
              <div className="pt-4 border-t border-[#EEE8E1]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-2">
                  Finish
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedFinish('all');
                      setMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left py-1 text-xs ${
                      selectedFinish === 'all' ? 'text-[#9F7453] font-bold' : 'text-[#6B6670]'
                    }`}
                  >
                    All Finishes
                  </button>
                  {finishes.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedFinish(f);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left py-1 text-xs ${
                        selectedFinish === f ? 'text-[#9F7453] font-bold' : 'text-[#6B6670]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-[#EEE8E1]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-bold">Max Price</span>
                  <span className="font-mono text-[#9F7453] font-bold">{formatPrice(priceMax)}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#C9A27E]"
                />
              </div>

              {/* Sale */}
              <div className="pt-4 border-t border-[#EEE8E1]">
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={onlyOnSale}
                    onChange={(e) => setOnlyOnSale(e.target.checked)}
                  />
                  <span>Show sale items only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EEE8E1] flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 bg-[#F5F5F7] text-xs font-semibold rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
