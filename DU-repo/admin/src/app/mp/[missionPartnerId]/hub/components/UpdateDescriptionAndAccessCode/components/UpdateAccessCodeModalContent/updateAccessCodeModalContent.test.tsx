import { useUpdateMissionPartner } from '@/api/mission-partner';
import { renderV3, screen, userEvent, fireEvent } from '@@/test-utils';
import { UpdateAccessCodeModalContent } from './UpdateAccessCodeModalContent';

jest.mock('@/api/mission-partner', () => ({
  useUpdateMissionPartner: jest.fn(() => {
    return {
      updateMissionPartner: mockUpdateMissionPartner
    };
  })
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: jest.fn(() => {
    return (
      <section>
        <label htmlFor="item-code">Update Code</label>
        <input data-testid="update-code-input" id="item-code" minLength={12} />
      </section>
    );
  }),
  useForm: jest.fn(() => {
    return {
      handleSubmit: fn => code => {
        return fn(code);
      },
      register: jest.fn(),
      reset: jest.fn(),
      formState: {
        isSubmitting: false,
        isValid: true,
        errors: {}
      }
    };
  })
}));

jest.mock('@/api/affiliate');
jest.mock('@/api/user');

const mockUpdateMissionPartner = jest.fn().mockResolvedValue({
  data: {
    updateMissionPartner: {
      id: 1
    }
  }
});

const mockMissionPartnerId = '1234';

beforeAll(() => {
  (useUpdateMissionPartner as jest.Mock).mockReturnValue({
    updateMissionPartner: mockUpdateMissionPartner
  });
});

describe('updateAccessCodeModal', () => {
  const onCloseMock = jest.fn();
  const mockNotify = jest.fn();

  it('should render', () => {
    renderV3(
      <UpdateAccessCodeModalContent
        missionPartnerId={mockMissionPartnerId}
        notify={jest.fn()}
        close={onCloseMock}
        updateAccessCode={jest.fn()}
      />
    );

    expect(screen.getByText('Access Code')).toBeInTheDocument();
    expect(screen.getByText('Update Code')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should not allow fewer than 12 characters in the update code field', async () => {
    renderV3(
      <UpdateAccessCodeModalContent
        missionPartnerId={mockMissionPartnerId}
        notify={mockNotify}
        close={onCloseMock}
        updateAccessCode={jest.fn()}
      />
    );

    const codeField = screen.getByTestId(
      'update-code-input'
    ) as HTMLInputElement;
    expect(codeField).toBeInTheDocument();
    userEvent.paste(
      codeField,
      'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'
    );
    expect(codeField.value).toHaveLength(78);
  });

  it('should respond to onClose when the Cancel button is clicked', async () => {
    renderV3(
      <UpdateAccessCodeModalContent
        missionPartnerId={mockMissionPartnerId}
        notify={mockNotify}
        close={onCloseMock}
        updateAccessCode={jest.fn()}
      />
    );

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should submit form and call handleUpdateAccessCode', async () => {
    renderV3(
      <UpdateAccessCodeModalContent
        missionPartnerId={mockMissionPartnerId}
        notify={mockNotify}
        close={onCloseMock}
        updateAccessCode={jest.fn()}
      />
    );

    const codeField = screen.getByTestId(
      'update-code-input'
    ) as HTMLInputElement;

    fireEvent.change(codeField, { target: { value: '123456' } });
    const saveButton = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(saveButton);

    expect(mockUpdateMissionPartner).toHaveBeenCalled();

    expect(codeField.value).toBe('123456');
  });
});
