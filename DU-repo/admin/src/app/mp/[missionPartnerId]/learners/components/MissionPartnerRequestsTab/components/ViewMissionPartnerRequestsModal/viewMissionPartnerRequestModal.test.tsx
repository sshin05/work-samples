import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import {
  useFindMissionPartnerRequestById,
  useApproveMissionPartnerRequest,
  useDeclineMissionPartnerRequest
} from '@/api/mission-partner-requests';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { ViewMissionPartnerRequestModal } from './ViewMissionPartnerRequestModal';

jest.mock('@/api/mission-partner-requests');
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));
const mockNotify = jest.fn();
const mockClient = createMockClient();
const mockModal = {
  modalRef: { current: null },
  show: jest.fn(),
  close: jest.fn(),
  isOpen: true
};

jest.mock('@/components_new/modals/StandardModalHeader', () => ({
  StandardModalHeader: ({ onClose, title }) => (
    <div>
      {title}
      <button onClick={onClose}>handleOnClose</button>
    </div>
  )
}));

describe('ViewMissionPartnerRequestModal', () => {
  const mockApproveRequest = jest.fn();
  const mockDeclineRequest = jest.fn();
  const mockOnClose = jest.fn();

  beforeAll(() => {
    (useFindMissionPartnerRequestById as jest.Mock).mockReturnValue({
      findMissionPartnerRequestByIdData: {
        userFirstName: 'Test',
        userLastName: 'User',
        userEmail: 'test@test.com',
        missionPartnerName: 'Test Mission Partner',
        requestedAt: new Date('01-01-2021')
      },
      findMissionPartnerRequestByIdLoading: false
    });
    (useApproveMissionPartnerRequest as jest.Mock).mockReturnValue({
      approveMissionPartnerRequestLoading: false,
      approveMissionPartnerRequest: mockApproveRequest
    });
    (useDeclineMissionPartnerRequest as jest.Mock).mockReturnValue({
      declineMissionPartnerRequestLoading: false,
      declineMissionPartnerRequest: mockDeclineRequest
    });
  });

  beforeEach(() => {
    mockApproveRequest.mockClear();
    mockDeclineRequest.mockClear();
  });

  it('should show a modal', () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ViewMissionPartnerRequestModal
          viewRequestModal={mockModal}
          missionPartnerId="1"
          userId="12345"
          onClose={mockOnClose}
          notify={mockNotify}
        />
      </ApolloProvider>
    );

    expect(screen.getByText('Mission Partner Request')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('01 Jan 2021')).toBeInTheDocument();
    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('Deny')).toBeInTheDocument();
  });

  it('should respond to onClose when the close button is clicked', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ViewMissionPartnerRequestModal
          viewRequestModal={mockModal}
          missionPartnerId="1"
          userId="12345"
          onClose={mockOnClose}
          notify={mockNotify}
        />
      </ApolloProvider>
    );

    const closeButton = screen.getByText('handleOnClose');
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);
    await waitFor(() => expect(mockOnClose).toHaveBeenCalledTimes(1));
  });

  it('should call mockPush when clicking on email', async () => {
    renderV3(
      <ApolloProvider client={mockClient}>
        <ViewMissionPartnerRequestModal
          viewRequestModal={mockModal}
          missionPartnerId="1"
          userId="12345"
          onClose={mockOnClose}
          notify={mockNotify}
        />
      </ApolloProvider>
    );

    const email = await screen.findByText('test@test.com');
    expect(email).toBeInTheDocument();

    userEvent.click(email);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith(
        '/mp/1/learner/12345?missionPartnerId=1&crumbNames=%5B%22MissionPartners%22%2C%22MissionPartner%22%5D&crumbParameters=%7B%22missionPartnerId%22%3A%221%22%2C%22missionPartnerName%22%3A%22Test+Mission+Partner%22%7D&userId=12345'
      );
    });
  });
});
