import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import CoursesHero   from '@/components/courses/CoursesHero';
import CoursesFilter from '@/components/courses/CoursesFilter';
import CoursesGrid   from '@/components/courses/CoursesGrid';
import useApiData from '@/hooks/useApiData';
import { getCourses, mediaUrl, unwrapData } from '@/services/api';
import { courseText } from '@/utils/courseText';
import useCmsPage from '@/hooks/useCmsPage';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const cityParam = searchParams.get('city')?.trim().toLowerCase();
  const activeCity = cityParam === 'jaipur' ? 'jaipur' : 'surat';
  const { data: apiCourses, loading } = useApiData(
    () => getCourses('per_page=100').then(unwrapData),
    []
  );
  const { page: pageMeta } = useCmsPage('courses');
  const pageContent = pageMeta?.content || {};
  const hero = pageContent.hero || {};
  const listing = pageContent.course_listing || {};

  useEffect(() => {
    setActiveCategory('all');
  }, [activeCity]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta(pageMeta?.meta_title, pageMeta?.meta_description);

  const handleCityChange = (city) => {
    setActiveCategory('all');
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('city', city);
      return nextParams;
    });
  };

  const normalizeCategory = (category) => {
    const normalized = String(category || '').toLowerCase().replace(/[^a-z]/g, '');
    if (normalized.includes('diamond')) return 'diamond';
    if (normalized.includes('colorstone') || normalized.includes('gemstone') || normalized.includes('jewellerydesign') || normalized.includes('jewelrydesign')) {
      return 'colorstone';
    }
    return normalized;
  };

  const coursesFromApi = apiCourses.map((course) => ({
    ...course,
    slug: course.slug || String(course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: course.title,
    city: course.city || course.branch_name || '',
    category: normalizeCategory(course.category || course.category_name),
    image: mediaUrl(course.thumbnail || course.image),
    intro: courseText(course.short_description) || courseText(course.description),
    duration: course.duration || course.course_duration || '',
    level: course.level || '',
  }));
  const selectedCity = activeCity === 'jaipur' ? 'Jaipur' : 'Surat';
  const courses = coursesFromApi.filter(course =>
    (!course.city || String(course.city).toLowerCase().includes(activeCity)) &&
    (activeCategory === 'all' || course.category === activeCategory)
  );

  return (
    <MainLayout>
      <CoursesHero content={hero} />

      <section className="bg-white py-8 md:py-10">
        <div className="container mx-auto px-4">
          <CoursesFilter
            activeCity={activeCity}
            activeCategory={activeCategory}
            onCityChange={handleCityChange}
            onCategoryChange={setActiveCategory}
          />
          <div key={activeCity + ":" + activeCategory} className="course-results-enter">
            {loading ? <p className="text-center text-gray-500">{listing.loading_message || 'Loading courses...'}</p> : (
              <>
                <p className="sr-only" role="status" aria-live="polite">{selectedCity} - {courses.length} {listing.course_count_label}</p>
                <CoursesGrid courses={courses} emptyMessage={listing.empty_message} />
              </>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Courses;
