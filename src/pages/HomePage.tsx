import React from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { CollectionBento } from '@/components/home/CollectionBento';
import { BestsellersCarousel } from '@/components/home/BestsellersCarousel';
import { EditorialCrushedDiamond } from '@/components/home/EditorialCrushedDiamond';
import { ClearanceSpotlight } from '@/components/home/ClearanceSpotlight';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ShowroomBanner } from '@/components/home/ShowroomBanner';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { RealHomesGallery } from '@/components/home/RealHomesGallery';
import { FaqSection } from '@/components/home/FaqSection';

interface HomePageProps {
  onRequestCallback: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onRequestCallback }) => {
  useDocumentTitle();

  return (
    <main className="min-h-screen">
      <HeroSection onOpenBooking={() => {}} />
      <TrustStrip />
      <CollectionBento />
      <BestsellersCarousel />
      <EditorialCrushedDiamond />
      <ClearanceSpotlight />
      <WhyChooseUs />
      <ShowroomBanner />
      <TestimonialsSection />
      <RealHomesGallery />
      <FaqSection />
    </main>
  );
};
