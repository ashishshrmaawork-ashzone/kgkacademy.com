import React from 'react';
import useCmsPage from '@/hooks/useCmsPage';
import { mediaUrl } from '@/services/api';

export default function FacilitiesSection() {
  const { content } = useCmsPage('home');
  const facilities = content.facilities || {};
  if (!facilities.background_image && !facilities.heading && !facilities.description) return null;

  return (
    <section className="relative overflow-hidden min-h-[320px] md:min-h-[480px]">
      {facilities.background_image && <img src={mediaUrl(facilities.background_image)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
      <div className="relative z-10 h-full flex items-center justify-end min-h-[320px] md:min-h-[480px]">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <div className="w-full md:w-1/2 py-16 text-right">
              {facilities.heading && <h2 className="font-bold mb-5 text-[26px] md:text-[40px]" style={{ letterSpacing: '1px', color: '#305eaf' }}>{facilities.heading}</h2>}
              {facilities.description && <p className="leading-relaxed" style={{ fontSize: '16px', color: '#474747' }}>{facilities.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
