export const stripHtml = (text: string) => {
  const doc = new DOMParser().parseFromString(text, 'text/html');
  return doc.body.textContent || '';
};
