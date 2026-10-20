import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/formatPrice';
import { siteConfig } from '@/config/site';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    promoCode,
    applyPromo,
    removePromo,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();
  const awayFromFreeDelivery = Math.max(0, siteConfig.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / siteConfig.freeDeliveryThreshold) * 100));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setPromoMessage(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#1C1B1F]/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F6] shadow-2xl flex flex-col border-l border-[#EEE8E1] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#EEE8E1] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9F7453]" />
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                Your Shopping Basket
              </h3>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#6B6670] hover:text-[#1C1B1F] rounded-lg hover:bg-[#F5F5F7] transition-colors"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Meter */}
          <div className="bg-[#FAF6F0] px-5 py-3 border-b border-[#EEE8E1]">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-[#1C1B1F]">
                <Truck className="w-3.5 h-3.5 text-[#9F7453]" />
                {awayFromFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-semibold">You've unlocked Free Local Delivery!</span>
                ) : (
                  <span>
                    Add <strong className="text-[#9F7453]">{formatPrice(awayFromFreeDelivery)}</strong> more for{' '}
                    <strong>Free Delivery</strong>
                  </span>
                )}
              </span>
              <span className="text-[#6B6670] font-mono">{freeDeliveryPercent}%</span>
            </div>
            <div className="w-full bg-[#E5DFD7] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E8D3B9] to-[#9F7453] h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#EEE8E1]/60 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#A19DA8]" />
                </div>
                <h4 className="font-serif text-2xl text-[#1C1B1F] mb-2">Your basket is empty</h4>
                <p className="text-xs text-[#6B6670] mb-6 max-w-xs mx-auto">
                  Browse our handpicked mirrored showpieces and crushed diamond suites to bring luxury sparkle to your home.
                </p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  <span>Explore All Furniture</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8D3B9]" />
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const currentPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedColour}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-[#EEE8E1] relative group"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]">
                      <SmartImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        aspectRatio="square"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 pr-6">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9F7453]">
                        {item.product.collection.replace('-', ' ')}
                      </p>
                      <h4 className="text-sm font-semibold text-[#1C1B1F] truncate">
                        {item.product.name}
                      </h4>
                      {item.selectedColour && (
                        <p className="text-xs text-[#6B6670]">Option: {item.selectedColour}</p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#EEE8E1] rounded-lg bg-[#FBF9F6]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#EEE8E1] text-[#1C1B1F] transition-colors rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold font-mono text-[#1C1B1F]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-[#EEE8E1] text-[#1C1B1F] transition-colors rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Line total */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#1C1B1F]">
                            {formatPrice(currentPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="absolute top-3 right-3 text-[#A19DA8] hover:text-[#C2566B] transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with totals & checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EEE8E1] bg-white space-y-3">
              {/* Promo input */}
              {!promoCode ? (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. BLING10)"
                      className="flex-1 px-3 py-1.5 text-xs uppercase bg-[#FBF9F6] border border-[#EEE8E1] rounded-lg focus:outline-none focus:border-[#C9A27E]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] ${
                        promoMessage.isError ? 'text-[#C2566B]' : 'text-emerald-700'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <span className="flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Code {promoCode} Active
                  </span>
                  <button
                    onClick={removePromo}
                    className="text-xs text-red-600 hover:underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#6B6670] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#1C1B1F] font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#C2566B]">
                    <span>Discount</span>
                    <span className="font-mono font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-mono text-[#1C1B1F]">
                    {awayFromFreeDelivery === 0 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C1B1F] pt-2 border-t border-[#EEE8E1]">
                  <span>Total</span>
                  <span className="font-mono text-[#9F7453]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-semibold text-xs tracking-wider uppercase rounded-xl hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#1C1B1F]" />
                <span>Proceed to Secure Checkout</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#6B6670] pt-1">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="hover:text-[#1C1B1F] underline underline-offset-2"
                >
                  View full basket page
                </Link>
                <span>Deposit option £20 available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
