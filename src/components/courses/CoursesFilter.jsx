import React from 'react';

const locations = [
  { key: 'surat', label: 'Surat' },
  { key: 'jaipur', label: 'Jaipur' },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'colorstone', label: 'Colorstone' },
  { key: 'diamond', label: 'Diamond' },
];

const CoursesFilter = ({ activeCity, activeCategory, onCityChange, onCategoryChange }) => (
  <div className="mb-8 md:mb-10">
    <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-4" aria-label="Choose a course location">
      {locations.map(location => (
        <button
          key={location.key}
          type="button"
          aria-pressed={activeCity === location.key}
          onClick={() => onCityChange(location.key)}
          className={`px-6 md:px-10 py-2.5 text-sm font-semibold uppercase tracking-widest border transition-all duration-200 ${activeCity === location.key ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-dark-navy border-gray-300 hover:border-primary hover:text-primary'}`}
        >
          {location.label}
        </button>
      ))}
    </div>

    <div className="flex justify-center flex-wrap gap-2 md:gap-3" aria-label="Filter courses by category">
      {categories.map(category => (
        <button
          key={category.key}
          type="button"
          aria-pressed={activeCategory === category.key}
          onClick={() => onCategoryChange(category.key)}
          className={`px-4 md:px-6 py-2 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${activeCategory === category.key ? 'bg-[#08254f] text-white border-[#08254f] shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-[#08254f] hover:text-[#08254f]'}`}
        >
          {category.label}
        </button>
      ))}
    </div>
  </div>
);

export default CoursesFilter;
