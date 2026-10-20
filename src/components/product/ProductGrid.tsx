import React from 'react';
import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/formatPrice';
import { SmartImage } from '@/components/ui/SmartImage';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode = 'grid',
}) => {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#EEE8E1] p-8">
        <h3 className="font-serif text-3xl font-medium text-[#1C1B1F] mb-2">
          No showpieces match this filter
        </h3>
        <p className="text-sm text-[#6B6670] mb-6 max-w-md mx-auto">
          Try clearing your filter criteria or adjusting price bounds to see all available items.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => {
          const isFavorited = isInWishlist(product.id);
          return (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row gap-5 p-4 sm:p-5 bg-white rounded-xl border border-[#EEE8E1] hover:border-[#9F7453] transition-all shadow-xs"
            >
              <Link
                to={`/product/${product.slug}`}
                className="w-full sm:w-48 sm:h-48 aspect-square rounded-lg overflow-hidden bg-[#F5F5F7] shrink-0"
              >
                <SmartImage
                  src={product.images[0]}
                  alt={product.name}
                  aspectRatio="square"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F7453]">
                      {product.finish} · {product.collection.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-1.5 rounded-full ${
                        isFavorited ? 'text-[#C2566B]' : 'text-[#6B6670] hover:text-[#C2566B]'
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F] hover:text-[#9F7453] transition-colors mt-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#6B6670] mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-xs text-[#6B6670]">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span className="font-semibold text-[#1C1B1F]">{product.rating}</span>
                    <span>({product.reviewCount} customer reviews)</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#EEE8E1] flex items-center justify-between">
                  <div>
                    {product.salePrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#C2566B] font-mono">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-xs line-through text-[#8E8A94] font-mono">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-[#1C1B1F] font-mono">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addItem(product, 1)}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Basket</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
