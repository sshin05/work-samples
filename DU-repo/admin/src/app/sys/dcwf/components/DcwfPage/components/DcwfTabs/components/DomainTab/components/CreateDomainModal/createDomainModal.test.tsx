import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { CreateDomainModal } from './CreateDomainModal';
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

jest.mock('@/api/dcwf/domain/useCreateDomain', () => ({
  useCreateDomain: jest.fn(() => ({
    createDomain: jest.fn().mockResolvedValue({})
  }))
}));

describe('CreateDomainModal', () => {
  const mockModalClose = jest.fn();
  const mockCreateDomainModal: UseModalReturnValue = {
    modalRef: { current: null },
    show: jest.fn(),
    close: mockModalClose,
    isOpen: true
  };

  describe('rendering', () => {
    it('renders the modal with form fields', () => {
      renderV3(<CreateDomainModal createDomainModal={mockCreateDomainModal} />);

      expect(
        screen.getByRole('heading', { name: 'Create Domain' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter a short Domain description'
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter a short Domain description'
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter a full Domain description'
        })
      ).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('successfully creates domain and calls onClose', async () => {
      renderV3(<CreateDomainModal createDomainModal={mockCreateDomainModal} />);

      fireEvent.change(
        screen.getByRole('textbox', { name: 'Enter Domain title' }),
        {
          target: { value: 'Domain123' }
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter a short Domain description'
        }),
        {
          target: { value: 'Short Description' }
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter a full Domain description'
        }),
        {
          target: { value: 'Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Create Domain' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
        expect(mockCreateDomainModal.close).toHaveBeenCalled();
      });
    });

    //add failure case test

    it('calls onClose when cancel button is clicked', () => {
      renderV3(<CreateDomainModal createDomainModal={mockCreateDomainModal} />);

      fireEvent.click(screen.getByText('Cancel'));

      expect(mockCreateDomainModal.close).toHaveBeenCalled();
    });
  });
});
