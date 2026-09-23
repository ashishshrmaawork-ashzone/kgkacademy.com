import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import useApiData from '@/hooks/useApiData';
import useCmsPage from '@/hooks/useCmsPage';
import { getTestimonials, mediaUrl, unwrapData } from '@/services/api';

const Stars = ({ n }) => (
  <div className="flex gap-0.5 my-1.5">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} size={13} className={i < n ? 'text-yellow-400' : 'text-gray-300'} />
    ))}
  </div>
);

export default function TestimonialsSection() {
  const { content } = useCmsPage('home');
  const testimonialContent = content.testimonials || {};
  const { data: apiTestimonials } = useApiData(() => getTestimonials().then(unwrapData), []);
  const items = apiTestimonials.map((item) => ({
      img: mediaUrl(item.avatar),
      name: item.name,
      role: item.role,
      stars: Number(item.rating || 5),
      text: item.quote || '',
    }));

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {testimonialContent.background_image && (
        <img src={mediaUrl(testimonialContent.background_image)} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4">
        {testimonialContent.heading && (
          <h2 className="font-bold text-primary mb-10 text-center text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>
            {testimonialContent.heading}
          </h2>
        )}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-swiper"
        >
          {items.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl p-5 flex flex-col h-full" style={{
                background: '#08254f',
                border: '1.5px solid #00b2f4',
                boxShadow: '0 0 18px rgba(0,178,244,0.25)',
                minHeight: '280px'
              }}>
                <div className="flex items-center justify-between mb-3">
                  {t.img && (
                    <img src={t.img} alt={t.name}
                      className="w-20 h-20 rounded-full object-cover border-2"
                      style={{ borderColor: '#00b2f4' }} />
                  )}
                  <Stars n={t.stars} />
                </div>
                <p className="font-bold text-white text-sm mb-0.5">{t.name}</p>
                <p className="text-white/50 text-xs mb-3">{t.role}</p>
                <p className="text-white/80 text-sm leading-relaxed flex-1">{t.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
