import { renderV3, screen } from '@@/test-utils';
import { SideNavMenuLink } from './SideNavMenuLink';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn()
}));

describe('SideNavMenuLink', () => {
  const routerPushMock = jest.fn();
  const defaultProps = {
    href: 'mockHref',
    label: 'mockLabel'
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: routerPushMock,
      query: { missionPartnerId: '1' },
      asPath: '/mp/1/custom-training/course/1'
    });
    (usePathname as jest.Mock).mockReturnValue('missionPartnerId=1');
  });

  it('renders', () => {
    const navLinkText = 'Mock Nav Link Text';

    renderV3(
      <SideNavMenuLink {...defaultProps}>{navLinkText}</SideNavMenuLink>
    );

    expect(screen.getByText(navLinkText)).toBeInTheDocument();
  });

  it('applies selected styles when link is selected', () => {
    (usePathname as jest.Mock).mockReturnValue('mockHref');
    const navLinkText = 'Mock Nav Link Text';

    renderV3(
      <SideNavMenuLink {...defaultProps}>{navLinkText}</SideNavMenuLink>
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveStyle(`background-color: action.ghost.active`);
    expect(listItem).toHaveStyle(`color: action.text.200`);
  });

  it('applies selected styles when link is selected', () => {
    (usePathname as jest.Mock).mockReturnValue('/mock-href');
    const navLinkText = 'Mock Nav Link Text';

    renderV3(
      <SideNavMenuLink {...defaultProps}>{navLinkText}</SideNavMenuLink>
    );

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveStyle(`background-color: action.ghost.active`);
    expect(listItem).toHaveStyle(`color: action.text.200`);
  });

  it('renders a sublabel when provided', () => {
    const props = {
      ...defaultProps,
      subLabel: 'Mock Sub-Label'
    };

    renderV3(<SideNavMenuLink {...props}>Child</SideNavMenuLink>);

    expect(screen.getByText(props.subLabel)).toBeInTheDocument();
  });
});
