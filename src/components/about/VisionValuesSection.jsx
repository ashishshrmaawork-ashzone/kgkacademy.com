import React from 'react';
import { Link } from 'react-router-dom';
import { mediaUrl } from '@/services/api';
import visionIcon from '@/assets/images/about/vision-icon.png';
import valuesIcon from '@/assets/images/about/values-icon.png';

export default function VisionValuesSection({ vision = {}, values = {} }) {
  return (
    <section id="vision" className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Vision Card */}
          <div className="shadow-md overflow-hidden" style={{ borderRadius: '16px', border: '2px solid #00b2f4' }}>
            <div className="bg-gray-50 flex items-center justify-center h-[130px] md:h-[160px] lg:h-[200px]">
              <img src={mediaUrl(vision.icon) || visionIcon} alt="Our Vision" className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 object-contain" />
            </div>
            <div className="px-6 py-3 md:py-4 text-center" style={{ backgroundColor: '#08254f' }}>
              <h3 className="text-white font-bold text-lg md:text-xl" style={{ letterSpacing: '2px' }}>{vision.heading || 'Our Vision'}</h3>
            </div>
            <div className="bg-white p-4 md:p-5 text-center" style={{ borderRadius: '0 0 14px 14px' }}>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {vision.description || 'Our vision is to create a learning environment where education naturally translates into opportunity. We aim to empower every learner with the right skills, mindset, and industry exposure so they can succeed anywhere in the world.'}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {vision.description_secondary || 'As a future-focused Diamond Training Institute in India and Colourstone Training Institute, we believe in bridging knowledge with employability and practical growth.'}
              </p>
            </div>
          </div>

          {/* Values Card */}
          <div id="values" className="shadow-md overflow-hidden" style={{ borderRadius: '16px', border: '2px solid #00b2f4' }}>
            <div className="bg-gray-50 flex items-center justify-center h-[130px] md:h-[160px] lg:h-[200px]">
              <img src={mediaUrl(values.icon) || valuesIcon} alt="Our Values" className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 object-contain" />
            </div>
            <div className="px-6 py-3 md:py-4 text-center" style={{ backgroundColor: '#08254f' }}>
              <h3 className="text-white font-bold text-lg md:text-xl" style={{ letterSpacing: '2px' }}>{values.heading || 'Our Values'}</h3>
            </div>
            <div className="bg-white p-4 md:p-5 text-center" style={{ borderRadius: '0 0 14px 14px' }}>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {values.description || 'Our values at KGK Academy come from both experience and intent. We believe in teaching skills that can be applied in real situations, not just understood in theory. Integrity, continuous learning, and respect for the craft are at the heart of our approach.'}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {values.description_secondary || 'Backed by the global expertise of KGK Group and as a dedicated Diamond Training Institute and Colourstone Training Institute in India, we ensure that every student learns with purpose, grows with confidence, and contributes meaningfully.'}
              </p>
              <div className="flex justify-center">
                <Link to={values.cta_url || "/courses"}
                  className="inline-block px-6 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: '#08254f' }}>
                  Read More...
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}




