import type { ReactNode } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues
} from 'react-hook-form';

export type CustomizationFieldProps = {
  field: Omit<ControllerRenderProps<FieldValues, string>, 'ref'>;
  fieldState?: ControllerFieldState;
  fieldData: any; // TODO: Define this type from the api
};

export type FieldWrapperProps = Omit<CustomizationFieldProps, 'field'> & {
  children: ReactNode;
};
