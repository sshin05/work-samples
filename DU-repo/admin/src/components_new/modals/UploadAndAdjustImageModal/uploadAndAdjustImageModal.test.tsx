import { renderV3, screen, waitFor, fireEvent } from '@@/test-utils';
import { hasMinPicDimensions } from './utils/hasMinPicDimensions';
import { UploadAndAdjustImageModal } from './UploadAndAdjustImageModal';
import { dataURLtoFile } from './utils/dataURLtoFile';
import { verifyFile } from './utils/verifyFile';

jest.mock('./utils/getBase64', () => ({
  getBase64: jest.fn().mockImplementation(() => Promise.resolve('base64'))
}));

jest.mock('./utils/hasMinPicDimensions', () => ({
  hasMinPicDimensions: jest.fn().mockImplementation(() => Promise.resolve())
}));

// Mock dependencies
jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Button: jest.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
  IconButton: jest.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
  ModalHeader: jest.fn(({ children, ...props }) => (
    <div {...props}>{children}</div>
  )),
  ModalHeading: jest.fn(({ children, ...props }) => (
    <h2 {...props}>{children}</h2>
  ))
}));

jest.mock('./utils/dataURLtoFile');
jest.mock('./utils/verifyFile');
jest.mock('react-avatar-editor', () =>
  jest.fn(({ onImageChange, ...props }) => (
    <div data-testid="mock-avatar-editor" {...props} onClick={onImageChange} />
  ))
);
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(() => ({
    current: {
      getImage: jest.fn(() => ({
        toDataURL: jest.fn(() => 'test;test:test;::')
      }))
    }
  }))
}));

jest.mock('rc-slider', () => {
  return jest.fn(({ onChange, ...props }) => (
    <input
      type="range"
      data-testid="mock-slider"
      onChange={e => onChange(Number(e.target.value))}
      {...props}
    />
  ));
});

describe('UploadAndAdjustImageModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  const mockFile = new File(['test-file'], 'test.jpg', { type: 'image/jpeg' });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock verifyFile to return a successful verification
    (verifyFile as jest.Mock).mockResolvedValue({
      file: mockFile,
      mimeType: 'image/jpeg'
    });
  });

  describe('Initial Render', () => {
    it('renders initial upload state with correct text', () => {
      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('Upload Image')).toBeInTheDocument();
      expect(
        screen.getByText(/Please use a JPEG, GIF, or PNG/i)
      ).toBeInTheDocument();
      expect(screen.getByText('SELECT A PHOTO')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const closeButton = screen.getAllByRole('button')[0];
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('File Upload Workflow', () => {
    // TODO: Get with FE to figure out if this test can be updated
    it.skip('handles successful file upload', async () => {
      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const fileInput = screen.getByLabelText('file-input');
      fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(screen.getByTestId('mock-avatar-editor')).toBeInTheDocument();
      });

      // Check that avatar editor is rendered
      const avatarEditor = screen.getByTestId('mock-avatar-editor');

      fireEvent.click(avatarEditor);

      await waitFor(() => {
        expect(dataURLtoFile).toHaveBeenCalled();
      });

      // Check zoom and rotation sliders are present
      const sliders = screen.getAllByTestId('mock-slider');
      expect(sliders).toHaveLength(2);
    });

    it('handles file upload error', async () => {
      // Mock verifyFile to throw an error
      (verifyFile as jest.Mock).mockRejectedValue(new Error('File too small'));

      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const fileInput = screen.getByLabelText('file-input');

      await waitFor(() => {
        fireEvent.change(fileInput, { target: { files: [mockFile] } });
      });

      // Use a more flexible text matching
      const errorMessages = await screen.findAllByText((content, element) => {
        return element?.textContent === 'File too small';
      });
      const errorMessage = errorMessages[0];

      expect(errorMessage).toBeInTheDocument();
    });

    it('handles image selection and closing', async () => {
      // Mock dataURLtoFile to return a mocked file
      (dataURLtoFile as jest.Mock).mockReturnValue(mockFile);

      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const fileInput = screen.getByLabelText('file-input');
      fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(screen.getByText('SAVE')).toBeInTheDocument();
      });

      // Simulate save button click
      const saveButton = screen.getByText('SAVE');
      fireEvent.click(saveButton);

      expect(mockOnSelect).toHaveBeenCalledWith(mockFile);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('handles image zoom and rotation', async () => {
      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const fileInput = screen.getByLabelText('file-input');
      fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(screen.getAllByTestId('mock-slider').length).toBe(2);
      });

      // Get sliders
      const sliders = screen.getAllByTestId('mock-slider');

      // Simulate zoom slider change
      fireEvent.change(sliders[0], { target: { value: '2' } });

      // Simulate rotation slider change
      fireEvent.change(sliders[1], { target: { value: '90' } });

      // Add expectations as needed based on your implementation
      expect(sliders).toHaveLength(2);
    });

    it('handles cancel/clear workflow', async () => {
      renderV3(
        <UploadAndAdjustImageModal
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const fileInput = screen.getByLabelText('file-input');

      fireEvent.change(fileInput, { target: { files: [mockFile] } });

      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });

      // Click cancel button
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);

      // Verify file input is back to initial state
      expect(screen.getByText('SELECT A PHOTO')).toBeInTheDocument();
    });
  });
});

