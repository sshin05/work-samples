import { renderV3, screen, userEvent } from '@@/test-utils';
import { EditTitleModalActions } from './EditTitleModalActions';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(() => ({
    pending: false
  }))
}));

describe('EditTitleModalActions', () => {
  const useFormStatusMock = jest.requireMock('react-dom').useFormStatus;

  beforeEach(() => {
    useFormStatusMock.mockReturnValue({
      pending: false
    });
  });

  it('should render', () => {
    renderV3(<EditTitleModalActions closeModal={jest.fn()} />);

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should render loading state', () => {
    useFormStatusMock.mockReturnValue({
      pending: true
    });

    renderV3(<EditTitleModalActions closeModal={jest.fn()} />);

    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });

  it('should call closeModal when cancel button is clicked', () => {
    const closeModal = jest.fn();

    renderV3(<EditTitleModalActions closeModal={closeModal} />);

    userEvent.click(screen.getByText('Cancel'));

    expect(closeModal).toHaveBeenCalled();
  });
});
