import { renderV3, screen, fireEvent } from '@@/test-utils';
import { PublishModal } from './PublishModal';

jest.mock('@cerberus/react', () => ({
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit }) => (
    <button onClick={handleSubmit}>Publish</button>
  )
}));

describe('PublishModal', () => {
  const props = {
    title: 'Test Title',
    message: 'Test Message',
    onConfirm: jest.fn()
  };

  it('renders', () => {
    renderV3(<PublishModal {...props} />);

    expect(screen.getByText('Publish')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    renderV3(<PublishModal {...props} />);

    fireEvent.click(screen.getByText('Publish'));
    expect(props.onConfirm).toHaveBeenCalled();
  });
});
