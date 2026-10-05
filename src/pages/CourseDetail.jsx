import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { ChevronRight } from 'lucide-react';
import useApiData from '@/hooks/useApiData';
import { getCourses, mediaUrl, unwrapData } from '@/services/api';
import { courseText } from '@/utils/courseText';
import CourseImage from '@/components/courses/CourseImage';
import CourseMeta from '@/components/courses/CourseMeta';

const asList = value => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

const listText = value => (typeof value === 'string' ? value : value?.title || value?.description || value?.text || '');

const CourseDetail = () => {
  const { slug } = useParams();
  const { data: apiCourses, loading } = useApiData(() => getCourses('per_page=100').then(unwrapData), []);
  const course = apiCourses.find(item => {
    const itemSlug = item.slug || String(item.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return itemSlug === slug;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (course?.title) document.title = `${course.title} | KGK Academy`;
  }, [course]);

  if (loading && !course) {
    return <div className="min-h-screen flex items-center justify-center">Loading course...</div>;
  }

  if (!course) {
    return (
      <MainLayout>
        <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-[160px]">
          <div className="text-center">
            <p className="text-6xl font-bold text-primary mb-4">404</p>
            <h2 className="text-2xl font-bold text-dark-navy mb-3">Course Not Found</h2>
            <Link to="/courses" className="btn-primary">Back to Courses</Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  const outcomes = asList(course.outcomes).map(listText).filter(Boolean);
  const requirements = asList(course.requirements).map(listText).filter(Boolean);
  const intro = courseText(course.short_description) || courseText(course.description);
  const image = mediaUrl(course.thumbnail || course.image);

  return (
    <MainLayout>
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-[26px] md:text-3xl lg:text-4xl font-bold text-white capitalize">{course.title}</h1>
          <div className="flex justify-center mt-4 text-white/60"><CourseMeta duration={course.duration || course.course_duration} level={course.level} /></div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {image && <div className="h-52 md:h-72 lg:h-80 rounded-lg overflow-hidden mb-8 md:mb-10"><CourseImage src={image} title={course.title} className="w-full h-full object-cover" /></div>}
          {intro && <div className="prose prose-gray max-w-none mb-8"><p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{intro}</p></div>}

          {outcomes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-dark-navy font-bold text-base md:text-lg mb-3">Learning Outcomes</h2>
              <ul className="list-none space-y-2">
                {outcomes.map((item, index) => <li key={index} className="flex items-start gap-2 text-sm text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
          )}

          {requirements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-dark-navy font-bold text-base md:text-lg mb-3">Requirements</h2>
              <ul className="list-none space-y-2">
                {requirements.map((item, index) => <li key={index} className="flex items-start gap-2 text-sm text-gray-600"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />{item}</li>)}
              </ul>
            </div>
          )}

          <div className="flex gap-3">
            <Link to="/contact-us" className="btn-primary inline-flex items-center justify-center gap-1 text-xs md:text-sm flex-1 md:flex-none px-3 md:px-5 py-2.5">Enrol Now <ChevronRight size={14} /></Link>
            <Link to="/courses" className="btn-outline inline-flex items-center justify-center gap-1 text-xs md:text-sm flex-1 md:flex-none px-3 md:px-5 py-2.5">Back to Courses</Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default CourseDetail;
