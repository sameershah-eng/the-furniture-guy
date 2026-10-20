import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Truck,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Heart,
  MessageCircle,
  PhoneCall,
  Check,
  Sparkles,
  Maximize2,
  X,
  Share2,
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { SmartImage } from '@/components/ui/SmartImage';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice, calculateDiscount } from '@/lib/formatPrice';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { siteConfig } from '@/config/site';

interface ProductDetailPageProps {
  onRequestCallback: (productName: string) => void;
  onStickyBarChange?: (visible: boolean) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onRequestCallback,
  onStickyBarChange,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColour, setSelectedColour] = useState(product?.colours[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'dims' | 'delivery' | 'care'>('desc');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const buyButtonRef = useRef<HTMLButtonElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  useDocumentTitle(product ? product.name : 'Product Detail');

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColour(product.colours[0]);
      setQuantity(1);
    }
  }, [slug, product]);

  // Observer to toggle mobile sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      if (!buyButtonRef.current) return;
      const rect = buyButtonRef.current.getBoundingClientRect();
      const isPast = rect.bottom < 0;
      setShowStickyBar(isPast);
      onStickyBarChange?.(isPast);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      onStickyBarChange?.(false);
    };
  }, [onStickyBarChange]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FBF9F6]">
        <h2 className="font-serif text-3xl font-medium text-[#1C1B1F] mb-2">Showpiece Not Found</h2>
        <p className="text-sm text-[#6B6670] mb-6">
          This piece may be out of stock or reserved. Browse our showroom catalogue below.
        </p>
        <Link to="/shop" className="px-6 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg">
          Return to Showroom
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentPrice = product.salePrice ?? product.price;
  const discountPercent = product.salePrice ? calculateDiscount(product.price, product.salePrice) : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColour);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const whatsappInquiryUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${formatPrice(currentPrice)}). Is this available for delivery?`
  )}`;

  // Related products
  const relatedProducts = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#6B6670] mb-6 flex-wrap">
          <Link to="/" className="hover:text-[#1C1B1F]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#A19DA8]" />
          <Link to="/shop" className="hover:text-[#1C1B1F]">Shop</Link>
          <ChevronRight className="w-3 h-3 text-[#A19DA8]" />
          <Link to={`/collections/${product.collection}`} className="hover:text-[#1C1B1F] capitalize">
            {product.collection.replace('-', ' ')}
          </Link>
          <ChevronRight className="w-3 h-3 text-[#A19DA8]" />
          <span className="text-[#1C1B1F] font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Purchase Module: Two column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Gallery Column (Left) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#EEE8E1] shadow-xs group">
              <SmartImage
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                priority={true}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Expand Lightbox Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                aria-label="Expand image fullscreen"
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-xs text-[#1C1B1F] hover:bg-white rounded-full shadow-md transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Discount / Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#C2566B] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs">
                  Save {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden bg-white border-2 shrink-0 transition-all ${
                      activeImageIndex === i
                        ? 'border-[#9F7453] shadow-md scale-102'
                        : 'border-[#EEE8E1] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <SmartImage
                      src={img}
                      alt={`${product.name} thumb ${i + 1}`}
                      aspectRatio="square"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Purchasing Details Column (Right) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9F7453]">
                  {product.finish} Range
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1B1F] leading-snug">
                {product.name}
              </h1>

              {/* Review line */}
              <div className="flex items-center gap-2 mt-2 text-xs text-[#6B6670]">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[#1C1B1F]">{product.rating}</span>
                <span>({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#FBF9F6] border border-[#EEE8E1] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6670] block">
                  Price (VAT Included)
                </span>
                <div className="flex items-baseline gap-3 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1C1B1F] font-mono">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm line-through text-[#8E8A94] font-mono">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F7453] block">
                  Deposit Option
                </span>
                <span className="text-xs font-semibold text-[#1C1B1F]">
                  Order today with £20 deposit
                </span>
              </div>
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
              {product.description}
            </p>

            {/* Colour / Swatch selector */}
            {product.colours.length > 0 && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-2">
                  Finish / Colour: <span className="text-[#9F7453]">{selectedColour}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colours.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColour(col)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selectedColour === col
                          ? 'border-[#9F7453] bg-[#E8D3B9]/20 text-[#1C1B1F]'
                          : 'border-[#EEE8E1] bg-white text-[#6B6670] hover:border-[#9F7453]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary Buy CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EEE8E1] rounded-xl bg-[#FBF9F6] px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#1C1B1F] hover:text-[#9F7453]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#1C1B1F] hover:text-[#9F7453]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Basket button */}
                <button
                  ref={buyButtonRef}
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-800" />
                      <span>Added to Your Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Basket · {formatPrice(currentPrice * quantity)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Heart */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Save to Wishlist"
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'border-[#C2566B] bg-[#C2566B]/10 text-[#C2566B]'
                      : 'border-[#EEE8E1] hover:border-[#9F7453] text-[#1C1B1F]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Specialist Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Ask on WhatsApp</span>
                </a>

                <button
                  onClick={() => onRequestCallback(product.name)}
                  className="py-2.5 px-3 rounded-lg bg-[#F5F5F7] text-[#1C1B1F] border border-[#EEE8E1] hover:bg-[#EEE8E1] transition-colors text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#9F7453]" />
                  <span>Request Call Back</span>
                </button>
              </div>
            </div>

            {/* Delivery & Trust Highlights */}
            <div className="border-t border-[#EEE8E1] pt-4 space-y-2.5 text-xs text-[#6B6670]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#9F7453] shrink-0" />
                <span>
                  {currentPrice >= siteConfig.freeDeliveryThreshold
                    ? 'Qualifies for Free Two-Man White Glove Delivery'
                    : `Add ${formatPrice(siteConfig.freeDeliveryThreshold - currentPrice)} more for Free Local Delivery`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9F7453] shrink-0" />
                <span>Reinforced shock packaging &amp; room-of-choice inspection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Structured Tabs (Description, Dimensions, Delivery, Care) */}
        <div className="bg-white rounded-2xl border border-[#EEE8E1] p-6 sm:p-10 mb-16 shadow-xs">
          <div className="flex items-center gap-8 border-b border-[#EEE8E1] pb-4 mb-6 overflow-x-auto no-scrollbar">
            {[
              { id: 'desc', label: 'Detailed Description' },
              { id: 'dims', label: 'Dimensions & Specs' },
              { id: 'delivery', label: 'White Glove Delivery' },
              { id: 'care', label: 'Crystal Care Guide' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-sm font-semibold whitespace-nowrap pb-1 relative transition-colors ${
                  activeTab === tab.id ? 'text-[#9F7453]' : 'text-[#6B6670] hover:text-[#1C1B1F]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8D3B9] to-[#C9A27E]" />
                )}
              </button>
            ))}
          </div>

          <div className="text-sm text-[#1C1B1F] leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4 max-w-3xl">
                <p className="text-base font-serif text-[#1C1B1F] leading-relaxed">
                  {product.description}
                </p>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#9F7453] pt-2">
                  Key Craftsmanship Highlights:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B6670]">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A27E] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'dims' && (
              <div className="max-w-xl">
                <p className="text-xs text-[#6B6670] mb-4">
                  Please check all hallways and entry doorways before ordering heavy furniture.
                </p>
                <div className="border border-[#EEE8E1] rounded-xl overflow-hidden divide-y divide-[#EEE8E1]">
                  <div className="flex justify-between p-3 bg-[#FBF9F6] text-xs font-bold uppercase tracking-wider">
                    <span>Dimension Metric</span>
                    <span>Measurement</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="text-[#6B6670]">Width (Side to side)</span>
                    <span className="font-mono font-bold">{product.dimensions.w} cm</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="text-[#6B6670]">Depth (Front to back)</span>
                    <span className="font-mono font-bold">{product.dimensions.d} cm</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="text-[#6B6670]">Height (Base to top)</span>
                    <span className="font-mono font-bold">{product.dimensions.h} cm</span>
                  </div>
                  <div className="flex justify-between p-3 text-xs">
                    <span className="text-[#6B6670]">Core Material</span>
                    <span className="font-semibold">{product.finish}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-[#6B6670]">
                <p>
                  <strong>Local Two-Man Fleet:</strong> Delivered directly by our experienced showroom drivers across Greater Manchester, Cheshire, Merseyside, and West Yorkshire.
                </p>
                <p>
                  <strong>Room of Choice:</strong> Our delivery drivers bring your items directly into your lounge, dining room, or bedroom so you never need to lift heavy glass.
                </p>
                <p>
                  <strong>Unbox &amp; Inspect:</strong> You inspect all mirrors and crystal surfaces with our driver before signing, ensuring total peace of mind.
                </p>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-[#6B6670]">
                <p>
                  <strong>Cleaning Glass &amp; Mirrors:</strong> Spray ammonia-free glass cleaner onto a clean microfibre cloth (never spray directly onto joints). Wipe gently in circular motions.
                </p>
                <p>
                  <strong>Crushed Diamond Panels:</strong> Because the crystals are hermetically encased behind optical glass, dust cannot penetrate. Simply buff the outer surface glass.
                </p>
                <p>
                  <strong>Velvet Care:</strong> Vacuum gently using a soft upholstery attachment. For spills, blot immediately with a clean, dry cloth.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Complete the Look Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 pb-4 border-b border-[#EEE8E1]">
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9F7453]">
                Coordinated Styling
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1B1F]">
                Complete the Look
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-[#1C1B1F]/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="max-h-[85vh] w-auto max-w-full object-contain client-photo-treatment"
            />
          </div>
        </div>
      )}

      {/* Mobile Sticky Add-to-Basket Bar (when scrolled past buy button) */}
      {showStickyBar && (
        <div
          className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#EEE8E1] p-3 shadow-2xl z-40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-4 duration-300"
          style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
        >
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-[#1C1B1F] truncate">{product.name}</h4>
            <span className="text-sm font-mono font-bold text-[#9F7453]">
              {formatPrice(currentPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider shadow-md shrink-0 active:scale-95 transition-all"
          >
            Add to Basket
          </button>
        </div>
      )}
    </div>
  );
};
