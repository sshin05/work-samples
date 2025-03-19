import React from 'react';

import AdminUiSelectOptions from './AdminUiSelectOptions';
import {
  StyledSelectContainer,
  StyledErrorText,
  StyledHelperText,
  StyledLabel,
  StyledSelect,
  StyledWarningIcon,
  StyledChevronDown
} from './styles';
import type { AdminUiSelectProps } from './AdminUiSelect.types';

/**
 *
 * @deprecated
 *
 * The component has been deprecated in favor of the Cerberus component library and styling system.
 *
 */
export const AdminUiSelect = (props: AdminUiSelectProps) => {
  const {
    className,
    options = [],
    id,
    label,
    helperText,
    disabled = false,
    invalid = false,
    invalidText = ''
  } = props;

  return (
    <div className={className}>
      {!!label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledSelectContainer disabled={disabled}>
        <StyledSelect
          id={id}
          value={props.value}
          onChange={props.onChange}
          disabled={disabled}
          invalid={invalid}
        >
          <AdminUiSelectOptions options={options} />
        </StyledSelect>
        <StyledChevronDown />
        {invalid && <StyledWarningIcon />}
      </StyledSelectContainer>
      {!!helperText && <StyledHelperText>{helperText}</StyledHelperText>}
      {invalid && invalidText && (
        <StyledErrorText>{invalidText}</StyledErrorText>
      )}
    </div>
  );
};
