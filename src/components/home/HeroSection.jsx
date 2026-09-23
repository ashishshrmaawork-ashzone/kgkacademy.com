import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import slide1 from '@/assets/images/homeslide-1.jpg';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

const fallbackHeroSlides = [
  { bg: slide1, title: 'A powerful',   subtitle: 'partnership for' },
  { bg: slide1, title: 'Inspired',     subtitle: 'to Shine'        },
  { bg: slide1, title: 'Real Skills.', subtitle: 'Real Careers.'   },
];

export default function HeroSection() {
  const { page: pageMeta } = useCmsPage('home');
  const [heroIdx, setHeroIdx] = useState(0);

  const hero = pageMeta?.content?.hero;
  const heroSlides = hero
    ? [1, 2, 3].map(number => ({
        bg: mediaUrl(hero[`slide_${number}_image`]) || slide1,
        title: hero[`slide_${number}_title`] || fallbackHeroSlides[number - 1].title,
        subtitle: hero[`slide_${number}_subtitle`] || fallbackHeroSlides[number - 1].subtitle,
      }))
    : fallbackHeroSlides;
  const autoplaySeconds = Number(hero?.autoplay_seconds) > 0
    ? Number(hero.autoplay_seconds)
    : 5;

  useEffect(() => {
    setHeroIdx(0);
  }, [pageMeta]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(p => (p + 1) % heroSlides.length), autoplaySeconds * 1000);
    return () => clearInterval(t);
  }, [autoplaySeconds, heroSlides.length]);

  const slide = heroSlides[heroIdx];

  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
      {heroSlides.map((s, i) => (
        <img key={i} src={s.bg} alt="hero"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-l from-[#061322]/75 via-[#061322]/40 to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-center md:justify-end">
        <div className="container-fluid flex justify-center md:justify-end">
          <div className="text-center md:text-right max-w-[90%] md:max-w-[55%] px-4 md:pr-20 md:px-0">
            <h1 className="text-2xl md:text-5xl font-normal text-white leading-tight">{slide.title}</h1>
            <h2 className="text-xl md:text-4xl font-normal text-white leading-tight">{slide.subtitle}</h2>
          </div>
        </div>
      </div>

      {/* Vertical nav dots */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setHeroIdx(i)}
            className={`rounded-full transition-all duration-300 ${i === heroIdx ? 'h-8 w-2 bg-[#00b2f4]' : 'h-2.5 w-2.5 bg-white hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={() => setHeroIdx(p => (p - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white z-10 transition-all">
        <FaChevronLeft size={13} />
      </button>
      <button onClick={() => setHeroIdx(p => (p + 1) % heroSlides.length)}
        className="absolute right-12 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center text-white z-10 transition-all">
        <FaChevronRight size={13} />
      </button>
    </section>
  );
}
