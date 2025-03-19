import { renderV3, waitFor, fireEvent, screen } from '@@/test-utils';
import AdminImage from '../AdminImage/AdminImage';
import {
  useUpdateMissionPartner,
  useUploadMissionPartnerLogo
} from '@/api/mission-partner';
import Image from 'next/image';

jest.mock('@/api/mission-partner');

const mockFile = jest.fn();
jest.mock('@/components_new/modals/UploadAndAdjustImageModal', () => ({
  UploadAndAdjustImageModal: ({ onSelect }) => (
    <>
      <div>UploadAndAdjustImageModal</div>
      <button onClick={() => onSelect(mockFile)}>SubmitImage</button>
    </>
  )
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  Modal: ({ children, className, role, ariaModal }) => (
    <div className={className} role={role} aria-modal={ariaModal}>
      {children}
    </div>
  ),
  ConfirmModal: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/images/BaseImage', () => ({
  BaseImage: ({ width, height }) => (
    <Image src="/" width={width} height={height} alt="Custom Image" />
  )
}));

jest.mock('@cerberus/icons', () => ({ Upload: () => <div>Upload</div> }));

jest.mock('@/components_new/modals/ResetImageModal', () => ({
  ResetImageModal: ({ handleSelectImage, disabled }) => (
    <>
      <div>ResetImageModal</div>
      <button onClick={handleSelectImage} disabled={disabled}>
        Reset to Default Image
      </button>
    </>
  )
}));

const mockMissionPartner = {
  id: '1234',
  logoUrl: '235c0e2d-3a86-4420-ad04-227ed8c35948.png',
  affiliateId: 'exampleId'
};

describe('AdminImage', () => {
  const mockUpdateMissionPartner = jest.fn();
  const mockUploadMissionPartnerLogo = jest.fn();
  const defaultProps = {
    missionPartner: mockMissionPartner,
    refetchMissionPartner: jest.fn(),
    loading: false
  };

  beforeEach(() => {
    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: mockUpdateMissionPartner,
      updateMissionPartnerLoading: false
    });

    (useUploadMissionPartnerLogo as jest.Mock).mockReturnValue({
      uploadMissionPartnerLogo: mockUploadMissionPartnerLogo,
      uploadMissionPartnerLogoLoading: false
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('renders itself and modals', () => {
    it('renders correctly with default props', () => {
      renderV3(<AdminImage {...defaultProps} />);

      expect(screen.getByText('Change Image')).toBeInTheDocument();
      expect(screen.getByAltText('Custom Image')).toBeInTheDocument();
    });

    it('opens the image modal when "Change Image" button is clicked', async () => {
      renderV3(<AdminImage {...defaultProps} />);

      const changeImageButton = screen.getByText('Change Image');

      await waitFor(() => {
        fireEvent.click(changeImageButton);
      });

      expect(screen.getByText('UploadAndAdjustImageModal')).toBeInTheDocument();
    });

    it('opens the reset confirmation modal when "Reset to Default Image" button is clicked', async () => {
      renderV3(<AdminImage {...defaultProps} />);

      const resetImageButton = screen.getByText('Reset to Default Image');
      fireEvent.click(resetImageButton);

      await waitFor(() => {
        expect(screen.getByText('ResetImageModal')).toBeInTheDocument();
      });
    });
  });

  describe('upload image cases', () => {
    it('should notify error when file present but upload fails', async () => {
      renderV3(<AdminImage {...defaultProps} />);

      mockFile.mockReturnValue(true);
      mockUploadMissionPartnerLogo.mockImplementation(() => {
        throw new Error('Mock error');
      });

      const changeImageButton = screen.getByText('Change Image');
      fireEvent.click(changeImageButton);
      const submitButton = screen.getByText('SubmitImage');
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockUploadMissionPartnerLogo).toHaveBeenCalled();
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
      });
    });
  });
});
