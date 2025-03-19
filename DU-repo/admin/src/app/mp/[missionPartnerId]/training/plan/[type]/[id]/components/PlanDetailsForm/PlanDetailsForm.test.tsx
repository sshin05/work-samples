import { render, screen, fireEvent } from '@@/test-utils';
import { PlanDetailsForm } from './PlanDetailsForm';
import {
  useFindLatestForceMultiplierByIdAdmin,
  useUpdateForceMultiplier,
  useUpdateForceMultiplierContent
} from '@/api/force-multipliers';
import { useFindAllMissionPartnersMinDetails } from '@/api/mission-partner';

jest.mock('@/api/force-multipliers');
jest.mock('@/api/mission-partner');

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useNotificationCenter: jest.fn(() => ({
    notify: jest.fn()
  })),
  Button: ({ children, onClick }) => <div onClick={onClick}>{children}</div>,
  Label: ({ children }) => <div>{children}</div>,
  Select: ({ children }) => <div>{children}</div>,
  Option: ({ children }) => <div>{children}</div>,
  Toggle: ({ onChange }) => (
    <div
      data-testid="toggle"
      onClick={() =>
        onChange({
          aboutDescription: 'about',
          aboutTitle: 'title',
          description: '',
          missionPartnerId: 'mp 1',
          summary: 'summary',
          title: 'fm title',
          unsequenced: true,
          visibility: 'Everyone'
        })
      }
    />
  )
}));

jest.mock('@/hooks/useUnsavedChangesPrompt', () => ({
  useUnsavedChangesPrompt: jest.fn(() => [jest.fn(), jest.fn()])
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }) => (
    <div>
      {render({ field: {}, fieldState: {} })}
      <div></div>
    </div>
  )
}));

jest.mock('./MissionPartnerOwner', () => ({
  __esModule: true,
  default: () => <div>MissionPartnerOwner</div>
}));

const mockFM = {
  id: 'fm-id',
  version: '1',
  title: 'Test Title One',
  status: 'Draft',
  learningPathUri: null,
  totalDuration: 60,
  unsequenced: false,
  missionPartnerId: '5b7ca3b7-6116-43e8-af0a-4ae1b9823e7b',
  content: {
    description: ['test2'],
    summary: 'This is a new training plan with a summary change.',
    about: {
      title: 'About Test Title Two',
      description: ['This plan is provided by Test MP.'],
      image: '',
      imageAltText: 'test img'
    }
  },
  items: [
    {
      id: 'cloudacademy#6344f81b-f384-4913-abe3-a08afef69665',
      item: {
        __typename: 'Course',
        vendorCourseId: '6344f81b-f384-4913-abe3-a08afef69665',
        vendorName: 'Cloud Academy',
        courseTitle: 'Post-Test: AWS Cloud Architect — Proficient',
        courseUrl: 'https://digitalu.sso.cloudacademy.com/quiz/38025/',
        courseDuration: 30
      }
    },
    {
      id: 'cloudacademy#7a6cc031-d1b1-4f92-a1ed-71ff111abed7',
      item: {
        __typename: 'Course',
        vendorCourseId: '7a6cc031-d1b1-4f92-a1ed-71ff111abed7',
        vendorName: 'Cloud Academy',
        courseTitle: 'Pre-Test: AWS Cloud Architect — Proficient',
        courseUrl: 'https://digitalu.sso.cloudacademy.com/quiz/38024/',
        courseDuration: 30
      }
    },
    {
      id: 'du-create course',
      item: {
        __typename: 'Course',
        source: 'du-create',
        vendorName: 'DU',
        vendorCourseId: '1324',
        courseTitle: 'DU Create Course',
        courseUrl: '/app/ducreate/course/blah',
        courseDuration: 5
      }
    }
  ],

  modules: [
    {
      id: 'module-1',
      title: 'Module 1',
      items: [
        {
          itemId: 'cloudacademy#6344f81b-f384-4913-abe3-a08afef69665'
        },
        {
          itemId: 'cloudacademy#7a6cc031-d1b1-4f92-a1ed-71ff111abed7'
        }
      ]
    }
  ],
  conditions: {
    all: []
  },
  type: null
};

describe('PlanDetailsForm', () => {
  const mockFetchFM = jest.fn(async () => Promise.resolve());
  const mockUpdateFM = jest.fn(async () => Promise.resolve());
  const mockUpdateFMContent = jest.fn(async () => Promise.resolve());
  const mockRefetchMPMinDetails = jest.fn(async () => Promise.resolve());

  beforeEach(() => {
    (useFindLatestForceMultiplierByIdAdmin as jest.Mock).mockReturnValue({
      forceMultiplierById: mockFM,
      forceMultiplierByIdLoading: false,
      forceMultiplierByIdError: true,
      fetchForceMultiplierById: mockFetchFM
    });

    (useUpdateForceMultiplier as jest.Mock).mockReturnValue({
      updateForceMultiplier: mockUpdateFM,
      updateForceMultiplierLoading: false
    });
    (useUpdateForceMultiplierContent as jest.Mock).mockReturnValue({
      updateForceMultiplierContent: mockUpdateFMContent,
      updateForceMultiplierContentLoading: false
    });
    (useFindAllMissionPartnersMinDetails as jest.Mock).mockReturnValue({
      missionPartnersMinDetails: [
        {
          id: 'testMP',
          name: 'Test MP',
          slug: 'TestMP',
          description: null,
          affiliateId: 'space-force',
          logoUrl: null,
          accessCode: null,
          customTrainingEnabled: false
        }
      ],
      missionPartnerMinDetailsLoading: false,
      missionPartnerMinDetailsError: false,
      refetchlMissionPartnersMinDetails: mockRefetchMPMinDetails
    });
  });

  it('should render', () => {
    render(
      <PlanDetailsForm
        forceMultiplierById={mockFM}
        missionPartnerMinDetails={undefined}
        isModularizedForceMultiplier={false}
        supportsModules={true}
        isDuAdmin={true}
        disabled={false}
        loading={false}
        isSubmitting={false}
        handleSubmit={jest.fn()}
        control={jest.fn()}
        isDirty={false}
      />
    );
    expect(screen.getByText('Plan Type:')).toBeInTheDocument();
  });

  it('should render with modules', () => {
    render(
      <PlanDetailsForm
        forceMultiplierById={mockFM}
        missionPartnerMinDetails={undefined}
        isModularizedForceMultiplier={false}
        supportsModules={true}
        isDuAdmin={true}
        disabled={false}
        loading={false}
        isSubmitting={false}
        handleSubmit={jest.fn(func => func())}
        control={jest.fn()}
        isDirty={false}
      />
    );

    expect(screen.getByText('Plan Type:')).toBeInTheDocument();
    const [_, toggle] = screen.getAllByTestId('toggle');
    fireEvent.click(toggle);
    expect(mockUpdateFM).toHaveBeenCalled();
  });
});
