import { screen, render } from '@@/test-utils';
import { SideDrawer } from '.';

describe('SideDrawer', () => {
  const defaultProps = () => ({
    name: 'Charles Young',
    email: 'cyoung@example.com',
    onCloseIconClick: jest.fn(),
    onExited: jest.fn(),
    isOpen: true,
    isLoading: false
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    const props = defaultProps();
    render(<SideDrawer {...props}>Mock Child</SideDrawer>);

    expect(screen.getByText('Mock Child')).toBeInTheDocument();
    expect(screen.getByText(props.name)).toBeInTheDocument();
  });
});
