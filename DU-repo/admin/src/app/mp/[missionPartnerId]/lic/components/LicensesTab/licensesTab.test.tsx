import { fireEvent, renderV3, screen, waitFor } from '@@/test-utils';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import { useFindLicenseStatusCounts } from '@/api/license';
import LicensesTab from './LicensesTab';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';
import type { NoDataAnimateInProps } from '@/components_new/table/components/NoDataAnimateIn/NoDataAnimateInProps';

jest.mock('@/hooks/useCurrentSession/useCurrentSession', () => ({
  useIsDuAdmin: jest.fn()
}));

jest.mock('./components/LicensesIndicator', () => ({
  LicensesIndicator: jest.fn(() => <div data-testid="licenses-indicator" />)
}));

jest.mock('@/api/mission-partner');
jest.mock('@/api/license');

const mockNotify = jest.fn();
const mockUpdate = jest.fn();
const mockShow = jest.fn();

jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useConfirmModal: jest.fn(() => ({
    show: mockShow.mockReturnValue(true)
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children, disabled }) => (
    <fieldset disabled={disabled}>{children}</fieldset>
  ),
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Select: ({ children, ...props }) => <select {...props}>{children}</select>,
  Option: ({ children, ...props }) => <option {...props}>{children}</option>,
  Menu: ({ children }) => <div>{children}</div>,
  MenuTrigger: ({ children }) => <div>{children}</div>,
  MenuItem: ({ children, onClick }) => (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  ),
  MenuContent: ({ children }) => <div>{children}</div>,
  MenuSeparator: ({ children }) => <div>{children}</div>,
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  Portal: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick, ariaLabel }) => (
    <button aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ onChange, ...props }) => <input {...props} onChange={onChange} />,
  Tabs: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabsList: ({ children, ...props }) => <div {...props}>{children}</div>,
  Tab: ({ children, ...props }) => <div {...props}>{children}</div>,
  TabPanel: ({ children, ...props }) => <div {...props}>{children}</div>,
  Table: ({ children }) => <table>{children}</table>,
  Td: ({ children }) => <td>{children}</td>,
  Tr: ({ children }) => <tr>{children}</tr>,
  Th: ({ children }) => <th>{children}</th>,
  Thead: ({ children }) => <thead>{children}</thead>,
  Tbody: ({ children }) => <tbody>{children}</tbody>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ children, ...props }) => <input {...props}>{children}</input>
}));

jest.mock('@/components_new/table/components/Footer', () => {
  const Footer = () => <div>Mock Footer</div>;
  return { Footer };
});

jest.mock('./components/RemoveMissionPartnerVendorModalContent', () => ({
  RemoveMissionPartnerVendorModalContent: ({ handleRemoveVendor }) => (
    <div onClick={() => handleRemoveVendor('towel1')}>Remove Vendor</div>
  )
}));

jest.mock('./components/AddVendorLicensesModalContent', () => ({
  AddVendorLicensesModalContent: ({ vendorToEdit, onSubmit }) => (
    <div>
      {vendorToEdit ? 'Edit Vendor' : 'New Vendor'}
      <button
        onClick={() =>
          onSubmit({ vendorId: 'new-vendor', vendorName: 'New Vendor' })
        }
      >
        Add
      </button>
    </div>
  )
}));

jest.mock('@cerberus/icons', () => ({
  ...jest.requireActual('@cerberus/icons'),
  Add: () => <div>Add</div>,
  Edit: () => 'Edit',
  TrashCan: () => 'TrashCan'
}));

jest.mock('@/components_new/form/Checkbox/Checkbox', () => ({
  Checkbox: jest.fn(({ onChange, checked, labelText }) => (
    <input
      type="checkbox"
      onChange={onChange}
      checked={checked}
      aria-label={labelText}
    />
  ))
}));

jest.mock('@/components_new/table/components/NoDataAnimateIn', () => ({
  NoDataAnimateIn: (props: NoDataAnimateInProps) => (
    <>
      {props.message}
      {props.buttonText && (
        <button onClick={props.cta} data-testid="call-to-action-button">
          {props.buttonText}
        </button>
      )}
    </>
  )
}));

const missionPartner = {
  id: '1234'
};

const provisionedLicenses = [
  {
    vendorId: 'towel1',
    vendorName: 'Douglas Adams',
    provisioned: 42,
    assigned: 5,
    autoAssignmentEnabled: true
  }
];

