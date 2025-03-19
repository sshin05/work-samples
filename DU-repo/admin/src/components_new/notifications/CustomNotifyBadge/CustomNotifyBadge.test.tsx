import { renderV3, screen } from '@@/test-utils';
import { CustomNotifyBadge } from './CustomNotifyBadge';
import { formatNotifyCount } from '@cerberus/react';

jest.mock('@cerberus/react', () => ({
  formatNotifyCount: jest.fn(),
  IconButton: ({ children, onClick, ...props }) => (
    <button {...props} aria-label={props.ariaLabel} onClick={onClick}>
      {children}
    </button>
  ),
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

describe('NotifyBadge', () => {
  it('should render the CustomNotifyBadge when count is provided', () => {
    const count = 5;
    (formatNotifyCount as jest.Mock).mockReturnValue(count.toString());

    renderV3(<CustomNotifyBadge count={count} />);

    const notification = screen.getByLabelText('View notifications');
    expect(notification).toBeInTheDocument();
  });

  it('should not render CustomNotifyBadge when count is null or 0', () => {
    const count = null;
    (formatNotifyCount as jest.Mock).mockReturnValue('0');

    renderV3(<CustomNotifyBadge count={count} />);

    const notification = screen.queryByLabelText('View notifications');
    expect(notification).not.toBeInTheDocument();
  });
});
