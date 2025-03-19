import { Field, Label, Radio } from '@cerberus/react';
import { hstack } from '@cerberus/styled-system/patterns';
import { FORM_TYPES } from '../../UploadFileModal.types';

type FormTypeSelectorProps = {
  selectedFormType: FORM_TYPES;
  onChange: (formType: FORM_TYPES) => void;
};

/** Allows user to toggle form between the "upload" and "link" options */
export const FormTypeSelector = ({
  selectedFormType,
  onChange
}: FormTypeSelectorProps) => {
  const handleFormChange = (event): void => {
    onChange(event.target.value);
  };

  return (
    <fieldset
      className={hstack({
        gap: '4',
        rounded: 'xl',
        mb: 4
      })}
      name="sizes"
      role="radiogroup"
      onChange={handleFormChange}
    >
      <Field>
        <Radio
          id="sm"
          name="sizes"
          value={FORM_TYPES.UPLOAD}
          defaultChecked={selectedFormType === FORM_TYPES.UPLOAD}
        >
          <Label htmlFor="sm">Upload File</Label>
        </Radio>
      </Field>

      <Field>
        <Radio
          id="md"
          name="sizes"
          value={FORM_TYPES.LINK}
          defaultChecked={selectedFormType === FORM_TYPES.LINK}
        >
          <Label htmlFor="md">Add a Link</Label>
        </Radio>
      </Field>
    </fieldset>
  );
};
