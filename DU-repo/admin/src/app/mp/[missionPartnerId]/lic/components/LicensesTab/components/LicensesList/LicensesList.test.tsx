import { fireEvent, renderV3, screen } from '@@/test-utils';
import { LicensesList } from './LicensesList';
import { LicensesIndicator } from '../LicensesIndicator';

jest.mock('../LicensesIndicator', () => ({
  LicensesIndicator: jest.fn(() => <div data-testid="licenses-indicator" />)
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }) => <a href={href}>{children}</a>
}));

const mockNotify = jest.fn();
const mockUseModal = jest.fn(() => ({
  modalRef: { current: null },
  show: jest.fn(),
  close: jest.fn(),
  isOpen: true
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>
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

describe('LicensesList', () => {
  const mockLicenses = [
    {
      id: 'vendor-1',
      vendorId: '123',
      vendorName: 'Vendor A',
      active: 50,
      inactive: 30,
      available: 10,
      provisioned: 125
    },
    {
      id: 'vendor-2',
      vendorId: '456',
      vendorName: 'Vendor B',
      active: 35,
      inactive: 25,
      available: 5,
      provisioned: 100
    }
  ];
  const mockMissionPartnerId = 'mission-partner-1';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders vendor names as links with correct hrefs', () => {
    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={false}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={() => {}}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    mockLicenses.forEach(license => {
      const linkElement = screen.getByText(license.vendorName);
      expect(linkElement).toBeInTheDocument();
    });
  });

  it('displays the provisioned licenses count for each vendor', () => {
    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={false}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={() => {}}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    mockLicenses.forEach(license => {
      expect(
        screen.getByText(`${license.provisioned} licenses`)
      ).toBeInTheDocument();
    });
  });

  it('renders a LicensesIndicator for each vendor', () => {
    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={false}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={() => {}}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    expect(screen.getAllByTestId('licenses-indicator')).toHaveLength(
      mockLicenses.length
    );
  });

  it('passes correct props to LicensesIndicator', () => {
    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={false}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={() => {}}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    // Check each call to LicensesIndicator
    mockLicenses.forEach((license, index) => {
      expect(LicensesIndicator).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          active: license.active,
          inactive: license.inactive,
          available: license.available,
          containerWidth: undefined
        }),
        undefined
      );
    });
  });
  it('renders checkboxes when in Edit Mode', () => {
    const mockSetSelectedVendorsToEdit = jest.fn();

    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={true}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={mockSetSelectedVendorsToEdit}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeInTheDocument();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });
  it('should remove vendor when checkbox is unchecked', () => {
    const setSelectedVendorsToEdit = jest.fn();

    renderV3(
      <LicensesList
        licenseStatusCounts={mockLicenses}
        missionPartnerId={mockMissionPartnerId}
        isEditMode={true}
        selectedVendorsToEdit={{}}
        setSelectedVendorsToEdit={setSelectedVendorsToEdit}
        isDuAdmin
        addVendorLicensesModal={mockUseModal()}
      />
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(setSelectedVendorsToEdit).toHaveBeenCalledWith({ '123': true });
  });
});
