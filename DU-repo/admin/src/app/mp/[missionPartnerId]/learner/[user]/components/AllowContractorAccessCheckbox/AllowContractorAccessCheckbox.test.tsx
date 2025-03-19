import { useToggleAllowContractorAccess } from '@/api/user';
import { AllowContractorAccessCheckbox } from './AllowContractorAccessCheckbox';
import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';

jest.mock('@/api/user');

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  Tooltip: ({ children }) => (
    <div>
      <p>Tooltip</p>
      {children}
    </div>
  ),
  useNotificationCenter: () => ({
    notify: mockNotify
  })
}));

describe('AllowContractorAccessCheckbox', () => {
  const mockToggleContractorAccess = jest.fn(() => ({
    data: { toggleAllowContractorAccess: { canAccessFullDu: true } }
  }));
  beforeEach(() => {
    (useToggleAllowContractorAccess as jest.Mock).mockReturnValue({
      toggleAllowContractorAccess: mockToggleContractorAccess,
      toggleAllowContractorAccessLoading: false,
      toggleAllowContractorAccessError: null
    });
  });

  describe('rendering', () => {
    it('should render checkbox with checked value if contractor user hasContractorAccess and user is admin', () => {
      renderV3(
        <AllowContractorAccessCheckbox
          userId="123"
          hasContractorAccess
          isDuAdmin
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });

    it('should render tooltip if user is not admin', () => {
      renderV3(
        <AllowContractorAccessCheckbox
          userId="123"
          hasContractorAccess={false}
          isDuAdmin={false}
        />
      );

      expect(screen.getByText('Tooltip')).toBeInTheDocument();
    });

    it('should not render tooltip if user is admin', () => {
      renderV3(
        <AllowContractorAccessCheckbox
          userId="123"
          hasContractorAccess={false}
          isDuAdmin
        />
      );

      expect(screen.queryByText('Tooltip')).not.toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('successfully toggles contractor access', async () => {
      renderV3(
        <AllowContractorAccessCheckbox
          userId="123"
          hasContractorAccess={false}
          isDuAdmin
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      await waitFor(() => {
        expect(mockToggleContractorAccess).toHaveBeenCalledWith('123', true);
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    it('handles useToggleAllowContractorAccess api call error', async () => {
      mockToggleContractorAccess.mockImplementation(() => {
        throw new Error('Error');
      });

      renderV3(
        <AllowContractorAccessCheckbox
          userId="123"
          hasContractorAccess={false}
          isDuAdmin
        />
      );

      fireEvent.click(screen.getByRole('checkbox'));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });
  });
});
