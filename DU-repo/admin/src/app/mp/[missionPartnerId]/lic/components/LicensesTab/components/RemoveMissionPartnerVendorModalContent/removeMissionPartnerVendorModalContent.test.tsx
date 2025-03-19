import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { RemoveMissionPartnerVendorModalContent } from './RemoveMissionPartnerVendorModalContent';

const handleRemoveVendorMock = jest.fn();

jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  ConfirmModal: ({ children }) => <div>{children}</div>
}));

describe('RemoveMissionPartnerVendorModal', () => {
  it('Should show children and a close button', async () => {
    renderV3(
      <RemoveMissionPartnerVendorModalContent
        vendorId="vendorId"
        vendorName="vendorName"
        handleRemoveVendor={handleRemoveVendorMock}
      />
    );

    const removeBtn = screen.getByRole('button');
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    await waitFor(() => {
      expect(handleRemoveVendorMock).toHaveBeenCalled();
    });
  });
});
