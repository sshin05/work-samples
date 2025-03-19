import { fireEvent, screen, renderV3, waitFor } from '@@/test-utils';
import { useCreateSurvey } from '@/api/survey';
import { useCreateHostedExam } from '@/api/hosted-exam';
import { useCreateHostedCourse } from '@/api/hosted-course';
import { useCreateHostedScorm } from '@/api/hosted-scorm';
import { useCreateLab } from '@/api/lab';
import { AddCustomTrainingItemModalContent } from './AddCustomTrainingItemModalContent';
import { useGetSession } from '@/hooks/useGetSession';

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
const createSurvey = jest.fn(() =>
  Promise.resolve({ data: { createSurvey: { id: 1 } } })
);

jest.mock('next-auth/react');
jest.mock('@/api/survey');
jest.mock('@/api/hosted-exam');
jest.mock('@/api/hosted-course');
jest.mock('@/api/hosted-scorm');
jest.mock('@/api/lab');
jest.mock('@/hooks/useGetSession');

describe('AddCustomTrainingItemModalContent', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  const createHostedExam = jest.fn(() =>
    Promise.resolve({ data: { createHostedExam: { id: 1 } } })
  );

  const createHostedCourse = jest.fn(() =>
    Promise.resolve({ data: { createHostedCourse: { id: 1 } } })
  );

  const createHostedScorm = jest.fn(() =>
    Promise.resolve({ data: { createHostedScorm: { id: 1 } } })
  );

  const createLab = jest.fn(() =>
    Promise.resolve({ data: { createLab: { id: 1 } } })
  );

  beforeAll(() => {
    (useCreateSurvey as jest.Mock).mockReturnValue({
      createSurvey: createSurvey
    });
    (useCreateHostedExam as jest.Mock).mockReturnValue({ createHostedExam });
    (useCreateHostedCourse as jest.Mock).mockReturnValue({
      createHostedCourse
    });
    (useCreateHostedScorm as jest.Mock).mockReturnValue({ createHostedScorm });
    (useCreateLab as jest.Mock).mockReturnValue({ createLab });
    (useGetSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      isAuthenticated: true,
      user: {
        name: 'Test User',
        email: 'test@example.com',
        roles: ['admin']
      },
      isDuAdmin: true
    });
  });

  it('should render survey', async () => {
    renderV3(
      <AddCustomTrainingItemModalContent
        missionPartner={mockMissionPartner}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBeDisabled();
      expect(screen.getByRole('combobox')).not.toBeDisabled();
    });

    expect(screen.getByText('New training item')).toBeInTheDocument();
    expect(screen.getByText('Item name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBeDisabled();
      expect(screen.getByRole('combobox')).not.toBeDisabled();
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Item Name' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'survey' }
    });

    expect(screen.getByRole('combobox')).toHaveValue('survey');

    const createButton = screen.getByText('Create training item');
    expect(createButton).toBeInTheDocument();
    fireEvent.click(createButton);

    // Await the resolved value of createSurvey
    const result = await createSurvey();
    expect(result).toEqual({ data: { createSurvey: { id: 1 } } });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenLastCalledWith('survey', 1);
    });
  });

  it('should render scorm', async () => {
    renderV3(
      <AddCustomTrainingItemModalContent
        missionPartner={{ id: '1', name: 'Mission Partner Name' }}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Item name' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'scorm' }
    });
    fireEvent.click(screen.getByText('Create training item'));

    await waitFor(() => expect(createHostedScorm).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenLastCalledWith('scorm', 1);
  });

  it('should render exam', async () => {
    renderV3(
      <AddCustomTrainingItemModalContent
        missionPartner={{ id: '1', name: 'Mission Partner Name' }}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Item Name' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'exam' }
    });
    fireEvent.click(screen.getByText('Create training item'));

    await waitFor(() => expect(createHostedExam).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenLastCalledWith('exam', 1);
  });

  it('should render course', async () => {
    renderV3(
      <AddCustomTrainingItemModalContent
        missionPartner={{ id: '1', name: 'Mission Partner Name' }}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Item Name' }
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'course' }
    });
    fireEvent.click(screen.getByText('Create training item'));

    await waitFor(() => expect(createHostedCourse).toHaveBeenCalled());
    expect(onSubmit).toHaveBeenLastCalledWith('course', 1);
  });

  // it should not render Lab option if isDuAdmin is falsy
  it('should not render Lab option if isDuAdmin is falsy', async () => {
    (useGetSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      isAuthenticated: true,
      user: {
        name: 'Test User',
        email: 'testuser@testemail.test',
        roles: []
      },
      isDuAdmin: false
    });

    renderV3(
      <AddCustomTrainingItemModalContent
        missionPartner={{ id: '1', name: 'Mission Partner Name' }}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText('New training item')).toBeInTheDocument();
    expect(screen.getByText('Item name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.queryByText('Lab')).not.toBeInTheDocument();
  });
});
