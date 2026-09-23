import React from 'react';

const statsDefaults = [
  { value: '500+', label: 'Students Placed' },
  { value: '100+', label: 'Hiring Partners' },
  { value: '95%',  label: 'Placement Rate' },
  { value: '15+',  label: 'Years of Excellence' },
];

const CareerHero = ({ content = {} }) => {
  const stats = [1, 2, 3, 4].map((i) => ({ value: content[`stat_${i}_value`] || statsDefaults[i - 1].value, label: content[`stat_${i}_label`] || statsDefaults[i - 1].label }));
  return (
  <section
    className="relative pt-[170px] pb-14 md:pt-[175px] md:pb-20 overflow-hidden"
    style={{ background: 'linear-gradient(135deg, #061322 0%, #0d1b2e 50%, #061322 100%)' }}
  >
    <div
      className="absolute inset-0 opacity-15"
      style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #1c53a5 0%, transparent 55%), radial-gradient(circle at 20% 70%, #00b2f4 0%, transparent 45%)' }}
    />
    <div className="container-fluid relative z-10 text-center max-w-3xl mx-auto">
      <p className="text-[#00b2f4] text-xs uppercase tracking-[0.3em] mb-3">{content.eyebrow || "Your Future Starts Here"}</p>
      <h1 className="text-[24px] md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-5 leading-tight">
        {content.heading || "Career & Placement Support"}
      </h1>
      <p className="text-white/70 text-sm md:text-base leading-relaxed">
        {content.description || "At KGK Academy we are committed not just to education, but to transforming it into real career opportunities. Strong industry integration, practical skill development, and personalised mentorship prepare our students to confidently enter and grow in the global gem and jewellery industry."}
      </p>
    </div>

    {/* Stats Strip */}
    <div className="container-fluid relative z-10 mt-10 md:mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm py-5 md:py-6 px-3 md:px-4 text-center hover:bg-primary/10 transition-colors duration-200">
            <p className="text-[#00b2f4] text-2xl md:text-4xl font-bold leading-none mb-1">{s.value}</p>
            <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default CareerHero;





