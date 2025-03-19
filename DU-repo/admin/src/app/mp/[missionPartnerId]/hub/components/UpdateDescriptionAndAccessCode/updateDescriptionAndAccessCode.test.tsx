import React from 'react';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import UpdateDescriptionAndAccessCode from '../UpdateDescriptionAndAccessCode/UpdateDescriptionAndAccessCode';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import { useUnsavedChangesPrompt } from '@/hooks/useUnsavedChangesPrompt';

jest.mock('@/api/mission-partner');
jest.mock('@/hooks/useUnsavedChangesPrompt');

jest.mock('@cerberus/icons', () => ({
  Copy: ({ onClick }) => <div onClick={onClick}>Copy</div>
}));

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn(),
    isOpen: true
  })),
  trapFocus: jest.fn(),
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children, ...props }) => <div {...props}>{children}</div>,
  Label: ({ children, ...props }) => <div {...props}>{children}</div>,
  Button: ({ children, onClick, ...props }) => (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  ),
  FieldMessage: ({ children, ...props }) => <div {...props}>{children}</div>,
  Textarea: ({ children, ...props }) => (
    <textarea {...props}>{children}</textarea>
  ),
  Modal: ({ children }) => <div>{children}</div>
}));

jest.mock('./components/UpdateAccessCodeModalContent', () => {
  const UpdateAccessCodeModalContent = () => <div>UpdateAccessCodeModal</div>;
  UpdateAccessCodeModalContent.displayName = 'UpdateAccessCodeModal';
  return { UpdateAccessCodeModalContent };
});

jest.mock('./components/AccessCodeField', () => {
  const AccessCodeField = () => <div>AccessCodeField</div>;
  AccessCodeField.displayName = 'AccessCodeField';
  return { AccessCodeField };
});

describe('UpdateAccessCode Component', () => {
  const mockMissionPartner = {
    id: '123',
    accessCode: 'abcd-efgh-ijkl',
    description: 'test'
  };
  const mockUpdateMissionPartner = jest.fn();

  beforeEach(() => {
    (useUpdateMissionPartner as jest.Mock).mockReturnValue({
      updateMissionPartner: mockUpdateMissionPartner,
      updateMissionPartnerLoading: false
    });
    (useUnsavedChangesPrompt as jest.Mock).mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders the component', () => {
      renderV3(
        <UpdateDescriptionAndAccessCode missionPartner={mockMissionPartner} />
      );

      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('AccessCodeField')).toBeInTheDocument();
      expect(screen.getByText('Update Code')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('shows UpdateAccessCodeModal when "Update Code" button is clicked', () => {
      renderV3(
        <UpdateDescriptionAndAccessCode missionPartner={mockMissionPartner} />
      );

      const updateButton = screen.getByText('Update Code');
      fireEvent.click(updateButton);

      expect(screen.getByText('UpdateAccessCodeModal')).toBeInTheDocument();
    });
  });

  describe('mission partner update cases', () => {
    it('shows success notification when save button and mission partner update succeeds', async () => {
      renderV3(
        <UpdateDescriptionAndAccessCode missionPartner={mockMissionPartner} />
      );

      const textArea = screen.getByRole('textbox');
      fireEvent.change(textArea, {
        target: { value: 'Description' }
      });
      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeInTheDocument();
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateMissionPartner).toHaveBeenCalledWith({
          id: '123',
          description: 'Description'
        });
      });
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Success' })
      );
    });

    it('shows error notification when save button is clicked and mission partner update fails', async () => {
      mockUpdateMissionPartner.mockImplementation(() => {
        throw new Error('error');
      });

      renderV3(
        <UpdateDescriptionAndAccessCode missionPartner={mockMissionPartner} />
      );

      const textArea = screen.getByRole('textbox');
      fireEvent.change(textArea, {
        target: { value: 'Description' }
      });
      const saveButton = screen.getByText('Save');
      expect(saveButton).toBeInTheDocument();
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockUpdateMissionPartner).toHaveBeenCalledWith({
          id: '123',
          description: 'Description'
        });
      });
      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });

  describe('copyDescription', () => {
    it('shows success notification when copy button is clicked with description', () => {
      renderV3(
        <UpdateDescriptionAndAccessCode missionPartner={mockMissionPartner} />
      );

      const copyButton = screen.getByText('Copy');
      fireEvent.click(copyButton);

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Success' })
      );
    });

    it('shows error notification when copy button is clicked without description', () => {
      const noDescriptionMissionPartner = {
        id: '123',
        accessCode: '',
        description: ''
      };

      renderV3(
        <UpdateDescriptionAndAccessCode
          missionPartner={noDescriptionMissionPartner}
        />
      );

      const copyButton = screen.getByText('Copy');
      fireEvent.click(copyButton);

      expect(mockNotify).toHaveBeenCalledWith(
        expect.objectContaining({ heading: 'Error' })
      );
    });
  });
});
