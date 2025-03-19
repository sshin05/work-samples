import moment from 'moment';
import momenttz from 'moment-timezone';

export const formatDate = date => {
  const timezone = momenttz.tz.guess();
  const timezoneOffset = new Date().getTimezoneOffset();
  const tzAbbreviation = momenttz.tz.zone(timezone)?.abbr(timezoneOffset);
  const formattedDate = moment(date).format('DD MMM YYYY hh:mmA');
  return `${formattedDate} ${tzAbbreviation}`;
};
