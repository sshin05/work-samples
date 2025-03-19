import { useFindLicensedVendors, useCreateVendor } from '@/api/vendor';
import { useExportLicenses } from '@/api/license';
import { renderV3, screen, userEvent, waitFor, act } from '@@/test-utils';
import GlobalLicensesPage from './page';

jest.mock('@/api/vendor');
jest.mock('@/api/license');
jest.mock('./components/VendorCardList', () => {
  const VendorCardList = ({
    vendors
  }: {
    vendors: Array<{ id: string; name: string }>;
  }) => (
    <div>
      {vendors.map((vendor: { id: string; name: string }) => (
        <div key={vendor.id}>{vendor.name}</div>
      ))}
    </div>
  );
  VendorCardList.displayName = 'VendorCardList';
  return { VendorCardList };
});
jest.mock('@/components_new/form', () => ({
  TextInput: ({ label, ...rest }) => (
    <label>
      {label}
      <input {...rest} />
    </label>
  )
}));
const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  )
}));

describe('Global Licenses Page', () => {
  const mockExportLicenses = jest.fn();

  afterEach(() => jest.clearAllMocks());

  describe('with data', () => {
    beforeEach(() => {
      (useFindLicensedVendors as jest.Mock).mockReturnValue({
        licensedVendors: [
          {
            id: 'udemy',
            name: 'Udemy',
            provisioned: 500,
            assigned: 2
          },
          {
            id: 'udeacity',
            name: 'Udacity',
            provisioned: -1,
            assigned: 0
          }
        ],
        licensedVendorsLoading: false
      });

      (useExportLicenses as jest.Mock).mockReturnValue({
        exportLicenses: mockExportLicenses,
        exportLicensesLoading: false,
        exportLicensesError: null
      });

      (useCreateVendor as jest.Mock).mockReturnValue({
        createVendor: jest.fn()
      });
    });

    it('should render', () => {
      renderV3(<GlobalLicensesPage />);

      expect(screen.getByText('Licenses')).toBeInTheDocument();
    });

    it('should filter results', () => {
      renderV3(<GlobalLicensesPage />);

      const searchInput = screen.getByPlaceholderText(
        'Search licensed vendors'
      );
      expect(searchInput).toBeInTheDocument();

      act(() => {
        userEvent.type(searchInput, 'Udemy');
      });

      expect(screen.getByText('Udemy')).toBeInTheDocument();
      expect(screen.queryByText('Udacity')).not.toBeInTheDocument();
    });

    // nothing can nest deeper than this for sonarqube:
    it('should export licenses', async () => {
      mockExportLicenses.mockResolvedValue({});
      renderV3(<GlobalLicensesPage />);

      const exportButton = screen.getByText('All Assigned Licenses');
      expect(exportButton).toBeInTheDocument();

      act(() => {
        userEvent.click(exportButton);
      });
      await waitFor(() => {
        expect(mockExportLicenses).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    // nothing can nest deeper than this for sonarqube
    it('when rejected - should show error toast', async () => {
      mockExportLicenses.mockRejectedValue(
        new Error('Error exporting licenses')
      );
      renderV3(<GlobalLicensesPage />);

      const exportButton = screen.getByText('All Assigned Licenses');
      expect(exportButton).toBeInTheDocument();

      act(() => {
        userEvent.click(exportButton);
      });
      await waitFor(() => {
        expect(mockExportLicenses).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });
  });

  describe('with loading', () => {
    beforeEach(() => {
      (useFindLicensedVendors as jest.Mock).mockReturnValue({
        licensedVendors: null,
        licensedVendorsLoading: true
      });
    });

    it('should render skeleton loading', () => {
      const { container } = renderV3(<GlobalLicensesPage />);

      expect(
        container.querySelector('.react-loading-skeleton')
      ).toBeInTheDocument();
    });
  });
});
