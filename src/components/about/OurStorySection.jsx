import React from 'react';
import { Link } from 'react-router-dom';
import aboutUsBg from '@/assets/images/about/about-us-bg.jpg';
import aboutUsBgMob from '@/assets/images/about/about-us-bg-mob.jpg';

export default function OurStorySection({ content = {} }) {
  return (
    <section id="story" className="relative flex items-end md:items-center overflow-hidden min-h-[480px] md:min-h-[560px] lg:h-[720px]">
      <img src={aboutUsBg} alt="About KGK"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        style={{ objectPosition: 'bottom' }} />
      <img src={aboutUsBgMob} alt="About KGK"
        className="absolute inset-0 w-full h-full object-cover block md:hidden"
        style={{ objectPosition: 'center' }} />
      <div className="relative z-10 w-full py-10 md:pt-36 md:pb-14 lg:pt-[250px] lg:pb-10">
        <div className="container mx-auto px-4">
          <div className="flex md:justify-end">
            <div className="w-full md:w-[55%] lg:w-[42%] md:pl-[100px] lg:pl-0 md:pr-6 lg:pr-8">
              <h2 className="font-bold mb-4 text-[26px] md:text-[32px] lg:text-[40px]"
                style={{ color: '#00b2f4', letterSpacing: '1px' }}>
                {content.heading || 'Our Story'}
              </h2>
              <p className="leading-relaxed mb-3 text-sm md:text-[13px] lg:text-[15px]"
                style={{ color: 'rgba(255,255,255,0.85)' }}>
                {content.description || 'At KGK Academy, we are driven by one simple vision, to give the diamond and jewellery industry its next generation of skilled professionals.'}
              </p>
              <p className="leading-relaxed mb-6 text-sm md:text-[13px] lg:text-[15px]"
                style={{ color: 'rgba(255,255,255,0.85)' }}>
                {content.description_secondary || 'As a leading diamond and colourstone Training Institute in India, we combine knowledge, craftsmanship, and technology to help our students build strong, successful, and ethical careers.'}
              </p>
              <Link to={content.cta_url || '/courses'}
                className="inline-block px-6 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#009ed8]"
                style={{ backgroundColor: '#00b2f4' }}>
                Read More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

