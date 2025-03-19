import { pluralSCheck } from '@/app/mp/[missionPartnerId]/utils/pluralSCheck';
import { findLabel } from './findLabel';
import { formatAsPercentage } from '@/app/mp/[missionPartnerId]/utils/formatAsPercentage';

jest.mock('@/app/mp/[missionPartnerId]/utils/formatAsPercentage');
jest.mock('@/app/mp/[missionPartnerId]/utils/pluralSCheck');

describe('findLabel', () => {
  beforeEach(() => {
    (pluralSCheck as jest.Mock).mockReturnValue('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct label for index 0', () => {
    (formatAsPercentage as jest.Mock).mockReturnValue('50%');

    const result = findLabel(0, 100, 50, 30, 20);
    expect(result).toBe('50 Learner Onboarded and Active (50%)');
    expect(formatAsPercentage).toHaveBeenCalledWith(0.5);
    expect(pluralSCheck).toHaveBeenCalledWith(50);
  });

  it('should return correct label for index 1', () => {
    (formatAsPercentage as jest.Mock).mockReturnValue('30%');

    const result = findLabel(1, 100, 50, 30, 20);
    expect(result).toBe('30 Learner Onboarded but Inactive (30%)');
    expect(formatAsPercentage).toHaveBeenCalledWith(0.3);
    expect(pluralSCheck).toHaveBeenCalledWith(30);
  });

  it('should return correct label for index 2', () => {
    (formatAsPercentage as jest.Mock).mockReturnValue('20%');

    const result = findLabel(2, 100, 50, 30, 20);
    expect(result).toBe('20 Learner not Onboarded (20%)');
    expect(formatAsPercentage).toHaveBeenCalledWith(0.2);
    expect(pluralSCheck).toHaveBeenCalledWith(20);
  });
});
