import React from 'react';
import {
  FaCheckCircle, FaBriefcase, FaHandshake, FaGraduationCap,
  FaChartLine, FaIndustry, FaGem, FaTools, FaSearch,
  FaPencilRuler, FaCogs, FaUsers,
} from 'react-icons/fa';

const placementItems = [
  { icon: FaHandshake,     text: 'Placement drives and campus interviews with top companies' },
  { icon: FaUsers,         text: 'Referral to partner firms in manufacturing, grading, retail & exports' },
  { icon: FaGraduationCap, text: 'Internship opportunities for skill-based course graduates' },
  { icon: FaTools,         text: 'Soft skills and professional etiquette training' },
];

const careerPaths = [
  { icon: FaGem,         label: 'Diamond Grader' },
  { icon: FaSearch,      label: 'Rough Planner / Marker' },
  { icon: FaCogs,        label: 'Polishing Artisan' },
  { icon: FaChartLine,   label: 'Valuation Expert' },
  { icon: FaCheckCircle, label: 'Quality Control Specialist' },
  { icon: FaGem,         label: 'Gemstone Identifier' },
  { icon: FaPencilRuler, label: 'Jewellery Designer' },
  { icon: FaIndustry,    label: 'Manufacturing Professional' },
];

const PlacementSection = ({ assistance = {}, pathways = {} }) => {
  const items = [1, 2, 3, 4].map((i) => ({ ...placementItems[i - 1], text: assistance[`assistance_${i}`] || placementItems[i - 1].text }));
  const paths = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ ...careerPaths[i - 1], label: pathways[`pathway_${i}`] || careerPaths[i - 1].label }));
  return (
  <section className="py-12 md:py-16 lg:py-20" style={{ background: '#e8eef5' }}>
    <div className="container-fluid">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">

        {/* Placement Assistance card */}
        <div className="bg-dark-navy rounded-2xl p-6 md:p-8 lg:p-10 order-2 md:order-1">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 md:mb-5">
            <FaBriefcase size={22} className="text-[#00b2f4]" />
          </div>
          <h2 className="text-[20px] md:text-[24px] lg:text-[30px] font-bold text-white mb-3">
            Placement Assistance
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-5 md:mb-7">
            Our dedicated placement team works closely with leading industry players to connect students with the right opportunities ??? from internships to full-time roles.
          </p>
          <div className="space-y-3 md:space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon size={14} className="text-[#00b2f4]" />
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Pathways */}
        <div className="order-1 md:order-2">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-2">{pathways.eyebrow || "After Graduation"}</p>
          <h2 className="text-[20px] md:text-[26px] lg:text-[34px] font-bold text-dark-navy mb-3 leading-tight">
            {pathways.heading || "Career Pathways Open to You"}
          </h2>
          <div className="w-12 h-1 bg-primary mb-4 md:mb-6" />
          <p className="text-gray-500 text-sm leading-relaxed mb-5 md:mb-7">
            {pathways.description || "Depending on the course pursued, our graduates step into diverse roles across the gem and jewellery value chain."}
          </p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {paths.map((path, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 bg-white border border-gray-100 rounded-xl px-3 md:px-4 py-2.5 md:py-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-200">
                  <path.icon size={13} className="text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <p className="text-dark-navy text-[11px] md:text-xs font-semibold leading-tight">{path.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};

export default PlacementSection;





