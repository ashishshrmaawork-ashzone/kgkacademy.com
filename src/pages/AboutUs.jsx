import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { hash, key } = useLocation();
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const section = hash ? document.getElementById(hash.slice(1)) : null;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
      const top = section
        ? Math.max(0, section.getBoundingClientRect().top + window.scrollY - headerHeight - 12)
        : 0;
      window.scrollTo({
        top,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash, key]);
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
