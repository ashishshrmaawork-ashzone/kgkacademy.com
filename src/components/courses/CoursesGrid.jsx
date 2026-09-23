import React from 'react';
import CourseCard from './CourseCard';

const CoursesGrid = ({ courses }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
    {courses.length > 0 ? (
      courses.map(course => <CourseCard key={course.slug} course={course} />)
    ) : (
      <div className="col-span-full text-center py-16 text-gray-400 text-sm">
        No courses found for this category.
      </div>
    )}
  </div>
);

export default CoursesGrid;
