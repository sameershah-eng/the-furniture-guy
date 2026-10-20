import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/formatPrice';
import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const CartPage: React.FC = () => {
  useDocumentTitle('Your Shopping Basket');
  const navigate = useNavigate();

  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    promoCode,
    applyPromo,
    removePromo,
    clearCart,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const total = getTotal();
  const awayFromFreeDelivery = Math.max(0, siteConfig.freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / siteConfig.freeDeliveryThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FBF9F6] min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#EEE8E1]/60 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#A19DA8]" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1B1F] mb-3">
          Your Shopping Basket is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6670] max-w-sm mx-auto mb-8">
          You haven't added any luxury mirrored or crushed diamond showpieces yet.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all"
        >
          Explore Showroom Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EEE8E1]">
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1B1F]">
            Shopping Basket ({items.length} {items.length === 1 ? 'Piece' : 'Pieces'})
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-[#A19DA8] hover:text-[#C2566B] font-semibold"
          >
            Clear Basket
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-white p-5 rounded-2xl border border-[#EEE8E1] mb-8 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="flex items-center gap-2 text-[#1C1B1F]">
              <Truck className="w-4 h-4 text-[#9F7453]" />
              {awayFromFreeDelivery === 0 ? (
                <strong className="text-emerald-700">
                  Congratulations! You've unlocked Free Two-Man White Glove Delivery
                </strong>
              ) : (
                <span>
                  You are <strong className="text-[#9F7453]">{formatPrice(awayFromFreeDelivery)}</strong> away from{' '}
                  <strong>Free UK Local Delivery</strong>
                </span>
              )}
            </span>
            <span className="font-mono text-[#6B6670]">{freeDeliveryPercent}%</span>
          </div>
          <div className="w-full bg-[#EEE8E1] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#E8D3B9] to-[#9F7453] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeDeliveryPercent}%` }}
            />
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Basket Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const currentPrice = item.product.salePrice ?? item.product.price;
              return (
                <div
                  key={`${item.product.id}-${item.selectedColour}`}
                  className="bg-white p-4 sm:p-6 rounded-2xl border border-[#EEE8E1] flex flex-col sm:flex-row gap-5 shadow-xs relative"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]"
                  >
                    <SmartImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      aspectRatio="square"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between pr-8">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9F7453]">
                            {item.product.finish} Range
                          </span>
                          <Link to={`/product/${item.product.slug}`}>
                            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1C1B1F] hover:text-[#9F7453] transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          {item.selectedColour && (
                            <p className="text-xs text-[#6B6670] mt-0.5">
                              Finish: <span className="font-semibold text-[#1C1B1F]">{item.selectedColour}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EEE8E1]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#EEE8E1] rounded-lg bg-[#FBF9F6]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-sm font-bold text-[#1C1B1F] hover:bg-[#EEE8E1] rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-3 font-mono text-xs font-bold text-[#1C1B1F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-sm font-bold text-[#1C1B1F] hover:bg-[#EEE8E1] rounded-r-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <span className="text-lg font-bold text-[#1C1B1F] font-mono">
                          {formatPrice(currentPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-[#6B6670] block font-mono">
                            ({formatPrice(currentPrice)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="absolute top-4 right-4 p-1.5 text-[#A19DA8] hover:text-[#C2566B] rounded-lg hover:bg-[#FBF9F6] transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/shop"
                className="text-xs font-semibold text-[#9F7453] hover:underline"
              >
                &larr; Continue browsing more furniture
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-6 sticky top-24">
            <h3 className="font-serif text-2xl font-medium text-[#1C1B1F] pb-4 border-b border-[#EEE8E1]">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            {!promoCode ? (
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F]">
                  Promotional Voucher
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. BLING10"
                    className="flex-1 px-3.5 py-2 text-xs uppercase bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl focus:outline-none focus:border-[#C9A27E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C1B1F] text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
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
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4" /> Code {promoCode} Applied
                </span>
                <button onClick={removePromo} className="text-red-600 hover:underline">
                  Remove
                </button>
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-[#6B6670]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1C1B1F] font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#C2566B]">
                  <span>Voucher Discount</span>
                  <span className="font-mono font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Two-Man White Glove Delivery</span>
                <span className="font-mono text-[#1C1B1F]">
                  {awayFromFreeDelivery === 0 ? 'FREE' : '£39.99 (or free over £499)'}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#1C1B1F] pt-3 border-t border-[#EEE8E1]">
                <span>Estimated Total</span>
                <span className="font-mono text-[#9F7453] text-xl">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Deposit notice */}
            <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#E8D3B9] text-xs text-[#1C1B1F]">
              <span className="font-bold flex items-center gap-1 text-[#9F7453]">
                <Sparkles className="w-3.5 h-3.5" /> Reserve with £20 Deposit
              </span>
              <p className="text-[11px] text-[#6B6670] mt-0.5">
                At checkout, you can select &ldquo;Pay Deposit Now &amp; Settle Balance on Delivery&rdquo;.
              </p>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
