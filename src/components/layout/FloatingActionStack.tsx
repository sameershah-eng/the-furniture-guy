import React, { useState } from 'react';
import { Phone, MessageCircle, PhoneCall, X, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FloatingActionStackProps {
  onRequestCallback: () => void;
  isStickyBarVisible?: boolean;
}

export const FloatingActionStack: React.FC<FloatingActionStackProps> = ({
  onRequestCallback,
  isStickyBarVisible = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi, I'm viewing your furniture catalogue and would like more details on stock and delivery."
  )}`;

  return (
    <div
      className={`fixed right-4 z-40 transition-all duration-300 ${
        isStickyBarVisible ? 'bottom-24 sm:bottom-6' : 'bottom-6'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Desktop view: stack of floating buttons */}
      <div className="hidden sm:flex flex-col items-end gap-3">
        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <span className="absolute -inset-0.5 rounded-full bg-[#25D366]/40 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none" />
          <MessageCircle className="w-4 h-4 fill-current shrink-0" />
          <span className="text-xs font-semibold tracking-wide whitespace-nowrap">WhatsApp Chat</span>
        </a>

        {/* Call Now Button */}
        <a
          href={`tel:${siteConfig.phone}`}
          aria-label="Call showroom"
          className="flex items-center gap-2.5 px-4 py-2.5 bg-white text-[#1C1B1F] border border-[#EEE8E1] rounded-full shadow-md hover:shadow-lg hover:border-[#C9A27E] hover:scale-105 transition-all duration-200"
        >
          <Phone className="w-4 h-4 text-[#9F7453] shrink-0" />
          <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
            {siteConfig.phoneDisplay}
          </span>
        </a>

        {/* Request Call Back */}
        <button
          onClick={onRequestCallback}
          aria-label="Request callback"
          className="flex items-center gap-2 px-3 py-1.5 bg-[#1C1B1F] text-white text-[11px] font-semibold rounded-full shadow hover:bg-black hover:scale-105 transition-all duration-200"
        >
          <PhoneCall className="w-3 h-3 text-[#E8D3B9]" />
          <span>Request Callback</span>
        </button>
      </div>

      {/* Mobile view: neat expandable floating action button */}
      <div className="sm:hidden flex flex-col items-end">
        {isOpen && (
          <div className="flex flex-col items-end gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full shadow-lg text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Showroom</span>
            </a>

            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#1C1B1F] border border-[#EEE8E1] rounded-full shadow-lg text-xs font-semibold"
            >
              <Phone className="w-4 h-4 text-[#9F7453]" />
              <span>Call {siteConfig.phoneDisplay}</span>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                onRequestCallback();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1C1B1F] text-white rounded-full shadow-lg text-xs font-semibold"
            >
              <PhoneCall className="w-4 h-4 text-[#E8D3B9]" />
              <span>Request a Call Back</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Quick contact options"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] flex items-center justify-center shadow-xl active:scale-95 transition-transform"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-[#1C1B1F]" />
          ) : (
            <MessageSquare className="w-5 h-5 text-[#1C1B1F]" />
          )}
        </button>
      </div>
    </div>
  );
};
