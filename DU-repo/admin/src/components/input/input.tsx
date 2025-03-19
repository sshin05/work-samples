import React, { forwardRef } from 'react';
import { Input as ThemeInput } from 'theme-ui';

// Define the VariantMap type
type VariantMap = {
  default: {
    dark: string;
    light: string;
  };
  success: {
    dark: string;
    light: string;
  };
  error: {
    dark: string;
    light: string;
  };
};

// Map of variants
const VARIANT_MAP: VariantMap = {
  default: {
    dark: 'darkInput',
    light: 'lightInput'
  },
  success: {
    dark: 'successInput',
    light: 'successInput'
  },
  error: {
    dark: 'errorInput',
    light: 'errorInput'
  }
};

interface InputProps {
  name: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  context?: 'dark' | 'light';
  state?: keyof VariantMap;
  accept?: string;
  placeholder?: string;
  sx?: Record<string, unknown>;
  [x: string]: unknown;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type,
      context = 'dark',
      state = 'default',
      accept,
      placeholder,
      sx,
      ...props
    }: InputProps,
    ref
  ) => {
    const variant = VARIANT_MAP[state][context];

    return (
      <ThemeInput
        placeholder={placeholder}
        name={name}
        ref={ref}
        type={type}
        accept={accept}
        variant={variant}
        sx={{
          fontFamily: 'input',
          fontWeight: 'medium',
          borderRadius: '0',
          '&:hover, &:focus, &:active': {
            outline: 'none'
          },
          ...sx
        }}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
