import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '@/assets/images/logo.png';
import inspiredShine from '@/assets/images/inspired-shine.png';

const navItems = [
  { id: 'home', label: 'HOME', url: '/' },
  {
    id: 'about',
    label: 'ABOUT US',
    dropdown: [
      { label: 'Our Story', url: '/about-us#story' },
      { label: 'Our Vision', url: '/about-us#vision' },
      { label: 'Our Values', url: '/about-us#values' },
      { label: 'Promotors', url: '/about-us#promotors' },
      { label: 'KGK Foundation', url: '/about-us#foundation' },
      { label: 'KGK Academy Timeline', url: '/about-us#timeline' },
    ],
  },
  {
    id: 'courses',
    label: 'COURSES',
    dropdown: [
      { label: 'Surat', url: '/courses?city=surat' },
      { label: 'Jaipur', url: '/courses?city=jaipur' },
    ],
  },
  { id: 'career', label: 'CAREER AND PLACEMENT SUPPORT', url: '/career-placement' },
  { id: 'testimonials', label: 'TESTIMONIALS', url: '/testimonials' },
  { id: 'events', label: 'EVENTS & ACTIVITIES', url: '/events-activities' },
  { id: 'faqs', label: 'FAQS', url: '/faqs' },
  { id: 'contact', label: 'CONTACT US', url: '/contact-us' },
];

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (item) => {
    const path = location.pathname;
    if (item.url === '/') return path === '/';
    if (item.url) return path.startsWith(item.url);
    if (item.dropdown) return item.dropdown.some(d => path.startsWith(d.url.split('?')[0].split('#')[0]));
    return false;
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-navy/[92%] shadow-lg shadow-black/40' : 'bg-dark-navy/[66%]'}`}
      >
        {/* Top bar: Logo + tagline */}
        <div className="container-fluid flex items-center justify-between py-3 border-b border-white/10">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="KGK Academy" className="h-14 w-auto" />
          </Link>
          <img src={inspiredShine} alt="Inspired to Shine" className="hidden lg:block h-auto w-auto max-h-16" />
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:block border-b border-white/10">
          <div className="container-fluid">
            <nav className="flex items-center justify-between w-full">
              {navItems.map((item, i) => (
                <React.Fragment key={item.id}>
                  {i > 0 && <span className="text-white/30 text-xs select-none px-1">|</span>}
                  {item.dropdown ? (
                    <div
                      className="relative group"
                      onMouseEnter={() => setOpenDropdown(item.id)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <button
                        className={`flex items-center gap-0.5 py-3 px-2 text-[13px] tracking-[2px] uppercase font-normal transition-colors duration-200 whitespace-nowrap ${isActive(item) ? 'text-[#00b2f4] border-b-2 border-[#00b2f4]' : 'text-white hover:text-[#00b2f4]'}`}
                      >
                        {item.label}
                        <ChevronDown size={12} className="ml-0.5" />
                      </button>
                      <div className={`absolute top-full left-0 min-w-[200px] bg-navy border border-primary/20 shadow-xl z-50 transition-all duration-200 ${openDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.url}
                            className="block px-4 py-2.5 text-[11px] text-white hover:text-[#00b2f4] hover:bg-[#00b2f4]/10 uppercase tracking-wider border-b border-white/5 last:border-0 transition-colors duration-150"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.url}
                      className={`py-3 px-2 text-[13px] tracking-[2px] uppercase font-normal transition-colors duration-200 whitespace-nowrap ${isActive(item) ? 'text-[#00b2f4] border-b-2 border-[#00b2f4]' : 'text-white hover:text-[#00b2f4]'}`}
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`lg:hidden fixed top-0 right-0 w-72 h-full bg-dark-navy border-l border-white/10 z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ paddingTop: '90px' }}
        >
          <button className="absolute top-4 right-4 text-white" onClick={() => setMobileOpen(false)}>
            <X size={22} />
          </button>
          <div className="overflow-y-auto h-full px-4 pb-8">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <>
                    <button
                      className="w-full flex justify-between items-center py-3 border-b border-white/10 text-white text-xs uppercase tracking-widest"
                      onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === item.id ? 'max-h-64' : 'max-h-0'}`}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.url}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-4 py-2.5 border-b border-white/5 text-white/70 hover:text-primary text-xs uppercase tracking-wider"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.url}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 border-b border-white/10 text-xs uppercase tracking-widest ${isActive(item) ? 'text-primary' : 'text-white hover:text-primary'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />}
      </header>

    </>
  );
};

export default Navbar;
