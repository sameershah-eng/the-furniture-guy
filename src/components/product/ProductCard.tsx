import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice, calculateDiscount } from '@/lib/formatPrice';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductCardProps {
  product: Product;
  className?: string;
  priorityImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  priorityImage = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.salePrice
    ? calculateDiscount(product.price, product.salePrice)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col bg-white rounded-xl border border-[#EEE8E1] hover:border-[#D9A89A] hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Image container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] sm:aspect-square bg-[#F5F5F7] overflow-hidden"
      >
        {/* Primary Image */}
        <SmartImage
          src={product.images[0]}
          alt={product.name}
          priority={priorityImage}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />

        {/* Secondary image cross-fade on hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 client-photo-treatment ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges top left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 bg-[#C2566B] text-white text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-xs">
              Save {discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-[#1C1B1F] text-[#E8D3B9] text-[10px] font-bold tracking-wider uppercase rounded-sm shadow-xs">
              New Arrival
            </span>
          )}
          {product.stock <= 3 && (
            <span className="px-2 py-0.5 bg-[#8C5E3D] text-white text-[10px] font-semibold tracking-wider uppercase rounded-sm shadow-xs">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Wishlist Button top right */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-[#C2566B] text-white shadow-md scale-105'
              : 'bg-white/80 backdrop-blur-xs text-[#1C1B1F] hover:bg-white hover:text-[#C2566B] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Bar: Desktop slide up, mobile static or touch tap */}
        <div className="absolute bottom-2 inset-x-2 z-10 transition-all duration-300 transform sm:translate-y-12 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-all ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] hover:brightness-105 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Basket</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Constitution compliant) */}
          <div className="flex items-center gap-2 text-[11px] text-[#6B6670] mb-1 font-medium tracking-wide">
            <span className="uppercase text-[#9F7453]">{product.finish}</span>
            <span aria-hidden="true">·</span>
            <span>{product.collection.replace('-', ' ')}</span>
          </div>

          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#9F7453] transition-colors">
            <h3 className="text-sm font-semibold text-[#1C1B1F] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-[#6B6670]">
            <div className="flex items-center text-amber-500">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="font-semibold text-[#1C1B1F] text-[11px]">{product.rating}</span>
            <span className="text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price Row */}
        <div className="pt-3 mt-3 border-t border-[#EEE8E1] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="text-base font-bold text-[#C2566B] font-mono">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs line-through text-[#8E8A94] font-mono">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-[#1C1B1F] font-mono">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-[#6B6670] uppercase tracking-wider font-medium">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
};
