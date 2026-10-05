import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

const stackStyles = [
  { zIndex: 10, transform: 'translateX(0px) translateY(0px) rotate(0deg)', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' },
  { zIndex: 5, transform: 'translateX(32px) translateY(-22px) rotate(4deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' },
  { zIndex: 1, transform: 'translateX(-28px) translateY(-38px) rotate(-5deg)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' },
];

export default function ExploreSection() {
  const { page: pageMeta } = useCmsPage('home');
  const [exploreIdx, setExploreIdx] = useState(0);
  const content = pageMeta?.content?.explore_courses || {};
  const images = Object.keys(content)
    .map(key => {
      const match = key.match(/^image_(\d+)$/);
      return match && content[key] ? { id: Number(match[1]), src: mediaUrl(content[key]) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);
  const hasContent = content.heading || content.description || content.description_secondary || content.cta_label || images.length;

  useEffect(() => {
    if (exploreIdx >= images.length) setExploreIdx(0);
  }, [exploreIdx, images.length]);

  useEffect(() => {
    if (images.length < 2) return undefined;
    const timer = setInterval(() => setExploreIdx(index => (index + 1) % images.length), 4500);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!hasContent) return null;

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {content.heading && <h2 className="font-bold text-center mb-10 md:mb-20 text-[26px] md:text-[40px]" style={{ color: '#305eaf', letterSpacing: '1px' }}>{content.heading}</h2>}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {images.length > 0 && (
            <div className="relative h-[220px] md:h-[360px] flex items-center justify-center overflow-hidden md:overflow-visible" style={{ animation: 'floatY 3.5s ease-in-out infinite' }}>
              {images.map((image, index) => {
                const position = (index - exploreIdx + images.length) % images.length;
                const style = stackStyles[position] || stackStyles[stackStyles.length - 1];
                return (
                  <div key={image.id} className="absolute" style={{ width: '82%', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)', ...style }}>
                    <img src={image.src} alt={content.heading || ''} className="w-full object-cover" style={{ height: '321px', display: 'block' }} />
                  </div>
                );
              })}
            </div>
          )}
          <div>
            {content.description && <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>{content.description}</p>}
            {content.description_secondary && <p className="leading-relaxed mb-6" style={{ fontSize: '16px', color: '#474747' }}>{content.description_secondary}</p>}
            {content.cta_label && content.cta_url && (
              <Link to={content.cta_url} className="inline-block bg-primary text-white px-7 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all">
                {content.cta_label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
