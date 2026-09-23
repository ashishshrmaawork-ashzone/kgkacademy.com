import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';

const PAGE_SIZE = 9;

const TestimonialsGrid = ({ testimonials }) => {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const items = testimonials || [];
  const shown     = items.slice(0, visible);
  const hasMore   = visible < items.length;

  const loadMore = () => setVisible(prev => Math.min(prev + PAGE_SIZE, items.length));

  return (
    <section className="py-12 md:py-16 lg:py-20" style={{ background: '#e8eef5' }}>
      <div className="container-fluid">

        {/* Grid: 1 col mobile / 2 col tablet / 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {shown.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} idx={i} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-10 md:mt-12">
            <button
              onClick={loadMore}
              className="px-8 md:px-12 py-3 bg-primary text-white text-sm font-semibold uppercase tracking-widest border border-primary hover:bg-transparent hover:text-primary transition-all duration-200"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsGrid;
