export const formatDateAsLocalTime = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString);

  const timezoneOffsetMs = isoDate.getTimezoneOffset() * 60000;
  const localDate: Date | string = new Date(
    isoDate.getTime() - timezoneOffsetMs
  );

  const isValidDate = !isNaN(localDate.getTime());

  if (isValidDate) {
    return localDate.toISOString().split('T')[1].slice(0, 5);
  }

  return '';
};
