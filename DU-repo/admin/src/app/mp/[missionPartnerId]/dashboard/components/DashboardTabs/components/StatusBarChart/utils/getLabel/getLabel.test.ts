import { getLabel } from './getLabel';

describe('getLabel', () => {
  it('should return "Jan-Mar 3 Q1" when label is "2023 Q1"', () => {
    expect(getLabel('2023 Q1')).toBe('Jan-Mar 3 Q1');
  });

  it('should return "Apr-June 3 Q2" when label is "2023 Q2"', () => {
    expect(getLabel('2023 Q2')).toBe('Apr-June 3 Q2');
  });

  it('should return "July-Sept 3 Q3" when label is "2023 Q3"', () => {
    expect(getLabel('2023 Q3')).toBe('July-Sept 3 Q3');
  });

  it('should return "Oct-Dec 3 Q4" when label is "2023 Q4"', () => {
    expect(getLabel('2023 Q4')).toBe('Oct-Dec 3 Q4');
  });
});
