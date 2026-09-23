import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const CareerCTA = ({ content = {} }) => (
  <section className="py-12 md:py-14 lg:py-16" style={{ backgroundColor: 'rgb(8, 37, 79)' }}>
    <div className="container-fluid text-center">
      <h2 className="text-[20px] md:text-2xl lg:text-3xl font-bold text-white mb-3">
        {content.heading || "Ready to Launch Your Career?"}
      </h2>
      <p className="text-white/80 text-sm md:text-base mb-6 md:mb-7 max-w-xl mx-auto">
        {content.description || "Enrol in a course today and let KGK Academy guide you from classroom to career."}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
        <Link
          to={content.primary_button_url || "/courses"}
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-white text-primary font-bold text-sm uppercase tracking-widest hover:bg-white/90 transition-colors duration-200"
        >
          {content.primary_button_label || "Explore Courses"} <FaChevronRight size={12} />
        </Link>
        <Link
          to={content.secondary_button_url || "/contact-us"}
          className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 border-2 border-white text-white font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-200"
        >
          {content.secondary_button_label || "Contact Us"} <FaChevronRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

export default CareerCTA;


