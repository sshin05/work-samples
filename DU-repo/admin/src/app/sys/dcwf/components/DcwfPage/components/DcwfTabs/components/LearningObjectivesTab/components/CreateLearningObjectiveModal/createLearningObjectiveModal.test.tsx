import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { CreateLearningObjectiveModal } from './CreateLearningObjectiveModal';
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

jest.mock('@/api/dcwf/learning-objective/useCreateLearningObjective', () => ({
  useCreateLearningObjective: jest.fn(() => ({
    createLearningObjective: jest.fn().mockResolvedValue({})
  }))
}));

describe('CreateLearningObjectiveModal', () => {
  const mockModalClose = jest.fn();
  const mockCreateLearningObjectiveModal: UseModalReturnValue = {
    modalRef: { current: null },
    show: jest.fn(),
    close: mockModalClose,
    isOpen: true
  };

  describe('rendering', () => {
    it('renders the modal with form fields', () => {
      renderV3(
        <CreateLearningObjectiveModal
          createLearningObjectiveModal={mockCreateLearningObjectiveModal}
        />
      );

      expect(
        screen.getByRole('heading', { name: 'Create Learning Objective' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', {
          name: 'Enter a Learning Objective description'
        })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', {
          name: 'Create Learning Objective'
        })
      ).toBeInTheDocument();
    });
  });

  describe('functionality', () => {
    it('successfully creates learning objective and calls onClose', async () => {
      renderV3(
        <CreateLearningObjectiveModal
          createLearningObjectiveModal={mockCreateLearningObjectiveModal}
        />
      );

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Enter a Learning Objective description'
        }),
        {
          target: { value: 'Description' }
        }
      );
      fireEvent.click(
        screen.getByRole('button', {
          name: 'Create Learning Objective'
        })
      );

      await waitFor(() => {
        expect(mockNotify).toHaveBeenCalledWith(
          expect.objectContaining({ heading: 'Success' })
        );
        expect(mockCreateLearningObjectiveModal.close).toHaveBeenCalled();
      });
    });

    //add failure case test

    it('calls onClose when cancel button is clicked', () => {
      renderV3(
        <CreateLearningObjectiveModal
          createLearningObjectiveModal={mockCreateLearningObjectiveModal}
        />
      );

      fireEvent.click(screen.getByText('Cancel'));

      expect(mockCreateLearningObjectiveModal.close).toHaveBeenCalled();
    });
  });
});
