import { screen, fireEvent, waitFor, renderV3 } from '@@/test-utils';
import { useCreateForceMultiplier } from '@/api/force-multipliers';
import { AddPlanModalContent } from './AddPlanModalContent';

jest.mock('@/api/force-multipliers');

const mockMissionPartner = {
  id: '1',
  name: 'Mission Partner Name',
  affiliateId: 'affiliate-1',
  courses: [],
  customTrainingEnabled: true,
  exams: [],
  forceMultipliers: [],
  learners: [],
  plans: [],
  training: [],
  labs: [],
  scorms: [],
  surveys: [],
  trialEnabled: false
};

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>,
  FieldMessage: ({ children }) => <div>{children}</div>,
  Button: ({ children, type }) => <button type={type}>{children}</button>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Textarea: ({ value, id, ariaLabel, maxLength, autoComplete, onChange }) => (
    <textarea
      value={value}
      id={id}
      aria-label={ariaLabel}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={onChange}
    />
  ),
  Input: ({ children, ...props }) => <input {...props}>{children}</input>,
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  ModalHeader: ({ children }) => <div>{children}</div>,
  ModalHeading: ({ children }) => <h1>{children}</h1>
}));

describe('AddPlanModal', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();
  const createForceMultiplier = jest.fn(() =>
    Promise.resolve({ data: { createForceMultiplier: { id: 1 } } })
  );

  beforeAll(() => {
    (useCreateForceMultiplier as jest.Mock).mockReturnValue({
      createForceMultiplier
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('AddPlanModal rendering', () => {
    it('should render the modal with initial state', () => {
      renderV3(
        <AddPlanModalContent
          missionPartner={mockMissionPartner}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      );

      expect(screen.getByText('New training plan')).toBeInTheDocument();
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();

      const title = screen.getByLabelText('Title');
      expect(title).toHaveValue('');
      const description = screen.getAllByRole('textbox')[1];
      expect(description).toHaveValue('');
    });
  });

  describe('AddPlanModal interactions', () => {
    it('should allow user to input title and description', () => {
      renderV3(
        <AddPlanModalContent
          missionPartner={mockMissionPartner}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      );

      const title = screen.getByLabelText('Title');
      const description = screen.getAllByRole('textbox')[1];

      const TITLE = 'Title';
      fireEvent.change(title, { target: { value: TITLE } });
      expect(title).toHaveValue(TITLE);

      const DESCRIPTION = 'Description';
      fireEvent.change(description, { target: { value: DESCRIPTION } });
      expect(description).toHaveValue(DESCRIPTION);
    });

    it('should call onSubmit with correct data when form is submitted', async () => {
      renderV3(
        <AddPlanModalContent
          missionPartner={mockMissionPartner}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      );

      const title = screen.getByLabelText('Title');
      const description = screen.getAllByRole('textbox')[1];

      const TITLE = 'Title';
      fireEvent.change(title, { target: { value: TITLE } });

      const DESCRIPTION = 'Description';
      fireEvent.change(description, { target: { value: DESCRIPTION } });

      const createTrainingPlanButton = screen.getByText('Create training plan');
      fireEvent.click(createTrainingPlanButton);
      await waitFor(() => {
        expect(createForceMultiplier).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(1);
      });
    });
  });
});
