import { AssignCohortMissionPartnerModal } from './AssignCohortMissionPartnerModal';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { useFindAllMissionPartnersAdminPortal } from '@/api/mission-partner';

jest.mock('@/api/mission-partner', () => {
  return {
    useFindAllMissionPartnersAdminPortal: jest.fn()
  };
});

const mockModal = {
  modalRef: { current: null },
  show: jest.fn(),
  close: jest.fn(),
  isOpen: true
};

describe('add-mission-partner-modal', () => {
  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn(() => Promise.resolve());

  const defaultProps = {
    assignCohortMissionPartnerModal: mockModal,
    onClose: onCloseMock,
    onSubmit: onSubmitMock,
    group: {
      id: 'group-id',
      missionPartnerId: null
    }
  };

  const missionPartners = [
    {
      id: 'mission-partner-id',
      name: 'mission-partner-name'
    }
  ];

  beforeEach(() => {
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartnersLoading: false,
      missionPartnersError: null,
      missionPartners,
      refetchMissionPartners: jest.fn()
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('should render the assign mission partner modal', async () => {
    renderV3(
      <div id="app-root">
        <AssignCohortMissionPartnerModal {...defaultProps} />
      </div>
    );

    expect(screen.getByText('Assign Mission Partner')).toBeInTheDocument();

    await waitFor(() => {
      userEvent.click(screen.getByText('Cancel'));
      userEvent.click(screen.getByText('Confirm'));
    });

    expect(onCloseMock).toHaveBeenCalled();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it('should submit with data', async () => {
    renderV3(
      <div id="app-root">
        <AssignCohortMissionPartnerModal {...defaultProps} />
      </div>
    );

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox', { hidden: true }), [
        screen.getByText('mission-partner-name')
      ]);
      userEvent.click(screen.getByText('Confirm'));
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('should render in the loading state', () => {
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartnersLoading: true,
      missionPartnersError: null,
      missionPartners: [],
      refetchMissionPartners: jest.fn()
    });

    renderV3(
      <div id="app-root">
        <AssignCohortMissionPartnerModal {...defaultProps} />
      </div>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with no mission partners', () => {
    (useFindAllMissionPartnersAdminPortal as jest.Mock).mockReturnValue({
      missionPartnersLoading: false,
      missionPartnersError: null,
      missionPartners: [],
      refetchMissionPartners: jest.fn()
    });

    renderV3(
      <div id="app-root">
        <AssignCohortMissionPartnerModal {...defaultProps} />
      </div>
    );

    expect(
      screen.getByText('No Mission Partners Avaliable')
    ).toBeInTheDocument();
  });
});
