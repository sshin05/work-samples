import { render, screen, fireEvent } from '@testing-library/react';
import { RemoveMemberModal } from './RemoveMemberModal';
import { useConfirmModal } from '@cerberus/react';
import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';

jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: jest.fn()
  }))
}));

jest.mock('@/app/api', () => ({
  useSQLMutation: jest.fn(() => ({
    mutation: jest.fn()
  }))
}));

const mockUser = {
  id: 'user-123',
  firstName: 'John',
  lastName: 'Doe'
} as unknown as CohortMemberData;

const defaultProps = {
  user: mockUser,
  cohortId: 'cohort-123',
  onSuccess: jest.fn(),
  onError: jest.fn()
};

describe('RemoveMemberModal', () => {
  describe('Basic Render', () => {
    it('renders the remove member option', () => {
      render(<RemoveMemberModal {...defaultProps} />);
      expect(screen.getByText('Remove from class')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('opens the confirm modal on click', async () => {
      const mockShow = jest.fn().mockResolvedValue(false);
      (useConfirmModal as jest.Mock).mockReturnValueOnce({ show: mockShow });

      render(<RemoveMemberModal {...defaultProps} />);
      const removeOption = screen.getByText('Remove from class');

      fireEvent.click(removeOption);

      expect(mockShow).toHaveBeenCalledWith({
        kind: 'destructive',
        heading: `Remove John Doe?`,
        description:
          'After removal, learners must be manually re-entered to restore.',
        actionText: 'Confirm',
        cancelText: 'Cancel'
      });
    });
  });
});
