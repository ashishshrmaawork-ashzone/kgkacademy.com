import React from 'react';
import { FaUserTie, FaChartLine, FaIndustry, FaAward } from 'react-icons/fa';

const icons = [FaAward, FaUserTie, FaIndustry, FaChartLine];

const CareerSupportSection = ({ content = {} }) => {
  const steps = Object.keys(content)
    .map(key => {
      const match = key.match(/^item_(\d+)_(title|description)$/);
      return match ? Number(match[1]) : null;
    })
    .filter((number, index, all) => number && all.indexOf(number) === index)
    .sort((a, b) => a - b)
    .map(number => ({ id: number, title: content[`item_${number}_title`], description: content[`item_${number}_description`] }))
    .filter(step => step.title || step.description);

  if (!content.heading && !content.introduction && !content.conclusion && !steps.length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-fluid">
        {(content.heading || content.introduction) && (
          <div className="text-center mb-8 md:mb-12">
            {content.heading && <h2 className="text-[22px] md:text-[30px] lg:text-[40px] font-bold text-dark-navy">{content.heading}</h2>}
            <div className="w-16 h-1 bg-primary mx-auto mt-3 mb-4" />
            {content.introduction && <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">{content.introduction}</p>}
          </div>
        )}
        {steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={step.id} className="group border border-gray-100 rounded-xl p-5 md:p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
                  {Icon && <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300"><Icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" /></div>}
                  {step.title && <h3 className="font-bold text-dark-navy text-sm md:text-base mb-2">{step.title}</h3>}
                  {step.description && <p className="text-gray-500 text-sm leading-relaxed flex-1">{step.description}</p>}
                </div>
              );
            })}
          </div>
        )}
        {content.conclusion && <p className="text-gray-600 text-sm md:text-base text-center mt-8 md:mt-10">{content.conclusion}</p>}
      </div>
    </section>
  );
};

export default CareerSupportSection;
