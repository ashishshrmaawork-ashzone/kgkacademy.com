import React from 'react';
import { Link } from 'react-router-dom';
import kgkFoundationImg from '@/assets/images/about/KGK-Foundation.jpg';
import { mediaUrl } from '@/services/api';

export default function KGKFoundationSection({ content = {} }) {
  return (
    <section id="foundation" className="py-10 md:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="font-bold mb-4 text-[26px] md:text-[32px] lg:text-[40px]"
              style={{ letterSpacing: '1px', color: '#1c53a5' }}>
              {content.heading || 'KGK Foundation'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {content.description || "At KGK Academy, our learning philosophy is shaped by the larger vision of KGK Foundation, a vision that believes in empowering individuals through skill-based education. The foundation is committed to creating opportunities that go beyond short-term learning, focusing instead on long-term growth, independence, and meaningful progress."}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {content.description_secondary || "By providing industry-relevant training, KGK Foundation works to bridge the gap between education and employment. This approach is deeply embedded in the way KGK Academy operates. Students here are trained using real tools, guided by experienced professionals, and exposed to industry practices that prepare them for actual roles."}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {content.description_final || "Whether a learner joins a Diploma in Diamond, a Diploma in Diamond Grading, a Professional Diploma in Gemstone, or any other course at our institute, each program is built on the foundation's philosophy of purpose-driven education."}
            </p>
            <Link to={content.cta_url || "/courses"}
              className="inline-block px-6 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: '#08254f' }}>
              {content.cta_label || 'Read More...'}
            </Link>
          </div>
          <div className="h-60 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md">
            <img src={mediaUrl(content.image) || kgkFoundationImg} alt="KGK Foundation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
