import { renderV3, screen } from '@@/test-utils';
import { SkeletonRows } from './SkeletonRows';
import { mockColumns } from '../../../../table-utils/mocks';

describe('SkeletonRow', () => {
  it('renders skeleton rows correctly', () => {
    const skeletonRows = 5;
    renderV3(
      <SkeletonRows tableColumns={mockColumns} skeletonRows={skeletonRows} />
    );
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(skeletonRows);

    const loadingElement = document.querySelector('[aria-busy="true"]');
    expect(loadingElement).toBeInTheDocument();
  });
});
