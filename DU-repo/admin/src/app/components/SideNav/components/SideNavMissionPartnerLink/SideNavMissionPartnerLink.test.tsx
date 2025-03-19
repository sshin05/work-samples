import { renderV3 as render, screen } from '@@/test-utils';
import { SideNavMissionPartnerLink } from './SideNavMissionPartnerLink';

describe('SideNavMissionPartnerLink', () => {
  it('should render the link with children', () => {
    render(
      <SideNavMissionPartnerLink href="/test">
        Test Link
      </SideNavMissionPartnerLink>
    );

    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('should have the correct href attribute', () => {
    const { container } = render(
      <SideNavMissionPartnerLink href="/test">
        Test Link
      </SideNavMissionPartnerLink>
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/test');
  });
});
