import { screen, render, fireEvent } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { DateField } from './DateField';

describe('DateField', () => {
  it('calls on change with the input date', () => {
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
        <DateField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const element = screen.getByLabelText(mockField.name);

    const expectedValue = '2024-11-05';

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
