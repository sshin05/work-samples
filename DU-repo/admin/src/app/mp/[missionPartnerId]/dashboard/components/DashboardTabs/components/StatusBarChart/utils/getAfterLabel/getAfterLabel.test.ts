import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';
import { getAfterLabel } from './getAfterLabel';

jest.mock('@/app/mp/[missionPartnerId]/utils/formatAsPercentage');

describe('getAfterLabel', () => {
  const mockFormatAsPercentage = jest.fn();

  beforeEach(() => {
    (formatAsPercentage as jest.Mock).mockImplementation(
      mockFormatAsPercentage
    );
  });

  const sampleStatusData = [
    {
      quarter: 'Q1',
      assigned: { percentageOfUsers: 10, numberOfUsers: 100 },
      started: { percentageOfUsers: 20, numberOfUsers: 200 },
      stopped: { percentageOfUsers: 5, numberOfUsers: 50 },
      completed: { percentageOfUsers: 15, numberOfUsers: 150 },
      total: 500
    }
  ];

  it('should return undefined when barLabel is undefined', () => {
    const result = getAfterLabel(sampleStatusData, 'Plans', 0, undefined);
    expect(result).toBeUndefined();
  });

  it('should return formatted string when barLabel is a valid string', () => {
    mockFormatAsPercentage.mockReturnValue('10%');
    const result = getAfterLabel(sampleStatusData, 'Plans', 0, 'assigned');
    expect(result).toBe('100 of 500 plans assigned (10%)');
  });

  it('should return formatted string when barLabel has leading/trailing spaces', () => {
    mockFormatAsPercentage.mockReturnValue('10%');
    const result = getAfterLabel(sampleStatusData, 'Plans', 0, ' assigned ');
    expect(result).toBe('100 of 500 plans assigned (10%)');
  });
});
