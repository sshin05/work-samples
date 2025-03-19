import { render, screen, fireEvent } from '@@/test-utils';
import AlertEditor from './AlertEditor';

const mockButtonLoading = jest.fn(boolean => boolean);

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Flex: ({ children }) => <div>{children}</div>,
  Text: ({ children }) => <span>{children}</span>,
  Button: ({ disabled, onClick, children, type, loading }) => {
    mockButtonLoading(loading);
    return (
      <button disabled={disabled} onClick={onClick} type={type}>
        {children}
      </button>
    );
  },
  Switch: ({ onChange, value }) => (
    <button onChange={onChange} value={value}>
      Switch
    </button>
  )
}));

jest.mock('@cerberus/react', () => ({
  ConfirmModal: ({ children }) => <div>{children}</div>,
  NotificationCenter: ({ children }) => <div>{children}</div>
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

const mockControllerOnChange = jest.fn();
const mockControllerOnBlur = jest.fn();
const mockControllerDisabled = jest.fn(() => false);
const mockControllerName = jest.fn(() => 'name');
const mockControllerRef = jest.fn(() => ({}));
const mockControllerInvalid = jest.fn(() => false);
const mockControllerIsTouched = jest.fn(() => false);
const mockControllerIsDirty = jest.fn(() => false);
const mockControllerError = jest.fn(() => {});
const mockControllerValue = jest.fn(() => 'value');
const mockControllerValidate = jest.fn(validate =>
  validate?.required(mockControllerValue())
);
const mockControllerRules = jest.fn(rules => {
  const validate = (rules || {}).validate;
  mockControllerValidate(validate);
});

jest.mock('react-hook-form', () => ({
  Controller: ({ render, rules }) => {
    mockControllerRules(rules);

    return (
      <div data-testid="controller-form">
        {render({
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

const mockCheckKeyDown = jest.fn();
jest.mock(
  '@/utils/event-prevent-default-on-return',
  () => () => mockCheckKeyDown
);

jest.mock('@/components/link-input/LinkInput', () => ({
  __esModule: true,
  default: ({ value, onChange, onBlur }) => (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      data-testid="link-input"
    />
  )
}));

jest.mock('@/components_new/modals/ConfirmActionModal', () => ({
  ConfirmActionModal: ({ handleSubmit, disabled }) => (
    <button onClick={handleSubmit} disabled={disabled}>
      Publish
    </button>
  )
}));

const allFields = {
  title: 'title',
  content: 'content',
  canClose: true
};
const edit = true;
const isSubmitting = false;
const isValid = true;
const loading = false;
const buttonIsLoading = false;
const mockControl = jest.fn();
const mockHandleEditChange = jest.fn();
const mockHandleSubmit = jest.fn(func => func());
const mockSetButtonIsLoading = jest.fn();
const mockPublishAlert = jest.fn();

describe('AlertEditor', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render without crashing', () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(
      screen.getByText(
        'The alert banner will appear on all of your learners’ Command Center, and is best used for important messages of which the whole community needs to be aware.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getByText('AlertBannerClose')).toBeInTheDocument();
    expect(screen.getByText('Alert Title (optional)')).toBeInTheDocument();
    expect(screen.getByText('5/100')).toBeInTheDocument();
    expect(screen.getByTestId('link-input')).toBeInTheDocument();
    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByText('Allow user to dismiss alert')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should call handleSubmit correctly when form is submitted', async () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    fireEvent.click(screen.getByText('Publish'));

    expect(mockHandleSubmit).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call validate function properly, when value is not empty', async () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(mockControllerRules).toHaveBeenCalledTimes(3);
    expect(mockControllerValidate).toHaveBeenCalledTimes(3);
    expect(mockControllerValidate.mock.results[0].value).toBe(undefined);
    expect(mockControllerValidate.mock.results[1].value).toBe(undefined);
    expect(mockControllerValidate.mock.results[2].value).toBe(undefined);
  });

  it('should call validate function properly, when value is empty', async () => {
    mockControllerValue.mockImplementationOnce(() => '<p></p>\n');
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(mockControllerRules).toHaveBeenCalledTimes(3);
    expect(mockControllerValidate).toHaveBeenCalledTimes(3);
    expect(mockControllerValidate.mock.results[0].value).toBe(undefined);
    expect(mockControllerValidate.mock.results[1].value).toBe(
      'Alert content is required'
    );
    expect(mockControllerValidate.mock.results[2].value).toBe(undefined);
  });

  it('should call handleEditChange properly when edit button is clicked', () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockSetButtonIsLoading).toHaveBeenCalledWith(true);
    expect(mockHandleEditChange).toHaveBeenCalledWith(false);
  });

  it('should show InlineLoading and disable Publish and Cancel when loading is true and buttonLoading is false', () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={true}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(screen.getByText('InlineLoading')).toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeDisabled();
    expect(screen.getByText('Cancel')).toBeDisabled();
    expect(mockButtonLoading).toHaveBeenLastCalledWith(false);
  });

  it('should show buttonLoading and not Inline loading when buttonLoading is set to true and loading is set to true', () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={edit}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={true}
        buttonIsLoading={true}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(screen.queryByText('InlineLoading')).not.toBeInTheDocument();
    expect(screen.getByText('Publish')).toBeDisabled();
    expect(screen.getByText('Cancel')).toBeDisabled();
    expect(mockButtonLoading).toHaveBeenLastCalledWith(true);
  });

  it('should not show Cancel button when edit is false (no preview available)', () => {
    render(
      <AlertEditor
        allFields={allFields}
        edit={false}
        isSubmitting={isSubmitting}
        isValid={isValid}
        loading={loading}
        buttonIsLoading={buttonIsLoading}
        control={mockControl}
        handleEditChange={mockHandleEditChange}
        handleSubmit={mockHandleSubmit}
        handlePublishAlert={mockPublishAlert}
        setButtonIsLoading={mockSetButtonIsLoading}
      />
    );

    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
