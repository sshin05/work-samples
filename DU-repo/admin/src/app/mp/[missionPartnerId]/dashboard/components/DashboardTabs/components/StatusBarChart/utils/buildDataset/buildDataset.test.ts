import { buildDataset } from './buildDataset';
import type { statusData, statusType } from './buildDataset.types';

const chartColors = {
  qualitative100: '#000000',
  qualitative300: '#000000',
  qualitative400: '#000000',
  qualitative500: '#000000',
  qualitative600: '#000000',
  successSurface100: '#000000',
  infoSurfaceInitial: '#000000',
  diverging900: '#000000'
};

const sampleStatusData: statusData[] = [
  {
    quarter: 'Q1',
    assigned: { percentageOfUsers: 10, numberOfUsers: 100 },
    started: { percentageOfUsers: 20, numberOfUsers: 200 },
    stopped: { percentageOfUsers: 5, numberOfUsers: 50 },
    completed: { percentageOfUsers: 15, numberOfUsers: 150 },
    total: 500
  },
  {
    quarter: 'Q2',
    assigned: { percentageOfUsers: 15, numberOfUsers: 150 },
    started: { percentageOfUsers: 25, numberOfUsers: 250 },
    stopped: { percentageOfUsers: 10, numberOfUsers: 100 },
    completed: { percentageOfUsers: 20, numberOfUsers: 200 },
    total: 700
  }
];

describe('buildDataset', () => {
  it('should build dataset correctly for Plans', () => {
    const statusType: statusType = 'Plans';
    const result = buildDataset(sampleStatusData, statusType, chartColors);

    expect(result.categoryLabels).toEqual(['Q1', 'Q2']);
    expect(result.assignedPercentages).toEqual([10, 15]);
    expect(result.startedPercentages).toEqual([20, 25]);
    expect(result.stoppedPercentages).toEqual([5, 10]);
    expect(result.completedPercentages).toEqual([15, 20]);
    expect(result.builtDataset).toHaveLength(4);
  });

  it('should build dataset correctly for Courses', () => {
    const statusType: statusType = 'Courses';
    const result = buildDataset(sampleStatusData, statusType, chartColors);

    expect(result.categoryLabels).toEqual(['Q1', 'Q2']);
    expect(result.assignedPercentages).toEqual([]);
    expect(result.startedPercentages).toEqual([20, 25]);
    expect(result.stoppedPercentages).toEqual([5, 10]);
    expect(result.completedPercentages).toEqual([15, 20]);
    expect(result.builtDataset).toHaveLength(3);
  });

  it('should handle empty statusData', () => {
    const statusType: statusType = 'Plans';
    const result = buildDataset([], statusType, chartColors);

    expect(result.categoryLabels).toEqual([]);
    expect(result.assignedPercentages).toEqual([]);
    expect(result.startedPercentages).toEqual([]);
    expect(result.stoppedPercentages).toEqual([]);
    expect(result.completedPercentages).toEqual([]);
    expect(result.builtDataset).toHaveLength(4);
  });

  it('should handle statusData with one quarter', () => {
    const statusType: statusType = 'Plans';
    const singleQuarterData: statusData[] = [
      {
        quarter: 'Q1',
        assigned: { percentageOfUsers: 10, numberOfUsers: 100 },
        started: { percentageOfUsers: 20, numberOfUsers: 200 },
        stopped: { percentageOfUsers: 5, numberOfUsers: 50 },
        completed: { percentageOfUsers: 15, numberOfUsers: 150 },
        total: 500
      }
    ];
    const result = buildDataset(singleQuarterData, statusType, chartColors);

    expect(result.categoryLabels).toEqual(['Q1']);
    expect(result.assignedPercentages).toEqual([10]);
    expect(result.startedPercentages).toEqual([20]);
    expect(result.stoppedPercentages).toEqual([5]);
    expect(result.completedPercentages).toEqual([15]);
    expect(result.builtDataset).toHaveLength(4);
  });

  it('should handle statusData with multiple quarters', () => {
    const statusType: statusType = 'Plans';
    const result = buildDataset(sampleStatusData, statusType, chartColors);

    expect(result.categoryLabels).toEqual(['Q1', 'Q2']);
    expect(result.assignedPercentages).toEqual([10, 15]);
    expect(result.startedPercentages).toEqual([20, 25]);
    expect(result.stoppedPercentages).toEqual([5, 10]);
    expect(result.completedPercentages).toEqual([15, 20]);
    expect(result.builtDataset).toHaveLength(4);
  });
});
