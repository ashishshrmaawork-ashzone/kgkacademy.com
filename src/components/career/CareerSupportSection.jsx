import React from 'react';
import { FaUserTie, FaChartLine, FaIndustry, FaAward } from 'react-icons/fa';

const supportSteps = [
  {
    icon: FaAward,
    title: 'Mock Interviews & Workshops',
    desc: 'Conducting mock interviews and resume-building workshops to prepare students for real-world hiring processes.',
  },
  {
    icon: FaUserTie,
    title: 'One-on-One Counselling',
    desc: 'Offering one-on-one career counselling to help each student identify their strengths and ideal career direction.',
  },
  {
    icon: FaIndustry,
    title: 'Live Market Exposure',
    desc: 'Providing exposure to live market scenarios through factory visits, trade events, and industry interactions.',
  },
  {
    icon: FaChartLine,
    title: 'Employment & Entrepreneurship',
    desc: 'Mentoring for both employment and entrepreneurship so every student can pursue the path that suits them best.',
  },
];

const CareerSupportSection = ({ content = {} }) => {
  const steps = [1, 2, 3, 4].map((i) => ({ ...supportSteps[i - 1], title: content[`item_${i}_title`] || supportSteps[i - 1].title, desc: content[`item_${i}_description`] || supportSteps[i - 1].desc }));
  return (
  <section className="py-12 md:py-16 lg:py-20 bg-white">
    <div className="container-fluid">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-[22px] md:text-[30px] lg:text-[40px] font-bold text-dark-navy">
          {content.heading || "Career Support & Guidance"}
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto mt-3 mb-4" />
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
          {content.introduction || "We guide every student through a personalized career path by:"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {steps.map((step, i) => (
          <div key={i} className="group border border-gray-100 rounded-xl p-5 md:p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
              <step.icon size={20} className="text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="font-bold text-dark-navy text-sm md:text-base mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-1">{step.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-gray-600 text-sm md:text-base text-center mt-8 md:mt-10">
        {content.conclusion || "Our goal is to help each learner understand their potential and map it to the right industry role."}
      </p>
    </div>
  </section>
  );
};

export default CareerSupportSection;





