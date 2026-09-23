import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import usePageContent from '@/hooks/usePageContent';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import useApiData from '@/hooks/useApiData';
import { getBlogs, mediaUrl, unwrapData } from '@/services/api';

const categoryColors = {
  'Diamond': 'bg-blue-100 text-blue-700',
  'Gemstones': 'bg-green-100 text-green-700',
  'Career': 'bg-yellow-100 text-yellow-700',
  'Industry': 'bg-purple-100 text-purple-700',
  'Jewellery': 'bg-pink-100 text-pink-700',
};

const Blog = () => {
  const content = usePageContent('blog');
  const listing = content.blog_listing || {};
  const initialItems = Number(listing.initial_items) || 0;
  const loadMoreCount = Number(listing.load_more_count) || 0;
  const [visible, setVisible] = useState(initialItems);
  const { data: apiBlogs, loading } = useApiData(() => getBlogs().then(unwrapData), []);
  const blogs = apiBlogs.map((blog) => ({
    ...blog,
    img: mediaUrl(blog.image || blog.img || listing.fallback_image),
    excerpt: blog.shortcontent || blog.excerpt || '',
    fullContent: Array.isArray(blog.fullContent) ? blog.fullContent : [blog.content || blog.shortcontent || ''],
    date: blog.date || blog.created_at || '',
    author: blog.author || blog.author_name || '',
  }));
  const items = blogs;
  const hasMore = visible < items.length;
  const loadMore = () => setVisible(prev => Math.min(prev + loadMoreCount, items.length));

  useEffect(() => {
    if (initialItems > 0) setVisible(initialItems);
  }, [initialItems]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta('Blog', content.hero?.description || 'Explore expert articles on diamond grading, gemstone identification, jewellery design, and career guidance from KGK Academy.');

  return (
    <MainLayout>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 40% 50%, #1c53a5 0%, transparent 55%)' }}
        />
        <div className="container-fluid relative z-10 text-center">
          {content.hero?.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{content.hero.eyebrow}</p>}
          {content.hero?.heading && <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.hero.heading}</h1>}
          {content.hero?.description && <p className="text-white/60 text-sm max-w-xl mx-auto">{content.hero.description}</p>}
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && items.slice(0, visible).map((blog) => (
              <div key={blog.slug} className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group flex flex-col">
                {/* Image */}
                <Link to={`/blog/${blog.slug}`} className="block h-48 relative overflow-hidden bg-navy flex-shrink-0">
                  {blog.img && <img
                      src={blog.img}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[blog.category] || 'bg-white/20 text-white'}`}>
                      {blog.category}
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="font-bold text-dark-navy text-base mb-2 group-hover:text-primary transition-colors duration-200 leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} className="text-primary" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUser size={10} className="text-primary" />
                      {blog.author}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      {listing.read_more_label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && <p className="text-center text-gray-500">Loading articles...</p>}
          {!loading && !items.length && (
            <p className="text-center text-gray-500">{listing.empty_message || 'No blog articles available yet.'}</p>
          )}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button onClick={loadMore} className="btn-primary px-10">
                {listing.load_more_label}
              </button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
