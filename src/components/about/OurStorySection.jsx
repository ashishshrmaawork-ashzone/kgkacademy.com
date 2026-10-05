import React from 'react';
import { Link } from 'react-router-dom';
import { mediaUrl } from '@/services/api';

export default function OurStorySection({ content = {} }) {
  if (!content.heading && !content.description && !content.description_secondary && !content.desktop_image && !content.mobile_image) return null;

  const desktopImage = mediaUrl(content.desktop_image || content.mobile_image);
  const mobileImage = mediaUrl(content.mobile_image || content.desktop_image);

  return (
    <section id="story" className="relative flex items-end md:items-center overflow-hidden min-h-[480px] md:min-h-[560px] lg:h-[720px]">
      {desktopImage && <img src={desktopImage} alt="" className="absolute inset-0 w-full h-full object-cover hidden md:block" style={{ objectPosition: 'bottom' }} />}
      {mobileImage && <img src={mobileImage} alt="" className="absolute inset-0 w-full h-full object-cover block md:hidden" style={{ objectPosition: 'center' }} />}
      <div className="relative z-10 w-full py-10 md:pt-36 md:pb-14 lg:pt-[250px] lg:pb-10">
        <div className="container mx-auto px-4">
          <div className="flex md:justify-end">
            <div className="w-full md:w-[55%] lg:w-[42%] md:pl-[100px] lg:pl-0 md:pr-6 lg:pr-8">
              {content.heading && <h2 className="font-bold mb-4 text-[26px] md:text-[32px] lg:text-[40px]" style={{ color: '#00b2f4', letterSpacing: '1px' }}>{content.heading}</h2>}
              {content.description && <p className="leading-relaxed mb-3 text-sm md:text-[13px] lg:text-[15px]" style={{ color: 'rgba(255,255,255,0.85)' }}>{content.description}</p>}
              {content.description_secondary && <p className="leading-relaxed mb-6 text-sm md:text-[13px] lg:text-[15px]" style={{ color: 'rgba(255,255,255,0.85)' }}>{content.description_secondary}</p>}
              {content.cta_label && content.cta_url && <Link to={content.cta_url} className="inline-block px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#009ed8]" style={{ backgroundColor: '#00b2f4' }}>{content.cta_label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
