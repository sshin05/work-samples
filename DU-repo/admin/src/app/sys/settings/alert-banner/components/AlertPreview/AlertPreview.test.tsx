import { render, screen, fireEvent } from '@@/test-utils';
import AlertPreview from './AlertPreview';

const mockButtonLoading = jest.fn(boolean => boolean);

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ disabled, onClick, children, loading }) => {
    mockButtonLoading(loading);
    return (
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  }
}));

jest.mock('@cerberus/react', () => ({
  useConfirmModal: jest.fn(() => ({
    show: jest.fn().mockReturnValue(true)
  })),
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit, disabled }) => (
    <button onClick={handleSubmit} disabled={disabled}>
      Remove
    </button>
  )
}));

jest.mock('@/components_new/deprecated/InlineLoading', () => ({
  InlineLoading: () => <div>InlineLoading</div>
}));

const mockAlertBannerNotification = jest.fn((title, subtitle, canClose) => (
  <>
    <span>{title}</span>
    <div>{subtitle}</div>
    {canClose && <div>AlertBannerClose</div>}
  </>
));

jest.mock(
  '@/components/alert-banner-notification/AlertBannerNotification',
  () =>
    ({ heading, subheading, canClose }) =>
      mockAlertBannerNotification(heading, subheading, canClose)
);

const alertBannerContent = {
  title: 'title',
  content: 'content',
  isDismissable: true
};
const loading = false;
const buttonIsLoading = false;
const mockHandleEditChange = jest.fn();
const mockSetButtonIsLoading = jest.fn();
const mockHandleRemoveAlert = jest.fn();

describe('AlertPreview', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render AlertPreview without crashing', () => {
    render(
      <AlertPreview
        alertBannerContent={alertBannerContent}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        handleEditChange={mockHandleEditChange}
        handleRemoveAlert={mockHandleRemoveAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(
      screen.getByText(
        'The following alert is active on the Command Center for all learners.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByText('AlertBannerClose')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should call handleRemoveAlert in modal', () => {
    render(
      <AlertPreview
        alertBannerContent={alertBannerContent}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        handleEditChange={mockHandleEditChange}
        handleRemoveAlert={mockHandleRemoveAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    fireEvent.click(screen.getByText('Remove'));

    expect(mockHandleRemoveAlert).toHaveBeenCalled();
  });

  it('should call handleEditChange with true when edit is clicked', () => {
    render(
      <AlertPreview
        alertBannerContent={alertBannerContent}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        handleEditChange={mockHandleEditChange}
        handleRemoveAlert={mockHandleRemoveAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(mockSetButtonIsLoading).toHaveBeenCalledWith(true);
    expect(mockHandleEditChange).toHaveBeenCalledWith(true);
  });

  it('should show InlineLoading and disable Remove and Edit when loading is set to true and buttonIsLoading is false', () => {
    render(
      <AlertPreview
        alertBannerContent={alertBannerContent}
        loading={true}
        buttonIsLoading={buttonIsLoading}
        handleEditChange={mockHandleEditChange}
        handleRemoveAlert={mockHandleRemoveAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(screen.getByText('InlineLoading')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeDisabled();
    expect(screen.getByText('Edit')).toBeDisabled();
    expect(mockButtonLoading).toHaveBeenLastCalledWith(false);
  });

  it('should show buttonLoading and not InlineLoading and disable Remove and Edit when loading is set to true and buttonIsLoading is true', () => {
    render(
      <AlertPreview
        alertBannerContent={alertBannerContent}
        loading={true}
        buttonIsLoading={true}
        handleEditChange={mockHandleEditChange}
        handleRemoveAlert={mockHandleRemoveAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(screen.queryByText('InlineLoading')).not.toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeDisabled();
    expect(screen.getByText('Edit')).toBeDisabled();
    expect(mockButtonLoading).toHaveBeenLastCalledWith(true);
  });
});
