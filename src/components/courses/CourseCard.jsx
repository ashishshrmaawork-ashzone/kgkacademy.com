import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CourseCard = ({ course }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/30 group flex flex-col">
    <div className="h-44 md:h-40 overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <div className="p-4 md:p-5 flex-1">
      <h3 className="text-dark-navy font-bold text-base md:text-lg mb-2 group-hover:text-primary transition-colors duration-200">
        {course.title}
      </h3>
      <p className="text-primary text-xs uppercase tracking-wider mb-2 font-semibold">Course Introduction</p>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
        {course.intro}
      </p>
      <div className="flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          {course.duration}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          {course.level}
        </span>
      </div>
    </div>

    <div className="px-4 md:px-5 pb-4 md:pb-5">
      <Link
        to={`/courses/${course.slug}`}
        className="btn-primary inline-flex items-center gap-2 text-xs"
      >
        READ MORE... <ChevronRight size={14} />
      </Link>
    </div>
  </div>
);

export default CourseCard;
