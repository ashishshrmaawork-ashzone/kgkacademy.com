import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import usePageContent from '@/hooks/usePageContent';
import CareerHero from '@/components/career/CareerHero';
import CareerSupportSection from '@/components/career/CareerSupportSection';
import PlacementSection from '@/components/career/PlacementSection';
import CareerCTA from '@/components/career/CareerCTA';

const CareerPlacement = () => {
  const content = usePageContent('career-placement');
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  usePageMeta('Career & Placement Support', 'KGK Academy provides dedicated career counselling, mock interviews, placement drives, and industry connections to help graduates launch successful careers.');
  return (<MainLayout>
    <CareerHero content={content.hero} />
    <CareerSupportSection content={content.career_guidance} />
    <PlacementSection assistance={content.placement_assistance} pathways={content.career_pathways} />
    <CareerCTA content={content.call_to_action} />
  </MainLayout>);
};
export default CareerPlacement;
