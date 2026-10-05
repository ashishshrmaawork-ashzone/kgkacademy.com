import React from 'react';

const CoursesFilter = ({ cities, categories, activeCity, activeCategory, onCityChange, onCategoryChange, allLabel = 'All' }) => (
  <>
    {cities.length > 1 && (
      <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-4">
        {cities.map(city => (
          <button key={city} type="button" aria-pressed={activeCity === city} onClick={() => onCityChange(city)}
            className={`px-6 md:px-10 py-2.5 text-sm font-semibold uppercase tracking-widest border transition-all duration-200 ${activeCity === city ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-dark-navy border-gray-300 hover:border-primary hover:text-primary'}`}>
            {city}
          </button>
        ))}
      </div>
    )}
    {categories.length > 1 && (
      <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
        {[{ key: 'all', label: allLabel }, ...categories].map(category => (
          <button key={category.key} type="button" aria-pressed={activeCategory === category.key} onClick={() => onCategoryChange(category.key)}
            className={`px-4 md:px-6 py-2 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${activeCategory === category.key ? 'bg-[#08254f] text-white border-[#08254f] shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#08254f] hover:text-[#08254f]'}`}>
            {category.label}
          </button>
        ))}
      </div>
    )}
  </>
);

export default CoursesFilter;
