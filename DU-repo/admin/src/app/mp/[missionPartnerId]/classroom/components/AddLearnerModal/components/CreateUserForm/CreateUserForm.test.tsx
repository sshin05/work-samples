import { render, screen } from '@@/test-utils';
import { type CreateUserInputs, CreateUserForm } from './CreateUserForm';

jest.mock('@/api/user', () => {
  return {
    useImportSingleUser: () => ({
      importSingleUser: jest.fn().mockReturnValue({
        data: { importSingleUser: { id: 'mock-user-id' } }
      }),
      importSingleUserLoading: false
    })
  };
});

jest.mock('@/app/api', () => ({
  useSQLMutation: jest
    .fn()
    .mockReturnValue({ loading: false, error: false, mutation: jest.fn })
}));

jest.mock('@/app/api/cohorts', () => ({
  sqlAddCohortMember: jest.fn()
}));

const defaultProps: CreateUserInputs = {
  cohortId: 'mock-cohort-id',
  userInputSearchValue: '',
  onClose: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn()
};

describe('CreateUserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders', () => {
    render(<CreateUserForm {...defaultProps} />);

    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });
});
