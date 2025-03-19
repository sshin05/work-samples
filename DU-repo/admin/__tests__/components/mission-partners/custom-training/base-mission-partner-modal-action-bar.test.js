import { render, screen, userEvent } from '@@/test-utils';
import MissionPartnerModalActionBar from '../../../../src/components/manage-mission-partners/custom-training/BaseMissionPartnerModalActionBar';

describe('MissionPartnerModalActionBar', () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('should render', () => {
    render(
      <MissionPartnerModalActionBar
        onClose={onClose}
        onSubmit={onSubmit}
        actionText="action text"
      />
    );

    expect(screen.getByText('action text')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();

    userEvent.click(screen.getByText('action text'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should render with loading', () => {
    render(
      <MissionPartnerModalActionBar
        onClose={onClose}
        onSubmit={onSubmit}
        actionText="action text"
        loading
      />
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));
    expect(onClose).not.toHaveBeenCalled();

    userEvent.click(screen.getByText('Loading'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should render with disabled', () => {
    render(
      <MissionPartnerModalActionBar
        onClose={onClose}
        onSubmit={onSubmit}
        actionText="action text"
        disabled
      />
    );

    expect(screen.getByText('action text')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();

    userEvent.click(screen.getByText('action text'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
