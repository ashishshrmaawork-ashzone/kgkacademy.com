import React, { useState, useEffect } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import usePageContent from '@/hooks/usePageContent';
import { ChevronDown, ChevronUp } from 'lucide-react';
import useApiData from '@/hooks/useApiData';
import { getFaqs, unwrapData } from '@/services/api';

const FaqItem = ({ q, a, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="rounded-xl overflow-hidden mb-3 transition-all duration-300"
      style={{ backgroundColor: open ? '#325baa' : '#0d1b2e' }}
    >
      <button
        className="w-full flex justify-between items-center px-5 md:px-6 py-4 md:py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className={`text-sm md:text-base leading-snug pr-2 ${open ? 'text-white font-semibold' : 'text-white/85 font-medium'}`}>
          {q}
        </span>
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
          {open
            ? <ChevronUp size={16} className="text-white" />
            : <ChevronDown size={16} className="text-white/70" />
          }
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
        <p className="px-5 md:px-6 pb-5 text-white/80 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const content = usePageContent('faqs');
  const listing = content.faq_listing || {};
  const { data: apiFaqs, loading } = useApiData(() => getFaqs().then(unwrapData), []);
  const dynamicCategories = apiFaqs.map((category) => category.name).filter(Boolean);
  const categories = dynamicCategories;

  useEffect(() => {
    if (!activeCategory && categories.length) {
      setActiveCategory(categories[0]);
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta('FAQs', content.hero?.description || 'Find answers to frequently asked questions about KGK Academy courses, admissions, fees, placement support, and more.');

  const dynamicCategory = apiFaqs.find((category) => category.name === activeCategory);
  const items = dynamicCategory
    ? (dynamicCategory.items || []).map((item) => ({ q: item.question, a: item.answer }))
    : [];

  return (
    <MainLayout>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-dark-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, #1c53a5 0%, transparent 60%)' }}
        />
        <div className="container-fluid relative z-10 text-center max-w-2xl mx-auto">
          {content.hero?.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{content.hero.eyebrow}</p>}
          {content.hero?.heading && <h1 className="text-[28px] md:text-4xl lg:text-5xl font-bold text-white mb-4">{content.hero.heading}</h1>}
          {content.hero?.description && <p className="text-white/60 text-sm md:text-base">{content.hero.description}</p>}
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-12 md:py-16 lg:py-20" style={{ background: '#e8eef5' }}>
        <div className="container mx-auto px-4">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8 md:mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-5 py-2 text-xs font-semibold tracking-wide border rounded transition-all duration-200 ${
                  activeCategory === cat
                    ? 'text-white border-[#325ca8] bg-[#325ca8]'
                    : 'bg-white text-dark-navy border-gray-300 hover:border-[#325ca8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div>
            {loading ? (
              <p className="text-center text-gray-500">Loading frequently asked questions...</p>
            ) : items.length ? items.map((item, i) => (
              <FaqItem
                key={item.id || i}
                q={item.q}
                a={item.a}
                defaultOpen={listing.open_first_question === '1' && i === 0}
              />
            )) : (
              <p className="text-center text-gray-500">{listing.empty_message || 'No frequently asked questions available yet.'}</p>
            )}
          </div>

        </div>
      </section>
    </MainLayout>
  );
};

export default Faqs;
