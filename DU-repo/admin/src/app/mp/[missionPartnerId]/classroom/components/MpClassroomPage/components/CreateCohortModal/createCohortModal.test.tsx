import { renderV3 as render, fireEvent } from '@@/test-utils';
import { CreateCohortModal } from './CreateCohortModal';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: mockRouterPush }))
}));
const mockNotify = jest.fn();
const mockShow = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  useCTAModal: jest.fn(() => ({ show: mockShow }))
}));

describe('CreateCohortModal', () => {
  it('renders the Create Cohort button', () => {
    const { getByText } = render(<CreateCohortModal missionPartnerId="123" />);
    expect(getByText('Create Cohort')).toBeInTheDocument();
  });

  it('opens the modal with correct options when button is clicked', () => {
    const { getByText } = render(<CreateCohortModal missionPartnerId="123" />);
    fireEvent.click(getByText('Create Cohort'));

    expect(mockShow).toHaveBeenCalledWith({
      heading: 'Create a new cohort or copy an existing one?',
      description:
        'Start from scratch, or use an existing cohort as a template.',
      actions: expect.arrayContaining([expect.any(Object), expect.any(Object)]),
      icon: expect.any(Object)
    });
  });

  it('navigates to create cohort route when "Create new cohort" is clicked', () => {
    const { getByText } = render(<CreateCohortModal missionPartnerId="123" />);
    fireEvent.click(getByText('Create Cohort'));

    const createNewCohortAction = mockShow.mock.calls[0][0].actions[0];
    createNewCohortAction.onClick();

    expect(mockRouterPush).toHaveBeenCalledWith(
      expect.stringContaining('/classroom/create')
    );
  });

  it('shows notification when "Copy existing cohort" is clicked', () => {
    const { getByText } = render(<CreateCohortModal missionPartnerId="123" />);
    fireEvent.click(getByText('Create Cohort'));

    const copyExistingCohortAction = mockShow.mock.calls[0][0].actions[1];
    copyExistingCohortAction.onClick();

    expect(mockNotify).toHaveBeenCalledWith({
      palette: 'info',
      heading: 'Feature coming soon'
    });
  });
});
