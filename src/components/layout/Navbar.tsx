import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Phone,
  ChevronDown,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { siteConfig } from '@/config/site';
import { collections } from '@/data/collections';
import { SmartImage } from '@/components/ui/SmartImage';

interface NavbarProps {
  onOpenSearch: () => void;
  onRequestCallback: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onRequestCallback }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const [badgeBumping, setBadgeBumping] = useState(false);

  const location = useLocation();
  const totalCartCount = useCartStore((s) => s.getTotalCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.getCount());

  // Listen to scroll to transform top bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setMobileCollectionsOpen(false);
  }, [location.pathname]);

  // Bounce cart badge whenever count changes
  useEffect(() => {
    if (totalCartCount > 0) {
      setBadgeBumping(true);
      const timer = setTimeout(() => setBadgeBumping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalCartCount]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/shop', hasMega: true },
    { name: 'Clearance', path: '/clearance', highlight: true },
    { name: 'Book a Visit', path: '/book' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F6]/90 backdrop-blur-md shadow-sm border-b border-[#EEE8E1]'
          : 'bg-[#FBF9F6]/60 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[68px]' : 'h-[80px] sm:h-[88px]'
        }`}
      >
        {/* Brand Lockup */}
        <Link to="/" className="flex flex-col shrink-0 group">
          <span className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1B1F] group-hover:text-[#9F7453] transition-colors leading-none">
            {siteConfig.businessName}
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#9F7453] mt-1 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 inline text-[#C9A27E]" />
            {siteConfig.subBrand}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#1C1B1F]">
          {navLinks.map((link) => {
            if (link.hasMega) {
              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onMouseLeave={() => setMegaMenuOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 hover:text-[#9F7453] transition-colors whitespace-nowrap ${
                      location.pathname.startsWith('/collections') ? 'text-[#9F7453] font-semibold' : ''
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        megaMenuOpen ? 'rotate-180 text-[#9F7453]' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {megaMenuOpen && (
                    <div className="absolute top-full -left-24 w-[760px] bg-white rounded-xl shadow-2xl border border-[#EEE8E1] p-6 grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="col-span-3 pb-3 mb-1 border-b border-[#EEE8E1] flex items-center justify-between">
                        <div>
                          <p className="font-serif text-lg font-medium text-[#1C1B1F]">
                            Curated Glam Collections
                          </p>
                          <p className="text-xs text-[#6B6670]">
                            Bespoke mirrored, crushed diamond and Ariana marble suites
                          </p>
                        </div>
                        <Link
                          to="/shop"
                          onClick={() => setMegaMenuOpen(false)}
                          className="text-xs font-semibold text-[#9F7453] hover:underline flex items-center gap-1"
                        >
                          View Full Catalogue <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {collections.slice(0, 6).map((col) => (
                        <Link
                          key={col.slug}
                          to={`/collections/${col.slug}`}
                          onClick={() => setMegaMenuOpen(false)}
                          className="group/item flex items-center gap-3 p-2 rounded-lg hover:bg-[#FBF9F6] transition-colors"
                        >
                          <div className="w-14 h-14 rounded-md overflow-hidden bg-[#F5F5F7] shrink-0 border border-[#EEE8E1]">
                            <SmartImage
                              src={col.image}
                              alt={col.imageAlt}
                              aspectRatio="square"
                              className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#1C1B1F] group-hover/item:text-[#9F7453] transition-colors truncate">
                              {col.name}
                            </h4>
                            <p className="text-[11px] text-[#6B6670] truncate">{col.tagline}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 whitespace-nowrap transition-colors ${
                  link.highlight
                    ? 'text-[#C2566B] font-semibold hover:text-[#9F7453]'
                    : isActive(link.path)
                    ? 'text-[#9F7453] font-semibold'
                    : 'text-[#1C1B1F] hover:text-[#9F7453]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E8D3B9] to-[#C9A27E] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Phone */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Open search"
            className="p-2 text-[#1C1B1F] hover:text-[#9F7453] hover:bg-black/5 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            aria-label="View wishlist"
            className="relative p-2 text-[#1C1B1F] hover:text-[#9F7453] hover:bg-black/5 rounded-full transition-colors hidden sm:inline-flex"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C2566B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag Trigger */}
          <button
            onClick={openCart}
            aria-label={`Open shopping cart with ${totalCartCount} items`}
            className="relative p-2 text-[#1C1B1F] hover:text-[#9F7453] hover:bg-black/5 rounded-full transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span
                className={`absolute top-1 right-1 w-4 h-4 bg-[#1C1B1F] text-[#E8D3B9] text-[10px] font-bold rounded-full flex items-center justify-center transition-transform ${
                  badgeBumping ? 'scale-125 bg-[#9F7453]' : 'scale-100'
                }`}
              >
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Call Now Pill Button (Desktop) */}
          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EEE8E1] hover:border-[#9F7453] shadow-xs text-xs font-semibold text-[#1C1B1F] transition-all hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 text-[#9F7453]" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#1C1B1F] hover:bg-black/5 rounded-lg transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full-Screen Slide-in Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-[#FBF9F6] z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="space-y-4">
            <div className="border-b border-[#EEE8E1] pb-4 mb-4">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#9F7453]">
                Showroom Navigation
              </span>
            </div>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
              >
                Shop All Furniture
              </Link>

              {/* Collections Accordion */}
              <div>
                <button
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                  className="w-full flex items-center justify-between py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileCollectionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileCollectionsOpen && (
                  <div className="pl-4 py-2 space-y-2 border-l-2 border-[#E8D3B9] my-2">
                    {collections.map((c) => (
                      <Link
                        key={c.slug}
                        to={`/collections/${c.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 text-sm text-[#6B6670] hover:text-[#1C1B1F]"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/clearance"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#C2566B] font-semibold"
              >
                Clearance Outlet (Up to 40% Off)
              </Link>
              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
              >
                Book a Showroom Visit
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
              >
                About King of Bling
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453]"
              >
                Contact &amp; Showroom Location
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-xl font-serif text-[#1C1B1F] hover:text-[#9F7453] flex items-center justify-between"
              >
                <span>Saved Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="text-xs bg-[#C2566B] text-white px-2 py-0.5 rounded-full font-sans">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>

          {/* Mobile Bottom Contact Strip */}
          <div className="pt-6 border-t border-[#EEE8E1] space-y-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1C1B1F] text-white text-sm font-semibold rounded-xl"
            >
              <Phone className="w-4 h-4 text-[#E8D3B9]" />
              <span>Call Showroom ({siteConfig.phoneDisplay})</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-xl"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestCallback();
              }}
              className="w-full py-2.5 bg-white border border-[#EEE8E1] text-[#1C1B1F] text-xs font-semibold rounded-xl"
            >
              Request a Specialist Call Back
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
