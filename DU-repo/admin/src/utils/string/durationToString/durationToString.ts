export const durationToString = (duration: number) => {
  const hours = duration / 60;
  const rHours = Math.floor(hours);
  const minutes = (hours - rHours) * 60;
  const rMinutes = Math.round(minutes);

  const durationString = [];
  if (rHours === 1) durationString.push(`${rHours} Hour`);
  else if (rHours > 1) durationString.push(`${rHours} Hours`);
  if (rMinutes === 1) durationString.push(`${rMinutes} Minute`);
  else if (rMinutes > 1) durationString.push(`${rMinutes} Minutes`);
  if (durationString.length === 0) durationString.push('0 Minutes');

  return durationString.join(' ');
};
