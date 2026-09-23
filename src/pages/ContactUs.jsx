import React, { useState, useEffect, useRef } from 'react';
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
  const [activeMap, setActiveMap] = useState('surat');
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
  const { content } = useCmsPage('contact-us');
  const hero = content.hero || {};
  const formContent = content.contact_form || {};
  const suratContent = content.surat_location || {};
  const jaipurContent = content.jaipur_location || {};
  const quickLinksContent = content.quick_links || {};

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
  usePageMeta('Contact Us', 'Get in touch with KGK Academy in Surat or Jaipur. Enquire about diamond and gemstone courses, admissions, and placement support.');

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

  const offices = {
    surat: {
      title: suratContent.tab_label || 'Surat',
      address: suratContent.address || 'KGK Academy, Diamond Bourse, Surat, Gujarat - 395002',
      phone: suratContent.phone || '+91 9853 9853 36',
      email: suratContent.email || 'kgk.academy@kgkmail.com',
      mapEmbed: suratContent.map_url || 'https://maps.google.com/maps?q=Surat,Gujarat,India&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
    jaipur: {
      title: jaipurContent.tab_label || 'Jaipur',
      address: jaipurContent.address || 'KGK Academy, KGK Tower, Jaipur, Rajasthan - 302017',
      phone: jaipurContent.phone || '+91 9853 9853 36',
      email: jaipurContent.email || 'kgk.academy@kgkmail.com',
      mapEmbed: jaipurContent.map_url || 'https://maps.google.com/maps?q=Jaipur,Rajasthan,India&t=&z=13&ie=UTF8&iwloc=&output=embed',
    },
  };

  const quickLinks = [
    { icon: FaDownload, label: quickLinksContent.link_1_label || 'Download Brochure', href: quickLinksContent.link_1_url || '#' },
    { icon: FaComments, label: quickLinksContent.link_2_label || 'Speak to Counsellor', href: quickLinksContent.link_2_url || 'tel:+919853985336' },
    { icon: FaBuilding, label: quickLinksContent.link_3_label || 'Visit Our Campus', href: quickLinksContent.link_3_url || '#' },
  ];

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
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3">{hero.eyebrow || 'Get In Touch'}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{hero.heading || 'Contact us'}</h1>
          <p className="text-white/60 text-sm">{hero.description || 'Do you have any questions? Please do not hesitate to contact us directly. Our team will get in touch with you.'}</p>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-14 bg-gray-100">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-dark-navy font-bold text-xl mb-6">{formContent.heading || 'Get in Touch'}</h3>
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                {formContent.success_message || 'Thank you! Your message has been sent. We will get back to you shortly.'}
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
                    placeholder={formContent.first_name_label || 'First Name'}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('firstName') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={formContent.last_name_label || 'Last Name'}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('lastName') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="tel"
                    name="contact"
                    placeholder={formContent.phone_label || 'Contact No.'}
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
                    placeholder={formContent.email_label || 'E-mail'}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${isFieldValid('email') ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder={formContent.city_label || 'City'}
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-4 py-2.5 text-sm text-gray-700 focus:outline-none transition-colors ${formData.city.trim() ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:border-primary'}`}
                  />
                </div>
                {/* Right column */}
                <div>
                  <textarea
                    name="message"
                    placeholder={formContent.message_label || 'My Message'}
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
                  {submitting ? 'Sending...' : (formContent.submit_label || 'Send')}
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
                  {formContent.reset_label || 'Reset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="py-10 bg-gray-100">
        <div className="container-fluid">
          <div className="max-w-3xl mx-auto">
            {/* City Tabs */}
            <div className="flex gap-3 items-center mb-4">
              <button
                onClick={() => setActiveMap('surat')}
                className={`text-sm font-semibold uppercase tracking-wider pb-1 border-b-2 transition-all duration-200 ${activeMap === 'surat' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'}`}
              >
                SURAT
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setActiveMap('jaipur')}
                className={`text-sm font-semibold uppercase tracking-wider pb-1 border-b-2 transition-all duration-200 ${activeMap === 'jaipur' ? 'text-primary border-primary' : 'text-gray-500 border-transparent hover:text-primary'}`}
              >
                JAIPUR
              </button>
            </div>

            {/* Single map based on active tab */}
            <div ref={mapSectionRef} className="rounded overflow-hidden border-2 border-primary">
              {mapReady && activeMap === 'surat' ? (
                <iframe
                  key="surat"
                  title="KGK Academy Surat"
                  src={offices.surat.mapEmbed}
                  className="w-full h-64 md:h-80"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              ) : mapReady ? (
                <iframe
                  key="jaipur"
                  title="KGK Academy Jaipur"
                  src={offices.jaipur.mapEmbed}
                  className="w-full h-64 md:h-80"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              ) : (
                <div className="h-64 md:h-80 bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                  Map loads when you reach this section
                </div>
              )}
            </div>

            {/* Office Info */}
            <div className="mt-4 p-4 bg-white rounded border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" size={14} />
                  <p>{offices[activeMap].address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-primary flex-shrink-0" size={13} />
                  <a href={`tel:${offices[activeMap].phone}`} className="hover:text-primary transition-colors">{offices[activeMap].phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-primary flex-shrink-0" size={13} />
                  <a href={`mailto:${offices[activeMap].email}`} className="hover:text-primary transition-colors">{offices[activeMap].email}</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="text-sm font-semibold text-dark-navy self-center">{quickLinksContent.heading || 'Quick Links'}</span>
              {quickLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 px-5 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-opacity-90 transition-all duration-200"
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactUs;
