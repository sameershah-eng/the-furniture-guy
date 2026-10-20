import React from 'react';
import { Truck, ShieldCheck, Clock, RotateCcw, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Link } from 'react-router-dom';

export const DeliveryReturnsPage: React.FC = () => {
  useDocumentTitle('Two-Man Delivery & Returns Policy');

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
            Showroom Standards
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1B1F]">
            Two-Man White Glove Delivery &amp; Returns
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6670] mt-2">
            How we protect your furniture from showroom floor to living room.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EEE8E1] shadow-xl space-y-8 text-xs sm:text-sm text-[#1C1B1F] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-[#1C1B1F]">
              <Truck className="w-5 h-5 text-[#9F7453]" />
              1. Free UK Local Delivery Over £{siteConfig.freeDeliveryThreshold}
            </h2>
            <p className="text-[#6B6670]">
              Orders exceeding £{siteConfig.freeDeliveryThreshold} automatically qualify for Free Two-Man Delivery throughout Greater Manchester, Cheshire, Merseyside, and Lancashire. For smaller décor items or national deliveries, delivery is £39.99, or £49.99 for Express priority routing.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-[#1C1B1F]">
              <ShieldCheck className="w-5 h-5 text-[#9F7453]" />
              2. Room of Choice &amp; Visual Inspection
            </h2>
            <p className="text-[#6B6670]">
              We understand mirrored furniture and solid marble require gentle, expert handling. Our delivery crew will carry your purchase upstairs or into your designated room. We unpack and give you time to inspect every mirrored surface and crystal panel before signing.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-[#1C1B1F]">
              <Clock className="w-5 h-5 text-[#9F7453]" />
              3. Delivery Windows &amp; Scheduling
            </h2>
            <p className="text-[#6B6670]">
              Once an order or £20 deposit is received, our logistics dispatcher contacts you via telephone or WhatsApp with a 2-hour delivery slot. Drivers call approximately 30 minutes prior to arrival so you never have to wait around all day.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-[#1C1B1F]">
              <RotateCcw className="w-5 h-5 text-[#9F7453]" />
              4. 14-Day Returns &amp; Damage Guarantee
            </h2>
            <p className="text-[#6B6670]">
              If in the rare circumstance an item arrives with transit damage, we exchange it immediately at zero cost. For standard change-of-mind returns, please notify our team within 14 days of delivery. Returned items must remain in original protective condition.
            </p>
          </section>

          <div className="pt-6 border-t border-[#EEE8E1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#6B6670]">
              Need to check stairwell measurements before ordering?
            </span>
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-xl hover:bg-black"
            >
              Contact Our Logistics Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
