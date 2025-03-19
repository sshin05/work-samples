import { useForm } from 'react-hook-form';
import { hstack } from '@cerberus/styled-system/patterns';
import { Button, Spinner } from '@cerberus/react';
import { DynamicFormFields } from './DynamicFormFields/DynamicFormFields';
import type { CustomizationFormProps } from '../CustomizationForm.types';
import { css } from '@cerberus/styled-system/css';
import { useEffect } from 'react';

export const CustomizationForm = ({
  customizationFields,
  cartItemCohortCustomizations,
  onClose,
  onSubmit,
  onCartItemRemoval,
  submitText
}: CustomizationFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, submitCount }
  } = useForm();

  useEffect(() => {
    reset();
  }, [customizationFields, cartItemCohortCustomizations, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    reset();
  }, [reset, submitCount]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DynamicFormFields
        customizationFields={customizationFields}
        cartItemCohortCustomizations={cartItemCohortCustomizations}
        formControl={control}
        minimumDate={new Date().toISOString().split('T')[0]}
      />

      <div
        className={hstack({
          mt: '8'
        })}
      >
        <Button
          disabled={isSubmitting}
          palette="action"
          usage="filled"
          type="submit"
        >
          {isSubmitting && <Spinner size="1em" />}
          {submitText}
        </Button>
        <Button usage="outlined" onClick={handleClose} type="button">
          Cancel
        </Button>

        {onCartItemRemoval && (
          <Button
            palette="danger"
            usage="ghost"
            className={css({ ml: 'auto' })}
            onClick={e => {
              e.preventDefault();
              onCartItemRemoval();
            }}
          >
            Remove from Cart
          </Button>
        )}
      </div>
    </form>
  );
};
