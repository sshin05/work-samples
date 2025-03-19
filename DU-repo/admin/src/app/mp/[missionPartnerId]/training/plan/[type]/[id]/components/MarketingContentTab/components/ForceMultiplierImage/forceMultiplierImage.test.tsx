import { renderV3, screen, fireEvent } from '@@/test-utils';
import { ForceMultiplierImage } from './ForceMultiplierImage';
import { useModal } from '@cerberus/react';

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn()
}));

jest.mock('@/components_new/modals/ResetImageModal', () => ({
  ResetImageModal: () => <div>Reset Image</div>
}));

describe('ForceMultiplierImage', () => {
  const handleSelectImage = jest.fn();
  const mockUseModal = {
    show: jest.fn(),
    close: jest.fn(),
    modalRef: { current: null }
  };

  beforeEach(() => {
    (useModal as jest.Mock).mockReturnValue(mockUseModal);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default image when fmImage and affiliateId are not provided', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={false}
        affiliateId=""
        fmImageUrlFormatted=""
        fmImage=""
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByAltText('Default Image')).toBeInTheDocument();
  });

  it('renders custom image when fmImage is provided', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={false}
        affiliateId="123"
        fmImageUrlFormatted="custom-image-url"
        fmImage="custom-image"
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByAltText('Custom Image')).toBeInTheDocument();
  });

  it('renders AffiliateLogo when fmImage is not provided and affiliateId is present', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={false}
        affiliateId="123"
        fmImageUrlFormatted=""
        fmImage=""
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('calls show method of useModal when Change Image button is clicked', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={false}
        affiliateId="123"
        fmImageUrlFormatted=""
        fmImage=""
        handleSelectImage={handleSelectImage}
      />
    );

    fireEvent.click(screen.getByText('Change Image'));
    expect(mockUseModal.show).toHaveBeenCalled();
  });

  it('displays loading spinner when loading is true', () => {
    renderV3(
      <ForceMultiplierImage
        loading={true}
        disabled={false}
        affiliateId="123"
        fmImageUrlFormatted=""
        fmImage=""
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByText('Uploading')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('disables Change Image button when disabled is true', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={true}
        affiliateId="123"
        fmImageUrlFormatted=""
        fmImage=""
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByText('Change Image')).toBeDisabled();
  });

  it('renders ResetImageModal when fmImage is provided', () => {
    renderV3(
      <ForceMultiplierImage
        loading={false}
        disabled={false}
        affiliateId="123"
        fmImageUrlFormatted="custom-image-url"
        fmImage="custom-image"
        handleSelectImage={handleSelectImage}
      />
    );

    expect(screen.getByText('Reset Image')).toBeInTheDocument();
  });
});
