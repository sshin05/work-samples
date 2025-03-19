import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { EnterKsatModal } from './EnterKsatModal';
import type { UseModalReturnValue } from '@cerberus/react';
import { useCreateKsat } from '@/api/dcwf/ksat/useCreateKsat';
import { useUpdateKsat } from '@/api/dcwf/ksat/useUpdateKsat';
import type { KsatType } from '@/api/codegen/graphql';

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

jest.mock('@/api/dcwf/ksat/useCreateKsat', () => ({
  useCreateKsat: jest.fn(() => ({
    createKsat: jest.fn().mockResolvedValue({})
  }))
}));

jest.mock('@/api/dcwf/ksat/useUpdateKsat', () => ({
  useUpdateKsat: jest.fn(() => ({
    updateKsat: jest.fn().mockResolvedValue({})
  }))
}));

describe('EnterKsatModal', () => {
  const mockModalClose = jest.fn();
  const mockEnterKsatModal: UseModalReturnValue = {
    modalRef: { current: null },
    show: jest.fn(),
    close: mockModalClose,
    isOpen: true
  };

  describe('rendering', () => {
    it('renders the modal with form fields', () => {
      renderV3(<EnterKsatModal modal={mockEnterKsatModal} />);

      expect(
        screen.getByRole('heading', { name: 'Enter KSAT' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'KSAT Code' })
      ).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Description'
        })
      ).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('successfully enters ksat and calls onClose', async () => {
      renderV3(<EnterKsatModal modal={mockEnterKsatModal} />);

      fireEvent.change(screen.getByRole('textbox', { name: 'KSAT Code' }), {
        target: { value: 'KSAT123' }
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Knowledge' }
      });
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Description'
        }),
        {
          target: { value: 'Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Enter KSAT' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
        expect(mockEnterKsatModal.close).toHaveBeenCalled();
      });
    });

    it('successfully updates ksat and calls onClose', async () => {
      renderV3(
        <EnterKsatModal
          modal={mockEnterKsatModal}
          ksat={{
            id: '1',
            code: 'KSAT123',
            description: 'Description',
            ksatType: 'Knowledge' as KsatType
          }}
        />
      );

      fireEvent.change(screen.getByRole('textbox', { name: 'KSAT Code' }), {
        target: { value: 'KSAT567' }
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Skill' }
      });
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Description'
        }),
        {
          target: { value: 'New Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Update KSAT' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
        expect(mockEnterKsatModal.close).toHaveBeenCalled();
      });
    });

    it('fails to create ksat', async () => {
      (useCreateKsat as jest.Mock).mockReturnValue({
        createKsat: jest.fn().mockRejectedValue(new Error('Network Error'))
      });

      renderV3(<EnterKsatModal modal={mockEnterKsatModal} />);

      fireEvent.change(screen.getByRole('textbox', { name: 'KSAT Code' }), {
        target: { value: 'KSAT123' }
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Knowledge' }
      });
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Description'
        }),
        {
          target: { value: 'Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Enter KSAT' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
        expect(mockEnterKsatModal.close).toHaveBeenCalled();
      });
    });

    it('fails to update ksat', async () => {
      (useUpdateKsat as jest.Mock).mockReturnValue({
        updateKsat: jest.fn().mockRejectedValue(new Error('Network Error'))
      });

      renderV3(
        <EnterKsatModal
          modal={mockEnterKsatModal}
          ksat={{
            id: '1',
            code: 'KSAT123',
            description: 'Description',
            ksatType: 'Knowledge' as KsatType
          }}
        />
      );

      fireEvent.change(screen.getByRole('textbox', { name: 'KSAT Code' }), {
        target: { value: 'KSAT567' }
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Skill' }
      });
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Description'
        }),
        {
          target: { value: 'New Description' }
        }
      );
      fireEvent.click(screen.getByRole('button', { name: 'Update KSAT' }));

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Error' })
        );
        expect(mockEnterKsatModal.close).toHaveBeenCalled();
      });
    });

    it('calls onClose when cancel button is clicked', () => {
      renderV3(<EnterKsatModal modal={mockEnterKsatModal} />);

      fireEvent.click(screen.getByText('Cancel'));

      expect(mockEnterKsatModal.close).toHaveBeenCalled();
    });
  });
});
