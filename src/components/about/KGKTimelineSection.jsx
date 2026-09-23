import React from 'react';
import kgkTimelineImg from '@/assets/images/about/kgk-academy-timeline.jpg';
import { mediaUrl } from '@/services/api';

export default function KGKTimelineSection({ content = {} }) {
  return (
    <section id="timeline" className="relative flex items-center overflow-hidden"
      style={{ minHeight: '400px' }}>
      <img src={mediaUrl(content.background_image) || kgkTimelineImg} alt="KGK Academy Timeline"
        className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-10 w-full py-10 md:py-14 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-end">
            <div className="w-full md:w-[55%] lg:w-[50%]">
              <h2 className="font-bold text-white mb-4 text-[26px] md:text-[32px] lg:text-[40px]"
                style={{ letterSpacing: '1px' }}>
                {content.heading || 'KGK Academy Timeline'}
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                {content.description || "From its early beginnings to becoming a trusted skill development institute in India, every milestone at KGK Academy represents our commitment to quality education, practical learning, and student success."}
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                {content.description_secondary || "As we continue to grow as a well-known diamond and colourstone training institute in India, our focus remains on evolving with the industry while staying true to our core values."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
