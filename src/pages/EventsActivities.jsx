import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import usePageContent from '@/hooks/usePageContent';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import useApiData from '@/hooks/useApiData';
import { getEvents, mediaUrl, unwrapData } from '@/services/api';

const categoryColors = {
  'Industry Visit': 'bg-blue-100 text-blue-700',
  'Factory Visit': 'bg-purple-100 text-purple-700',
  'Industry Exposure': 'bg-green-100 text-green-700',
  'Competition': 'bg-orange-100 text-orange-700',
  'Placement Drive': 'bg-yellow-100 text-yellow-700',
};

const EventsActivities = () => {
  const content = usePageContent('events-activities');
  const listing = content.event_listing || {};
  const initialItems = Number(listing.initial_items) || 0;
  const loadMoreCount = Number(listing.load_more_count) || 0;
  const [visible, setVisible] = useState(initialItems);
  const { data: apiEvents, loading: eventsLoading } = useApiData(() => getEvents().then(unwrapData), []);
  const events = apiEvents.map((event) => ({
    ...event,
    img: mediaUrl(event.image || event.img || listing.fallback_image),
    date: event.date || event.event_date || '',
    desc: event.desc || event.description || '',
    fullDesc: event.fullDesc || [event.description || ''],
    highlights: event.highlights || [],
  }));
  const items = events;
  const hasMore = visible < items.length;
  const loadMore = () => setVisible(prev => Math.min(prev + loadMoreCount, items.length));

  useEffect(() => {
    if (initialItems > 0) setVisible(initialItems);
  }, [initialItems]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  usePageMeta('Events & Activities', "Stay updated with KGK Academy's latest events, workshops, industry visits, and student activities in Surat and Jaipur.");

  return (
    <MainLayout>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #1abfdb 0%, transparent 50%)' }}
        />
        <div className="container-fluid relative z-10 text-center">
          {content.hero?.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{content.hero.eyebrow}</p>}
          {content.hero?.heading && <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{content.hero.heading}</h1>}
          {content.hero?.description && <p className="text-white/60 text-sm max-w-xl mx-auto">{content.hero.description}</p>}
        </div>
      </section>

      {/* ── EVENTS GRID ── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container-fluid">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, visible).map((event) => (
              <div key={event.slug} className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group flex flex-col">
                {/* Image */}
                <Link to={`/events-activities/${event.slug}`} className="block h-48 relative overflow-hidden bg-navy flex-shrink-0">
                  {event.img && <img src={event.img} alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[event.category] || 'bg-white/20 text-white'}`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-primary/80 text-white text-[10px] px-2 py-0.5 rounded uppercase tracking-widest">
                    {listing.card_brand_label}
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <Link to={`/events-activities/${event.slug}`}>
                    <h3 className="font-bold text-dark-navy text-base mb-2 group-hover:text-primary transition-colors duration-200 leading-snug">
                      {event.title}
                    </h3>
                  </Link>
                  <div className="flex gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} className="text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt size={10} className="text-primary" />
                      {event.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{event.desc}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/events-activities/${event.slug}`}
                      className="text-primary text-sm font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      {listing.read_more_label}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                className="btn-primary px-10"
              >
                {listing.load_more_label}
              </button>
            </div>
          )}
          {!eventsLoading && !apiEvents.length && listing.empty_message && (
            <p className="text-center text-gray-500">{listing.empty_message}</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default EventsActivities;
