import { css } from '@cerberus/styled-system/css';
import { Controller } from 'react-hook-form';
import { TextField } from './components/TextField/TextField';
import { DateField } from './components/DateField/DateField';
import { BooleanField } from './components/BooleanField/BooleanField';
import { DateTimeField } from './components/DateTimeField/DateTimeField';
import { LongTextField } from './components/LongTextField/LongTextField';
import { ListField } from './components/ListField/ListField';
import { NumberField } from './components/NumberField/NumberField';
import { TimeField } from './components/TimeField/TimeField';
import { UnknownField } from './components/UnknownField/UnknownField';
import { FieldWrapper } from './components/FieldWrapper/FieldWrapper';
import { FORM_INPUT_TYPES } from '../../CustomizationForm.constants';
import type { CustomizationFieldProps } from './components/FieldWrapper/FieldWrapper.types';
import type { DynamicFormFieldProps } from './DynamicFormFields.types';
import { getCohortCustomizationDisplayValue } from '../../utils/getCohortCustomizationDisplayValue';

export const FieldMapping: Record<
  FORM_INPUT_TYPES,
  React.ComponentType<CustomizationFieldProps>
> = {
  [FORM_INPUT_TYPES.TEXT]: TextField,
  [FORM_INPUT_TYPES.DATE]: DateField,
  [FORM_INPUT_TYPES.TIME]: TimeField,
  [FORM_INPUT_TYPES.DATE_TIME]: DateTimeField,
  [FORM_INPUT_TYPES.LONG_TEXT]: LongTextField,
  [FORM_INPUT_TYPES.NUMBER]: NumberField,
  [FORM_INPUT_TYPES.LIST]: ListField,
  [FORM_INPUT_TYPES.BOOLEAN]: BooleanField
};

const isDateField = (fieldType: FORM_INPUT_TYPES) => {
  return [FORM_INPUT_TYPES.DATE, FORM_INPUT_TYPES.DATE_TIME].includes(
    fieldType
  );
};

export const DynamicFormFields = ({
  customizationFields,
  cartItemCohortCustomizations,
  formControl,
  minimumDate
}: DynamicFormFieldProps) => {
  const getControllerProps = ({
    customization
  }: {
    customization: DynamicFormFieldProps['customizationFields'][number];
  }) => ({
    name: customization.name,
    control: formControl,
    defaultValue: getCohortCustomizationDisplayValue(
      customization.name,
      cartItemCohortCustomizations
    ),
    rules: { required: customization.requiredToSubmit || false }
  });

  const sortedCustomizations = customizationFields.sort((fieldA, fieldB) => {
    return fieldA.displayOrder - fieldB.displayOrder;
  }) as typeof customizationFields;

  return (
    <>
      {sortedCustomizations.map((customization, key) => (
        <Controller
          key={key}
          {...getControllerProps({ customization })}
          render={({ field: { ref, ...field }, fieldState }) => {
            const FieldComponent =
              FieldMapping[customization.fieldType] || UnknownField;

            const fieldData = {
              ...customization
            };

            if (isDateField(customization.fieldType) && Boolean(minimumDate)) {
              fieldData.minimumDate = minimumDate;
            }

            return (
              <div
                className={css({
                  my: '4'
                })}
              >
                <FieldWrapper fieldState={fieldState} fieldData={fieldData}>
                  <FieldComponent
                    field={field}
                    fieldState={fieldState}
                    fieldData={fieldData}
                  />
                </FieldWrapper>
              </div>
            );
          }}
        />
      ))}
    </>
  );
};
