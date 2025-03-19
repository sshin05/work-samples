import { renderV3, screen } from '@@/test-utils';
import {
  useFindMissionPartnerMinDetails,
  useToggleMissionPartnerTrial
} from '@/api/mission-partner';
import { useRouteParams } from '@/hooks/useRouteParams';
import TrialBanner from './TrialBanner';
import { calculateDaysLeft } from '../utils/calculateDaysLeft';

jest.mock('@/api/mission-partner');
jest.mock('@/hooks/useRouteParams');
jest.mock('../utils/calculateDaysLeft');

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValueOnce(undefined)
  }
});

describe('TrialBanner', () => {
  const mockToggleMissionPartnerTrial = jest.fn();
  beforeEach(() => {
    (useRouteParams as jest.Mock).mockReturnValue({ missionPartnerId: '123' });
    (useToggleMissionPartnerTrial as jest.Mock).mockReturnValue({
      toggleMissionPartnerTrial: mockToggleMissionPartnerTrial
    });
  });

  describe('showing the banner', () => {
    it('should render the banner if missionPartnerTrialStatus is true', () => {
      (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
        missionPartnerMinDetails: {
          trialEnabled: true,
          trialEndDate: '2027-12-31'
        },
        missionPartnerMinDetailsLoading: false
      });
      (calculateDaysLeft as jest.Mock).mockReturnValue(10);

      renderV3(<TrialBanner />);
      expect(
        screen.getByText(
          /You have 10 days remaining on your Digital University trial/i
        )
      ).toBeInTheDocument();
    });

    it('should render the banner with the correct email link', () => {
      (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
        missionPartnerMinDetails: {
          trialEnabled: true,
          trialEndDate: '2027-12-31'
        },
        missionPartnerMinDetailsLoading: false
      });
      (calculateDaysLeft as jest.Mock).mockReturnValue(10);

      renderV3(<TrialBanner />);
      expect(screen.getByText(/DU Customer Success Manager/i)).toHaveAttribute(
        'href',
        'ryan.critchfield@omnifederal.com'
      );
    });

    it('should copy the email to the clipboard when the email link is clicked', async () => {
      (useFindMissionPartnerMinDetails as jest.Mock).mockReturnValue({
        missionPartnerMinDetails: {
          trialEnabled: true,
          trialEndDate: '2027-12-31'
        },
        missionPartnerMinDetailsLoading: false
      });
      (calculateDaysLeft as jest.Mock).mockReturnValue(10);

      renderV3(<TrialBanner />);
      const emailLink = screen.getByText(/DU Customer Success Manager/i);
      emailLink.click();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'ryan.critchfield@omnifederal.com'
      );
    });
  });
});
