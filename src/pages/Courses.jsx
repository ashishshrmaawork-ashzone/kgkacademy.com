import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import CoursesHero   from '@/components/courses/CoursesHero';
import CoursesFilter from '@/components/courses/CoursesFilter';
import CoursesGrid   from '@/components/courses/CoursesGrid';
import { allCourses } from '@/data/courses';
import useApiData from '@/hooks/useApiData';
import { getCourses, mediaUrl, unwrapData } from '@/services/api';

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCity, setActiveCity]         = useState(searchParams.get('city') === 'jaipur' ? 'jaipur' : 'surat');
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: apiCourses } = useApiData(
    () => getCourses('per_page=100').then(unwrapData),
    []
  );

  useEffect(() => {
    const cityFromUrl = searchParams.get('city');
    if (cityFromUrl === 'jaipur' || cityFromUrl === 'surat') {
      setActiveCity(cityFromUrl);
      setActiveCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta('Our Courses', 'Explore diamond grading, rough diamond manufacturing, gemstone identification, and jewellery design courses at KGK Academy in Surat and Jaipur.');

  const handleCityChange = (city) => {
    setActiveCity(city);
    setActiveCategory('all');
    setSearchParams({ city });
  };

  const fallbackCourses = (allCourses[activeCity] || []);
  const coursesFromApi = apiCourses.map((course) => ({
    ...course,
    slug: course.slug || String(course.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: course.title,
    city: course.city || course.branch_name || activeCity,
    category: String(course.category || course.category_name || '').toLowerCase(),
    image: mediaUrl(course.thumbnail || course.image),
    intro: course.short_description || course.description || '',
    duration: course.duration || course.course_duration || '',
    level: course.level || '',
  }));
  const hasCityData = coursesFromApi.some(c => c.city && c.city !== activeCity);
  const cityCourses = hasCityData
    ? coursesFromApi.filter(c => c.city.toLowerCase().includes(activeCity))
    : coursesFromApi;
  const courses = (coursesFromApi.length ? cityCourses : fallbackCourses).filter(c =>
    activeCategory === 'all' || c.category === activeCategory
  );

  return (
    <MainLayout>
      <CoursesHero />

      <section className="bg-white py-8 md:py-10">
        <div className="container mx-auto px-4">
          <CoursesFilter
            activeCity={activeCity}
            activeCategory={activeCategory}
            onCityChange={handleCityChange}
            onCategoryChange={setActiveCategory}
          />
          <CoursesGrid courses={courses} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Courses;
