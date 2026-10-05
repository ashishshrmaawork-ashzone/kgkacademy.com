import React from 'react';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function IndustryReadySection() {
  const { content } = useCmsPage('home');
  const industry = content.industry_ready || {};
  const images = [1, 2, 3]
    .map(number => mediaUrl(industry[`image_${number}`]))
    .filter(Boolean);
  if (!industry.heading && !industry.description && !industry.description_secondary && !images.length) return null;

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            {industry.heading && <h2 className="font-bold text-primary mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>{industry.heading}</h2>}
            {industry.description && <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>{industry.description}</p>}
            {industry.description_secondary && <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>{industry.description_secondary}</p>}
          </div>
          {images.length > 0 && (
            <div className="flex gap-3 h-[240px] md:h-[420px]">
              <div className="flex-1 overflow-hidden rounded-sm shadow-md">
                <img src={images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              {images.length > 1 && (
                <div className="flex flex-col gap-3" style={{ width: '48%' }}>
                  {images.slice(1, 3).map((image, index) => (
                    <div key={index} className="flex-1 overflow-hidden rounded-sm shadow-md">
                      <img src={image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
