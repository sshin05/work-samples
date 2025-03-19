export type statusData = {
  quarter: string;
  assigned?: { percentageOfUsers: number; numberOfUsers: number };
  started: { percentageOfUsers: number; numberOfUsers: number };
  stopped: { percentageOfUsers: number; numberOfUsers: number };
  completed: { percentageOfUsers: number; numberOfUsers: number };
  total: number;
};

export type statusType = 'Plans' | 'Courses';
