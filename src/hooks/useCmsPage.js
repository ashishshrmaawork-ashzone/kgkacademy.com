import { useEffect, useState } from 'react';
import { getPageMetaBySlug } from '@/services/api';

const pageRequests = new Map();

export default function useCmsPage(slug) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const request = pageRequests.get(slug) || getPageMetaBySlug(slug);
    pageRequests.set(slug, request);

    request
      .then(response => {
        if (!active) return;
        setData(response.data);
      })
      .catch(requestError => {
        pageRequests.delete(slug);
        if (active) {
          setError(requestError.message);
          console.error(requestError);
        }
      })
      .finally(() => {
        if (pageRequests.get(slug) === request) {
          pageRequests.delete(slug);
        }
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [slug]);

  return { page: data, content: data?.content || {}, loading, error };
}
