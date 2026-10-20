import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingActionStack } from '@/components/layout/FloatingActionStack';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { CallbackModal } from '@/components/layout/CallbackModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Preloader } from '@/components/layout/Preloader';
import { ScrollToTop } from '@/components/layout/ScrollToTop';

// Pages
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ClearancePage } from '@/pages/ClearancePage';
import { BookVisitPage } from '@/pages/BookVisitPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { DeliveryReturnsPage } from '@/pages/DeliveryReturnsPage';
import { PrivacyTermsPage } from '@/pages/PrivacyTermsPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackProduct, setCallbackProduct] = useState<string | undefined>(undefined);
  const [isMobileStickyBarVisible, setIsMobileStickyBarVisible] = useState(false);

  const handleOpenCallback = (productName?: string) => {
    setCallbackProduct(productName);
    setCallbackOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <Preloader />

      <div className="flex flex-col min-h-screen">
        <AnnouncementBar />
        <Navbar
          onOpenSearch={() => setSearchOpen(true)}
          onRequestCallback={() => handleOpenCallback()}
        />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onRequestCallback={() => handleOpenCallback()} />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route
              path="/product/:slug"
              element={
                <ProductDetailPage
                  onRequestCallback={(prodName) => handleOpenCallback(prodName)}
                  onStickyBarChange={setIsMobileStickyBarVisible}
                />
              }
            />
            <Route path="/clearance" element={<ClearancePage />} />
            <Route path="/book" element={<BookVisitPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/delivery-returns" element={<DeliveryReturnsPage />} />
            <Route path="/privacy-terms" element={<PrivacyTermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />

        {/* Global Overlays & Floating Stack */}
        <FloatingActionStack
          onRequestCallback={() => handleOpenCallback()}
          isStickyBarVisible={isMobileStickyBarVisible}
        />
        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        <CallbackModal
          isOpen={callbackOpen}
          onClose={() => setCallbackOpen(false)}
          productName={callbackProduct}
        />
        <CartDrawer />
      </div>
    </Router>
  );
}
