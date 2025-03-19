import { useCreateVendor } from '@/api/vendor';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { AddNewVendorCard } from './AddNewVendorCard';

jest.mock('@/api/vendor');
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  )
}));

jest.mock('./components/CreateNewVendorModalContent', () => ({
  CreateNewVendorModalContent: ({ onSubmit, onClose }) => (
    <div>
      <button type="button" onClick={onSubmit}>
        submit
      </button>
      <button type="button" onClick={onClose}>
        close
      </button>
    </div>
  )
}));

describe('AddNewVendorCard', () => {
  const mockCreateVendor = jest.fn(async () => Promise.resolve());

  beforeEach(() => {
    (useCreateVendor as jest.Mock).mockReturnValue({
      createVendor: mockCreateVendor
    });
  });

  it('should render', () => {
    renderV3(<AddNewVendorCard />);

    expect(screen.getByText('New Vendor')).toBeInTheDocument();
  });

  it('should open the create vendor modal and submit', async () => {
    renderV3(<AddNewVendorCard />);

    userEvent.click(screen.getByText('New Vendor'));

    await waitFor(() => {
      const submitButton = screen.getByText('submit');
      expect(submitButton).toBeInTheDocument();
    });

    userEvent.click(screen.getByText('submit'));

    await waitFor(() => {
      expect(mockCreateVendor).toHaveBeenCalled();
    });
  });
});
