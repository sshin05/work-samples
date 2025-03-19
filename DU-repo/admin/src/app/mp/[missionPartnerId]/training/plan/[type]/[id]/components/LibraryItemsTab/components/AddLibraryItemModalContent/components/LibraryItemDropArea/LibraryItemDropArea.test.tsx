import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { LibraryItemDropArea } from './LibraryItemDropArea';
import { useForm } from 'react-hook-form';
import { onDropFile } from '@/utils/onDropLibraryItemFile';

jest.mock('@cerberus/react', () => ({
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('react-dropzone', () => ({
  useDropzone: ({ onDropAccepted }) => ({
    getRootProps: jest.fn(() => {
      onDropAccepted([new File(['content'], 'foo', { type: 'video/mp4' })]);
    }),
    getInputProps: jest.fn(() =>
      onDropAccepted([new File(['content'], 'foo', { type: 'video/mp4' })])
    ),
    fileRejections: ['test'],
    isDragActive: false
  })
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    control: { setValue: jest.fn() },
    formState: { errors: {} },
    register: jest.fn(),
    setValue: jest.fn()
  })),
  Controller: ({ render, rules }) => (
    <div>
      {render({ field: {}, fieldState: {} })}
      <div>{rules.validate ? rules.validate() : ''}</div>
    </div>
  )
}));

jest.mock('@/utils/onDropLibraryItemFile');

describe('LibraryItemDropArea test', () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockImplementation(() => ({
      handleSubmit: jest.fn(),
      control: {},
      formState: {
        errors: {},
        isDirty: true,
        isSubmitting: false,
        isValid: true
      },
      register: jest.fn(),
      watch: jest.fn()
    }));
  });

  it('should render the library item drop area', () => {
    (onDropFile as jest.Mock).mockReturnValue({
      hasFile: false,
      file: null,
      value: null
    });
    renderV3(
      <LibraryItemDropArea
        control={{}}
        setHasFile={jest.fn()}
        setHasFileRejections={jest.fn()}
        setValue={jest.fn()}
        isSubmitting={false}
        loading={false}
        hasFileRejections={false}
        activeUploadTab={0}
      />
    );

    expect(screen.getByText(/Drag and drop a file here,/i)).toBeInTheDocument();
  });

  it('should add .png file and remove', async () => {
    (onDropFile as jest.Mock).mockReturnValue({
      hasFile: true,
      file: new File(['contents'], 'test.png', { type: 'image/png' }),
      value: 'File'
    });
    const setHasFileMock = jest.fn();
    renderV3(
      <LibraryItemDropArea
        control={{}}
        setHasFile={setHasFileMock}
        setHasFileRejections={jest.fn()}
        hasFileRejections={false}
        setValue={jest.fn()}
        isSubmitting={false}
        loading={false}
        activeUploadTab={0}
      />
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: {
        files: [new File(['contents'], 'test.mp3', { type: 'audio/mp3' })]
      }
    });
    await waitFor(() => {
      expect(screen.getByText(/test.png/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Remove/));
    expect(setHasFileMock).toHaveBeenCalled();
  });

  it('should set type of file to audio', async () => {
    (onDropFile as jest.Mock).mockReturnValue({
      hasFile: true,
      file: new File(['contents'], 'test.mp3', { type: 'audio/mp3' }),
      value: 'Audio'
    });
    renderV3(
      <LibraryItemDropArea
        control={{}}
        setHasFile={jest.fn()}
        setHasFileRejections={jest.fn()}
        hasFileRejections={false}
        setValue={jest.fn()}
        isSubmitting={false}
        loading={false}
        activeUploadTab={0}
      />
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: {
        files: [new File(['contents'], 'test.mp3', { type: 'audio/mp3' })]
      }
    });

    await waitFor(() => {
      expect(screen.getByText(/test.mp3/i)).toBeInTheDocument();
    });
  });

  it('should set type of file to video', async () => {
    (onDropFile as jest.Mock).mockReturnValue({
      hasFile: true,
      file: new File(['contents'], 'test.mp4', { type: 'video/mp4' }),
      value: 'Video'
    });
    renderV3(
      <LibraryItemDropArea
        control={{}}
        setHasFile={jest.fn()}
        setHasFileRejections={jest.fn()}
        hasFileRejections={false}
        setValue={jest.fn()}
        isSubmitting={false}
        loading={false}
        activeUploadTab={0}
      />
    );
    const input = screen.getByRole('textbox');

    fireEvent.change(input, {
      target: {
        files: [new File(['contents'], 'test.mp4', { type: 'video/mp4' })]
      }
    });
    await waitFor(() =>
      expect(screen.getByText(/test.mp4/i)).toBeInTheDocument()
    );
  });
});
