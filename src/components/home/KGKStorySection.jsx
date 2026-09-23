import React from 'react';
import academyStory1 from '@/assets/images/academy-story-1.jpg';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function KGKStorySection() {
  const { content } = useCmsPage('home');
  const story = content.academy_story || {};
  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-bold text-primary mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px' }}>
              {story.heading || 'The KGK Academy Story'}
            </h2>
            <p className="leading-relaxed mb-4" style={{ fontSize: '16px', color: '#474747' }}>
              {story.description || 'KGK Academy was created with a simple vision, to bridge the gap between education and the gems and jewellery industry. Backed by the legacy of KGK Group, our academy combines decades of industry experience with modern learning methods to prepare students for meaningful and long-term careers.'}
            </p>
            <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>
              {story.description_secondary || 'With strong industry integration, practical skill development, and strong industry integration, we focus on helping learners build meaningful and long-term careers.'}
            </p>
          </div>
          <div className="rounded overflow-hidden shadow-md h-[220px] md:h-[400px]">
            <img src={mediaUrl(story.image) || academyStory1} alt="KGK Academy Story"
              className="w-full h-full hover:scale-105 transition-transform duration-500" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
