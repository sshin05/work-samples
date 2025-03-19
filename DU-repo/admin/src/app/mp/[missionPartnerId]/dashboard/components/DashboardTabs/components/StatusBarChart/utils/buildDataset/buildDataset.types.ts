export type statusData = {
  quarter: string;
  assigned?: { percentageOfUsers: number; numberOfUsers: number };
  started: { percentageOfUsers: number; numberOfUsers: number };
  stopped: { percentageOfUsers: number; numberOfUsers: number };
  completed: { percentageOfUsers: number; numberOfUsers: number };
  total: number;
};

export type statusType = 'Plans' | 'Courses';

export type datasetItem = {
  label: string;
  categoryPercentage: number;
  barPercentage: number;
  data: number[];
  backgroundColor: string;
  stack: string;
};

export type buildDataReturn = {
  builtDataset: datasetItem[];
  categoryLabels: string[];
  assignedPercentages: number[] | null;
  startedPercentages: number[];
  stoppedPercentages: number[];
  completedPercentages: number[];
};
