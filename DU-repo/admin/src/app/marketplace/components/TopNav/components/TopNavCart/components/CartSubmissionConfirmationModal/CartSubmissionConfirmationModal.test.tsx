import { screen, render, fireEvent } from '@@/test-utils';
import { CartSubmissionConfirmationModal } from './CartSubmissionConfirmationModal';
import { useModal } from '@cerberus/react';
import {
  CANCEL_BUTTON_TEXT,
  CLOSE_ICON_LABEL
} from './CartSubmissionConfirmationModal.constants';

jest.mock('@/hooks/useRouteParams', () => ({
  useRouteParams: jest.fn(() => ({ missionPartnerId: '1234' }))
}));

jest.mock('@cerberus/react', () => ({
  ...jest.requireActual('@cerberus/react'),
  useModal: jest.fn(() => ({
    modalRef: { current: null },
    show: jest.fn(),
    close: jest.fn()
  }))
}));

describe('CartSubmissionConfirmationModal', () => {
  const defaultProps = () => ({
    orderReferenceId: 'AA-123456',
    onClose: jest.fn()
  });

  it('displays when an order reference id is provided', () => {
    const showModalSpy = jest.fn();
    (useModal as jest.Mock).mockReturnValueOnce({
      modalRef: { current: null },
      show: showModalSpy,
      close: jest.fn()
    });

    render(<CartSubmissionConfirmationModal {...defaultProps()} />);

    expect(showModalSpy).toHaveBeenCalled();
    expect(screen.getByText('Your request has been sent')).toBeInTheDocument();
  });

  it('does not display when the orderReferenceId is null', () => {
    const showModalSpy = jest.fn();
    (useModal as jest.Mock).mockReturnValueOnce({
      modalRef: { current: null },
      show: showModalSpy,
      close: jest.fn()
    });

    const props = {
      ...defaultProps(),
      orderReferenceId: null
    };
    render(<CartSubmissionConfirmationModal {...props} />);

    expect(showModalSpy).not.toHaveBeenCalled();
  });

  describe('onClose', () => {
    it('calls the close handler when clicking the "keep shopping" button', () => {
      const props = defaultProps();

      render(<CartSubmissionConfirmationModal {...props} />);

      fireEvent.click(screen.getByText(CANCEL_BUTTON_TEXT));

      expect(props.onClose).toHaveBeenCalled();
    });

    it('calls the close handler when clicking the close icon', () => {
      const props = defaultProps();

      render(<CartSubmissionConfirmationModal {...props} />);

      fireEvent.click(screen.getByLabelText(CLOSE_ICON_LABEL));

      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
