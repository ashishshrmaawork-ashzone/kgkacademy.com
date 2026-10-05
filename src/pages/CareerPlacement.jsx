import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import useCmsPage from '@/hooks/useCmsPage';
import CareerHero from '@/components/career/CareerHero';
import CareerSupportSection from '@/components/career/CareerSupportSection';
import PlacementSection from '@/components/career/PlacementSection';
import CareerCTA from '@/components/career/CareerCTA';

const CareerPlacement = () => {
  const { page, content } = useCmsPage('career-placement');
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  usePageMeta(page?.meta_title, page?.meta_description);
  return (<MainLayout>
    <CareerHero content={content.hero} />
    <CareerSupportSection content={content.career_guidance} />
    <PlacementSection assistance={content.placement_assistance} pathways={content.career_pathways} />
    <CareerCTA content={content.call_to_action} />
  </MainLayout>);
};
export default CareerPlacement;
