import { renderV3, fireEvent, screen } from '@@/test-utils';
import { UpdateLicenseQuantityModal } from './UpdateLicenseQuantityModal';

const vendor = {
  vendorId: '123',
  vendorName: 'Test Vendor',
  provisioned: 10,
  autoAssignmentEnabled: true
};

describe('UpdateLicenseQuantityModal', () => {
  const handleUpdateMissionPartner = jest.fn();
  const mockClose = jest.fn();

  it('renders', () => {
    renderV3(
      <UpdateLicenseQuantityModal
        vendor={vendor}
        handleUpdateMissionPartner={handleUpdateMissionPartner}
        close={mockClose}
      />
    );

    expect(screen.getByText('Update license quantity')).toBeInTheDocument();
    expect(
      screen.getByRole('spinbutton', {
        name: 'Enter the number of licenses provisioned'
      })
    ).toBeInTheDocument();
  });

  it('updates the license quantity and calls handleUpdateMissionPartner on submit', () => {
    renderV3(
      <UpdateLicenseQuantityModal
        vendor={vendor}
        handleUpdateMissionPartner={handleUpdateMissionPartner}
        close={mockClose}
      />
    );

    const input = screen.getByRole('spinbutton', { hidden: true });
    fireEvent.change(input, { target: { value: '20' } });

    fireEvent.click(screen.getByText('Confirm'));

    expect(handleUpdateMissionPartner).toHaveBeenCalledWith({
      vendorId: '123',
      vendorName: 'Test Vendor',
      provisioned: 20,
      autoAssignmentEnabled: true
    });
    expect(mockClose).toHaveBeenCalled();
  });

  it('closes the modal when the cancel button is clicked', () => {
    renderV3(
      <UpdateLicenseQuantityModal
        vendor={vendor}
        handleUpdateMissionPartner={handleUpdateMissionPartner}
        close={mockClose}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));

    expect(mockClose).toHaveBeenCalled();
  });
});
