import React from 'react';

const TestimonialsHero = ({ content = {} }) => (
  <section
    className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #0d1b2e 0%, #1a2f4a 50%, #0a1628 100%)' }}
  >
    <div
      className="absolute inset-0 opacity-10"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #1abfdb 0%, transparent 50%)' }}
    />
    <div className="container-fluid relative z-10 text-center">
      {content.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{content.eyebrow}</p>}
      {content.heading && <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold text-white mb-4">{content.heading}</h1>}
      <p className="text-white/60 text-sm max-w-xl mx-auto">
        {content.description}
      </p>
    </div>
  </section>
);

export default TestimonialsHero;
