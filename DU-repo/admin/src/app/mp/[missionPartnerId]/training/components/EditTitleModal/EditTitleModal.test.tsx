import { fireEvent, renderV3, screen } from '@@/test-utils';
import { EditTitleModal } from './EditTitleModal';

describe('EditTitleModal', () => {
  const initialValue = 'Initial Title';
  let onSubmitMock;
  let onCloseMock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
    onCloseMock = jest.fn();
  });

  it('renders correctly with initial props', () => {
    renderV3(
      <EditTitleModal
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        initialValue={initialValue}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue(initialValue);
    expect(screen.getByText(/cancel/i)).toBeEnabled();
  });

  it('enables the save button when input changes', () => {
    renderV3(
      <EditTitleModal
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        initialValue=""
      />
    );

    const input = screen.getByLabelText(/title/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(input, { target: { value: 'New Title' } });

    expect(input).toHaveValue('New Title');
    expect(saveButton).toBeEnabled();
  });

  it('calls onSubmit and onClose when save is clicked', () => {
    renderV3(
      <EditTitleModal
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        initialValue=""
      />
    );

    const input = screen.getByLabelText(/title/i);
    const saveButton = screen.getByText(/save/i);

    fireEvent.change(input, { target: { value: 'New Title' } });
    fireEvent.click(saveButton);

    expect(onSubmitMock).toHaveBeenCalledWith('New Title');
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onClose when cancel is clicked', () => {
    renderV3(
      <EditTitleModal
        onSubmit={onSubmitMock}
        onClose={onCloseMock}
        initialValue=""
      />
    );

    const cancelButton = screen.getByText(/cancel/i);

    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });
});
