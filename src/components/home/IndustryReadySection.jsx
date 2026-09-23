import React from 'react';
import industryImg1 from '@/assets/images/industry-ready-approch-1.jpg';
import industryImg2 from '@/assets/images/industry-ready-approch-2.jpg';
import industryImg3 from '@/assets/images/industry-ready-approch-3.jpg';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function IndustryReadySection() {
  const { content } = useCmsPage('home');
  const industry = content.industry_ready || {};
  const image = value => mediaUrl(value);
  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-bold text-primary mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>
              {industry.heading || 'The Industry-Ready Approach'}
            </h2>
            <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>
              {industry.description || 'As a practical Diamond Training Institute and emerging Colourstone Training Institute in India, we offer industry-focused learning that combines knowledge, precision, and hands-on application.'}
            </p>
            <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>
              {industry.description_secondary || "We believe that true skill comes from doing. That's why our students work with tools, machines, and software used in real industry settings."}
            </p>
            <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>
              {industry.description_secondary || 'This approach ensures that students complete their training confident in applying their skills in real-world scenarios.'}
            </p>
          </div>
          {/* 1 large left + 2 stacked right */}
          <div className="flex gap-3 h-[240px] md:h-[420px]">
            <div className="flex-1 overflow-hidden rounded-sm shadow-md">
              <img src={image(industry.image_1) || industryImg1} alt="Industry 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col gap-3" style={{ width: '48%' }}>
              <div className="flex-1 overflow-hidden rounded-sm shadow-md">
                <img src={image(industry.image_2) || industryImg2} alt="Industry 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 overflow-hidden rounded-sm shadow-md">
                <img src={image(industry.image_3) || industryImg3} alt="Industry 3"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
