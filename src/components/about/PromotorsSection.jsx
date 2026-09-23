import React, { useState, useEffect } from 'react';
import { mediaUrl } from '@/services/api';

const IMGS = {
  promotor1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&fit=crop&crop=face',
  promotor2: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fit=crop&crop=face',
  promotor3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face',
};

const promotors = [
  {
    name: 'Mr. Navrattan Kothari',
    title: 'Patriarch',
    desc: 'At KGK Academy, our foundation is deeply inspired by the vision of Mr. Navrattan Kothari. Over the decades, he has shaped the KGK Group into a globally respected name, not just through business growth, but through strong values of trust, integrity, and long-term thinking. These very principles continue to guide how we approach education at the academy. His belief in doing things the right way reflects in our commitment to building skilled professionals who are not only capable, but also responsible in the way they work and grow. That same philosophy strengthens KGK Academy as a value-driven and skill-focused Diamond Training Institute in India.',
  },
  {
    name: 'Mr. Sanjay Kothari',
    title: 'Director',
    desc: 'With decades of leadership in the global diamond industry, Mr. Sanjay Kothari has been instrumental in shaping KGK Academy\'s vision of bridging education and industry. His guidance ensures that every program aligns with real market needs and global standards.',
  },
  {
    name: 'Mr. Rahul Kothari',
    title: 'Managing Director',
    desc: 'Mr. Rahul Kothari drives the academy\'s commitment to innovation and practical learning. His forward-thinking approach has helped establish KGK Academy as one of India\'s premier diamond and colourstone training institutes.',
  },
];

export default function PromotorsSection({ content = {} }) {
  const items = [1, 2, 3].map((i) => ({ ...promotors[i - 1], name: content[`promotor_${i}_name`] || promotors[i - 1].name, title: content[`promotor_${i}_title`] || promotors[i - 1].title, desc: content[`promotor_${i}_description`] || promotors[i - 1].desc, image: mediaUrl(content[`promotor_${i}_image`]) || [IMGS.promotor1, IMGS.promotor2, IMGS.promotor3][i - 1] }));
  const [promotorIdx, setPromotorIdx] = useState(0);
  const [promotorVisible, setPromotorVisible] = useState(true);

  const changePromotor = (newIdx) => {
    setPromotorVisible(false);
    setTimeout(() => {
      setPromotorIdx(newIdx);
      setPromotorVisible(true);
    }, 300);
  };

  useEffect(() => {
    const t = setInterval(() => changePromotor((promotorIdx + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [promotorIdx, items.length]);

  return (
    <section id="promotors" className="py-10 md:py-14 lg:py-20" style={{ backgroundColor: '#08254f' }}>
      <div className="container mx-auto px-4">

        <div className="text-center mb-3">
          <h2 className="font-bold text-[26px] md:text-[32px] lg:text-[40px]"
            style={{ color: '#00b2f4', letterSpacing: '1px' }}>{content.heading || "Promotors"}</h2>
        </div>
        <p className="text-center text-white font-semibold text-sm mb-2">{content.tagline || "A legacy that guides our learning"}</p>
        <p className="text-center text-white/80 text-sm mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto">
          {content.introduction || "KGK Academy is built on the strong foundation of KGK Group's legacy. The leadership behind this legacy continues to guide the academy with the same vision and values, ensuring that education here is aligned with future opportunities and the evolving standards of a global Diamond Training Institute."}
        </p>

        <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-8 md:gap-8 lg:gap-6 items-center">

          {/* Left: photo with cyan shape behind */}
          <div className="flex justify-center w-full md:w-auto">
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
                    src={items[promotorIdx].image}
                    alt={items[promotorIdx].name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div style={{ opacity: promotorVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
            className="text-center md:text-left">
            <p className="font-semibold mb-1 text-base" style={{ color: '#00b2f4' }}>
              {items[promotorIdx].name}
            </p>
            <p className="text-white/70 text-xs mb-3 uppercase tracking-widest">
              {items[promotorIdx].title}
            </p>
            <p className="text-white/80 text-sm leading-relaxed">
              {items[promotorIdx].desc}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, i) => (
            <button key={i} onClick={() => changePromotor(i)}
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
      </div>
    </section>
  );
}





