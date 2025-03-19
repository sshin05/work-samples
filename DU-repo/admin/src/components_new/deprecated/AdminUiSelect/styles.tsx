import styled from '@emotion/styled';
import { colors, spacing, typography } from '@digital-u/digital-ui';
import { ChevronDown, WarningFilled } from '@carbon/icons-react';

export const StyledSelectContainer = styled.div<{ disabled?: boolean }>`
  position: relative;
  align-items: center;
  display: flex;
  color: ${props => (props.disabled ? colors.gray[200] : colors.gray[900])};
`;

export const StyledSelect = styled.select<{
  invalid?: boolean;
}>`
  color: ${colors.gray[900]};
  background-color: ${colors.gray[0]};
  font-size: ${typography.sizes[3.5]};
  appearance: none;
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  cursor: pointer;
  outline: 2px solid transparent;
  outline-offset: -2px;
  display: block;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${colors.gray[400]};
  block-size: 2.5rem;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.32px;
  inline-size: 100%;
  opacity: 1;
  padding-block: 0;
  padding-inline: 1rem 3rem;
  text-overflow: ellipsis;
  transition: outline 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
  outline: ${props => (props.invalid ? `2px solid ${colors.red[800]}` : 0)};

  &:focus {
    color: ${colors.gray[900]};
    outline: 2px solid ${colors.purple[600]};
    outline-offset: -2px;
  }

  &:disabled {
    background-color: ${colors.gray[0]};
    color: ${colors.gray[200]};

    border-block-end-color: transparent;
    cursor: not-allowed;
  }
`;

export const StyledLabel = styled.label`
  color: ${colors.gray[600]};
  font-weight: ${typography.weights.regular};
  font-size: ${typography.sizes[3]};
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const subTextStyles = `
  font-size: ${typography.sizes[3]};
  line-height: 133%;
  letter-spacing: 0.32px;
  margin-top: ${spacing[1]};
`;

export const StyledHelperText = styled.div`
  ${subTextStyles}
  color: ${colors.gray[600]};
`;

export const StyledErrorText = styled.div`
  ${subTextStyles}
  color: ${colors.red[800]};
`;

export const StyledChevronDown = styled(ChevronDown)`
  position: absolute;
  block-size: 100%;
  inset-block-start: 0;
  inset-inline-end: 1rem;
  pointer-events: none;
`;

export const StyledWarningIcon = styled(WarningFilled)`
  color: ${colors.red[800]};
  position: absolute;
  inset-inline-end: 2.5rem;
`;
