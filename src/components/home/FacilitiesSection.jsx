import React from 'react';
import facilitiesBg from '@/assets/images/our-facilities-bg.jpg';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function FacilitiesSection() {
  const { content } = useCmsPage('home');
  const facilities = content.facilities || {};
  return (
    <section className="relative overflow-hidden min-h-[320px] md:min-h-[480px]">
      <img src={mediaUrl(facilities.background_image) || facilitiesBg} alt="Facilities" className="absolute inset-0 w-full h-full object-cover" />

      <div className="relative z-10 h-full flex items-center justify-end min-h-[320px] md:min-h-[480px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="w-full md:w-1/2 py-16 text-right">
              <h2 className="font-bold mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px', color: '#305eaf' }}>
                {facilities.heading || 'Our Facilities'}
              </h2>
              <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>
                {facilities.description || "At KGK Academy, our facilities in Surat and Jaipur are built to reflect the real environment of the gems and jewellery industry."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
