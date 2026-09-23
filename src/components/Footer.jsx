import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from '@/assets/images/logo.png';

const socialLinks = [
  { icon: FaFacebookF, url: '#', label: 'Facebook' },
  { icon: FaInstagram, url: '#', label: 'Instagram' },
  { icon: FaTwitter, url: '#', label: 'Twitter' },
  { icon: FaLinkedinIn, url: '#', label: 'LinkedIn' },
  { icon: FaYoutube, url: '#', label: 'YouTube' },
];

const usefulLinks = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Register', to: '/contact-us' },
  { label: 'Career', to: '/career-placement' },
];

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: '#04132a' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <img src={logo} alt="KGK Academy" className="h-16 w-auto" />
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: '#00b2f4' }}>Follow Us</h4>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-200"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: '#00b2f4' }}>Useful Links</h4>
            <ul className="space-y-2.5">
              {usefulLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-white/70 hover:text-primary transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: '#00b2f4' }}>Contact With Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaPhone size={12} className="text-primary flex-shrink-0" />
                <a href="tel:+919853985336" className="hover:text-primary transition-colors">+91 9853 9853 36</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <FaEnvelope size={12} className="text-primary flex-shrink-0" />
                <a href="mailto:kgk.academy@kgkmail.com" className="hover:text-primary transition-colors">kgk.academy@kgkmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-4 text-center" style={{ borderColor: '#00b2f4' }}>
        <p className="text-xs tracking-widest" style={{ color: '#00b2f4' }}>©KGKAcademy</p>
      </div>
    </footer>
  );
};

export default Footer;
