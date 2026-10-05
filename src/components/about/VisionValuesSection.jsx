import React from 'react';
import { Link } from 'react-router-dom';
import { mediaUrl } from '@/services/api';

const ContentCard = ({ content, id }) => {
  if (!content.heading && !content.description && !content.description_secondary && !content.icon) return null;

  return (
    <div id={id} className="shadow-md overflow-hidden" style={{ borderRadius: '16px', border: '2px solid #00b2f4' }}>
      {content.icon && <div className="bg-gray-50 flex items-center justify-center h-[130px] md:h-[160px] lg:h-[200px]"><img src={mediaUrl(content.icon)} alt="" className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 object-contain" /></div>}
      {content.heading && <div className="px-6 py-3 md:py-4 text-center" style={{ backgroundColor: '#08254f' }}><h3 className="text-white font-bold text-lg md:text-xl" style={{ letterSpacing: '2px' }}>{content.heading}</h3></div>}
      {(content.description || content.description_secondary || (content.cta_label && content.cta_url)) && (
        <div className="bg-white p-4 md:p-5 text-center" style={{ borderRadius: '0 0 14px 14px' }}>
          {content.description && <p className="text-gray-600 text-sm leading-relaxed mb-3">{content.description}</p>}
          {content.description_secondary && <p className="text-gray-600 text-sm leading-relaxed mb-5">{content.description_secondary}</p>}
          {content.cta_label && content.cta_url && <div className="flex justify-center"><Link to={content.cta_url} className="inline-block px-6 py-2 text-sm font-medium text-white" style={{ backgroundColor: '#08254f' }}>{content.cta_label}</Link></div>}
        </div>
      )}
    </div>
  );
};

export default function VisionValuesSection({ vision = {}, values = {} }) {
  if (!Object.keys(vision).length && !Object.keys(values).length) return null;

  return (
    <section id="vision" className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          <ContentCard content={vision} id="vision-card" />
          <ContentCard content={values} id="values" />
        </div>
      </div>
    </section>
  );
}
