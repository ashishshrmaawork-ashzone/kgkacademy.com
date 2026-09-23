import React from 'react';

const CATEGORIES = [
  { key: 'all', label: 'All Courses' },
  { key: 'diamond', label: 'Diamond' },
  { key: 'colorstone', label: 'Colorstone' },
];

const CoursesFilter = ({ activeCity, activeCategory, onCityChange, onCategoryChange }) => (
  <>
    {/* City Tabs */}
    <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-4">
      {['surat', 'jaipur'].map(city => (
        <button
          key={city}
          onClick={() => onCityChange(city)}
          className={`px-6 md:px-10 py-2.5 text-sm font-semibold uppercase tracking-widest border transition-all duration-200 ${
            activeCity === city
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-dark-navy border-gray-300 hover:border-primary hover:text-primary'
          }`}
        >
          {city.charAt(0).toUpperCase() + city.slice(1)}
        </button>
      ))}
    </div>

    {/* Category Tabs */}
    <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
      {CATEGORIES.map(cat => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-4 md:px-6 py-2 text-xs font-semibold uppercase tracking-widest border transition-all duration-200 ${
            activeCategory === cat.key
              ? 'bg-[#08254f] text-white border-[#08254f]'
              : 'bg-white text-gray-500 border-gray-200 hover:border-[#08254f] hover:text-[#08254f]'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  </>
);

export default CoursesFilter;
