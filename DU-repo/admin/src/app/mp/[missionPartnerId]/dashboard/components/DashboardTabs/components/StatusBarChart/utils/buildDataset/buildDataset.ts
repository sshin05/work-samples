import type {
  statusData,
  statusType,
  datasetItem,
  buildDataReturn
} from './buildDataset.types';

export const buildDataset = (
  statusData: statusData[],
  statusType: statusType,
  chartColors: { [key: string]: string }
): buildDataReturn => {
  const BAR_LABELS = ['Assigned', 'Started', 'Stopped', 'Completed'];

  const categoryLabels = statusData?.map(quarterData => quarterData.quarter);

  const barColors: string[] = [];

  if (statusType === 'Plans')
    barColors.push(
      chartColors.qualitative500,
      chartColors.qualitative100,
      chartColors.qualitative200,
      chartColors.qualitative300
    );

  if (statusType === 'Courses')
    barColors.push(
      '',
      chartColors.qualitative500,
      chartColors.qualitative100,
      chartColors.qualitative200
    );

  const assignedPercentages: number[] = [];
  const startedPercentages: number[] = [];
  const stoppedPercentages: number[] = [];
  const completedPercentages: number[] = [];

  for (const quarterData of statusData) {
    startedPercentages.push(quarterData.started.percentageOfUsers);
    stoppedPercentages.push(quarterData.stopped.percentageOfUsers);
    completedPercentages.push(quarterData.completed.percentageOfUsers);
  }

  if (statusType !== 'Courses') {
    for (const quarterData of statusData) {
      assignedPercentages.push(quarterData.assigned.percentageOfUsers);
    }
  }

  // It's not possible to add margin between chart and legend without getting very hacky in render, which causes unforseen issues.
  // This fix adds whitespace to end of the bar label to make the entire bar label always have 20 chars, this gives margin b/w lengend and chart
  const barLabelsWithMargin = BAR_LABELS.map(label => {
    // Have to create whitespaceMargin this way to avoid lint errors
    const whitespaceMargin: string[] = [];
    for (let i = 0; i < 20 - label.length; i++) {
      whitespaceMargin.push(' ');
    }

    return label + whitespaceMargin.join('');
  });

  const builtDataset: datasetItem[] = [];

  const iterableData = [
    assignedPercentages,
    startedPercentages,
    stoppedPercentages,
    completedPercentages
  ];

  for (let index = 0; index < 4; index++) {
    builtDataset.push({
      label: barLabelsWithMargin[index],
      categoryPercentage: 0.4,
      barPercentage: 1,
      data: iterableData[index],
      backgroundColor: barColors[index],
      stack: `Stack ${index}`
    });
  }

  if (statusType === 'Courses') builtDataset.shift();

  return {
    builtDataset,
    categoryLabels,
    assignedPercentages,
    startedPercentages,
    stoppedPercentages,
    completedPercentages
  };
};
