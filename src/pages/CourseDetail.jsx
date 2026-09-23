import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { ChevronRight } from 'lucide-react';
import { allCoursesFlat } from '@/data/courses';
import useApiData from '@/hooks/useApiData';
import { getCourses, mediaUrl, unwrapData } from '@/services/api';

const CourseDetail = () => {
  const { slug } = useParams();
  const fallbackCourse = allCoursesFlat.find(c => c.slug === slug);
  const { data: apiCourses, loading } = useApiData(() => getCourses('per_page=100').then(unwrapData), []);
  const apiCourse = apiCourses.find((item) => {
    const itemSlug = item.slug || String(item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return itemSlug === slug;
  });
  const course = apiCourse ? {
    ...apiCourse,
    slug,
    image: mediaUrl(apiCourse.thumbnail || apiCourse.image),
    intro: apiCourse.short_description || apiCourse.description || '',
    duration: apiCourse.duration || apiCourse.course_duration || '',
    level: apiCourse.level || '',
  } : fallbackCourse;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading && !course) {
    return <div className="min-h-screen flex items-center justify-center">Loading course...</div>;
  }

  return (
    <MainLayout>
      {/* ── HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">Course Details</p>
          <h1 className="text-[26px] md:text-3xl lg:text-4xl font-bold text-white capitalize">
            {course?.title || slug?.replace(/-/g, ' ').replace(/surat|jaipur/g, '').trim()}
          </h1>
          {course && (
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <span className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                {course.duration}
              </span>
              <span className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                {course.level}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Course image */}
          {course?.image && (
            <div className="h-52 md:h-72 lg:h-80 rounded-lg overflow-hidden mb-8 md:mb-10">
              <img src={course.image} alt={course.title}
                className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-gray max-w-none">
            <p className="text-primary text-xs uppercase tracking-widest mb-2 font-semibold">Course Introduction</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {course?.intro || 'This comprehensive, industry-focused course is designed to provide complete knowledge and hands-on experience in the diamond and gemstone industry.'}
            </p>

            <h3 className="text-dark-navy font-bold text-base md:text-lg mb-3">What You Will Learn</h3>
            <ul className="space-y-2 mb-6">
              {['Diamond identification and quality assessment', 'Grading using industry-standard 4C methodology', 'Practical use of professional grading equipment', 'Industry exposure and factory visits', 'Career placement guidance'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="text-dark-navy font-bold text-base md:text-lg mb-3">Career Opportunities</h3>
            <ul className="space-y-2 mb-8">
              {['Diamond Grader', 'Quality Control Specialist', 'Gemstone Identifier', 'Diamond Trader', 'Lab Technician'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Link to="/contact-us" className="btn-primary inline-flex items-center justify-center gap-1 text-xs md:text-sm flex-1 md:flex-none px-3 md:px-5 py-2.5">
              ENROL NOW <ChevronRight size={14} />
            </Link>
            <Link to="/courses" className="btn-outline inline-flex items-center justify-center gap-1 text-xs md:text-sm flex-1 md:flex-none px-3 md:px-5 py-2.5">
              BACK TO COURSES
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseDetail;
