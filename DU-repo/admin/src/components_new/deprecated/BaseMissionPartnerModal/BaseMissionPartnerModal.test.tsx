import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BaseMissionPartnerModal } from './BaseMissionPartnerModal';
import { renderV3 } from '@@/test-utils';

describe('<BaseMissionPartnerModal />', () => {
  const defaultProps = {
    title: 'Test Modal',
    onClose: jest.fn(),
    children: <div>Modal Content</div>
  };

  describe('Rendering', () => {
    it('should render the modal with the given title and children', () => {
      renderV3(
        <div id="app-root">
          <BaseMissionPartnerModal {...defaultProps} />
        </div>
      );

      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClose when the close button is clicked', () => {
      renderV3(
        <div id="app-root">
          <BaseMissionPartnerModal {...defaultProps} />
        </div>
      );

      const closeButton = screen.getByLabelText('Close');
      userEvent.click(closeButton);

      expect(defaultProps.onClose).toHaveBeenCalled();
    });
  });
});
