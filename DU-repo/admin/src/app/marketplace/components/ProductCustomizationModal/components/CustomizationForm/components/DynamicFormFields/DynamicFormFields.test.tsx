import { type Control, type FieldValues } from 'react-hook-form';
import type { DynamicFormFieldProps } from './DynamicFormFields.types';
import { screen, render } from '@@/test-utils';
import { DynamicFormFields } from './DynamicFormFields';
import { FORM_INPUT_TYPES } from '../../CustomizationForm.constants';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }) => render({ field: {} })
}));

describe('DynamicFormFields', () => {
  const defaultProps = () =>
    ({
      customizationFields: [
        { fieldType: FORM_INPUT_TYPES.TEXT, name: FORM_INPUT_TYPES.TEXT },
        { fieldType: FORM_INPUT_TYPES.DATE, name: FORM_INPUT_TYPES.DATE },
        { fieldType: FORM_INPUT_TYPES.TIME, name: FORM_INPUT_TYPES.TIME },
        {
          fieldType: FORM_INPUT_TYPES.DATE_TIME,
          name: FORM_INPUT_TYPES.DATE_TIME
        },
        {
          fieldType: FORM_INPUT_TYPES.LONG_TEXT,
          name: FORM_INPUT_TYPES.LONG_TEXT
        },
        {
          fieldType: FORM_INPUT_TYPES.NUMBER,
          name: FORM_INPUT_TYPES.NUMBER
        },
        { fieldType: FORM_INPUT_TYPES.LIST, name: FORM_INPUT_TYPES.LIST },
        { fieldType: 'Mock Unknown Type', name: 'Unknown Field' }
      ] as unknown as DynamicFormFieldProps['customizationFields'],
      cartItemCohortCustomizations: [],
      formControl: {} as Control<FieldValues, any>
    }) as DynamicFormFieldProps;

  it('renders form fields', () => {
    const props = defaultProps();
    render(<DynamicFormFields {...props} />);

    props.customizationFields.forEach(customization => {
      const actual = screen.getByLabelText(customization.name);
      expect(actual).toBeInTheDocument();
    });
  });

  it('includes a minimum data value form date inputs', () => {
    const currentDate = '2025-01-06';
    const props = {
      ...defaultProps(),
      minimumDate: currentDate,
      customizationFields: [
        { fieldType: FORM_INPUT_TYPES.DATE, name: FORM_INPUT_TYPES.DATE },
        {
          fieldType: FORM_INPUT_TYPES.DATE_TIME,
          name: FORM_INPUT_TYPES.DATE_TIME
        }
      ]
    } as unknown as DynamicFormFieldProps;

    render(<DynamicFormFields {...props} />);

    props.customizationFields.forEach(customization => {
      const actual = screen.getByLabelText(customization.name);

      expect(actual.getAttribute('min')).toBe(currentDate);
    });
  });
});
