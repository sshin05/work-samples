import { render, screen, fireEvent, waitFor } from '@@/test-utils';
import {
  type AddExistingUserFormProps,
  AddExistingUserForm
} from './AddExistingUserForm';
import { useSQLMutation } from '@/app/api';

jest.mock('./components/UserSearchInput');
jest.mock('@/app/api', () => ({
  useSQLMutation: jest
    .fn()
    .mockReturnValue({ loading: false, error: false, mutation: jest.fn })
}));

jest.mock('@/app/api/cohorts', () => ({
  sqlAddCohortMember: jest.fn()
}));

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn(fn => fn),
    formState: { isSubmitting: false }
  }))
}));

const defaultProps: AddExistingUserFormProps = {
  cohortId: 'mock-cohort-id',
  userInputSearchValue: '',
  onSelectExistingUser: jest.fn(),
  onAddExistingUserFormInputChange: jest.fn(),
  onCreateNewUserSelected: jest.fn(),
  onClose: jest.fn(),
  onSuccess: jest.fn(),
  onError: jest.fn
};

describe('AddExistingUserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    render(<AddExistingUserForm {...defaultProps} />);

    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  it.skip('calls handleAddExistingUserToCohort on form submit', async () => {
    const addCohortMemberSpy = jest.fn();

    (useSQLMutation as jest.Mock).mockReturnValueOnce({
      mutation: addCohortMemberSpy,
      loading: false
    });

    render(<AddExistingUserForm {...defaultProps} />);

    const formElement = screen.getByRole('form');
    fireEvent.submit(formElement);

    await waitFor(() => {
      expect(addCohortMemberSpy).toHaveBeenCalledWith({
        userId: undefined, // Value set by internal parent/child state changes
        cohortId: defaultProps.cohortId
      });
      expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
