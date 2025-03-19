import { renderHook } from '@@/test-utils';
import { useCourseColumns } from './courseMetricsColumns';

describe('useCourseColumns', () => {
  const mockData = {
    user: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    courseId: 'course#123',
    started: 1,
    pendingReview: 1,
    stopped: 1,
    completed: 1,
    markedCompleted: 1,
    total: 1000
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
        column.header === 'Pending' ||
        column.header === 'Stopped' ||
        column.header === 'Completed' ||
        column.header === 'Marked Completed'
      ) {
        expect(rendered.props.children).toBe('1');
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
  ])('should return correct columns for id', mpId => {
    const { result } = renderHook(() => useCourseColumns(mpId));
    const columns = result.current;

    const headers = columns.map(col => col.header);
    expect(headers).toContain('Course');
    expect(headers).toContain('Vendor');

    testColumns(columns);
  });
});
