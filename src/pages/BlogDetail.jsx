import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import useApiData from '@/hooks/useApiData';
import { getBlogBySlug, getBlogs, mediaUrl, unwrapData } from '@/services/api';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const categoryColors = {
  'Diamond': 'bg-blue-100 text-blue-700',
  'Gemstones': 'bg-green-100 text-green-700',
  'Career': 'bg-yellow-100 text-yellow-700',
  'Industry': 'bg-purple-100 text-purple-700',
  'Jewellery': 'bg-pink-100 text-pink-700',
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: apiBlog, loading } = useApiData(() => getBlogBySlug(slug).then(unwrapData), null);
  const { data: apiBlogs } = useApiData(() => getBlogs().then(unwrapData), []);
  const blog = useMemo(() => apiBlog && apiBlog.slug ? {
    ...apiBlog,
    img: mediaUrl(apiBlog.image || apiBlog.img),
    excerpt: apiBlog.shortcontent || apiBlog.excerpt || '',
    fullContent: Array.isArray(apiBlog.fullContent) ? apiBlog.fullContent : [apiBlog.content || apiBlog.shortcontent || ''],
    highlights: Array.isArray(apiBlog.highlights) ? apiBlog.highlights : [],
    date: apiBlog.date || apiBlog.created_at || '',
    author: apiBlog.author || apiBlog.author_name || '',
  } : null, [apiBlog]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | KGK Academy`;
    }
  }, [blog]);

  if (loading && !blog) {
    return <div className="min-h-screen flex items-center justify-center">Loading article...</div>;
  }

  if (!blog) {
    return (
      <MainLayout>
        <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-[160px]">
          <div className="text-center">
            <p className="text-6xl font-bold text-primary mb-4">404</p>
            <h2 className="text-2xl font-bold text-dark-navy mb-3">Article Not Found</h2>
            <p className="text-gray-500 mb-6">This article does not exist or may have been removed.</p>
            <Link to="/blog" className="btn-primary">Back to Blog</Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  const normalizedBlogs = apiBlogs.map((item) => ({
    ...item,
    img: mediaUrl(item.image || item.img),
    date: item.date || item.created_at || '',
  }));
  const relatedBlogs = normalizedBlogs.filter(b => b.slug !== slug && b.category === blog.category).slice(0, 3);
  const otherBlogs = normalizedBlogs.filter(b => b.slug !== slug).slice(0, 3);
  const sidebarBlogs = relatedBlogs.length > 0 ? relatedBlogs : otherBlogs;

  return (
    <MainLayout>
      {/* ── HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #1c53a5 0%, transparent 50%)' }}
        />
        <div className="container-fluid relative z-10">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors duration-200"
          >
            <FaArrowLeft size={12} />
            Back to Blog
          </button>
          <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4 ${categoryColors[blog.category] || 'bg-white/20 text-white'}`}>
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-6">
            {blog.title}
          </h1>
          <div className="flex flex-wrap gap-5 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <FaCalendarAlt size={13} className="text-primary" />
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <FaUser size={13} className="text-primary" />
              {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <FaTag size={12} className="text-primary" />
              {blog.category}
            </span>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-fluid">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">

            {/* Left: Article */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="rounded-xl overflow-hidden mb-8 shadow-md">
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>

              {/* Excerpt */}
              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100">
                {blog.excerpt}
              </p>

              {/* Full content paragraphs */}
              <div className="space-y-5 mb-10">
                {blog.fullContent.map((para, i) => (
                  <p key={i} className="text-gray-700 text-base leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-dark-navy font-bold text-lg mb-5">Key Takeaways</h3>
                <ul className="space-y-3">
                  {blog.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <FaCheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back link mobile */}
              <div className="mt-8 lg:hidden">
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                  <FaArrowLeft size={12} />
                  View All Articles
                </Link>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="mt-12 lg:mt-0">
              {/* CTA Card */}
              <div className="bg-dark-navy rounded-xl p-6 mb-6">
                <h4 className="text-white font-bold text-base mb-2">Interested in a Course?</h4>
                <p className="text-white/60 text-sm mb-4">
                  Turn your interest in gems and diamonds into a professional career.
                </p>
                <Link to="/courses" className="btn-primary w-full text-center block mb-3">
                  View Courses
                </Link>
                <Link to="/contact-us" className="block w-full text-center py-2 text-sm font-semibold text-white/70 border border-white/20 rounded hover:border-white/50 transition-colors duration-200">
                  Enquire Now
                </Link>
              </div>

              {/* Related Articles */}
              {sidebarBlogs.length > 0 && (
                <div>
                  <h4 className="text-dark-navy font-bold text-base mb-4">
                    {relatedBlogs.length > 0 ? 'Related Articles' : 'More Articles'}
                  </h4>
                  <div className="space-y-4">
                    {sidebarBlogs.map(b => (
                      <Link
                        key={b.slug}
                        to={`/blog/${b.slug}`}
                        className="flex gap-3 group hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors duration-200"
                      >
                        {b.img && <img
                            src={b.img}
                            alt={b.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />}
                        <div className="min-w-0">
                          <p className="text-dark-navy text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {b.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">{b.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default BlogDetail;
