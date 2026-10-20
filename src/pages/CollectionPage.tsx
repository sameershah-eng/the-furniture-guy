import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SmartImage } from '@/components/ui/SmartImage';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { ChevronRight, Sparkles, ArrowLeft } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const collection = collections.find((c) => c.slug === slug);
  const collectionProducts = products.filter((p) => p.collection === slug);

  useDocumentTitle(collection ? `${collection.name} Collection` : 'Collection');

  if (!collection) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FBF9F6]">
        <h2 className="font-serif text-3xl font-medium text-[#1C1B1F] mb-2">
          Collection Not Found
        </h2>
        <p className="text-sm text-[#6B6670] mb-6">
          The collection you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg"
        >
          Browse All Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F6] min-h-screen pb-16">
      {/* Collection Hero Banner */}
      <div className="relative bg-[#1C1B1F] text-white overflow-hidden py-16 sm:py-24">
        {/* Background Image with Dark Contrast Scrim */}
        <div className="absolute inset-0">
          <SmartImage
            src={collection.image}
            alt={collection.imageAlt}
            priority={true}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1F] via-[#1C1B1F]/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#E8D3B9] mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#787482]" />
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3 text-[#787482]" />
            <span className="text-white font-medium">{collection.name}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E8D3B9] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3 h-3 text-[#E8D3B9]" />
            {collection.tagline}
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium text-white mb-3 tracking-tight">
            {collection.name}
          </h1>

          <p className="text-sm sm:text-base text-[#DCDDE1] max-w-2xl leading-relaxed font-light">
            {collection.description}
          </p>

          <div className="mt-6 text-xs text-[#A19DA8]">
            Showing <strong className="text-white font-mono">{collectionProducts.length}</strong> items in this range
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <ProductGrid products={collectionProducts} />

        <div className="mt-16 pt-8 border-t border-[#EEE8E1] flex items-center justify-between">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9F7453] hover:text-[#1C1B1F]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
