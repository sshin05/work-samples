import { renderV3, screen } from '@@/test-utils';
import { ItemsSection } from './ItemsSection';

describe('ItemsSection', () => {
  it('should render', () => {
    renderV3(<ItemsSection />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
  });
});
