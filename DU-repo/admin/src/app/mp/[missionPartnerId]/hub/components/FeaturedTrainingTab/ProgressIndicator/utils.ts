export interface Segment {
  label: string;
  value: number;
  color: string;
}

export const toPixelWidth = (
  value: number,
  sum: number,
  containerWidth: number
): string => {
  return containerWidth && sum > 0
    ? `${((value / sum) * containerWidth).toFixed(0)}px`
    : 'auto';
};

export const getNonZeroSegments = (
  assigned: number,
  inProgress: number,
  stopped: number,
  completed: number,
  chartColors: Record<string, string>
): Segment[] => {
  return [
    { label: 'Assigned', value: assigned, color: chartColors.qualitative400 },
    {
      label: 'In Progress',
      value: inProgress,
      color: chartColors.qualitative500
    },
    { label: 'Stopped', value: stopped, color: chartColors.qualitative200 },
    { label: 'Completed', value: completed, color: chartColors.qualitative300 }
  ].filter(segment => segment.value > 0);
};

export const getLabelToKeyMap = (): Record<string, string> => ({
  Assigned: 'assigned',
  'In Progress': 'inProgress',
  Stopped: 'stopped',
  Completed: 'completed'
});
