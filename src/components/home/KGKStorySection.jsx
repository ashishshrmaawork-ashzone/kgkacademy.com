import React from 'react';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function KGKStorySection() {
  const { content } = useCmsPage('home');
  const story = content.academy_story || {};
  if (!story.heading && !story.description && !story.description_secondary && !story.image) return null;

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            {story.heading && <h2 className="font-bold text-primary mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>{story.heading}</h2>}
            {story.description && <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>{story.description}</p>}
            {story.description_secondary && <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>{story.description_secondary}</p>}
          </div>
          {story.image && (
            <div className="rounded overflow-hidden shadow-md h-[220px] md:h-[400px]">
              <img src={mediaUrl(story.image)} alt={story.heading || ''} className="w-full h-full hover:scale-105 transition-transform duration-500" style={{ objectFit: 'cover' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
