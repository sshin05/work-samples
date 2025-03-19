import React from 'react';
import { renderV3, screen, fireEvent } from '@@/test-utils';
import { CustomModal } from './CustomModal';
import type { UseModalReturnValue } from '@cerberus/react';

describe('CustomModal', () => {
  const customModal: UseModalReturnValue = {
    modalRef: React.createRef(),
    isOpen: true,
    show: jest.fn(),
    close: jest.fn()
  };
  const title = 'Test Title';
  const onClose = jest.fn();
  const children = <div>Test Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    renderV3(
      <CustomModal customModal={customModal} title={title} onClose={onClose}>
        {children}
      </CustomModal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    customModal.isOpen = false;

    renderV3(
      <CustomModal customModal={customModal} title={title} onClose={onClose}>
        {children}
      </CustomModal>
    );

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Children')).not.toBeInTheDocument();
  });

  it('calls onClose when StandardModalHeader close button is clicked', () => {
    customModal.isOpen = true;

    renderV3(
      <CustomModal customModal={customModal} title={title} onClose={onClose}>
        {children}
      </CustomModal>
    );

    fireEvent.click(screen.getByLabelText('modalCloseButton'));
    expect(onClose).toHaveBeenCalled();
  });
});
