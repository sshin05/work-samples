import { renderV3, screen } from '@@/test-utils';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  it('should render', () => {
    renderV3(<SectionTitle title="Plans" total={10} addHref="#" />);

    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('should render loading', () => {
    renderV3(<SectionTitle title="Plans" loading />);

    expect(screen.getByText('Loading total')).toBeInTheDocument();
  });
});
