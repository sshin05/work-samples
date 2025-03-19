import { render, screen, fireEvent } from '@testing-library/react';
import { LearnerRowMenu } from './LearnerRowMenu';
import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';

jest.mock('../RemoveMemberModal/RemoveMemberModal', () => ({
  RemoveMemberModal: jest.fn(() => <div data-testid="remove-member-modal" />)
}));

const mockRowData = {
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com'
} as unknown as CohortMemberData;

const defaultProps = {
  rowData: mockRowData,
  cohortId: 'cohort-123',
  onRemoveSuccess: jest.fn(),
  onRemoveError: jest.fn()
};

describe('LearnerRowMenu', () => {
  describe('Basic Render', () => {
    it('renders the menu trigger button', () => {
      render(<LearnerRowMenu {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Menu Interaction', () => {
    it('opens the menu on click', () => {
      render(<LearnerRowMenu {...defaultProps} />);
      const menuTrigger = screen.getByRole('button');
      fireEvent.click(menuTrigger);
      expect(screen.getByText('Update completion results')).toBeInTheDocument();
    });

    it('handles updating completion results', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      render(<LearnerRowMenu {...defaultProps} />);
      const menuTrigger = screen.getByRole('button');
      fireEvent.click(menuTrigger);

      const updateResultsOption = screen.getByText('Update completion results');
      fireEvent.click(updateResultsOption);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Update completion results for userId',
        mockRowData.id
      );

      consoleSpy.mockRestore();
    });

    it('renders the RemoveMemberModal', () => {
      render(<LearnerRowMenu {...defaultProps} />);
      const menuTrigger = screen.getByRole('button');
      fireEvent.click(menuTrigger);

      expect(screen.getByTestId('remove-member-modal')).toBeInTheDocument();
    });
  });
});
