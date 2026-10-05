import React from 'react';

const CareerHero = ({ content = {} }) => {
  const stats = Object.keys(content)
    .map(key => {
      const match = key.match(/^stat_(\d+)_(value|label)$/);
      return match ? Number(match[1]) : null;
    })
    .filter((number, index, all) => number && all.indexOf(number) === index)
    .sort((a, b) => a - b)
    .map(number => ({ id: number, value: content[`stat_${number}_value`], label: content[`stat_${number}_label`] }))
    .filter(stat => stat.value || stat.label);

  if (!content.eyebrow && !content.heading && !content.description && !stats.length) return null;

  return (
    <section className="relative pt-[170px] pb-14 md:pt-[175px] md:pb-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #061322 0%, #0d1b2e 50%, #061322 100%)' }}>
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #1c53a5 0%, transparent 55%), radial-gradient(circle at 20% 70%, #00b2f4 0%, transparent 45%)' }} />
      <div className="container-fluid relative z-10 text-center max-w-3xl mx-auto">
        {content.eyebrow && <p className="text-[#00b2f4] text-xs uppercase tracking-[0.3em] mb-3">{content.eyebrow}</p>}
        {content.heading && <h1 className="text-[24px] md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 leading-tight">{content.heading}</h1>}
        {content.description && <p className="text-white/70 text-sm md:text-base leading-relaxed">{content.description}</p>}
      </div>
      {stats.length > 0 && (
        <div className="container-fluid relative z-10 mt-10 md:mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
            {stats.map(stat => (
              <div key={stat.id} className="bg-white/5 backdrop-blur-sm py-5 md:py-6 px-3 md:px-4 text-center hover:bg-primary/10 transition-colors duration-200">
                {stat.value && <p className="text-[#00b2f4] text-2xl md:text-4xl font-bold leading-none mb-1">{stat.value}</p>}
                {stat.label && <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">{stat.label}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CareerHero;
