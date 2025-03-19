import { renderV3, screen } from '@@/test-utils';
import { SkeletonPanel } from './SkeletonPanel';

describe('SkeletonPanel', () => {
  it('renders the component with the correct aria-label', () => {
    renderV3(<SkeletonPanel>Test Content</SkeletonPanel>);

    const skeletonElement = screen.getByLabelText('Loading Skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });
});
