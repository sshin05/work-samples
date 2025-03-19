import { renderV3, screen, fireEvent } from '@@/test-utils';
import { LearnerSideDrawer } from './LearnerSideDrawer';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@cerberus/react', () => {
  const actual = jest.requireActual('@cerberus/react');

  return {
    ...actual,
    Text: ({ children }) => <div>{children}</div>
  };
});

describe('LearnerSideDrawer', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    id: '001',
    firstName: 'Charles',
    lastName: 'Young',
    email: 'cyoung@example.com',
    branch: 'Army',
    userType: 'Learner',
    grade: 'A',
    occupationalCode: '123',
    totalTimeTrained: 10,
    metadata: {
      command: 'some command',
      other: 'other value'
    }
  };

  it('renders static detail cards with user data', () => {
    renderV3(
      <LearnerSideDrawer
        isOpen={true}
        onClose={jest.fn()}
        userById={user}
        isLoading={false}
        isError={false}
        viewLearnerDetailsPath="/profile"
      />
    );

    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getAllByText('Army')).toHaveLength(2);

    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getAllByText('Learner')).toHaveLength(2);

    expect(screen.getByText('Grade')).toBeInTheDocument();
    expect(screen.getAllByText('A')).toHaveLength(2);

    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getAllByText('123')).toHaveLength(2);

    expect(screen.getByText('Total time training')).toBeInTheDocument();
    expect(screen.getAllByText('10 hours')).toHaveLength(2);
  });

  it('renders branch-specific detail cards when a branch exists', () => {
    renderV3(
      <LearnerSideDrawer
        isOpen={true}
        onClose={jest.fn()}
        userById={user}
        isLoading={false}
        isError={false}
        viewLearnerDetailsPath="/profile"
      />
    );

    expect(screen.getByText('Other')).toBeInTheDocument();
    expect(screen.getAllByText('Other value')).toHaveLength(2);
  });

  it('navigates to the full profile when the "View full profile" button is clicked', () => {
    renderV3(
      <LearnerSideDrawer
        isOpen={true}
        onClose={jest.fn()}
        userById={user}
        isLoading={false}
        isError={false}
        viewLearnerDetailsPath="/profile"
      />
    );

    const viewProfileButton = screen.getByRole('button', {
      name: /view full profile/i
    });
    fireEvent.click(viewProfileButton);
    expect(pushMock).toHaveBeenCalledWith('/profile');
  });

  it('disables the "View full profile" button when loading and there is no error', () => {
    renderV3(
      <LearnerSideDrawer
        isOpen={true}
        onClose={jest.fn()}
        userById={user}
        isLoading={true}
        isError={false}
        viewLearnerDetailsPath="/profile"
      />
    );

    const viewProfileButton = screen.getByRole('button', {
      name: /view full profile/i
    });
    expect(viewProfileButton).toBeDisabled();
  });

  it('does not render any detail cards when userById is null', () => {
    renderV3(
      <LearnerSideDrawer
        isOpen={true}
        onClose={jest.fn()}
        userById={null}
        isLoading={false}
        isError={false}
        viewLearnerDetailsPath="/profile"
      />
    );

    // since no user data is provided, static labels should not appear.
    expect(screen.queryByText('Branch')).not.toBeInTheDocument();
  });
});
