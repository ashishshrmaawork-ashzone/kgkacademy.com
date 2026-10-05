import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import useCmsPage from '@/hooks/useCmsPage';
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
  const { page } = useCmsPage('home');
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  usePageMeta(page?.meta_title, page?.meta_description);

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
