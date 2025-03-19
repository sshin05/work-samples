import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { EnterRoleModal } from './EnterRoleModal';
import type { UseModalReturnValue } from '@cerberus/react';

const mockNotify = jest.fn();
jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useNotificationCenter: jest.fn(() => ({
    notify: mockNotify
  })),
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/CustomModal', () => ({
  CustomModal: ({ children, title, onClose }) => (
    <div>
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  )
}));

jest.mock('@/api/dcwf/role/useCreateJobRole', () => ({
  useCreateJobRole: jest.fn(() => ({
    createJobRole: jest.fn().mockResolvedValue({})
  }))
}));

describe('EnterRoleModal', () => {
  const mockModalClose = jest.fn();
  const mockEnterRoleModal: UseModalReturnValue = {
    modalRef: { current: null },
    show: jest.fn(),
    close: mockModalClose,
    isOpen: true
  };

  describe('rendering', () => {
    it('renders the modal with form fields', () => {
      renderV3(<EnterRoleModal enterRoleModal={mockEnterRoleModal} />);

      expect(
        screen.getByRole('heading', { name: 'Enter Role' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter Role ID'
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter Role title'
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter a Role description'
        })
      ).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('successfully enters role and calls onClose', async () => {
      renderV3(<EnterRoleModal enterRoleModal={mockEnterRoleModal} />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter Role ID'
        }),
        {
          target: { value: 'Role123' }
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter Role title'
        }),
        {
          target: { value: 'Role Title' }
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter a Role description'
        }),
        {
          target: { value: 'Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Enter Role' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
        expect(mockEnterRoleModal.close).toHaveBeenCalled();
      });
    });

    //add failure case test

    it('calls onClose when cancel button is clicked', () => {
      renderV3(<EnterRoleModal enterRoleModal={mockEnterRoleModal} />);

      fireEvent.click(screen.getByText('Cancel'));

      expect(mockEnterRoleModal.close).toHaveBeenCalled();
    });
  });
});