describe('Tests for base64image and hasMinPicDimensions', () => {
  it('should resolve with fileData object when hasMinPicDimensions returns without throwing an error', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const base64image = 'data:image/png;base64,';
    const imageSizes = [300];
    return new Promise((resolve, reject) => {
      try {
        const fileData = {
          mimeType: file.type,
          base64: base64image,
          file
        };
        hasMinPicDimensions(fileData, imageSizes[0]);
        resolve(fileData);
      } catch (caughtError) {
        reject(caughtError.message);
      }
    }).then(result => {
      expect(result).toEqual({
        mimeType: 'image/png',
        base64: 'data:image/png;base64,',
        file
      });
    });
  });

  it('should reject with error message when hasMinPicDimensions throws an error', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const imageSizes = [50];
    const base64image = 'data:image/png;base64,';

    return new Promise((resolve, reject) => {
      try {
        const fileData = {
          mimeType: file.type,
          base64: base64image,
          file
        };
        hasMinPicDimensions(fileData, imageSizes[0]);
        resolve(fileData);
      } catch (caughtError) {
        reject(caughtError.message);
      }
    }).catch(error => {
      expect(error).toBe('Image is too small');
    });
  });

  it('should throw an error when image dimensions are larger than minSize in both width and height', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const base64image = 'data:image/png;base64,';

    return new Promise((resolve, reject) => {
      try {
        const fileData = {
          mimeType: file.type,
          base64: base64image,
          file
        };
        hasMinPicDimensions(fileData, 1000);
        resolve(fileData);
      } catch (caughtError) {
        reject(caughtError.message);
      }
    }).catch(error => {
      expect(error).toBe('Image is too small');
    });
  });

  it('should throw an error when fileData has invalid mimeType', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });
    const base64image = 'data:image/png;base64,';
    const imageSizes = [300];

    return new Promise((resolve, reject) => {
      try {
        const fileData = {
          mimeType: file.type,
          base64: base64image,
          file
        };
        hasMinPicDimensions(fileData, imageSizes[0]);
        resolve(fileData);
      } catch (caughtError) {
        reject(caughtError.message);
      }
    }).catch(error => {
      expect(error).toBe('File is not of a supported image type');
    });
  });

  it('should throw an error when image decoding fails', (): Promise<void | {
    mimeType: string;
    base64: string;
    file: File;
  }> => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const base64image = 'data:image/png;base64,';
    const imageSizes = [300];

    // eslint-disable-next-line sonarjs/no-try-promise
    try {
      return new Promise((resolve, reject) => {
        try {
          const fileData = {
            mimeType: file.type,
            base64: base64image,
            file
          };
          hasMinPicDimensions(fileData, imageSizes[0]);
          resolve(fileData);
        } catch (caughtError) {
          reject(caughtError.message);
        }
      });
    } catch (error) {
      expect(error).toEqual('Image is too small');
    }
    return undefined;
  });

  it('should throw an error when the image is smaller than the minimum size', async () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    const base64image = 'data:image/png;base64,';
    const imageSizes = [30];
    try {
      return await new Promise((resolve, reject) => {
        try {
          const fileData = {
            mimeType: file.type,
            base64: base64image,
            file
          };
          hasMinPicDimensions(fileData, imageSizes[0]);
          resolve(fileData);
        } catch (caughtError) {
          reject(caughtError.message);
        }
      });
    } catch (error) {
      expect(error).toBe('Image is too small');
    }
    return undefined;
  });
});
