import React, { useCallback, useState, useEffect } from 'react';
import { mediaUrl } from '@/services/api';

export default function PromotorsSection({ content = {} }) {
  const items = Object.keys(content)
    .map((key) => {
      const match = key.match(/^promotor_(\d+)_name$/);
      if (!match || !content[key]) return null;

      const number = match[1];
      return {
        id: number,
        name: content[key],
        title: content[`promotor_${number}_title`] || '',
        desc: content[`promotor_${number}_description`] || '',
        image: mediaUrl(content[`promotor_${number}_image`]),
      };
    })
    .filter(Boolean)
    .sort((a, b) => Number(a.id) - Number(b.id));
  const [promotorIdx, setPromotorIdx] = useState(0);
  const [promotorVisible, setPromotorVisible] = useState(true);

  useEffect(() => {
    if (promotorIdx >= items.length) setPromotorIdx(0);
  }, [items.length, promotorIdx]);

  const changePromotor = useCallback((newIdx) => {
    if (items.length < 2 || newIdx === promotorIdx) return;
    setPromotorVisible(false);
    setTimeout(() => {
      setPromotorIdx(newIdx);
      setPromotorVisible(true);
    }, 300);
  }, [items.length, promotorIdx]);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const t = setInterval(() => changePromotor((promotorIdx + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [changePromotor, promotorIdx, items.length]);

  if (!items.length) return null;

  const current = items[promotorIdx];

  return (
    <section id="promotors" className="py-10 md:py-14 lg:py-20" style={{ backgroundColor: '#08254f' }}>
      <div className="container mx-auto px-4">

        {content.heading && (
          <div className="text-center mb-3">
            <h2 className="font-bold text-[26px] md:text-[32px] lg:text-[40px]"
              style={{ color: '#00b2f4', letterSpacing: '1px' }}>{content.heading}</h2>
          </div>
        )}
        {content.tagline && <p className="text-center text-white font-semibold text-sm mb-2">{content.tagline}</p>}
        {content.introduction && (
          <p className="text-center text-white/80 text-sm mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto">
            {content.introduction}
          </p>
        )}

        <div className={`flex flex-col ${current.image ? 'md:grid md:grid-cols-[auto_1fr]' : ''} gap-8 md:gap-8 lg:gap-6 items-center`}>

          {current.image && <div className="flex justify-center w-full md:w-auto">
            <div className="overflow-hidden w-[289px] h-[265px] md:w-[315px] md:h-[289px] lg:w-[370px] lg:h-[340px]">
              <div className="scale-[0.78] md:scale-[0.85] lg:scale-100 origin-top-left relative"
                style={{ width: '370px', height: '340px' }}>
                {/* Cyan rectangle */}
                <div className="absolute" style={{
                  left: 0, top: '-20px',
                  width: '130px', height: '200px',
                  backgroundColor: '#00b2f4',
                  zIndex: 1,
                  opacity: promotorVisible ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }} />
                {/* Photo frame */}
                <div className="absolute" style={{
                  left: '50px', top: 0,
                  width: '300px', height: '315px',
                  border: '1px solid white',
                  padding: '10px',
                  zIndex: 2,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  opacity: promotorVisible ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>}

          {/* Right: content */}
          <div style={{ opacity: promotorVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
            className="text-center md:text-left">
            <p className="font-semibold mb-1 text-base" style={{ color: '#00b2f4' }}>
              {current.name}
            </p>
            {current.title && <p className="text-white/70 text-xs mb-3 uppercase tracking-widest">{current.title}</p>}
            {current.desc && <p className="text-white/80 text-sm leading-relaxed">{current.desc}</p>}
          </div>
        </div>

        {/* Dots */}
        {items.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {items.map((item, i) => (
              <button key={item.id} onClick={() => changePromotor(i)} aria-label={`Show ${item.name}`}
                className="transition-all duration-300"
                style={{
                  width: i === promotorIdx ? '24px' : '10px',
                  height: '10px',
                  backgroundColor: i === promotorIdx ? '#00b2f4' : 'rgba(255,255,255,0.3)',
                  borderRadius: i === promotorIdx ? '4px' : '50%'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}



