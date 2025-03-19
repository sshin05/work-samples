import { render, screen, userEvent } from '@@/test-utils';
import { Modal } from '.';

describe('modal', () => {
  it('should render a empty modal', () => {
    render(<div id="app-root">hello</div>);
    render(
      <Modal title="title" data-testid="emptymodal" onClose={jest.fn()}>
        hi
      </Modal>
    );

    expect(screen.getByText('close')).toBeInTheDocument();
  });

  describe('test click handlers', () => {
    it('should call the onClose handler when the overlay is clicked', () => {
      const onClose = jest.fn();
      render(<div id="app-root" />);
      render(
        <Modal title="title" onClose={onClose}>
          hi
        </Modal>
      );

      const overlay = document.querySelector('#old-modal-div-wrapper');
      userEvent.click(overlay);
      expect(onClose).toHaveBeenCalled();
    });

    it('should call the onClose handler when the close button is clicked', () => {
      const onClose = jest.fn();
      render(<div id="app-root" />);
      render(
        <Modal title="title" onClose={onClose}>
          hi
        </Modal>
      );
      const closeButton = screen.getByText('close');
      closeButton.click();
      expect(onClose).toHaveBeenCalled();
    });
  });
});
