import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/formatPrice';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const WishlistPage: React.FC = () => {
  useDocumentTitle('Your Saved Wishlist');
  const { items: wishlistIds, toggleWishlist, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const favoritedProducts = products.filter((p) => wishlistIds.includes(p.id));

  if (favoritedProducts.length === 0) {
    return (
      <div className="bg-[#FBF9F6] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EEE8E1]/60 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-[#A19DA8]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1B1F] mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6670] max-w-sm mx-auto mb-8">
          Click the heart icon on any mirrored showpiece or crushed diamond suite to save your favourites here.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
        >
          Explore Showroom Pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EEE8E1]">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1B1F]">
              Saved Wishlist ({favoritedProducts.length} Items)
            </h1>
            <p className="text-xs text-[#6B6670] mt-1">
              Keep track of your favourite showpieces or add them directly to your basket.
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-[#A19DA8] hover:text-[#C2566B] font-semibold"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {favoritedProducts.map((product) => {
            const currentPrice = product.salePrice ?? product.price;
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-[#EEE8E1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
              >
                <div>
                  <Link
                    to={`/product/${product.slug}`}
                    className="block aspect-square bg-[#F5F5F7] overflow-hidden relative"
                  >
                    <SmartImage
                      src={product.images[0]}
                      alt={product.name}
                      aspectRatio="square"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F7453]">
                      {product.finish}
                    </span>
                    <Link to={`/product/${product.slug}`}>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#1C1B1F] truncate mt-0.5 hover:text-[#9F7453]">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-2 font-mono font-bold text-sm text-[#1C1B1F]">
                      {formatPrice(currentPrice)}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex gap-2">
                  <button
                    onClick={() => addItem(product, 1)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-[#E8D3B9] to-[#C9A27E] text-[#1C1B1F] text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-105 flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Basket</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 border border-[#EEE8E1] rounded-lg text-[#A19DA8] hover:text-[#C2566B] hover:bg-[#FBF9F6]"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
