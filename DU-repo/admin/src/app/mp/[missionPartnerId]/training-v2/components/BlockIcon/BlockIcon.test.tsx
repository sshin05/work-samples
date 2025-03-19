import { renderV3 } from '@@/test-utils';
import { BlockIcon } from './BlockIcon';

describe('BlockIcon', () => {
  it('should render', () => {
    const { container } = renderV3(<BlockIcon icon="user" />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
