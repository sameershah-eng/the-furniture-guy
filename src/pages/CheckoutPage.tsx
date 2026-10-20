import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/formatPrice';
import { siteConfig } from '@/config/site';
import { SmartImage } from '@/components/ui/SmartImage';
import { saveFormSubmission } from '@/lib/utils';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const CheckoutPage: React.FC = () => {
  useDocumentTitle('Secure Checkout');
  const navigate = useNavigate();

  const {
    items,
    getSubtotal,
    getDiscountAmount,
    promoCode,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();

  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express' | 'collection'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'deposit_delivery'>('deposit_delivery');

  // Demo Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery calculation
  const deliveryCost = React.useMemo(() => {
    if (deliveryOption === 'collection') return 0;
    if (deliveryOption === 'express') return siteConfig.expressDeliveryCost;
    return subtotal >= siteConfig.freeDeliveryThreshold ? 0 : 39.99;
  }, [deliveryOption, subtotal]);

  const grandTotal = Math.max(0, subtotal - discount + deliveryCost);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !phone || !postcode) return;

    setIsProcessing(true);
    const orderNumber = `TFG-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      // Save order to localStorage
      saveFormSubmission('customer_order', {
        orderNumber,
        customer: { firstName, lastName, email, phone },
        shippingAddress: { addressLine1, addressLine2, city, postcode },
        deliveryOption,
        paymentMethod,
        items,
        subtotal,
        discount,
        deliveryCost,
        grandTotal,
        depositPaid: paymentMethod === 'deposit_delivery' ? 20 : grandTotal,
        balanceRemaining: paymentMethod === 'deposit_delivery' ? grandTotal - 20 : 0,
      });

      // Clear the cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation?orderId=${orderNumber}&total=${grandTotal}&method=${paymentMethod}`);
    }, 1200);
  };

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-8 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Branding */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EEE8E1]">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl font-medium tracking-tight text-[#1C1B1F]">
              {siteConfig.businessName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#9F7453]">
              {siteConfig.subBrand} · Secure Checkout
            </span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold">256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Mobile Expandable Order Summary Button */}
        <div className="lg:hidden mb-6 bg-white rounded-xl border border-[#EEE8E1] p-4">
          <button
            onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold text-[#1C1B1F]"
          >
            <span className="flex items-center gap-2">
              <span>{mobileSummaryOpen ? 'Hide Order Summary' : 'Show Order Summary'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSummaryOpen ? 'rotate-180' : ''}`} />
            </span>
            <span className="font-mono text-base font-bold text-[#9F7453]">
              {formatPrice(grandTotal)}
            </span>
          </button>

          {mobileSummaryOpen && (
            <div className="pt-4 mt-4 border-t border-[#EEE8E1] space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]">
                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.product.name}</p>
                    <p className="text-[#6B6670]">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-mono font-bold">
                    {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Checkout Inputs (Left Column) */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                1. Customer &amp; Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Emma"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Taylor"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    Email Address (for order tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. emma.taylor@example.co.uk"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    UK Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07700 900234"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                2. UK Delivery Address
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. 42 Bling Manor Way"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="e.g. Apartment 4"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      Town / City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Manchester"
                      className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      UK Postcode *
                    </label>
                    <input
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="e.g. M1 4BT"
                      className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] uppercase font-mono focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                3. Choose Delivery Method
              </h3>

              <div className="space-y-3">
                <label
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryOption === 'standard'
                      ? 'border-[#9F7453] bg-[#E8D3B9]/15'
                      : 'border-[#EEE8E1] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="mt-1 text-[#9F7453] focus:ring-0"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#1C1B1F] block">
                        Two-Man White Glove Room-of-Choice Delivery
                      </span>
                      <span className="text-xs text-[#6B6670] mt-0.5 block">
                        Carried upstairs or into your lounge, unboxed, and packaging removed.
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs">
                    {subtotal >= siteConfig.freeDeliveryThreshold ? 'FREE' : '£39.99'}
                  </span>
                </label>

                <label
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryOption === 'express'
                      ? 'border-[#9F7453] bg-[#E8D3B9]/15'
                      : 'border-[#EEE8E1] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="mt-1 text-[#9F7453] focus:ring-0"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#1C1B1F] block">
                        Priority Express Delivery (2 to 4 Working Days)
                      </span>
                      <span className="text-xs text-[#6B6670] mt-0.5 block">
                        Expedited route dispatch with guaranteed morning delivery window.
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs">
                    {formatPrice(siteConfig.expressDeliveryCost)}
                  </span>
                </label>

                <label
                  className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryOption === 'collection'
                      ? 'border-[#9F7453] bg-[#E8D3B9]/15'
                      : 'border-[#EEE8E1] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === 'collection'}
                      onChange={() => setDeliveryOption('collection')}
                      className="mt-1 text-[#9F7453] focus:ring-0"
                    />
                    <div>
                      <span className="text-sm font-bold text-[#1C1B1F] block">
                        Free Click &amp; Collect (Manchester Showroom)
                      </span>
                      <span className="text-xs text-[#6B6670] mt-0.5 block">
                        Ready within 24 hours. Our team loads directly into your vehicle.
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-700">FREE</span>
                </label>
              </div>
            </div>

            {/* 4. Payment Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                4. Select Payment Option
              </h3>

              <div className="space-y-4">
                {/* Option A: Reserve with £20 Deposit & Settle on Delivery */}
                <label
                  className={`block p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'deposit_delivery'
                      ? 'border-[#9F7453] bg-[#FAF6F0] shadow-sm'
                      : 'border-[#EEE8E1] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'deposit_delivery'}
                      onChange={() => setPaymentMethod('deposit_delivery')}
                      className="mt-1 text-[#9F7453] focus:ring-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1C1B1F]">
                          Reserve With £20 Deposit · Settle Balance on Delivery
                        </span>
                        <span className="px-2 py-0.5 bg-[#E8D3B9] text-[#1C1B1F] text-[10px] font-bold uppercase rounded-sm">
                          Client Favourite
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6670] mt-1">
                        Pay only £20 deposit now to reserve your showpieces. Inspect the furniture when our two-man team arrives, and pay the remaining balance of{' '}
                        <strong className="text-[#1C1B1F] font-mono">{formatPrice(grandTotal - 20)}</strong> by card or cash upon delivery.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Option B: Full Card Payment */}
                <label
                  className={`block p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#9F7453] bg-[#FAF6F0] shadow-sm'
                      : 'border-[#EEE8E1] bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 text-[#9F7453] focus:ring-0"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#1C1B1F]">
                        Full Payment by Credit / Debit Card
                      </span>
                      <p className="text-xs text-[#6B6670] mt-0.5">
                        Pay total {formatPrice(grandTotal)} now via secure encrypted processing.
                      </p>
                    </div>
                  </div>

                  {/* Interactive Card Input Form when Card is selected */}
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pt-4 border-t border-[#EEE8E1] space-y-3">
                      {/* TODO: Plug in Stripe Elements integration here for live gateway */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="e.g. MRS E TAYLOR"
                          className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                          16-Digit Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          maxLength={19}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 •••• •••• 8892"
                          className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            maxLength={5}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="08/28"
                            className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                            Security CVC
                          </label>
                          <input
                            type="password"
                            value={cardCvc}
                            maxLength={4}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Place Order Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-[#1C1B1F]" />
                <span>
                  {isProcessing
                    ? 'Securing Your Order...'
                    : paymentMethod === 'deposit_delivery'
                    ? `Reserve with £20 Deposit (Pay Rest on Delivery)`
                    : `Pay ${formatPrice(grandTotal)} Now`}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Order Summary Sidebar (Right Column) */}
          <aside className="hidden lg:block lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-6 sticky top-24">
            <h3 className="font-serif text-2xl font-medium text-[#1C1B1F] pb-4 border-b border-[#EEE8E1]">
              Your Order ({items.length} {items.length === 1 ? 'Item' : 'Items'})
            </h3>

            {/* Products List */}
            <div className="divide-y divide-[#EEE8E1] max-h-72 overflow-y-auto pr-1">
              {items.map((item) => {
                const price = item.product.salePrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedColour}`} className="py-3 flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]">
                      <SmartImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        aspectRatio="square"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#1C1B1F] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#6B6670]">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#1C1B1F]">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Price Lines */}
            <div className="space-y-2 text-xs text-[#6B6670] pt-4 border-t border-[#EEE8E1]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1C1B1F] font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#C2566B]">
                  <span>Voucher Code ({promoCode})</span>
                  <span className="font-mono font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Option</span>
                <span className="font-mono text-[#1C1B1F]">
                  {deliveryCost === 0 ? 'FREE' : formatPrice(deliveryCost)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#1C1B1F] pt-3 border-t border-[#EEE8E1]">
                <span>Order Total</span>
                <span className="font-mono text-[#9F7453]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {paymentMethod === 'deposit_delivery' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <span className="font-bold block">£20 Deposit Plan Breakdown:</span>
                <div className="flex justify-between text-[11px]">
                  <span>Deposit Payable Now:</span>
                  <span className="font-mono font-bold">£20.00</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span>Due upon Delivery Inspection:</span>
                  <span className="font-mono font-bold">{formatPrice(grandTotal - 20)}</span>
                </div>
              </div>
            )}
          </aside>
        </form>
      </div>
    </div>
  );
};
