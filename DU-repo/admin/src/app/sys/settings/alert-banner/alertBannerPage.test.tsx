import AlertBanner from './page';
import { renderV3, screen, fireEvent, waitFor } from '@@/test-utils';
import { useContent } from '@/api/content';

const mockRefetchContent = jest.fn();
const mockUpdateAlertBanner = jest.fn();
const mockRemoveAlertBanner = jest.fn();
const mockContentLoading = jest.fn(() => false);
const mockContent = jest.fn(() => ({
  title: 'title',
  content: '<p>content</p>',
  isDismissable: true
}));

const mockUseContent = jest.fn(() => ({
  refetchContent: mockRefetchContent,
  content: mockContent(),
  contentError: false,
  contentLoading: mockContentLoading()
}));

jest.mock('@/api/content', () => ({
  useContent: jest.fn(),
  useUpdateAlertBanner: () => ({
    updateAlertBanner: (title, content, isDismissable) =>
      mockUpdateAlertBanner(title, content, isDismissable),
    updateAlertBannerError: false,
    updateAlertBannerLoading: false
  }),
  useRemoveAlertBanner: () => ({
    removeAlertBanner: mockRemoveAlertBanner,
    removeAlertBannerError: false,
    removeAlertBannerLoading: false
  })
}));

const mockSetToast = jest.fn();

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Page: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ disabled, onClick, children }) => {
    return (
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  },
  Breadcrumbs: () => <div>Breadcrumbs</div>,

  Switch: ({ onChange, value }) => (
    <button onChange={onChange} value={value} data-testid="switch" />
  ),
  useToast: jest.fn(() => [jest.fn(), mockSetToast])
}));

jest.mock('@/components_new/deprecated/InlineLoading', () => ({
  __esModule: true,
  default: () => <div>InlineLoading</div>
}));

jest.mock('@/components_new/loaders', () => ({
  BaseSkeleton: () => <div>BaseSkeleton</div>
}));

const mockWatch = jest.fn(() => ({
  title: 'title',
  content: '<p>content</p>',
  canClose: true
}));
const mockReset = jest.fn();
const mockHandleSubmit = jest.fn(func => func);
const mockSetValue = jest.fn(() => true);
const mockControl = jest.fn(() => ({}));
const mockFormState = jest.fn(() => ({
  isSubmitting: false,
  isValid: true
}));

const mockUseForm = jest.fn(() => ({
  watch: mockWatch,
  reset: mockReset,
  handleSubmit: mockHandleSubmit,
  setValue: () => mockSetValue(),
  control: mockControl,
  formState: mockFormState()
}));

const mockControllerOnChange = jest.fn();
const mockControllerOnBlur = jest.fn();
const mockControllerDisabled = jest.fn(() => false);
const mockControllerName = jest.fn(() => 'name');
const mockControllerRef = jest.fn(() => ({}));
const mockControllerInvalid = jest.fn(() => false);
const mockControllerIsTouched = jest.fn(() => false);
const mockControllerIsDirty = jest.fn(() => false);
const mockControllerError = jest.fn(() => ({}));
const mockControllerValue = jest.fn(() => 'value');
const mockControllerValidate = jest.fn(validate =>
  validate?.required(mockControllerValue())
);
const mockControllerRules = jest.fn(rules => {
  const validate = (rules || {}).validate;
  mockControllerValidate(validate);
});

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => mockUseForm()),
  Controller: ({ renderV3, rules }) => {
    mockControllerRules(rules);

    return (
      <div data-testid="controller-form">
        {renderV3({
          field: {
            onChange: mockControllerOnChange,
            onBlur: mockControllerOnBlur,
            value: mockControllerValue,
            disabled: mockControllerDisabled,
            name: mockControllerName,
            ref: mockControllerRef
          },
          fieldState: {
            invalid: mockControllerInvalid,
            isTouched: mockControllerIsTouched,
            isDirty: mockControllerIsDirty,
            error: mockControllerError
          }
        })}
      </div>
    );
  }
}));

jest.mock('../../../../components/link-input/LinkInput', () => {
  const LinkInput = ({ value, onChange, onBlur }) => (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      data-testid="link-input"
    />
  );
  LinkInput.displayName = 'LinkInput';
  return LinkInput;
});

const mockAlertBannerNotification = jest.fn((title, subtitle, canClose) => (
  <>
    <span>{title}</span>
    <div>{subtitle}</div>
    {canClose && <div>AlertBannerClose</div>}
  </>
));

jest.mock(
  '../../../../components/alert-banner-notification/AlertBannerNotification',
  () =>
    ({ title, subtitle, canClose }) =>
      mockAlertBannerNotification(title, subtitle, canClose)
);

const mockCheckKeyDown = jest.fn();
jest.mock('@/utils/event-prevent-default-on-return', () => ({
  eventPreventDefaultOnReturn: () => mockCheckKeyDown()
}));

jest.mock('./components/AlertPreview/AlertPreview', () => {
  const AlertPreview = ({ handleEditChange, handleRemoveAlert, loading }) => (
    <>
      <button onClick={handleEditChange}>HandleEditChange</button>
      <button onClick={handleRemoveAlert}>Remove</button>
      <div>AlertPreview</div>
      {loading && <div>AlertPreviewLoading</div>}
    </>
  );
  AlertPreview.displayName = 'AlertPreview';
  return AlertPreview;
});

jest.mock('./components/AlertEditor/AlertEditor', () => {
  const AlertEditor = ({ handleEditChange, handlePublishAlert, loading }) => (
    <>
      <button onClick={handleEditChange}>HandleEditChange</button>
      <button onClick={handlePublishAlert}>Publish</button>
      <div>AlertEditor</div>
      {loading && <div>AlertEditorLoading</div>}
    </>
  );
  AlertEditor.displayName = 'AlertEditor';
  return AlertEditor;
});

