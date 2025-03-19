import { renderV3, screen, fireEvent } from '@@/test-utils';
import { LicenseRequestModalContent } from './LicenseRequestModalContent';

describe('LicenseRequestModalContent', () => {
  const mockOnApprove = jest.fn();
  const mockOnDecline = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnDeclineLoading = false;
  const mockOnApproveLoading = false;

  const mockRequest = {
    missionPartnerId: '1234',
    missionPartnerName: 'Test Mission Partner',
    vendorId: '5678',
    vendorName: 'Test Vendor',
    userId: '1',
    userFirstName: 'John',
    userLastName: 'Doe',
    userEmail: 'john.doe@example.com',
    userOrganization: 'Test Organization',
    id: 'test-id',
    status: 'Open',
    requestedAt: '2023-10-01T16:02:52.224Z',
    approvedAt: null,
    declinedAt: null
  };

  test('renders the component', () => {
    renderV3(
      <LicenseRequestModalContent
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onDecline={mockOnDecline}
        request={mockRequest}
        onDeclineLoading={mockOnDeclineLoading}
        onApproveLoading={mockOnApproveLoading}
        error={null}
      />
    );

    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('Deny')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('License Request')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Test Vendor')).toBeInTheDocument();
    expect(screen.getByText('01 Oct 2023')).toBeInTheDocument();
  });

  it('calls onApprove when Approve button is clicked', () => {
    renderV3(
      <LicenseRequestModalContent
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onDecline={mockOnDecline}
        request={mockRequest}
        onDeclineLoading={mockOnDeclineLoading}
        onApproveLoading={mockOnApproveLoading}
        error={null}
      />
    );

    fireEvent.click(screen.getByText('Approve'));
    expect(mockOnApprove).toHaveBeenCalled();
  });

  it('calls onDecline when Deny button is clicked', () => {
    renderV3(
      <LicenseRequestModalContent
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onDecline={mockOnDecline}
        request={mockRequest}
        onDeclineLoading={mockOnDeclineLoading}
        onApproveLoading={mockOnApproveLoading}
        error={null}
      />
    );

    fireEvent.click(screen.getByText('Deny'));
    expect(mockOnDecline).toHaveBeenCalled();
  });

  it('disables buttons and displays error message when error is not null', () => {
    renderV3(
      <LicenseRequestModalContent
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onDecline={mockOnDecline}
        request={mockRequest}
        onDeclineLoading={mockOnDeclineLoading}
        onApproveLoading={mockOnApproveLoading}
        error="test error"
      />
    );

    expect(screen.getByText('Approve')).toBeDisabled();
    expect(screen.getByText('Deny')).toBeDisabled();
  });

  it('does not render the component when request is null', () => {
    renderV3(
      <LicenseRequestModalContent
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onDecline={mockOnDecline}
        request={null}
        onDeclineLoading={mockOnDeclineLoading}
        onApproveLoading={mockOnApproveLoading}
        error={null}
      />
    );

    expect(screen.queryByText('Approve')).not.toBeInTheDocument();
    expect(screen.queryByText('Deny')).not.toBeInTheDocument();
  });
});
