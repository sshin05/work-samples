import { screen, render } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { BooleanField } from './BooleanField';

describe('BooleanField', () => {
  const fieldData = {
    name: 'Mock Field Name'
  };

  it.each(['', 'true'])('renders in a checked state', fieldValue => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name',
      value: fieldValue
    } as unknown as CustomizationFieldProps['field'];

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <BooleanField field={mockField} />
      </FieldWrapper>
    );

    const toggle = screen.getByTestId(mockField.name);

    expect((toggle as HTMLInputElement).checked).toBe(true);
  });

  it('renders in an unchecked state', () => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name',
      value: 'false'
    } as unknown as CustomizationFieldProps['field'];

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <BooleanField field={mockField} />
      </FieldWrapper>
    );

    const toggle = screen.getByTestId(mockField.name);

    expect((toggle as HTMLInputElement).checked).toBe(false);
  });

  it('calls on change when toggled', () => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name',
      value: ''
    } as unknown as CustomizationFieldProps['field'];

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <BooleanField field={mockField} />
      </FieldWrapper>
    );

    const toggle = screen.getByTestId(mockField.name);

    expect((toggle as HTMLInputElement).checked).toBe(true);

    toggle.click();

    expect((toggle as HTMLInputElement).checked).toBe(false);
    expect(mockField.onChange).toHaveBeenCalled();
  });
});
