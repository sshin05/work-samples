import { renderV3, screen } from '@@/test-utils';
import { SidebarSkeleton } from './SidebarSkeleton';

describe('SidebarSkeleton', () => {
  it('should render', () => {
    renderV3(<SidebarSkeleton />);

    expect(screen.getByText('Curriculum Contents')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Loading sidebar')).toBeInTheDocument();
  });
});
