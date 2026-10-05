import React from 'react';

const CoursesHero = ({ content = {} }) => {
  if (!content.eyebrow && !content.heading && !content.description) return null;

  return (
    <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #1abfdb 0%, transparent 50%)' }} />
      <div className="container mx-auto px-4 relative z-10 text-center">
        {content.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{content.eyebrow}</p>}
        {content.heading && <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold text-white">{content.heading}</h1>}
        {content.description && <p className="text-white/60 mt-4 text-sm max-w-xl mx-auto">{content.description}</p>}
      </div>
    </section>
  );
};

export default CoursesHero;
