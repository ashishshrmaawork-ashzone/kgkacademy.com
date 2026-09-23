import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import usePageContent from '@/hooks/usePageContent';
import OurStorySection from '@/components/about/OurStorySection';
import VisionValuesSection from '@/components/about/VisionValuesSection';
import PromotorsSection from '@/components/about/PromotorsSection';
import KGKFoundationSection from '@/components/about/KGKFoundationSection';
import KGKTimelineSection from '@/components/about/KGKTimelineSection';

const AboutUs = () => {
  const content = usePageContent('about-us');
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  usePageMeta('About Us', 'Learn about KGK Academy\'s story, vision, values, and the promotors behind India\'s premier diamond and gemstone training institute.');
  return (<MainLayout>
    <OurStorySection content={content.story} />
    <VisionValuesSection vision={content.vision} values={content.values} />
    <PromotorsSection content={content.promotors} />
    <KGKFoundationSection content={content.foundation} />
    <KGKTimelineSection content={content.timeline} />
  </MainLayout>);
};
export default AboutUs;
