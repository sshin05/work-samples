export const isValidDate = (date: Date | string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};
