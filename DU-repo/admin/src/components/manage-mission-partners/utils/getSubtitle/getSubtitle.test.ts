import { getSubtitle } from '@/components/manage-mission-partners/utils/getSubtitle';

describe('getSubtitle', () => {
  it('should return the correct subtitle for enrolled', () => {
    expect(getSubtitle('enrolled')).toEqual('Total Enrolled');
  });

  it('should return the correct subtitle for assigned', () => {
    expect(getSubtitle('assigned')).toEqual('Assigned');
  });

  it('should return the correct subtitle for inProgress', () => {
    expect(getSubtitle('inProgress')).toEqual('In Progress');
  });

  it('should return the correct subtitle for completed', () => {
    expect(getSubtitle('completed')).toEqual('Completed');
  });

  it('should return the correct subtitle for stopped', () => {
    expect(getSubtitle('stopped')).toEqual('Stopped');
  });

  it('should return the correct subtitle for started', () => {
    expect(getSubtitle('started')).toEqual('Started');
  });

  it('should return null if the type is not recognized', () => {
    expect(getSubtitle('foo')).toEqual(null);
  });
});