describe('<LicensesTab />', () => {
  beforeEach(() => {
    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: mockUpdate
    });
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: true });
    (useFindLicenseStatusCounts as jest.Mock).mockReturnValue({
      licenseStatusCounts: [
        {
          vendorId: 'acme-test',
          active: 0,
          inactive: 0,
          available: 0,
          provisioned: 5
        }
      ],
      licenseStatusCountsError: false,
      licenseStatusCountsLoading: false,
      refetchLicenseStatusCounts: jest.fn()
    });
  });

  afterEach(() => jest.clearAllMocks());

  describe('rendering', () => {
    it('should render', () => {
      renderV3(
        <LicensesTab
          missionPartnerId={missionPartner.id}
          provisionedLicenses={provisionedLicenses}
          refetchMissionPartner={jest.fn()}
        />
      );

      expect(screen.getByRole('legend-container')).toBeInTheDocument();
      expect(screen.getByRole('license-list')).toBeInTheDocument();

      const newVendorButton = screen.getAllByText('New Vendor');

      expect(newVendorButton[0]).toBeInTheDocument();
    });

    it('should not render add vendor button if not DU admin', () => {
      (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });
      renderV3(
        <LicensesTab
          missionPartnerId={missionPartner.id}
          provisionedLicenses={[]}
          refetchMissionPartner={jest.fn()}
        />
      );

      expect(screen.queryByText('Add a new vendor')).not.toBeInTheDocument();
    });
  });

  describe('open modals', () => {
    it('should open the add vendor modal when the add vendor button is clicked', () => {
      renderV3(
        <LicensesTab
          missionPartnerId={missionPartner.id}
          provisionedLicenses={provisionedLicenses}
          refetchMissionPartner={jest.fn()}
        />
      );

      const newVendorButton = screen.getAllByText('New Vendor');
      expect(newVendorButton[0]).toBeInTheDocument();
      fireEvent.click(newVendorButton[0]);
      //There are two instances of the new vendor modal, add and edit, so we expect only the first.
      expect(screen.getAllByText('New Vendor')[0]).toBeInTheDocument();
    });
  });

  describe('no data message', () => {
    it('shows the DU admin no data message if user is DU admin', () => {
      (useFindLicenseStatusCounts as jest.Mock).mockReturnValue({
        licenseStatusCounts: [],
        licenseStatusCountsError: false,
        licenseStatusCountsLoading: false,
        refetchLicenseStatusCounts: jest.fn()
      });
      renderV3(
        <LicensesTab
          missionPartnerId={missionPartner.id}
          provisionedLicenses={[]}
          refetchMissionPartner={jest.fn()}
        />
      );

      const newVendorButton = screen.getByText('Add Vendor');

      expect(newVendorButton).toBeInTheDocument();
      expect(
        screen.getByText(
          'Once you have added a vendor to your Mission partner, it will appear here.'
        )
      ).toBeInTheDocument();
    });

    it('shows the non-DU admin no data message if user is not DU admin', () => {
      (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });
      (useFindLicenseStatusCounts as jest.Mock).mockReturnValue({
        licenseStatusCounts: [],
        licenseStatusCountsError: false,
        licenseStatusCountsLoading: false,
        refetchLicenseStatusCounts: jest.fn()
      });
      renderV3(
        <LicensesTab
          missionPartnerId={missionPartner.id}
          provisionedLicenses={[]}
          refetchMissionPartner={jest.fn()}
        />
      );

      const newVendorButton = screen.queryByRole('button', {
        name: /Add Vendor/i
      });

      expect(newVendorButton).not.toBeInTheDocument();
      expect(
        screen.getByText(
          'Once a vendor is added to your Mission partner, it will appear here.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('edit mode', () => {
    it('should toggle editMode on MenuTrigger click', () => {
      renderV3(
        <LicensesTab
          missionPartnerId="1234"
          provisionedLicenses={[
            { vendorId: 'existing-vendor', vendorName: 'Existing Vendor' }
          ]}
          refetchMissionPartner={jest.fn()}
        />
      );

      const menuTrigger = screen.getByLabelText('Edit Vendor Licenses button');
      fireEvent.click(menuTrigger);
      const deleteButton = screen.getByText(
        content =>
          content.startsWith('Delete vendor(s)') && content.includes('TrashCan')
      );
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);

      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes.length).toBe(1);
      expect(checkboxes[0]).toBeInTheDocument();
    });

    // TODO: Needs some love; mocking re-write; useModal is being executed twice, and onClick both handleSubmit and handleAddVendor are executed.
    // error is never hit
    it.skip('should handle vendor already exists error', async () => {
      renderV3(
        <LicensesTab
          missionPartnerId="1234"
          provisionedLicenses={[
            { vendorId: 'existing-vendor', vendorName: 'Existing Vendor' }
          ]}
          refetchMissionPartner={jest.fn()}
        />
      );

      const addVendorButton = screen.getByText('Add a new vendor');
      fireEvent.click(addVendorButton);

      const addNewVendorButton = screen.getAllByText('Add')[1]; // was [0] before, but there are two Add buttons with existing mocks

      expect(addNewVendorButton).toBeInTheDocument();
      fireEvent.click(addNewVendorButton);

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to add a vendor'
        });
      });
    });

    it('should pass proper data to add vendor', async () => {
      mockUpdate.mockResolvedValueOnce({});
      renderV3(
        <LicensesTab
          missionPartnerId="1234"
          provisionedLicenses={provisionedLicenses}
          refetchMissionPartner={jest.fn()}
        />
      );

      const addVendorButton = screen.getAllByText('New Vendor')[0];
      fireEvent.click(addVendorButton);
      const addNewVendorButton = screen.getAllByText('Add')[0];
      fireEvent.click(addNewVendorButton);

      await waitFor(() => {
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalledWith({
          id: '1234',
          provisionedLicenses: [
            ...provisionedLicenses,
            { vendorId: 'new-vendor', vendorName: 'New Vendor' }
          ]
        });
      });
    });

    it('should handle vendor deletion error', async () => {
      mockUpdate.mockRejectedValueOnce(new Error('Failed to delete'));
      renderV3(
        <LicensesTab
          missionPartnerId="1234"
          provisionedLicenses={[
            { vendorId: 'vendor-to-delete', vendorName: 'Vendor to Delete' }
          ]}
          refetchMissionPartner={jest.fn()}
        />
      );

      const editButton = screen.getByLabelText('Edit Vendor Licenses button');
      fireEvent.click(editButton);

      const deleteButton = screen.getByText(
        content =>
          content.startsWith('Delete vendor(s)') && content.includes('TrashCan')
      );

      fireEvent.click(deleteButton);

      // This was a bit unclear before; I think with the lack of mocking on LicensesList, and multiple delete buttons (one, which actually sets editState to true, AND the assert actually asserting a previous test, this should now be working o.k.)
      const checkbox = await screen.findByRole('checkbox'); // currently on 1 checkbox on the screen after in edit mode
      fireEvent.click(checkbox);

      const deleteButtonSansTrash = await screen.findByRole('button', {
        name: 'Delete Vendor(s)'
      });

      deleteButtonSansTrash.click();

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update vendors.'
        });
      });
    });
  });

  it('should confirm vendor deletion', async () => {
    mockUpdate.mockResolvedValueOnce({});

    renderV3(
      <LicensesTab
        missionPartnerId="1234"
        provisionedLicenses={[
          { vendorId: 'vendor-to-delete', vendorName: 'Vendor to Delete' }
        ]}
        refetchMissionPartner={jest.fn()}
      />
    );

    const editButton = screen.getByLabelText('Edit Vendor Licenses button');
    fireEvent.click(editButton);

    const deleteButton = screen.getByText(
      content =>
        content.startsWith('Delete vendor(s)') && content.includes('TrashCan')
    );

    fireEvent.click(deleteButton);

    const checkbox = await screen.findByRole('checkbox');

    fireEvent.click(checkbox);
    const deleteButtonSansTrash = await screen.findByRole('button', {
      name: 'Delete Vendor(s)'
    });

    deleteButtonSansTrash.click();

    await waitFor(() => {
      expect(mockNotify).toHaveBeenCalledWith({
        palette: 'success',
        heading: 'Success',
        description: 'Updated vendors successfully.'
      });
    });
  });

  it('should not show edit and add buttons when isDuAdmin is false', () => {
    (useIsDuAdmin as jest.Mock).mockReturnValue({ isDuAdmin: false });
    renderV3(
      <LicensesTab
        missionPartnerId="1234"
        provisionedLicenses={[]}
        refetchMissionPartner={jest.fn()}
      />
    );

    const editButton = screen.queryByLabelText('Edit Vendor Licenses button');
    const addButton = screen.queryByRole('button', {
      name: /Add a new vendor/i
    });

    expect(editButton).not.toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();
  });
});
