import { screen, render, fireEvent } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { LongTextField } from './LongTextField';

describe('LongTextField', () => {
  it('calls on change with the input string value', () => {
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
        <LongTextField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const element = screen.getByLabelText(mockField.name);

    const expectedValue = 'long text field input';

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
