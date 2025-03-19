import { render, screen } from '@@/test-utils';
import { UserDetailsSection } from './UserDetailsSection';

jest.mock('../SideDrawer/components/SideDrawerDetailsCard', () => ({
  SideDrawerDetailsCard: ({ label, value }: { label: string; value: any }) => (
    <div data-testid="side-drawer-details-card">
      <span>{label}</span>: <span>{value}</span>
    </div>
  )
}));

describe('UserDetailsSection', () => {
  const staticDetailsDictionary = {
    'First Name': 'firstName',
    Email: 'email'
  };

  const branchDetailsMapping = {
    Army: {
      Division: 'metadata.division'
    },
    Navy: {
      Ship: 'metadata.ship'
    }
  };

  const userWithBranch = {
    id: '002',
    firstName: 'John',
    email: 'john@example.com',
    branch: 'Army',
    metadata: {
      division: 'Infantry'
    }
  };

  const userWithoutBranch = {
    id: '003',
    firstName: 'Jane',
    email: 'jane@example.com'
  };

  it('renders nothing when no user is provided', () => {
    const { container } = render(
      <UserDetailsSection
        user={null}
        isLoading={false}
        staticDetailsDictionary={staticDetailsDictionary}
        branchDetailsMapping={branchDetailsMapping}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders static detail cards for a user without branch', () => {
    render(
      <UserDetailsSection
        user={userWithoutBranch}
        isLoading={false}
        staticDetailsDictionary={staticDetailsDictionary}
        branchDetailsMapping={branchDetailsMapping}
      />
    );

    // expect two cards (one for each static detail)
    const cards = screen.getAllByTestId('side-drawer-details-card');
    expect(cards).toHaveLength(2);

    // check that the static details render correctly
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example\.com/i)).toBeInTheDocument();
  });

  it('renders both static and branch detail cards for a user with branch', () => {
    render(
      <UserDetailsSection
        user={userWithBranch}
        isLoading={false}
        staticDetailsDictionary={staticDetailsDictionary}
        branchDetailsMapping={branchDetailsMapping}
      />
    );

    const cards = screen.getAllByTestId('side-drawer-details-card');
    expect(cards).toHaveLength(3);

    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example\.com/i)).toBeInTheDocument();

    expect(screen.getByText(/Division/i)).toBeInTheDocument();
    expect(screen.getByText(/Infantry/i)).toBeInTheDocument();
  });

  it('applies the correct aria-busy attribute based on isLoading prop', () => {
    const { container, rerender } = render(
      <UserDetailsSection
        user={userWithoutBranch}
        isLoading={true}
        staticDetailsDictionary={staticDetailsDictionary}
        branchDetailsMapping={branchDetailsMapping}
      />
    );
    // check that the container has aria-busy="true"
    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
    // re-render with isLoading set to false
    rerender(
      <UserDetailsSection
        user={userWithoutBranch}
        isLoading={false}
        staticDetailsDictionary={staticDetailsDictionary}
        branchDetailsMapping={branchDetailsMapping}
      />
    );
    expect(container.firstChild).toHaveAttribute('aria-busy', 'false');
  });
});