describe('AlertBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useContent as jest.Mock).mockImplementation(mockUseContent);
  });

  it('should render AlertBanner properly without crashing', () => {
    renderV3(<AlertBanner />);

    expect(screen.getByText('Breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('AlertPreview')).toBeInTheDocument();
    expect(mockUseContent).toHaveBeenCalledWith('alert-banner');
  });

  it('should navigate to editor page properly', async () => {
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('HandleEditChange'));

    await waitFor(() =>
      expect(screen.getByText('AlertPreviewLoading')).toBeInTheDocument()
    );

    expect(mockRefetchContent).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledTimes(3);
    expect(mockSetValue).toHaveBeenCalledWith();
    expect(mockSetValue).toHaveBeenCalledWith();
    expect(mockSetValue).toHaveBeenCalledWith();

    await waitFor(() => {
      expect(screen.getByText('AlertEditor')).toBeInTheDocument();
      expect(screen.queryByText('AlertEditorLoading')).not.toBeInTheDocument();
    });
  });

  it('should Remove Alert Banner properly', async () => {
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(mockRemoveAlertBanner).toHaveBeenCalledTimes(1);
      expect(mockSetToast).toHaveBeenCalledWith({
        title: 'Success',
        subtitle: 'The Alert Banner is no longer visible to DU learners',
        variant: 'light',
        kind: 'success'
      });
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockRefetchContent).toHaveBeenCalledTimes(1);
      expect(mockSetValue).not.toHaveBeenCalled();
      expect(mockSetValue).not.toHaveBeenCalled();
      expect(mockSetValue).not.toHaveBeenCalled();
    });
  });

  it('should Publish Alert Banner properly', async () => {
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('HandleEditChange'));

    await waitFor(() =>
      expect(screen.getByText('AlertEditor')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Publish'));

    await waitFor(() => {
      expect(mockUpdateAlertBanner).toHaveBeenCalledWith(
        'title',
        '<p>content</p>',
        true
      );
      expect(mockSetToast).toHaveBeenCalledWith({
        title: 'Success',
        subtitle: 'Your alert is now visible to all DU learners.',
        variant: 'light',
        kind: 'success'
      });
      expect(mockReset).toHaveBeenCalledTimes(1);
      expect(mockRefetchContent).toHaveBeenCalledTimes(2);
      expect(mockSetValue).toHaveBeenCalledTimes(6);
      expect(mockSetValue).toHaveBeenCalledWith();
      expect(mockSetValue).toHaveBeenCalledWith();
      expect(mockSetValue).toHaveBeenLastCalledWith();
    });
  });

  it('should show error when Refetch Content fails', async () => {
    mockRefetchContent.mockRejectedValueOnce(() => 'failure');
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('HandleEditChange'));

    await waitFor(() =>
      expect(screen.getByText('AlertEditor')).toBeInTheDocument()
    );

    expect(mockSetToast).toHaveBeenCalledWith({
      title: 'Error',
      subtitle: 'There was an error refetching the Global Banner',
      variant: 'light',
      kind: 'error'
    });
  });

  it('should show error when Remove Banner fails', async () => {
    mockRemoveAlertBanner.mockRejectedValueOnce(() => 'failure');
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('Remove'));

    await waitFor(() => {
      expect(mockSetToast).toHaveBeenCalledWith({
        title: 'Error',
        subtitle: 'There was an error refetching the Alert Banner',
        variant: 'light',
        kind: 'error'
      });
      expect(mockSetToast).toHaveBeenCalledTimes(1);
      expect(mockReset).not.toHaveBeenCalled();
      expect(mockRefetchContent).not.toHaveBeenCalled();
      expect(mockSetValue).not.toHaveBeenCalled();
    });
  });

  it('should show error when Publish Banner fails', async () => {
    mockUpdateAlertBanner.mockRejectedValueOnce(() => 'failure');
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('HandleEditChange'));

    await waitFor(() =>
      expect(screen.getByText('AlertEditor')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Publish'));

    await waitFor(() => {
      expect(mockSetToast).toHaveBeenCalledWith({
        title: 'Error',
        subtitle: 'There was an error updating the Global Banner',
        variant: 'light',
        kind: 'error'
      });
      expect(mockSetToast).toHaveBeenCalledTimes(1);
      expect(mockReset).not.toHaveBeenCalled();
      expect(mockRefetchContent).toHaveBeenCalledTimes(1);
      expect(mockSetValue).toHaveBeenCalledTimes(3);
    });
  });

  it('should show skeleton when content is loading', () => {
    mockContentLoading.mockImplementationOnce(() => true);
    renderV3(<AlertBanner />);

    expect(screen.getByText('BaseSkeleton')).toBeInTheDocument();
    expect(screen.queryByText('AlertPreview')).not.toBeInTheDocument();
    expect(screen.queryByText('AlertEditor')).not.toBeInTheDocument();
  });

  it('should return empty default values when content is empty', async () => {
    // @ts-expect-error supposed to be undefined
    mockContent.mockImplementationOnce(() => ({}));
    renderV3(<AlertBanner />);

    fireEvent.click(screen.getByText('HandleEditChange'));

    await waitFor(() =>
      expect(screen.getByText('AlertEditor')).toBeInTheDocument()
    );

    expect(mockSetValue).toHaveBeenCalledWith();
  });

  it('should show AlertEditor when content is empty', () => {
    // @ts-expect-error supposed to be undefined
    mockContent.mockImplementationOnce(() => ({}));
    renderV3(<AlertBanner />);

    expect(screen.getByText('AlertEditor')).toBeInTheDocument();
  });
});
