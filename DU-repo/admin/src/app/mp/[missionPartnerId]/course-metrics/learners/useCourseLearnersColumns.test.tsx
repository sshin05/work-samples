import { renderHook } from '@@/test-utils';
import { useCourseLearnersColumns } from './useCourseLearnersColumns';

jest.mock('@/utils/date/abbreviatedDayDate', () => ({
  abbreviatedDayDate: jest.fn().mockReturnValue('Jan 1, 2024')
}));

describe('useCourseLearnersColumns', () => {
  const mockData = {
    user: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    startedAt: '2024-01-01T00:00:00Z',
    pendingReviewAt: '2024-01-01T00:00:00Z',
    completedAt: '2024-01-02T00:00:00Z',
    markedCompletedAt: '2024-01-02T00:00:00Z',
    stoppedAt: '2024-01-01T00:00:00Z'
  };

  const testColumns = columns => {
    columns.forEach(column => {
      const context = {
        row: { original: mockData },
        column,
        getValue: column.accessorKey
          ? () => mockData[column.accessorKey]
          : () => null
      };

      const rendered = column.cell(context);

      if (
        column.header === 'Started' ||
        column.header === 'Completed' ||
        column.header === 'Marked Completed' ||
        column.header === 'Stopped'
      ) {
        expect(rendered.props.children).toBe('Jan 1, 2024');
      }
    });
  };

  it.each([
    ['Total Enrolled'],
    ['Started'],
    ['Pending Review'],
    ['Completed'],
    ['Marked Completed'],
    ['Stopped']
  ])('should return correct columns for status', status => {
    const { result } = renderHook(() => useCourseLearnersColumns(status));
    const columns = result.current;

    const headers = columns.map(col => col.header);
    expect(headers).toContain('Learner');
    expect(headers).toContain('Email Address');

    testColumns(columns);
  });
});
