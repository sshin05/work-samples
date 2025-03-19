import dayjs from 'dayjs';

export const abbreviatedDateTime = date =>
  dayjs(date).format('DD MMM YYYY hh:mmA');
