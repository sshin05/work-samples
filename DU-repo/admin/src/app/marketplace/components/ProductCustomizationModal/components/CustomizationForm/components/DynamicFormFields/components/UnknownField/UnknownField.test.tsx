import { screen, render, fireEvent } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { UnknownField } from './UnknownField';

describe('UnknownField', () => {
  it('calls on change input value', () => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name'
    } as unknown as CustomizationFieldProps['field'];
    const fieldData = {
      name: 'Mock Field Name'
    };

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <UnknownField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const element = screen.getByLabelText(mockField.name);

    const expectedValue = 'Short text field input value';

    fireEvent.change(element, { target: { value: expectedValue } });

    expect(mockField.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: expectedValue
        })
      })
    );
  });
});
