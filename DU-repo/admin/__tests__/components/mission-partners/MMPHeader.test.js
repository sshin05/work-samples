import { render, screen } from '@@/test-utils';
import MMPHeader from '../../../src/components/manage-mission-partners/MMPHeader';

const props = {
  missionPartnerName: 'Mission Partner Name',
  affiliateId: 'air-force',
  page: 'Cohorts'
};

describe('<MMPHeader>', () => {
  it('should render a tile with learners icon', () => {
    render(<MMPHeader {...props} />);
    expect(screen.getByText('Mission Partner Name')).toBeInTheDocument();
    expect(screen.getByText('Cohorts')).toBeInTheDocument();
    expect(screen.getByAltText('air-force logo')).toBeInTheDocument();
  });
});
