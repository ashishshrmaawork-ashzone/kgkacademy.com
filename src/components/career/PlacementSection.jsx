import React from 'react';
import {
  FaCheckCircle, FaBriefcase, FaHandshake, FaGraduationCap,
  FaChartLine, FaIndustry, FaGem, FaTools, FaSearch,
  FaPencilRuler, FaCogs, FaUsers,
} from 'react-icons/fa';

const assistanceIcons = [FaHandshake, FaUsers, FaGraduationCap, FaTools];
const pathwayIcons = [FaGem, FaSearch, FaCogs, FaChartLine, FaCheckCircle, FaGem, FaPencilRuler, FaIndustry];

const indexedFields = (content, pattern, valueForId) => Object.keys(content)
  .map(key => {
    const match = key.match(pattern);
    return match ? Number(match[1]) : null;
  })
  .filter((number, index, all) => number && all.indexOf(number) === index)
  .sort((a, b) => a - b)
  .map(number => ({ id: number, ...valueForId(number) }))
  .filter(item => Object.values(item).some(value => value !== item.id && value));

const PlacementSection = ({ assistance = {}, pathways = {} }) => {
  const items = indexedFields(assistance, /^assistance_(\d+)$/, number => ({ text: assistance[`assistance_${number}`] }));
  const paths = indexedFields(pathways, /^pathway_(\d+)$/, number => ({ label: pathways[`pathway_${number}`] }));
  if (!Object.keys(assistance).length && !Object.keys(pathways).length) return null;

  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ background: '#e8eef5' }}>
      <div className="container-fluid">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {(assistance.heading || assistance.description || items.length > 0) && (
            <div className="bg-dark-navy rounded-2xl p-6 md:p-8 lg:p-10 order-2 md:order-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 md:mb-5">
                <FaBriefcase size={22} className="text-[#00b2f4]" />
              </div>
              {assistance.heading && <h2 className="text-[20px] md:text-[24px] lg:text-[30px] font-bold text-white mb-3">{assistance.heading}</h2>}
              {assistance.description && <p className="text-white/60 text-sm leading-relaxed mb-5 md:mb-7">{assistance.description}</p>}
              {items.length > 0 && <div className="space-y-3 md:space-y-4">
                {items.map((item, index) => {
                  const Icon = assistanceIcons[index];
                  return <div key={item.id} className="flex items-start gap-3 md:gap-4">
                    {Icon && <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={14} className="text-[#00b2f4]" /></div>}
                    <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                  </div>;
                })}
              </div>}
            </div>
          )}
          {(pathways.eyebrow || pathways.heading || pathways.description || paths.length > 0) && (
            <div className="order-1 md:order-2">
              {pathways.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-2">{pathways.eyebrow}</p>}
              {pathways.heading && <h2 className="text-[20px] md:text-[26px] lg:text-[34px] font-bold text-dark-navy mb-3 leading-tight">{pathways.heading}</h2>}
              <div className="w-12 h-1 bg-primary mb-4 md:mb-6" />
              {pathways.description && <p className="text-gray-500 text-sm leading-relaxed mb-5 md:mb-7">{pathways.description}</p>}
              {paths.length > 0 && <div className="grid grid-cols-2 gap-2 md:gap-3">
                {paths.map((path, index) => {
                  const Icon = pathwayIcons[index];
                  return <div key={path.id} className="flex items-center gap-2 md:gap-3 bg-white border border-gray-100 rounded-xl px-3 md:px-4 py-2.5 md:py-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                    {Icon && <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-200"><Icon size={13} className="text-primary group-hover:text-white transition-colors duration-200" /></div>}
                    <p className="text-dark-navy text-[11px] md:text-xs font-semibold leading-tight">{path.label}</p>
                  </div>;
                })}
              </div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;
