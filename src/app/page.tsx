import { Header } from '@/components/layout/Header';
import { StickyPromoBar } from '@/components/layout/StickyPromoBar';
import { Footer } from '@/components/layout/Footer';

import { Hero } from '@/components/sections/Hero';
import { DiscoverFeatures } from '@/components/sections/DiscoverFeatures';
import { DevicesBanner } from '@/components/sections/DevicesBanner';
import { Reasons } from '@/components/sections/Reasons';
import { Capabilities } from '@/components/sections/Capabilities';
import { ProToolsCarousel } from '@/components/sections/ProToolsCarousel';
import { StepsSection } from '@/components/sections/StepsSection';
import { PhotoshootGallery } from '@/components/sections/PhotoshootGallery';
import { BottomBanner } from '@/components/sections/BottomBanner';
import { Faq } from '@/components/sections/Faq';
import { Requirements } from '@/components/sections/Requirements';

import { retouch, spectacular } from '@/data/steps';

export default function LuminarPage() {
  return (
    <>
      <Header />
      <StickyPromoBar />

      <main>
        <Hero />
        <DiscoverFeatures />
        <DevicesBanner />
        <Reasons />
        <Capabilities />
        <ProToolsCarousel />
        <StepsSection data={spectacular} />
        <StepsSection data={retouch} />
        <PhotoshootGallery />
        <BottomBanner />
        <Faq />
        <Requirements />
      </main>

      <Footer />
    </>
  );
}
