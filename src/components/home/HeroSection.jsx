import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function HeroSection() {
  const { page: pageMeta } = useCmsPage('home');
  const [heroIdx, setHeroIdx] = useState(0);
  const hero = pageMeta?.content?.hero || {};
  const heroSlides = Object.keys(hero)
    .reduce((slides, key) => {
      const match = key.match(/^slide_(\d+)_(image|title|subtitle)$/);
      if (!match) return slides;
      const number = Number(match[1]);
      slides[number] = slides[number] || { id: number };
      slides[number][match[2]] = hero[key];
      return slides;
    }, [])
    .filter(slide => slide && (slide.image || slide.title || slide.subtitle))
    .map(slide => ({ ...slide, image: mediaUrl(slide.image) }));
  const autoplaySeconds = Number(hero.autoplay_seconds) > 0 ? Number(hero.autoplay_seconds) : 5;

  useEffect(() => {
    if (heroIdx >= heroSlides.length) setHeroIdx(0);
  }, [heroIdx, heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const timer = setInterval(() => {
      setHeroIdx(index => (index + 1) % heroSlides.length);
    }, autoplaySeconds * 1000);
    return () => clearInterval(timer);
  }, [autoplaySeconds, heroSlides.length]);

  if (!heroSlides.length) return null;

  const changeSlide = offset => {
    setHeroIdx(index => (index + offset + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
      {heroSlides.map((slide, index) => slide.image && (
        <img key={slide.id} src={slide.image} alt={slide.title || ''} aria-hidden={!slide.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === heroIdx ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-l from-[#061322]/75 via-[#061322]/40 to-transparent" />

      {(heroSlides[heroIdx].title || heroSlides[heroIdx].subtitle) && (
        <div className="relative z-10 h-full flex items-center justify-center md:justify-end">
          <div className="container-fluid flex justify-center md:justify-end">
            <div className="text-center md:text-right max-w-[90%] md:max-w-[55%] px-4 md:pr-20 md:px-0">
              {heroSlides[heroIdx].title && <h1 className="text-2xl md:text-5xl font-normal text-white leading-tight">{heroSlides[heroIdx].title}</h1>}
              {heroSlides[heroIdx].subtitle && <h2 className="text-xl md:text-4xl font-normal text-white leading-tight">{heroSlides[heroIdx].subtitle}</h2>}
            </div>
          </div>
        </div>
      )}

      {heroSlides.length > 1 && (
        <>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
            {heroSlides.map((slide, index) => (
              <button key={slide.id} type="button" aria-label={`Show slide ${index + 1}`} onClick={() => setHeroIdx(index)}
                className={`rounded-full transition-all duration-300 ${index === heroIdx ? 'h-8 w-2 bg-[#00b2f4]' : 'h-2.5 w-2.5 bg-white hover:bg-white/70'}`} />
            ))}
          </div>
          <button type="button" aria-label="Previous slide" onClick={() => changeSlide(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white z-10 transition-all">
            <FaChevronLeft size={13} />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => changeSlide(1)}
            className="absolute right-12 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white z-10 transition-all">
            <FaChevronRight size={13} />
          </button>
        </>
      )}
    </section>
  );
}
