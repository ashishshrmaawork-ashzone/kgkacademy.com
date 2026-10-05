import React from 'react';
import { Link } from 'react-router-dom';
import { mediaUrl } from '@/services/api';

export default function KGKFoundationSection({ content = {} }) {
  if (!content.heading && !content.description && !content.description_secondary && !content.description_final && !content.image) return null;

  return (
    <section id="foundation" className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <div>
            {content.heading && <h2 className="font-bold mb-4 text-[26px] md:text-[32px] lg:text-[40px]" style={{ letterSpacing: '1px', color: '#1c53a5' }}>{content.heading}</h2>}
            {content.description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{content.description}</p>}
            {content.description_secondary && <p className="text-gray-600 text-sm leading-relaxed mb-4">{content.description_secondary}</p>}
            {content.description_final && <p className="text-gray-600 text-sm leading-relaxed mb-6">{content.description_final}</p>}
            {content.cta_label && content.cta_url && <Link to={content.cta_url} className="inline-block px-6 py-2 text-sm font-medium text-white" style={{ backgroundColor: '#08254f' }}>{content.cta_label}</Link>}
          </div>
          {content.image && <div className="h-60 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md"><img src={mediaUrl(content.image)} alt={content.heading || ''} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>}
        </div>
      </div>
    </section>
  );
}
