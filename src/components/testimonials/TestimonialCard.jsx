import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { mediaUrl } from '@/services/api';

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} size={13} className={i < count ? 'text-yellow-400' : 'text-gray-300'} />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col gap-3">
    <FaQuoteLeft className="text-primary/30" size={20} />
    <div>
      <h4 className="font-bold text-dark-navy text-sm md:text-base mb-1">{testimonial.title}</h4>
      <StarRating count={testimonial.stars} />
    </div>
    <p className="text-gray-600 text-sm leading-relaxed flex-1">{testimonial.text}</p>
    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
      <div className="flex items-center gap-2.5">
        {testimonial.avatar && (
          <img
            src={mediaUrl(testimonial.avatar)}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div>
          <p className="font-semibold text-dark-navy text-sm leading-tight">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.role}</p>
          <p className="text-primary text-xs font-medium">{testimonial.city}</p>
        </div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
