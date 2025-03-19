import React from 'react';
import { renderV3, screen, waitFor } from '@@/test-utils';
import { shouldRedirectToMissionPartnerHome } from '../../utils';
import { GradeBookTabs } from './GradeBookTabs';

jest.mock('./components/SurveysTab/SurveysTab', () => {
  const MockSurveysTab = () => <div data-testid="mock-surveys-tab" />;
  MockSurveysTab.displayName = 'MockSurveysTab';
  return MockSurveysTab;
});

jest.mock('./components/QuizzesExamsTab/QuizzesExamsTab', () => {
  const MockQuizzesExamsTab = () => (
    <div data-testid="mock-quizzes-exams-tab" />
  );
  MockQuizzesExamsTab.displayName = 'MockQuizzesExamsTab';
  return MockQuizzesExamsTab;
});

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {}
  }))
}));

jest.mock('../../utils', () => ({
  getDidLoadMissionPartnerData: jest.fn(),
  shouldRedirectToMissionPartnerHome: jest.fn()
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  }))
}));

const mockMissionPartner = jest.fn();

const mockMpId = 'Mp1';

jest.mock('@/api/mission-partner', () => ({
  useFindMissionPartnerMinDetails: jest.fn(() => ({
    missionPartnerMinDetails: mockMissionPartner
  })),
  useExportSurveys: jest.fn(() => ({
    exportSurveys: jest.fn()
  })),
  useExportQuizExams: jest.fn(() => ({
    exportQuizExams: jest.fn()
  })),
  useFindSurveysBySearch: jest.fn(() => ({
    surveys: [],
    surveysLoading: false
  })),
  useFindQuizAndExamsBySearch: jest.fn(() => ({
    quizExams: [],
    quizExamsLoading: false
  }))
}));

describe('<MpGradebookPage />', () => {
  afterEach(() => {
    mockPush.mockReset();
  });

  it('should render with tabs', () => {
    renderV3(<GradeBookTabs missionPartnerId={mockMpId} />);

    expect(screen.getByText('Quizzes/Assessments')).toBeInTheDocument();
    expect(screen.getByText('Surveys')).toBeInTheDocument();
    expect(screen.getByTestId('mock-quizzes-exams-tab')).toBeInTheDocument();
    expect(screen.getByTestId('mock-surveys-tab')).toBeInTheDocument();
  });

  it('should redirect when eligible', () => {
    (shouldRedirectToMissionPartnerHome as jest.Mock).mockReturnValueOnce(true);

    renderV3(<GradeBookTabs missionPartnerId={mockMpId} />);

    waitFor(() => expect(mockPush).toHaveBeenCalledWith('/mp/missionPartner1'));
  });

  it('should not redirect when ineligible', () => {
    (shouldRedirectToMissionPartnerHome as jest.Mock).mockReturnValueOnce(
      false
    );

    renderV3(<GradeBookTabs missionPartnerId={mockMpId} />);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
