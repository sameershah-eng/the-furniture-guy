import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, Phone, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '@/lib/formatPrice';
import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const OrderConfirmationPage: React.FC = () => {
  useDocumentTitle('Order Confirmed');
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId') || 'TFG-ORD-849201';
  const totalParam = searchParams.get('total');
  const total = totalParam ? parseFloat(totalParam) : 499;
  const method = searchParams.get('method') || 'deposit_delivery';

  useEffect(() => {
    // Fire celebratory confetti on page mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8D3B9', '#D9A89A', '#C9A27E', '#DCDDE1'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 shadow-xl border border-[#EEE8E1] text-center">
          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
            King of Bling Order Confirmation
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1C1B1F] mb-4">
            Thank You For Your Order!
          </h1>

          <p className="text-sm sm:text-base text-[#6B6670] max-w-lg mx-auto mb-8 font-light">
            We have safely received your order. Our Manchester logistics team is preparing your pieces and will contact you directly to schedule your delivery window.
          </p>

          {/* Order reference banner */}
          <div className="p-6 rounded-2xl bg-[#FBF9F6] border border-[#EEE8E1] max-w-md mx-auto mb-8 text-left space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-[#EEE8E1]">
              <span className="text-xs text-[#6B6670]">Order Reference</span>
              <span className="font-mono text-base font-bold text-[#1C1B1F]">{orderId}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B6670]">Payment Selected</span>
              <span className="font-semibold text-[#1C1B1F]">
                {method === 'deposit_delivery'
                  ? '£20 Deposit (Balance on Delivery)'
                  : 'Paid in Full by Card'}
              </span>
            </div>

            {method === 'deposit_delivery' ? (
              <>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B6670]">Deposit Paid Now</span>
                  <span className="font-mono font-bold text-emerald-700">£20.00</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-[#EEE8E1]">
                  <span className="text-[#6B6670] font-bold">Balance Due Upon Delivery</span>
                  <span className="font-mono text-base font-bold text-[#9F7453]">
                    {formatPrice(total - 20)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center text-xs pt-1 border-t border-[#EEE8E1]">
                <span className="text-[#6B6670] font-bold">Total Paid</span>
                <span className="font-mono text-base font-bold text-[#9F7453]">
                  {formatPrice(total)}
                </span>
              </div>
            )}
          </div>

          {/* Delivery Note */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 max-w-md mx-auto text-xs text-amber-900 mb-8 flex items-start gap-3 text-left">
            <Truck className="w-5 h-5 text-[#9F7453] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Two-Man Delivery Notice:</span>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                Our two-man delivery team will call you 24 hours prior to dispatch to agree an arrival time slot. Please ensure hallways and door access are clear.
              </p>
            </div>
          </div>

          {/* Direct Support */}
          <div className="text-xs text-[#6B6670] mb-8">
            Questions regarding your order? Call our showroom on{' '}
            <a href={`tel:${siteConfig.phone}`} className="font-bold text-[#1C1B1F] underline">
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1C1B1F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
          >
            <span>Return to Furniture Catalogue</span>
            <ArrowRight className="w-4 h-4 text-[#E8D3B9]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
