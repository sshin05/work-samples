export const createTicks = (value, index) => {
  if (index === 0) {
    return '0% of learners';
  }

  if (index % 2 === 0) {
    return `${(Number(value) * 100).toFixed(0)}%`;
  }
};
