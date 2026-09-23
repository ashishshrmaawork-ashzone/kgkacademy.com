import { useEffect, useState } from 'react';

const inFlightRequests = new Map();

const useApiData = (loader, fallback) => {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    const request = inFlightRequests.get(loader) || loader();
    inFlightRequests.set(loader, request);
    request
      .then((result) => {
        if (active) setData(result);
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message);
          console.error(requestError);
        }
      })
      .finally(() => {
        if (inFlightRequests.get(loader) === request) {
          inFlightRequests.delete(loader);
        }
        if (active) setLoading(false);
      });

    return () => { active = false; };
  // The loader is supplied by the page and is only needed on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};

export default useApiData;
