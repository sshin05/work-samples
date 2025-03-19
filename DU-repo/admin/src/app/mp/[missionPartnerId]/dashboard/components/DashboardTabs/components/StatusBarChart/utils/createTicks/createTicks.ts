export const createTicks = (value, index, lastValue, type) => {
  if (value === lastValue)
    return `${Number(value).toFixed(0)}% of ${type === 'Plans' ? 'plans' : 'courses'}`;

  if (index === 0) return undefined;

  if (index % 2 === 0) return `${Number(value).toFixed(0)}%`;
};
