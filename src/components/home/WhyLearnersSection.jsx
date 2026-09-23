import React from 'react';
import whyIcon1 from '@/assets/images/why-choose-1.png';
import whyIcon2 from '@/assets/images/why-choose-2.png';
import whyIcon3 from '@/assets/images/why-choose-3.png';
import whyIcon4 from '@/assets/images/why-choose-4.png';
import useCmsPage from '@/hooks/useCmsPage';

const whyItems = [
  { icon: whyIcon1, label: 'Hands-On\nTraining' },
  { icon: whyIcon2, label: 'Modern\nTools' },
  { icon: whyIcon3, label: 'Live\nDemonstrations' },
  { icon: whyIcon4, label: 'Guidance From\nExperienced Professionals' },
];

export default function WhyLearnersSection() {
  const { content } = useCmsPage('home');
  const benefits = content.learner_benefits || {};
  const items = whyItems.map((item, index) => ({ ...item, label: benefits[`benefit_${index + 1}`] || item.label }));
  return (
    <section className="py-10 md:py-20" style={{ backgroundColor: '#08254f' }}>
      <div className="container-fluid text-center">
        <h2 className="font-bold text-white mb-3 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>
          {benefits.heading || 'Why Learners Choose Us?'}
        </h2>
        <p className="text-white text-md mb-1">
          {benefits.intro || 'What makes KGK Academy different is our strong focus on practical learning and real industry exposure.'}
        </p>
        <p className="text-white text-sm mb-10">Students learn through:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 max-w-4xl mx-auto gap-4 md:gap-[45px]">
          {items.map((item, i) => (
            <div key={i} className="border border-white px-4 py-6 flex flex-col items-center gap-3 hover:border-[#00b2f4] transition-colors duration-300 group">
              <img src={item.icon} alt={item.label}
                style={{ width: '70px', height: '80px', objectFit: 'contain' }}
                className="brightness-0 invert" />
              <p className="text-white text-xs font-medium text-center leading-snug whitespace-pre-line">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="text-white text-md mt-8 max-w-xl mx-auto leading-relaxed">
          {benefits.conclusion || 'Along with technical skills, we also focus on building discipline, confidence, and professional readiness to help learners succeed in their chosen career paths.'}
        </p>
      </div>
    </section>
  );
}
