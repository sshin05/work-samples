import BannerForm from '../../src/components/settings-banner/BannerForm';
import { fireEvent, render, screen } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <div>{children}</div>,
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock(
  '../../src/components/settings-banner/banner-card/BannerImagePreviewer',
  () => () => <div>Logo Image</div>
);

jest.mock(
  '../../src/components/settings-banner/image-upload/ImageUploadModal',
  () =>
    ({ onClose, submitImage }) => (
      <>
        <span>Upload your logo</span>
        <button onClick={onClose}>Cancel</button>
        <button onClick={() => submitImage(file)}>Drop</button>
      </>
    )
);

jest.mock('@carbon/icons-react', () => ({
  Upload: () => <div>Upload</div>,
  WarningFilled: () => <div>WarningFilled</div>
}));

const file = new File(['hello'], 'hello.png', { type: 'image/png' });
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

const allFields = {
  title: '',
  body: '',
  buttonLink: '',
  logo: '',
  buttonText: ''
};

describe('banner-form', () => {
  beforeEach(() => jest.clearAllMocks());
  it('should render a banner card', () => {
    render(
      <BannerForm
        control={jest.fn()}
        allFields={allFields}
        setValue={jest.fn()}
      />
    );
    expect(screen.getByText('Card Title*')).toBeInTheDocument();
    expect(screen.getByText('Body Copy*')).toBeInTheDocument();
    expect(screen.getByText('Button Copy*')).toBeInTheDocument();
    expect(screen.getByText('Button Link*')).toBeInTheDocument();
    expect(screen.getByText('Logo*')).toBeInTheDocument();
    expect(screen.getByText('Change Logo')).toBeInTheDocument();
    expect(
      screen.getByText('Accepted file types: JPEG, PNG, and GIF')
    ).toBeInTheDocument();
    expect(screen.getByText('Maximum size: 180px × 100px')).toBeInTheDocument();
  });
  it('should add an image to the form on the image upload modal', () => {
    const mockSetValue = jest.fn();

    render(
      <BannerForm
        control={jest.fn()}
        allFields={allFields}
        setValue={mockSetValue}
      />
    );
    fireEvent.click(screen.getByText(/Change Logo/));
    expect(screen.getByText('Upload your logo')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Drop'));
    expect(mockSetValue).toHaveBeenCalledWith('logo', file, {
      shouldValidate: true
    });
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Upload your logo')).not.toBeInTheDocument();
  });
  it('should show correct count when allfields is populated', () => {
    allFields.title = 'title';
    allFields.body = 'description';
    allFields.buttonText = 'buttonText';
    render(
      <BannerForm
        control={jest.fn()}
        allFields={allFields}
        setValue={jest.fn()}
      />
    );
    expect(screen.getByText('5/50')).toBeInTheDocument();
    expect(screen.getByText('11/100')).toBeInTheDocument();
    expect(screen.getByText('10/15')).toBeInTheDocument();
  });
});
