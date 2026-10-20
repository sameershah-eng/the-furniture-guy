import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { collections } from '@/data/collections';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
  };

  return (
    <footer className="bg-[#1C1B1F] text-[#FBF9F6] pt-16 pb-12 border-t border-[#2C2A31]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top VIP Sign-up Band */}
        <div className="pb-12 mb-12 border-b border-[#2C2A31] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#E8D3B9] flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-[#E8D3B9]" />
              King of Bling VIP Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              First look at showroom arrivals &amp; secret flash sales.
            </h3>
            <p className="text-xs text-[#A19DA8] mt-1">
              Be the first to view new crushed diamond suites and limited-run dining tables.
            </p>
          </div>

          <div className="lg:col-span-6">
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 bg-[#26242B] border border-[#3A3842] rounded-xl text-sm text-white placeholder:text-[#787482] focus:outline-none focus:border-[#E8D3B9]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] text-xs font-bold uppercase tracking-wider rounded-xl hover:brightness-105 transition-all shrink-0 flex items-center gap-2"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-[#26242B] border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're on the King of Bling VIP list. Welcome to the circle!</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2C2A31]">
          {/* Col 1: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-3xl font-medium tracking-tight text-white">
                {siteConfig.businessName}
              </span>
              <span className="block text-[11px] tracking-[0.25em] uppercase font-semibold text-[#E8D3B9] mt-0.5">
                {siteConfig.subBrand} Emporium
              </span>
            </Link>
            <p className="text-xs text-[#A19DA8] leading-relaxed max-w-sm">
              Britain's home of high glam, mirrored showstoppers, crushed diamond fireplaces, and statement marble dining sets. Hand-selected for homes that catch the light.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#26242B] hover:bg-[#323038] border border-[#3A3842] text-xs font-semibold text-white transition-colors flex items-center gap-2"
              >
                <span>Follow on Facebook</span>
                <ArrowRight className="w-3 h-3 text-[#E8D3B9]" />
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D3B9]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A19DA8]">
              {collections.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link to={`/collections/${c.slug}`} className="hover:text-white transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/clearance" className="text-[#E57388] hover:text-white transition-colors font-medium">
                  Clearance Outlet
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D3B9]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A19DA8]">
              <li>
                <Link to="/book" className="hover:text-white transition-colors">
                  Book a Showroom Visit
                </Link>
              </li>
              <li>
                <Link to="/delivery-returns" className="hover:text-white transition-colors">
                  Two-Man Delivery &amp; Returns
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Showroom Story
                </Link>
              </li>
              <li>
                <Link to="/privacy-terms" className="hover:text-white transition-colors">
                  Privacy Policy &amp; Terms
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Showroom Directions &amp; Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8D3B9]">
              Showroom
            </h4>
            <div className="space-y-2.5 text-xs text-[#A19DA8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0" />
                <span>{siteConfig.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E8D3B9] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#787482]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E8D3B9]" />
            <span>
              &copy; {new Date().getFullYear()} {siteConfig.businessName} ({siteConfig.subBrand}). All rights reserved.
            </span>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-3 text-[11px] text-[#A19DA8]">
            <span className="px-2 py-1 bg-[#26242B] rounded border border-[#3A3842]">UK Specialist Courier</span>
            <span className="px-2 py-1 bg-[#26242B] rounded border border-[#3A3842]">£20 Deposit Option</span>
            <span className="px-2 py-1 bg-[#26242B] rounded border border-[#3A3842]">SSL Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
