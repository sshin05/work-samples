import React from 'react';
import { renderV3, fireEvent, screen, waitFor } from '@@/test-utils';
import { DcwfActionMenu } from './DcwfActionMenu';

describe('DcwfActionMenu', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const actionId = 'test-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render DcwfActionMenu', () => {
    renderV3(
      <DcwfActionMenu
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        actionId={actionId}
      />
    );

    expect(screen.getByLabelText('icon-button')).toBeInTheDocument();
  });

  it('should call onEdit when edit menu item is clicked', async () => {
    renderV3(
      <DcwfActionMenu
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        actionId={actionId}
      />
    );

    fireEvent.click(screen.getByLabelText('icon-button'));
    fireEvent.click(screen.getByText('Edit'));

    waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(actionId);
    });
  });

  it('should call onDelete when delete menu item is clicked', async () => {
    renderV3(
      <DcwfActionMenu
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        actionId={actionId}
      />
    );

    fireEvent.click(screen.getByLabelText('icon-button'));
    fireEvent.click(screen.getByText('Delete'));

    waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(actionId);
    });
  });
});
