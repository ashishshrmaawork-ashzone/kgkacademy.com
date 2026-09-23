import React, { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import useApiData from '@/hooks/useApiData';
import { getEventBySlug, getEvents, mediaUrl, unwrapData } from '@/services/api';
import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const categoryColors = {
  'Industry Visit': 'bg-blue-100 text-blue-700',
  'Factory Visit': 'bg-purple-100 text-purple-700',
  'Industry Exposure': 'bg-green-100 text-green-700',
  'Competition': 'bg-orange-100 text-orange-700',
  'Placement Drive': 'bg-yellow-100 text-yellow-700',
};

const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: apiEvent, loading } = useApiData(
    () => getEventBySlug(slug).then(unwrapData),
    null
  );
  const { data: apiEvents } = useApiData(() => getEvents().then(unwrapData), []);
  const event = useMemo(() => {
    if (!apiEvent) return null;
    return {
      ...apiEvent,
      img: mediaUrl(apiEvent.image || apiEvent.img),
      date: apiEvent.date || apiEvent.event_date || '',
      desc: apiEvent.desc || apiEvent.description || '',
      fullDesc: apiEvent.fullDesc || [apiEvent.description || ''],
      highlights: apiEvent.highlights || [],
    };
  }, [apiEvent]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (event) {
      document.title = `${event.title} | KGK Academy`;
    }
  }, [event]);

  if (loading && !event) {
    return <div className="min-h-screen flex items-center justify-center">Loading event...</div>;
  }

  if (!event) {
    return (
      <MainLayout>
        <section className="min-h-screen flex items-center justify-center bg-gray-50 pt-[160px]">
          <div className="text-center">
            <p className="text-6xl font-bold text-primary mb-4">404</p>
            <h2 className="text-2xl font-bold text-dark-navy mb-3">Event Not Found</h2>
            <p className="text-gray-500 mb-6">This event does not exist or may have been removed.</p>
            <Link to="/events-activities" className="btn-primary">Back to Events</Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  const otherEvents = apiEvents
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      img: mediaUrl(item.image || item.img),
      date: item.date || item.event_date || '',
    }));

  return (
    <MainLayout>
      {/* ── HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #1abfdb 0%, transparent 50%)' }}
        />
        <div className="container-fluid relative z-10">
          <button
            onClick={() => navigate('/events-activities')}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors duration-200"
          >
            <FaArrowLeft size={12} />
            Back to Events
          </button>
          <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold mb-4 ${categoryColors[event.category] || 'bg-white/20 text-white'}`}>
            {event.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-6">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-5 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <FaCalendarAlt size={13} className="text-primary" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt size={13} className="text-primary" />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <FaTag size={12} className="text-primary" />
              {event.category}
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
                {event.img && (
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover"
                  />
                )}
              </div>

              {/* Full description paragraphs */}
              <div className="space-y-5 mb-10">
                {event.fullDesc.map((para, i) => (
                  <p key={i} className="text-gray-700 text-base leading-relaxed">{para}</p>
                ))}
              </div>

              {/* Highlights */}
              <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
                <h3 className="text-dark-navy font-bold text-lg mb-5">Event Highlights</h3>
                <ul className="space-y-3">
                  {event.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <FaCheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back button mobile */}
              <div className="mt-8 lg:hidden">
                <Link
                  to="/events-activities"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                >
                  <FaArrowLeft size={12} />
                  View All Events
                </Link>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="mt-12 lg:mt-0">
              {/* Event Info Card */}
              <div className="bg-dark-navy rounded-xl p-6 mb-6">
                <h4 className="text-white font-bold text-base mb-4">Event Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Date</p>
                      <p className="text-white">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt size={13} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Location</p>
                      <p className="text-white">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaTag size={12} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Category</p>
                      <p className="text-white">{event.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="rounded-xl p-6 mb-6 border border-primary/20 bg-primary/5">
                <h4 className="text-dark-navy font-bold text-base mb-2">Interested in Joining?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Be part of our next industry event or campus program.
                </p>
                <Link to="/contact-us" className="btn-primary w-full text-center block">
                  Enquire Now
                </Link>
              </div>

              {/* Other Events */}
              {otherEvents.length > 0 && (
                <div>
                  <h4 className="text-dark-navy font-bold text-base mb-4">More Events</h4>
                  <div className="space-y-4">
                    {otherEvents.map(e => (
                      <Link
                        key={e.slug}
                        to={`/events-activities/${e.slug}`}
                        className="flex gap-3 group hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors duration-200"
                      >
                        {e.img && (
                          <img
                            src={e.img}
                            alt={e.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-dark-navy text-sm font-semibold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {e.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">{e.date}</p>
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

export default EventDetail;
