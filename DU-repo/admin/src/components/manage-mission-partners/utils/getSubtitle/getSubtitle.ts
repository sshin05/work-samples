export const getSubtitle = type => {
  if (type === 'enrolled') return 'Total Enrolled';
  if (type === 'assigned') return 'Assigned';
  if (type === 'inProgress') return 'In Progress';
  if (type === 'completed') return 'Completed';
  if (type === 'stopped') return 'Stopped';
  if (type === 'started') return 'Started';
  return null;
};
