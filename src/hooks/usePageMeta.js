import { useEffect } from 'react';

const usePageMeta = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} | KGK Academy` : 'KGK Academy - Diamond & Gemstone Training Institute';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && description) metaDesc.setAttribute('content', description);
  }, [title, description]);
};

export default usePageMeta;
