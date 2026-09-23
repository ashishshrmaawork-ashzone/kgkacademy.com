import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import HeroSection        from '@/components/home/HeroSection';
import CourseIconBar      from '@/components/home/CourseIconBar';
import ExploreSection     from '@/components/home/ExploreSection';
import KGKStorySection    from '@/components/home/KGKStorySection';
import WhyLearnersSection from '@/components/home/WhyLearnersSection';
import FacilitiesSection  from '@/components/home/FacilitiesSection';
import IndustryReadySection  from '@/components/home/IndustryReadySection';
import MomentsSection     from '@/components/home/MomentsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function Home() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  usePageMeta('Inspired to Shine', 'KGK Academy offers world-class diamond grading, gemstone identification, and jewellery design courses in Surat and Jaipur. Start your gem industry career today.');

  return (
    <MainLayout>
      <HeroSection />
      <CourseIconBar />
      <ExploreSection />
      <KGKStorySection />
      <WhyLearnersSection />
      <FacilitiesSection />
      <IndustryReadySection />
      <MomentsSection />
      <TestimonialsSection />
    </MainLayout>
  );
}
