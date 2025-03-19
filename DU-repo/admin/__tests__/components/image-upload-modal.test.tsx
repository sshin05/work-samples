import ImageUploadModal from '../../src/components/settings-banner/image-upload/ImageUploadModal';
import { fireEvent, render, screen } from '@@/test-utils';

const file = new File(['hello'], 'hello.png', { type: 'image/png' });

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  UniversalModal: ({ children, handleOnClose }) => (
    <div>
      <button onClick={handleOnClose}>Close</button>
      {children}
    </div>
  ),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  CloseButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock(
  '../../src/components/settings-banner/image-upload/ImageDropzone',
  () =>
    ({ setAcceptedImage, setDropError }) => (
      <>
        <button
          onClick={() => {
            setAcceptedImage(file);
          }}
        >
          acceptImage
        </button>
        <button
          onClick={() => {
            setDropError(true);
          }}
        >
          drop rejected
        </button>
      </>
    )
);
const mockOnClose = jest.fn();
const mockSubmit = jest.fn();

describe('image upload modal', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render image upload modal', () => {
    render(<ImageUploadModal submitImage={mockSubmit} onClose={mockOnClose} />);

    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByText('acceptImage')).toBeInTheDocument();
    expect(screen.getByText('drop rejected')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(
      screen.queryByText(
        /Image must be in JPEG, PNG, or GIF format and must not/
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('exceed 180px wide x 100px high')
    ).not.toBeInTheDocument();
  });

  it('should call the onClose handler when the close button is clicked', () => {
    render(<ImageUploadModal submitImage={mockSubmit} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call the onClose handler when the cancel button is clicked', () => {
    render(<ImageUploadModal submitImage={mockSubmit} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle file reject', () => {
    render(<ImageUploadModal submitImage={mockSubmit} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('drop rejected'));
    expect(
      screen.getByText(/Image must be in JPEG, PNG, or GIF format and must not/)
    ).toBeInTheDocument();
    expect(
      screen.getByText('exceed 180px wide x 100px high')
    ).toBeInTheDocument();
  });

  it('should handle file submition', async () => {
    render(
      <ImageUploadModal
        onClose={mockOnClose}
        formImage={file}
        submitImage={mockSubmit}
      />
    );
    fireEvent.click(screen.getByText('Continue'));
    expect(mockSubmit).toHaveBeenCalledWith(file);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
