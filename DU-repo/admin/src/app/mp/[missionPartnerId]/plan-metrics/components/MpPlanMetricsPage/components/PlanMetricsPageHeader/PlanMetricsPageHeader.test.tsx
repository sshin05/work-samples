import { renderV3, screen } from '@@/test-utils';
import PlanMetricsPageHeader from './PlanMetricsPageHeader';

describe('PlanMetricsPageHeader', () => {
  it('renders with name prefix when name is provided', () => {
    const planName = 'Advanced Math';
    renderV3(<PlanMetricsPageHeader name={planName} />);

    expect(screen.getByText(`${planName} | Plans`)).toBeInTheDocument();
  });

  it('renders without name prefix when name is not provided', () => {
    renderV3(<PlanMetricsPageHeader />);

    // when no name is provided, it should only display "Plans"
    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Plans').textContent).toBe('Plans');
  });
});
