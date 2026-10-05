import React, { useState, useEffect, useRef, useMemo } from 'react';
import MainLayout from '@/layout/MainLayout';
import usePageMeta from '@/hooks/usePageMeta';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaDownload, FaComments, FaBuilding } from 'react-icons/fa';
import { submitContactForm } from '@/services/api';
import useCmsPage from '@/hooks/useCmsPage';

const ContactUs = () => {
  const createCaptcha = () => {
    const first = Math.floor(Math.random() * 8) + 2;
    const second = Math.floor(Math.random() * 8) + 1;
    return { question: `${first} + ${second}`, answer: String(first + second) };
  };
  const [activeMap, setActiveMap] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    city: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [captcha, setCaptcha] = useState(createCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const mapSectionRef = useRef(null);
  const { page, content } = useCmsPage('contact-us');
  const hero = content.hero || {};
  const formContent = content.contact_form || {};
  const quickLinksContent = content.quick_links || {};
  const offices = useMemo(() => Object.keys(content)
    .filter(key => /_location$/.test(key))
    .map(key => {
      const office = content[key] || {};
      const id = key.replace(/_location$/, '');
      return {
        id,
        title: office.tab_label,
        address: office.address,
        phone: office.phone,
        email: office.email,
        mapEmbed: office.map_url,
      };
    })
    .filter(office => office.title || office.address || office.phone || office.email || office.mapEmbed), [content]);
  const activeOffice = offices.find(office => office.id === activeMap) || offices[0];
  const quickLinkIcons = [FaDownload, FaComments, FaBuilding];
  const quickLinks = Object.keys(quickLinksContent)
    .map(key => {
      const match = key.match(/^link_(\d+)_label$/);
      if (!match || !quickLinksContent[key]) return null;
      const number = Number(match[1]);
      return {
        id: number,
        label: quickLinksContent[key],
        href: quickLinksContent[`link_${number}_url`],
        Icon: quickLinkIcons[number - 1],
      };
    })
    .filter(link => link && link.href);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const section = mapSectionRef.current;
    if (!section || typeof IntersectionObserver === 'undefined') {
      setMapReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);
  usePageMeta(page?.meta_title, page?.meta_description);

  useEffect(() => {
    if (!offices.some(office => office.id === activeMap) && offices.length) {
      setActiveMap(offices[0].id);
    }
  }, [activeMap, offices]);

  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === 'contact') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    if (['firstName', 'lastName', 'city'].includes(name)) {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    }
    setFormData({ ...formData, [name]: value });
    setSubmitError('');
  };

  const isFieldValid = (name) => {
    const value = formData[name].trim();
    if (!value) return false;
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (name === 'contact') return /^\d{10}$/.test(value);
    if (['firstName', 'lastName', 'city'].includes(name)) return /^[a-zA-Z\s]+$/.test(value);
    return true;
  };

  const isCaptchaValid = captchaInput.trim() === captcha.answer;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      setSubmitError('Please enter the correct captcha answer.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', contact: '', email: '', city: '', message: '' });
      setCaptchaInput('');
      setCaptcha(createCaptcha());
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-[170px] pb-16 md:pt-[175px] md:pb-24 bg-gradient-to-br from-dark-navy via-navy to-dark-navy overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-10 pointer-events-none">
          {['📋', '🤝', '@', '📧', '🎧', '📞', '💬'].map((icon, i) => (
            <div key={i}
              className="w-14 h-14 flex items-center justify-center text-2xl rounded"
              style={{ background: 'rgba(26,191,219,0.2)' }}>
              {icon}
            </div>
          ))}
        </div>
        <div className="container-fluid relative z-10 text-center">
          {hero.eyebrow && <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{hero.eyebrow}</p>}
          {hero.heading && <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{hero.heading}</h1>}
          {hero.description && <p className="text-white/60 text-sm">{hero.description}</p>}
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      {Object.keys(formContent).length > 0 && <section className="py-14 bg-gray-100">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            {formContent.heading && <h3 className="text-dark-navy font-bold text-xl mb-6">{formContent.heading}</h3>}
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {formContent.success_message}
              </div>
            )}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {submitError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left column */}
                <div className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={formContent.first_name_label || ''}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('firstName') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={formContent.last_name_label || ''}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('lastName') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="tel"
                    name="contact"
                    placeholder={formContent.phone_label || ''}
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('contact') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={formContent.email_label || ''}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('email') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder={formContent.city_label || ''}
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${formData.city.trim() ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                </div>
                {/* Right column */}
                <div>
                  <textarea
                    name="message"
                    placeholder={formContent.message_label || ''}
                    rows={9}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`w-full h-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors resize-none ${isFieldValid('message') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div>
                  <label htmlFor="captcha" className="block text-xs font-semibold text-dark-navy mb-2">
                    Security check: <span className="text-primary">{captcha.question} = ?</span>
                  </label>
                  <input
                    id="captcha"
                    name="captcha"
                    type="text"
                    inputMode="numeric"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value.replace(/\D/g, ''));
                      setSubmitError('');
                    }}
                    required
                    placeholder="Answer"
                    className={`w-32 border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isCaptchaValid ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCaptcha(createCaptcha());
                    setCaptchaInput('');
                  }}
                  className="text-xs text-primary font-semibold hover:underline pb-3"
                >
                  New captcha
                </button>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" disabled={submitting} className="btn-primary px-8 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Sending...' : formContent.submit_label}
                </button>
                <button
                  type="reset"
                  onClick={() => {
                    setFormData({ firstName: '', lastName: '', contact: '', email: '', city: '', message: '' });
                    setCaptchaInput('');
                    setCaptcha(createCaptcha());
                    setSubmitError('');
                  }}
                  className="bg-dark-navy text-white px-8 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-navy transition-colors"
                >
                  {formContent.reset_label}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>}

      {/* ── MAP SECTION ── */}
      {offices.length > 0 && <section className="py-10 bg-gray-100">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto">
            {/* City Tabs */}
            {offices.length > 1 && <div className="flex gap-3 items-center mb-4">
              {offices.map((office, index) => <React.Fragment key={office.id}>
                {index > 0 && <span className="text-gray-300">|</span>}
                <button onClick={() => setActiveMap(office.id)} className={`text-sm font-semibold uppercase tracking-wider pb-1 border-b-2 transition-all duration-200 ${activeOffice?.id === office.id ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'}`}>{office.title}</button>
              </React.Fragment>)}
            </div>}

            {/* Single map based on active tab */}
            {activeOffice?.mapEmbed && <div ref={mapSectionRef} className="rounded overflow-hidden border-2 border-primary">
              {mapReady ? <iframe key={activeOffice.id} title={activeOffice.title || ''} src={activeOffice.mapEmbed} className="w-full h-64 md:h-80" style={{ border: 0 }} allowFullScreen="" loading="lazy" /> : <div className="h-64 md:h-80 bg-gray-100" />}
            </div>}

            {/* Office Info */}
            <div className="mt-4 p-4 bg-white rounded border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                {activeOffice.address && <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" size={14} />
                  <p>{activeOffice.address}</p>
                </div>}
                {activeOffice.phone && <div className="flex items-center gap-2">
                  <FaPhone className="text-primary flex-shrink-0" size={13} />
                  <a href={`tel:${activeOffice.phone}`} className="hover:text-primary transition-colors">{activeOffice.phone}</a>
                </div>}
                {activeOffice.email && <div className="flex items-center gap-2">
                  <FaEnvelope className="text-primary flex-shrink-0" size={13} />
                  <a href={`mailto:${activeOffice.email}`} className="hover:text-primary transition-colors">{activeOffice.email}</a>
                </div>}
              </div>
            </div>

            {/* Quick Links */}
            {quickLinks.length > 0 && <div className="mt-6 flex flex-wrap gap-3 justify-center">
              {quickLinksContent.heading && <span className="text-sm font-semibold text-dark-navy self-center">{quickLinksContent.heading}</span>}
              {quickLinks.map(({ Icon, label, href, id }) => (
                <a
                  key={id}
                  href={href}
                  className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-opacity-90 transition-all duration-200"
                >
                  {Icon && <Icon size={13} />}
                  {label}
                </a>
              ))}
            </div>}
          </div>
        </div>
      </section>}
    </MainLayout>
  );
};

export default ContactUs;
