import React from 'react';
import courseIcon1 from '@/assets/images/course-icon-1.png';
import courseIcon2 from '@/assets/images/course-icon-2.png';
import courseIcon3 from '@/assets/images/course-icon-3.png';
import courseIcon4 from '@/assets/images/course-icon-4.png';
import courseIcon5 from '@/assets/images/course-icon-5.png';
import courseIcon6 from '@/assets/images/course-icon-6.png';
import courseIcon7 from '@/assets/images/course-icon-7.png';
import courseIcon8 from '@/assets/images/course-icon-8.png';
import useCmsPage from '@/hooks/useCmsPage';

const courseIcons = [
  { label: 'Diamond Grading Course',           icon: courseIcon1 },
  { label: 'Rough Diamond Polishing',          icon: courseIcon2 },
  { label: 'Rough Diamond Marking',            icon: courseIcon3 },
  { label: 'Rough Diamond Assortment',         icon: courseIcon4 },
  { label: 'Laser Sawing',                     icon: courseIcon5 },
  { label: 'Rough Diamond Scanning',           icon: courseIcon6 },
  { label: 'Color Gemstones Identification',   icon: courseIcon7 },
  { label: 'Jewellery Design & Manufacturing', icon: courseIcon8 },
];

export default function CourseIconBar() {
  const { content } = useCmsPage('home');
  const categories = content.course_categories || {};
  const items = courseIcons.map((item, index) => ({
    ...item,
    label: categories[`category_${index + 1}`] || item.label,
  }));
  return (
    <section className="relative z-20 -mt-[100px]">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto md:overflow-visible py-5 -my-5">
          <div className="bg-white shadow-2xl min-w-[820px] md:min-w-0">
            <div className="flex">
              {items.map((c, i) => (
                <button
                  key={i}
                  className="group relative flex flex-col items-center justify-center gap-2 px-3 py-5 flex-1 min-w-[100px] border-r border-gray-200 last:border-r-0 bg-white transition-all duration-300 hover:bg-[#1a3a6b] hover:py-8 hover:-my-5 hover:z-10 hover:shadow-2xl"
                >
                  <img
                    src={c.icon}
                    alt={c.label}
                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    className="transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                  />
                  <span className="text-[11px] text-center leading-snug font-medium text-gray-500 group-hover:text-white transition-colors duration-200 max-w-[85px]">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
