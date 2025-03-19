import { screen, render, fireEvent } from '@@/test-utils';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';
import type {
  CustomizationFieldProps,
  FieldWrapperProps
} from '../FieldWrapper/FieldWrapper.types';
import { ListField } from './ListField';

describe('ListField', () => {
  const fieldData = {
    name: 'Mock Field Name',
    listOptions: ['option-0', 'option-1']
  };

  it('calls on change with the selected option', () => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name'
    } as unknown as CustomizationFieldProps['field'];

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <ListField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: 'option-1' } });

    expect(mockField.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'option-1'
        })
      })
    );
  });

  it('renders with the selected value', () => {
    const mockField = {
      onChange: jest.fn(),
      name: 'Mock Field Name',
      value: 'option-1'
    } as unknown as CustomizationFieldProps['field'];

    render(
      <FieldWrapper
        fieldState={{} as FieldWrapperProps['fieldState']}
        fieldData={fieldData}
      >
        <ListField field={mockField} fieldData={fieldData} />
      </FieldWrapper>
    );

    const selectElement = screen.getByRole('combobox');

    expect((selectElement as HTMLSelectElement).value).toBe('option-1');
  });
});
