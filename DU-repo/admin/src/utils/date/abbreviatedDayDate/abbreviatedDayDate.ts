import dayjs from 'dayjs';

export const abbreviatedDayDate = date => dayjs(date).format('DD MMM YYYY');
