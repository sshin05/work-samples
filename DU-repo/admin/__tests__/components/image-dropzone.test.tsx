import ImageDropzone from '../../src/components/settings-banner/image-upload/ImageDropzone';
import { render, screen, userEvent, waitFor } from '@@/test-utils';

const mockGetRootProps = jest.fn(() => ({}));
const mockIsDragActive = jest.fn(() => false);
const mockNewImage = jest.fn();
const file = new File(['hello'], 'hello.png', { type: 'image/png' });
global.Image = mockNewImage;
window.URL.createObjectURL = jest.fn(() => 'http://placekitten.com/100/100');

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>
}));

jest.mock(
  'react-dropzone',
  () =>
    ({
      onDrop,
      onDropAccepted,
      onDropRejected,
      onFileDialogOpen,
      onFileDialogCancel,
      disabled,
      children
    }) => (
      <>
        <button
          onClick={() => {
            onFileDialogCancel();
            onDrop();
            onDropAccepted([file]);
          }}
        >
          dropzone
        </button>
        <button onClick={onFileDialogOpen}>open</button>
        <button
          onClick={() => {
            onDrop();
            onDropRejected();
          }}
        >
          drop rejected
        </button>
        <span>{disabled && 'disabled'}</span>

        {children({
          getRootProps: mockGetRootProps,
          isDragActive: mockIsDragActive()
        })}
      </>
    )
);

const mockSetImage = jest.fn();
const mockSubmitImage = jest.fn();
const mockSetDropError = jest.fn();

describe('image preview', () => {
  it('should handle file drag and drop', async () => {
    mockNewImage.mockReturnValueOnce({
      width: 180,
      height: 100,
      addEventListener: (_, resolve) => resolve()
    });

    render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={mockSetImage}
        submitImage={jest.fn()}
      />
    );
    expect(
      screen.getByText('Drag and drop your logo here,')
    ).toBeInTheDocument();
    userEvent.click(screen.getByText('dropzone'));
    await waitFor(() => expect(mockSetImage).toHaveBeenCalledWith(file));
  });
  it('should handle file removal', async () => {
    render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={file}
        setAcceptedImage={mockSetImage}
        submitImage={mockSubmitImage}
      />
    );
    userEvent.click(screen.getByText('Remove'));
    expect(mockSubmitImage).toHaveBeenCalledWith('');
    expect(mockSetImage).toHaveBeenCalledWith('');
  });
  it('should handle file upload and reject large file', async () => {
    mockNewImage.mockReturnValueOnce({
      width: 200,
      height: 200,
      addEventListener: (_, resolve) => resolve()
    });
    render(
      <ImageDropzone
        dropError={false}
        setDropError={mockSetDropError}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(
      screen.getByText('Drag and drop your logo here,')
    ).toBeInTheDocument();
    userEvent.click(screen.getByText('dropzone'));
    await waitFor(() => expect(mockSetDropError).toHaveBeenCalled());
  });
  it('should handle file reject', async () => {
    render(
      <ImageDropzone
        dropError={false}
        setDropError={mockSetDropError}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(
      screen.getByText('Drag and drop your logo here,')
    ).toBeInTheDocument();
    userEvent.click(screen.getByText('drop rejected'));
    expect(mockSetDropError).toHaveBeenCalled();
  });
  it('should disable when file dialogue is open', async () => {
    render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(
      screen.getByText('Drag and drop your logo here,')
    ).toBeInTheDocument();
    userEvent.click(screen.getByText('open'));

    await waitFor(() =>
      expect(screen.getByText('disabled')).toBeInTheDocument()
    );
  });
  it('should not show error styles when error is false', async () => {
    const { container } = render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(container.querySelector('#image-upload')).not.toHaveStyle(
      'outline: 1px dashed #FB362D'
    );
  });
  it('should show error styles when error is true', async () => {
    const { container } = render(
      <ImageDropzone
        dropError
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(container.querySelector('#image-upload')).toHaveStyle(
      'outline: 1px dashed #FB362D'
    );
  });
  it('should render drop window without transparency when isDragActive is false', () => {
    const { container } = render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(container.querySelector('#image-upload')).not.toHaveStyle(
      'background-color: transparent'
    );
  });
  it('should render drop window with transparency when isDragActive is true', () => {
    mockIsDragActive.mockReturnValueOnce(true);
    const { container } = render(
      <ImageDropzone
        dropError={false}
        setDropError={jest.fn()}
        acceptedImage={''}
        setAcceptedImage={jest.fn()}
        submitImage={jest.fn()}
      />
    );
    expect(container.querySelector('#image-upload')).toHaveStyle(
      'background-color: transparent'
    );
  });
});
