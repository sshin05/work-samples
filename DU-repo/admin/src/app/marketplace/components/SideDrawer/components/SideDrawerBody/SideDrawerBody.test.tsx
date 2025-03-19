import { screen, render } from '@@/test-utils';
import { SideDrawerBody } from '.';

describe('SideDrawerBody', () => {
  const defaultProps = () => ({
    drawerHasFooter: false
  });

  it('renders', () => {
    const props = defaultProps();
    render(<SideDrawerBody {...props}>Mock Child</SideDrawerBody>);

    expect(screen.getByText('Mock Child')).toBeInTheDocument();
  });
});
