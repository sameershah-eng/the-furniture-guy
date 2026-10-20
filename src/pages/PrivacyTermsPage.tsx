import React from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { siteConfig } from '@/config/site';

export const PrivacyTermsPage: React.FC = () => {
  useDocumentTitle('Privacy & Terms of Service');

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
            Legal &amp; Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1B1F]">
            Privacy Policy &amp; Terms of Sale
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6670] mt-2">
            Clear, honest terms for showroom sales and nationwide UK deliveries.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EEE8E1] shadow-xl space-y-8 text-xs sm:text-sm text-[#1C1B1F] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              1. £20 Deposit Reservation Policy
            </h2>
            <p className="text-[#6B6670]">
              Customers choosing to reserve in-stock items with a £20 deposit commit to taking delivery or showroom collection within 28 days of notice. The remaining balance is payable upon delivery inspection by card or cash. Deposits are fully credited toward your order total.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              2. Privacy &amp; Data Protection (UK GDPR)
            </h2>
            <p className="text-[#6B6670]">
              {siteConfig.businessName} only collects personal information (such as name, phone number, delivery address, and email) necessary to arrange showroom consultations, process delivery routes, and provide aftercare. We never sell or transfer your private details to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              3. Glass &amp; Mirrored Furniture Warranty
            </h2>
            <p className="text-[#6B6670]">
              All items are constructed using reinforced composite chassis and safety-backed bevelled mirrored glass. We warrant all structural frames and electric fireplace heating units against manufacturing defects for 12 months from the date of delivery.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[#EEE8E1]">
            <h2 className="font-serif text-2xl font-bold text-[#1C1B1F]">
              4. Company Information
            </h2>
            <p className="text-[#6B6670]">
              Trading Name: {siteConfig.businessName} (King of Bling)
              <br />
              Email: {siteConfig.email}
              <br />
              Showroom Telephone: {siteConfig.phoneDisplay}
              <br />
              Location: Greater Manchester, United Kingdom
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
