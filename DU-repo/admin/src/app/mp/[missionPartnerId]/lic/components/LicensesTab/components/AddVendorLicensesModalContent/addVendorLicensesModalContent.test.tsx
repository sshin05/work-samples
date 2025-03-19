import { renderV3, screen, userEvent, fireEvent, waitFor } from '@@/test-utils';
import { AddVendorLicensesModalContent } from './AddVendorLicensesModalContent';
import { useFindLicensedVendors } from '@/api/vendor';

jest.mock('@/api/vendor');

describe('<AddVendorLicensesModalContent />', () => {
  const mockVendors = [
    {
      id: 'id1',
      name: 'vendor1'
    },
    {
      id: 'id2',
      name: 'vendor2'
    }
  ];

  const onCloseMock = jest.fn();
  const onSubmitMock = jest.fn().mockResolvedValue(null);

  beforeEach(() => {
    (useFindLicensedVendors as jest.Mock).mockReturnValue({
      licensedVendors: mockVendors,
      licensedVendorsLoading: false,
      licensedVendorsError: null
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('rendering', () => {
    it('should render the add mission partner vendor modal', () => {
      renderV3(
        <AddVendorLicensesModalContent
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
          vendorToEdit={undefined}
          isDuAdmin
        />
      );

      // validates input has type="number"
      // hidden: true is a performance optimization; input would need aria-hidden=true to be inaccessible
      expect(
        screen.getByRole('spinbutton', {
          hidden: true,
          name: 'Licenses purchased'
        })
      ).toBeInTheDocument();
      const vendorSelect = screen.getByRole('combobox', {
        name: 'Select vendor'
      });
      expect(vendorSelect).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Add')).toBeInTheDocument();
    });
    it('should render in edit mode', () => {
      renderV3(
        <AddVendorLicensesModalContent
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
          vendorToEdit={{
            vendorId: 'id1',
            vendorName: 'vendor1',
            provisioned: 10,
            autoAssignmentEnabled: true
          }}
          isDuAdmin
        />
      );

      expect(screen.getByText('Edit vendor1')).toBeInTheDocument();

      const vendorSelect = screen.queryByRole('combobox', {
        name: 'Select vendor'
      });
      expect(vendorSelect).not.toBeInTheDocument();

      expect(
        screen.getByRole('spinbutton', { name: 'Licenses purchased' })
      ).toHaveValue(10);
      expect(screen.getByLabelText('Auto assignment')).toHaveValue('enabled');
    });

    it('should render a disabled licenses purchased if not a du admin', () => {
      renderV3(
        <AddVendorLicensesModalContent
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
          vendorToEdit={undefined}
          isDuAdmin={false}
        />
      );

      const input = screen.getAllByLabelText('Licenses purchased')[0];
      expect(input).toBeDisabled();
    });
  });

  describe('functionality', () => {
    it('should call save to add a new vendor', async () => {
      renderV3(
        <AddVendorLicensesModalContent
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
          vendorToEdit={undefined}
          isDuAdmin
        />
      );

      const vendorSelect = screen.getByRole('combobox', {
        name: 'Select vendor'
      });
      await waitFor(() => {
        userEvent.selectOptions(vendorSelect, 'vendor1');
      });
      expect(vendorSelect).toHaveValue('id1');

      const licensesInput = screen.getByRole('spinbutton', {
        name: 'Licenses purchased'
      });
      await waitFor(() => {
        userEvent.paste(licensesInput, '10');
      });
      expect(licensesInput).toHaveValue(10);

      await waitFor(() => {
        fireEvent.click(screen.getByText('Add'));
        expect(screen.getByText('Cancel')).toBeDisabled();
        expect(onSubmitMock).toHaveBeenCalled();
      });
    });

    it('should be able to cancel adding a vendor', async () => {
      renderV3(
        <AddVendorLicensesModalContent
          onClose={onCloseMock}
          onSubmit={onSubmitMock}
          vendorToEdit={undefined}
          isDuAdmin
        />
      );

      const cancelButton = screen.getByText('Cancel');
      await waitFor(() => {
        userEvent.click(cancelButton);
        expect(onCloseMock).toHaveBeenCalled();
      });
    });
  });
});
