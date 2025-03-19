import { renderV3, screen } from '@@/test-utils';
import { LibraryItemFormFields } from './LibraryItemFormFields';
import { useForm } from 'react-hook-form';

jest.mock('@cerberus/react', () => ({
  NotificationCenter: ({ children }) => <div>{children}</div>,
  Field: ({ children }) => <div>{children}</div>,
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>,
  Option: ({ children, value, disabled, hidden }) => (
    <option value={value} disabled={disabled} hidden={hidden}>
      {children}
    </option>
  ),
  Select: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/form', () => ({
  TextInput: ({ onClick, label }) => (
    <div onClick={onClick}>
      <label>{label}</label>
    </div>
  ),
  FieldSelect: ({ label, onChange }) => (
    <div onClick={onChange}>
      <label>{label}</label>
    </div>
  )
}));

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    control: { setValue: jest.fn() },
    formState: { errors: {} },
    register: jest.fn()
  })),
  Controller: ({ render, rules }) => (
    <div>
      {render({ field: {}, fieldState: {} })}
      <div>{rules.validate ? rules.validate() : ''}</div>
    </div>
  )
}));

describe('LibraryItemFormFields', () => {
  beforeEach(() => {
    (useForm as jest.Mock).mockImplementation(() => ({
      handleSubmit: jest.fn(),
      control: {},
      formState: {
        errors: {},
        isDirty: true,
        isSubmitting: false,
        isValid: true
      },
      watch: jest.fn()
    }));
  });

  it('renders correctly', () => {
    renderV3(
      <LibraryItemFormFields
        control={{}}
        disabled={false}
        loading={false}
        activeUploadTab={jest.fn()}
      />
    );

    expect(screen.getByText('Display name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
  });
});
