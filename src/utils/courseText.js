// CMS editors store HTML, including empty paragraphs. Render descriptions as text.
export const courseText = (value) => {
  if (!value) return '';
  const doc = new DOMParser().parseFromString(String(value), 'text/html');
  doc.querySelectorAll('script, style, template').forEach(node => node.remove());
  doc.querySelectorAll('br').forEach(node => node.replaceWith('\n'));
  doc.querySelectorAll('p, div, li, h1, h2, h3, h4, blockquote').forEach(node => node.append('\n'));
  return (doc.body.textContent || '').replace(/\u00a0/g, ' ').split('\n')
    .map(line => line.trim()).filter(Boolean).join('\n');
};
