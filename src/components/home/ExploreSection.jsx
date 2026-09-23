import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import explore1 from '@/assets/images/explore-1.jpg';
import explore2 from '@/assets/images/explore-2.jpg';
import explore3 from '@/assets/images/explore-3.jpg';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

const exploreImages = [explore1, explore2, explore3];

const stackStyles = [
  { zIndex: 10, transform: 'translateX(0px) translateY(0px) rotate(0deg)',      boxShadow: '0 20px 50px rgba(0,0,0,0.25)' },
  { zIndex: 5,  transform: 'translateX(32px) translateY(-22px) rotate(4deg)',   boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  { zIndex: 1,  transform: 'translateX(-28px) translateY(-38px) rotate(-5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' },
];

export default function ExploreSection() {
  const { page: pageMeta } = useCmsPage('home');
  const [exploreIdx, setExploreIdx] = useState(0);
  const content = pageMeta?.content?.explore_courses;
  const images = content
    ? [1, 2, 3].map(number => mediaUrl(content[`image_${number}`]) || exploreImages[number - 1])
    : exploreImages;

  useEffect(() => {
    const t = setInterval(() => setExploreIdx(p => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-center mb-10 md:mb-20 text-[26px] md:text-[40px]" style={{ color: '#305eaf', letterSpacing: '1px' }}>
          {content?.heading || 'Explore Our Courses'}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Stacked floating images */}
          <div className="relative h-[220px] md:h-[360px] flex items-center justify-center overflow-hidden md:overflow-visible"
            style={{ animation: 'floatY 3.5s ease-in-out infinite' }}>
            {images.map((img, i) => {
              const pos = (i - exploreIdx + images.length) % images.length;
              return (
                <div key={i} className="absolute"
                  style={{ width: '82%', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)', ...stackStyles[pos] }}>
                  <img src={img} alt="Explore KGK" className="w-full object-cover"
                    style={{ height: '321px', objectFit: 'cover', display: 'block' }} />
                </div>
              );
            })}
          </div>

          <div>
            <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>
              {content?.description || 'At KGK Academy, our courses are designed to match real industry needs and practical career opportunities. We offer a wide range of industry-relevant programs including Diamond Grading Course, Rough Diamond Grading Course, and specialised training in gemstone and jewellery design.'}
            </p>
            <p className="leading-relaxed mb-6" style={{ fontSize: '16px', color: '#474747' }}>
              {content?.description_secondary || 'Our curriculum also includes Diamond Manufacturing Course, Diploma in Diamond Grading, and globally aligned programs like the International System of Diamond Grading Course.'}
            </p>
            <Link to={content?.cta_url || '/courses'}
              className="inline-block bg-primary text-white px-7 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all">
              {content?.cta_label || 'EXPLORE NOW'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
