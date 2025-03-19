import { useGetUserMissionPartnerTrialStatus } from '@/api/users';
import { renderV3, screen } from '@@/test-utils';
import { TrialExpiredPage } from './TrialExpiredPage';

jest.mock('@/api/users');
jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  __esModule: true,
  default: () => ({
    signOut: jest.fn()
  }),
  useSignOut: () => ({
    signOut: jest.fn()
  })
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Text: ({ children }) => <span>{children}</span>
}));

describe('trial expired page', () => {
  it('should correctly render', () => {
    (useGetUserMissionPartnerTrialStatus as jest.Mock).mockReturnValue({
      userMissionPartnerTrialStatus: {
        missionPartner: {
          trialEndDate: '2020-12-12T12:12:00Z'
        }
      }
    });

    renderV3(<TrialExpiredPage />);
    expect(screen.getByText(/Your trial has ended/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Your trial of Digital University ended on 12 12 2020. Contact your DU Customer Support Manager for continuous access.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should correctly render when a date is not provided', () => {
    (useGetUserMissionPartnerTrialStatus as jest.Mock).mockReturnValue({
      userMissionPartnerTrialStatus: {}
    });

    renderV3(<TrialExpiredPage />);
    expect(
      screen.getByText(
        `Your trial of Digital University has ended. Contact your DU Customer Support Manager for continuous access.`
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should correctly render when a bad date is provided', () => {
    (useGetUserMissionPartnerTrialStatus as jest.Mock).mockReturnValue({
      userMissionPartnerTrialStatus: {
        missionPartner: {
          trialEndDate: 'abc'
        }
      }
    });

    renderV3(<TrialExpiredPage />);
    expect(
      screen.getByText(
        `Your trial of Digital University has ended. Contact your DU Customer Support Manager for continuous access.`
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
});
