import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function MomentsSection() {
  const { content } = useCmsPage('home');
  const events = content.events_exposure || {};
  const moments = [1, 2, 3, 4]
    .map(number => ({
      image: events[`event_${number}_image`],
      title: events[`event_${number}_title`],
      description: events[`event_${number}_subtitle`],
      location: events[`event_${number}_location`],
      url: events[`event_${number}_url`],
    }))
    .filter(event => event.title);
  return (
    <section className="py-10 md:py-20" style={{ backgroundColor: '#08254f' }}>
      <div className="container-fluid">
        {events.heading && (
          <h2 className="font-bold text-white text-center mb-10 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>
            {events.heading}
          </h2>
        )}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={12}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="moments-swiper"
        >
          {moments.map((m, i) => (
            <SwiperSlide key={i}>
              <Link to={m.url || '/events-activities'} className="block">
                <div className="relative overflow-hidden group cursor-pointer h-[300px] md:h-[440px]">
                  {m.image && (
                    <img src={mediaUrl(m.image)} alt={m.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
                  <div className="absolute z-10 flex gap-2" style={{ top: '30%', left: '20px', width: '85%' }}>
                    <div className="flex-shrink-0" style={{ width: '3px', backgroundColor: 'white', alignSelf: 'stretch', minHeight: '70px' }} />
                    <div>
                      <p className="text-white font-bold leading-tight" style={{ fontSize: '20px' }}>{m.title}</p>
                      <p className="text-white/85 leading-snug mt-1" style={{ fontSize: '14px' }}>{m.description}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 z-10 text-center">
                    <span className="text-white/90 text-[11px] tracking-widest uppercase">{m.location}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
