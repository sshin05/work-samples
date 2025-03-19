import { renderV3, screen } from '@@/test-utils';
import { Search } from './Search';

describe('Search', () => {
  it('should render', () => {
    renderV3(<Search />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});
