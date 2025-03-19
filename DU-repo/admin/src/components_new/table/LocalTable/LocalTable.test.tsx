import { renderV3, screen } from '@@/test-utils';
import { LocalTable } from './LocalTable';
import { mockColumns, mockData } from '../table-utils/mocks';

describe('LocalTable', () => {
  it('renders with toolbar & searchPlaceholder', () => {
    renderV3(
      <LocalTable
        columns={mockColumns}
        data={mockData}
        hasToolbar
        searchPlaceholder="search here"
      />
    );
    expect(screen.getByLabelText('search table for value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('search here')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderV3(<LocalTable columns={mockColumns} data={mockData} />);
    expect(screen.getByText('1 - 2 of 2 items')).toBeInTheDocument();
  });
});
