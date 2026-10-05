import React from 'react';
import whyIcon1 from '@/assets/images/why-choose-1.png';
import whyIcon2 from '@/assets/images/why-choose-2.png';
import whyIcon3 from '@/assets/images/why-choose-3.png';
import whyIcon4 from '@/assets/images/why-choose-4.png';
import useCmsPage from '@/hooks/useCmsPage';

const icons = [whyIcon1, whyIcon2, whyIcon3, whyIcon4];

export default function WhyLearnersSection() {
  const { content } = useCmsPage('home');
  const benefits = content.learner_benefits || {};
  const items = Object.keys(benefits)
    .map(key => {
      const match = key.match(/^benefit_(\d+)$/);
      return match && benefits[key] ? { id: Number(match[1]), label: benefits[key] } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  if (!benefits.heading && !benefits.intro && !benefits.conclusion && !items.length) return null;

  return (
    <section className="py-10 md:py-20" style={{ backgroundColor: '#08254f' }}>
      <div className="container-fluid text-center">
        {benefits.heading && <h2 className="font-bold text-white mb-3 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>{benefits.heading}</h2>}
        {benefits.intro && <p className="text-white text-md mb-1">{benefits.intro}</p>}
        {items.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto gap-4 md:gap-[45px]">
            {items.map((item, index) => (
              <div key={item.id} className="border border-white px-4 py-6 flex flex-col items-center gap-3 hover:border-[#00b2f4] transition-colors duration-300 group">
                {icons[index] && <img src={icons[index]} alt="" aria-hidden="true"
                  style={{ width: '70px', height: '80px', objectFit: 'contain' }} className="brightness-0 invert" />}
                <p className="text-white text-xs font-medium text-center leading-snug whitespace-pre-line">{item.label}</p>
              </div>
            ))}
          </div>
        )}
        {benefits.conclusion && <p className="text-white text-md mt-8 max-w-xl mx-auto leading-relaxed">{benefits.conclusion}</p>}
      </div>
    </section>
  );
}
