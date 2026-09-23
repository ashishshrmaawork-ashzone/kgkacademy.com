import useCmsPage from './useCmsPage';

const usePageContent = (slug) => {
  const { content } = useCmsPage(slug);
  return content;
};

export default usePageContent;
