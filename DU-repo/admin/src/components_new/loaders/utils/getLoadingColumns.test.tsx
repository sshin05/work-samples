import { getLoadingColumns } from './getLoadingColumns';

describe('getColumns', () => {
  it('should return an array of columns with headers', () => {
    const titles = ['Name', 'Email', 'Date'];

    const columns = getLoadingColumns(titles);

    expect(columns).toEqual(titles.map(title => ({ header: title })));
  });

  it('should return an empty array when titles array is empty', () => {
    const titles = [];
    const expectedColumns = [];

    const columns = getLoadingColumns(titles);

    expect(columns).toEqual(expectedColumns);
  });
});
