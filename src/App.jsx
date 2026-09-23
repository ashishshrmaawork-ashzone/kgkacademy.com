import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CareerPlacement = lazy(() => import('./pages/CareerPlacement'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const EventsActivities = lazy(() => import('./pages/EventsActivities'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Faqs = lazy(() => import('./pages/Faqs'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-navy">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-primary text-sm uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/career-placement" element={<CareerPlacement />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/events-activities" element={<EventsActivities />} />
          <Route path="/events-activities/:slug" element={<EventDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
