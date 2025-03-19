import { fireEvent, renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import LearnerDoughnut from './LearnerDoughnut';
import { findLabel } from './utils/findLabel';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import {
  useFindMissionPartnerById,
  useSendReminderToNonOnboarded
} from '@/api/mission-partner';
import {
  useCountActiveUsersByMissionPartnerId,
  useCountOnboardedUsersByMissionPartnerId,
  useCountUsersByMissionPartnerId
} from '@/api/users';

jest.mock('@/api/mission-partner');
jest.mock('@/api/users');

const mockFindLabel = jest.fn();
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <div>{children}</div>
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <div>{children}</div>,
  Tooltip: ({ children }) => <div>{children}</div>
}));

jest.mock('./utils/findLabel');

jest.mock('react-chartjs-2', () => ({
  Doughnut: ({ options }) => {
    const { plugins } = options;
    // Simulate the usage of plugins and callbacks
    const { tooltip } = plugins;

    const tooltipLabelCallback: ({ dataIndex }: { dataIndex: number }) => void =
      tooltip.callbacks.label;
    tooltipLabelCallback({ dataIndex: 0 });

    return <div>Doughnut</div>;
  }
}));

(findLabel as jest.Mock).mockReturnValue({
  findLabel: mockFindLabel
});

const mockMissionPartner = {
  affiliateId: '1',
  id: '1',
  logoUrl: null,
  name: 'test 1'
};

describe('Learner Doughnut', () => {
  beforeEach(() => {
    (useFindMissionPartnerById as jest.Mock).mockReturnValue({
      missionPartnerLoading: false,
      missionPartnerError: null,
      missionPartner: mockMissionPartner,
      refetchMissionPartner: jest.fn(async () => Promise.resolve())
    });
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 10,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 5
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 4
    });
    (useSendReminderToNonOnboarded as jest.Mock).mockReturnValue({
      sendReminderToNonOnboarded: () => true,
      sendReminderToNonOnboardedData: {
        successfulEmailsSent: ['yes', 'gamer'],
        emailsNotSent: []
      },
      sendReminderToNonOnboardedLoading: false,
      sendReminderToNonOnboardedError: false
    });
  });

  it('should show correct stats on render', () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 4,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 3
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 2
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    expect(screen.getByText('Doughnut')).toBeInTheDocument();
    expect(screen.getAllByText('4')[0]).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Active (50%)')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Onboarded (75%)')).toBeInTheDocument();
    expect(screen.getAllByText('4')[1]).toBeInTheDocument();
  });

  it('should display correct 1.0k', () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 1000,
      countAllUsersLoading: false
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);
    expect(screen.getByText('1k')).toBeInTheDocument();
  });

  it('should display correct 999 format', () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 999,
      countAllUsersLoading: false
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);
    expect(screen.getAllByText('999')[1]).toBeInTheDocument();
  });

  it('should navigate to learners on link click', () => {
    // Next/Link is not working corrctly with jest
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 0,
      countAllUsersLoading: false
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    expect(screen.getByText('View')).toHaveAttribute(
      'href',
      getRouteUrl(
        routeGenerators.MissionPartnerLearners({
          missionPartnerId: 'test'
        })
      )
    );
  });

  // commented out until animation is added

  // it('should show a loading comp when loading', () => {
  //   const { container } = renderV3(
  //     <LearnerDoughnut
  //       numberActiveLearners={undefined}
  //       numberOnboardedLearners={undefined}
  //       numberTotalLearners={undefined}
  //       missionPartnerId="test"
  //       showSendReminderModal={jest.fn()}
  //     />
  //   );

  //   expect(
  //     container.querySelector('.react-loading-skeleton')
  //   ).toBeInTheDocument();
  // });

  it('should display thousand format when user count is above 10k', () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 11000,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 11100
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 4000
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    expect(screen.getByText('11,000')).toBeInTheDocument();
    expect(screen.getByText('11,100')).toBeInTheDocument();
    expect(screen.getByText('4,000')).toBeInTheDocument();
  });

  it('should show nullState onHover', async () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 0,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 0
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 0
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    userEvent.hover(screen.getByText('Learners'));

    await waitFor(() => {
      const statusElement = screen.getByText('onboarding status and activity');
      expect(statusElement).toBeInTheDocument();
    });
  });

  it('should go to learners page with add learners modal open', async () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 0,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 0
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 0
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    userEvent.hover(screen.getByText('Learners'));

    await waitFor(() => {
      const addLearnerButton = screen.getByText('Add Learners');
      userEvent.click(addLearnerButton);
    });

    expect(mockPush).toBeCalledWith(
      getRouteUrl(
        routeGenerators.MissionPartnerLearners({
          missionPartnerId: 'test'
        }),
        { initialAddLearner: true }
      )
    );
  });

  it('should never display more active learners than onboarded', () => {
    (useCountUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countAllUsers: 50,
      countAllUsersLoading: false
    });
    (useCountOnboardedUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countOnboardedUsers: 10
    });
    (useCountActiveUsersByMissionPartnerId as jest.Mock).mockReturnValue({
      countActiveUsers: 20
    });
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10')[1]).toBeInTheDocument();
  });

  it('should show info icon and tooltip', () => {
    renderV3(<LearnerDoughnut missionPartnerId="test" />);

    expect(
      screen.getByLabelText('onboardedAndActiveTooltip')
    ).toBeInTheDocument();
  });

  describe('sending reminders', () => {
    it('should call send emails when Send Reminder is clicked and confirm is true', () => {
      renderV3(<LearnerDoughnut missionPartnerId="test" />);

      fireEvent.click(screen.getByText('Send Reminder'));

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'A reminder email has been sent to 2 learners.',
          heading: 'Success'
        })
      );
    });

    it('should call showSendReminderModal with no EmailsSent', () => {
      (useSendReminderToNonOnboarded as jest.Mock).mockReturnValue({
        sendReminderToNonOnboarded: () => true,
        sendReminderToNonOnboardedData: {
          successfulEmailsSent: ['yes'],
          emailsNotSent: ['gamer']
        },
        sendReminderToNonOnboardedLoading: false,
        sendReminderToNonOnboardedError: false
      });

      renderV3(<LearnerDoughnut missionPartnerId="test" />);
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });

    it('should show an error when clicking Show Send Reminder Modal and an error occurs', () => {
      (useSendReminderToNonOnboarded as jest.Mock).mockReturnValue({
        sendReminderToNonOnboarded: () => true,
        sendReminderToNonOnboardedData: undefined,
        sendReminderToNonOnboardedLoading: false,
        sendReminderToNonOnboardedError: true
      });

      renderV3(<LearnerDoughnut missionPartnerId="test" />);

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });
});
