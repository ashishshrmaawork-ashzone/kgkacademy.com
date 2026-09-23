import React, { useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import TestimonialsHero from '@/components/testimonials/TestimonialsHero';
import TestimonialsGrid from '@/components/testimonials/TestimonialsGrid';
import useApiData from '@/hooks/useApiData';
import usePageContent from '@/hooks/usePageContent';
import { getTestimonials, unwrapData } from '@/services/api';

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta('Testimonials', 'Read success stories from KGK Academy graduates who launched careers in diamond grading, gemstone identification, and jewellery design.');
  const content = usePageContent('testimonials');
  const { data: apiTestimonials } = useApiData(() => getTestimonials().then(unwrapData), []);
  const testimonials = apiTestimonials.map((item) => ({
    ...item,
    stars: Number(item.rating || item.stars || 5),
    text: item.quote || item.text || '',
    city: item.location || item.city || '',
    avatar: item.avatar || '',
  }));

  return (
    <MainLayout>
      <TestimonialsHero content={content.hero} />
      <TestimonialsGrid testimonials={testimonials} />
    </MainLayout>
  );
};

export default Testimonials;
