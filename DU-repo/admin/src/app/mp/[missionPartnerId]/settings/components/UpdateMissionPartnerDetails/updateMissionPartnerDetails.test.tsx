import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { UpdateMissionPartnerDetails } from './UpdateMissionPartnerDetails';
import { useFindAllAffiliates } from '@/api/affiliate';
import { useUpdateMissionPartner } from '@/api/mission-partner';

jest.mock('@/api/affiliate');
jest.mock('@/api/mission-partner');
const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  }))
}));

const mockMissionPartner = {
  id: '1',
  name: 'Test Partner',
  affiliateId: '123',
  sectionType: 'section1'
};

const mockSpaceForceMissionPartner = {
  id: '2',
  name: 'Space Force',
  affiliateId: 'space-force',
  sectionType: 'section2'
};

const mockAffiliates = [
  { id: '123', name: 'Affiliate 1' },
  { id: '456', name: 'Affiliate 2' },
  { id: 'space-force', name: 'Space Force' }
];

const mockUseForm = {
  control: {},
  handleSubmit: jest.fn(),
  reset: jest.fn(),
  formState: { isSubmitting: false, isDirty: true, dirtyFields: {} },
  watch: jest.fn()
};

describe('UpdateMissionPartnerDetails', () => {
  const mockUpdateMissionPartner = jest.fn();

  beforeEach(() => {
    (useFindAllAffiliates as jest.Mock).mockReturnValue({
      affiliates: mockAffiliates,
      affiliatesLoading: false,
      affiliatesError: null
    });

    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: mockUpdateMissionPartner,
      updateMissionPartnerLoading: false
    });
  });

  describe('rendering', () => {
    it('renders the component', () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );
      expect(
        screen.getByRole('textbox', {
          name: 'Name'
        })
      ).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByText('Affiliate 1')).toBeInTheDocument();
    });

    it('renders section when the affiliation is space force', () => {
      renderV3(
        <UpdateMissionPartnerDetails
          missionPartner={mockSpaceForceMissionPartner}
        />
      );

      expect(screen.getByText('Field Command')).toBeInTheDocument();
    });

    it('does not render section when the affiliation is not space force', () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );

      expect(screen.queryByText('Field Command')).not.toBeInTheDocument();
    });

    it('displays affiliate options', () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );

      expect(screen.getByText('Affiliate 1')).toBeInTheDocument();
      expect(screen.getByText('Affiliate 2')).toBeInTheDocument();
      expect(screen.getByText('Space Force')).toBeInTheDocument();
    });

    it('displays section options', () => {
      renderV3(
        <UpdateMissionPartnerDetails
          missionPartner={mockSpaceForceMissionPartner}
        />
      );

      expect(screen.getByText('Field Command')).toBeInTheDocument();
      expect(screen.getByText('Delta')).toBeInTheDocument();
      expect(screen.getByText('Unit/Squadron')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();
    });

    it('displays the sticky footer when the form is dirty', async () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );

      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });

      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test' } });
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });
    });
  });

  describe('form validation', () => {
    it('validates name input', () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );
      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });
      fireEvent.keyDown(nameInput, { key: '!' });
      expect(nameInput).toHaveValue('Test Partner');
    });

    it('validates name if it is longer than 60 characters', async () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );

      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });
      const longName = 'a'.repeat(61);

      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: longName } });
        fireEvent.click(screen.getByText('Save'));
        expect(
          screen.getByText('Name cannot be longer than 60 characters')
        ).toBeInTheDocument();
      });
    });
  });

  describe('functionality', () => {
    it('updates the mission partner successfully', async () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );
      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test' } });
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockUpdateMissionPartner).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
      });
    });

    it('fails to update the mission partner', async () => {
      mockUpdateMissionPartner.mockImplementation(() => {
        throw new Error();
      });

      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );
      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });
      await waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test' } });
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);
        expect(mockUpdateMissionPartner).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });

    it('resets form on cancel button click', () => {
      renderV3(
        <UpdateMissionPartnerDetails missionPartner={mockMissionPartner} />
      );

      const nameInput = screen.getByRole('textbox', {
        name: 'Name'
      });

      waitFor(() => {
        fireEvent.change(nameInput, { target: { value: 'Test' } });
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);
        expect(mockUseForm.reset).toHaveBeenCalled();
      });
    });
  });
});
