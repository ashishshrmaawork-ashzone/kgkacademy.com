import React from 'react';
import { mediaUrl } from '@/services/api';

export default function KGKTimelineSection({ content = {} }) {
  if (!content.heading && !content.description && !content.description_secondary && !content.background_image) return null;

  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '400px' }}>
      {content.background_image && <img src={mediaUrl(content.background_image)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      <div className="relative z-10 w-full py-10 md:py-14 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-end">
            <div className="w-full md:w-[55%] lg:w-[50%]">
              {content.heading && <h2 className="font-bold text-white mb-4 text-[26px] md:text-[32px] lg:text-[40px]" style={{ letterSpacing: '1px' }}>{content.heading}</h2>}
              {content.description && <p className="text-white/80 text-sm leading-relaxed mb-4">{content.description}</p>}
              {content.description_secondary && <p className="text-white/80 text-sm leading-relaxed">{content.description_secondary}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
