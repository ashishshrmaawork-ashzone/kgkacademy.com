const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:3000').replace(/\/+$/, '');
const API_KEY = process.env.REACT_APP_API_KEY || '';
export const API_ORIGIN = API_BASE_URL;

const request = async (path, options = {}) => {
  const normalizedPath = path.replace(/^\/+/, '');
  const isGet = !options.method || options.method.toUpperCase() === 'GET';
  const separator = normalizedPath.includes('?') ? '&' : '?';
  const requestPath = isGet ? `${normalizedPath}${separator}_cms_ts=${Date.now()}` : normalizedPath;
  const response = await fetch(`${API_BASE_URL}/api/${requestPath}`, {
    ...options,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(API_KEY ? { 'X-API-KEY': API_KEY } : {}),
      ...options.headers,
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    throw new Error(`API returned an invalid response (${response.status}).`);
  }

  if (!response.ok || payload?.status === false) {
    const validationErrors = payload?.errors
      ? Object.values(payload.errors).join(' ')
      : '';
    const message = payload?.message || validationErrors || 'The request could not be completed.';
    const error = new Error(message);
    error.validationErrors = payload?.errors || {};
    throw error;
  }

  return payload;
};

export const submitContactForm = (formData) => request('contact-us', {
  method: 'POST',
  body: JSON.stringify(formData),
});

export const getCourses = (query = '') => request(`courses${query ? `?${query}` : ''}`);
export const getBlogs = () => request('blogs');
export const getEvents = () => request('events');
export const getTestimonials = () => request('testimonials');
export const getFaqs = () => request('faqs');
export const getPageMetaByModule = (module) =>
  request(`page-meta/module/${encodeURIComponent(module)}`);
export const getPageMetaBySlug = (slug) =>
  request(`page-meta/${encodeURIComponent(slug)}`);

export const getBlogBySlug = (slug) => request(`blogs/slug/${encodeURIComponent(slug)}`);
export const getEventById = (id) => request(`events/${encodeURIComponent(id)}`);
export const getEventBySlug = (slug) => request(`events/slug/${encodeURIComponent(slug)}`);
export const getCourseById = (id) => request(`courses/${encodeURIComponent(id)}`);

export const mediaUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  const mediaOrigin = API_ORIGIN.replace(/\/index\.php\/?$/, '');
  return `${mediaOrigin}/${String(value).replace(/^\/+/, '')}`;
};

export const unwrapData = (payload) => payload?.data ?? [];
