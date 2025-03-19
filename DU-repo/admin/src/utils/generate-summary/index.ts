const generateSummary = (text: string, length = 140) => {
  if (text.length === 0 || text.length < length) return text;
  return `${text.slice(0, length)}...`;
};

export default generateSummary;
