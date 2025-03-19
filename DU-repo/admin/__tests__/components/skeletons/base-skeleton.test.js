import { render } from '@@/test-utils';

import { BaseSkeleton } from '@/components_new/loaders/BaseSkeleton';

describe('<BaseSkeleton />', () => {
  it('should render a skeleton', () => {
    const { container } = render(<BaseSkeleton />);
    const skeleton = container.querySelectorAll('.react-loading-skeleton');
    expect(skeleton.length).toBe(1);
    expect(skeleton[0]).toHaveAttribute(
      'style',
      '--base-color: #FFFFFF; --highlight-color: #918EA7;'
    );
  });
  it('should render a skeleton with passed baseColor and highlightColor', () => {
    const { container } = render(
      <BaseSkeleton baseColor="red" highlightColor="green" />
    );
    const skeleton = container.querySelectorAll('.react-loading-skeleton');
    expect(skeleton[0]).toHaveAttribute(
      'style',
      '--base-color: red; --highlight-color: green;'
    );
  });
});
