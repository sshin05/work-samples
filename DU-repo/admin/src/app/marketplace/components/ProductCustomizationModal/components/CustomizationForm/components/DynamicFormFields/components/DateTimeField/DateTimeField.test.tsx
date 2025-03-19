import { screen, render, fireEvent } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { DateTimeField } from './DateTimeField';

describe('DateTimeField', () => {
  it('calls on change with the input date/time value', () => {
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
        <DateTimeField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const element = screen.getByLabelText(mockField.name);

    const expectedValue = '2024-11-05T14:30';

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
