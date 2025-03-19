import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Text, Flex, colors, typography } from '@digital-u/digital-ui';

const EDITORJS_ROOT_CLASS_NAME = '.DraftEditor-root';
const EDITORJS_PUBLIC_CLASS_NAME = '.public-DraftEditor-content';

interface StyledTextInputProps {
  id: string;
  placeholder?: string;
  disabled: boolean;
  maxLength?: number;
  errorText?: string;
  focus: boolean;
}

interface StyledInputContainerProps {
  width?: string;
  errorText?: string;
  helperText?: string;
}

interface StyledPopoverIconContainerProps {
  popoverOffsetCloseToEnd: boolean;
  popoverOffset: number;
}

const baseStyles = css`
  ${EDITORJS_ROOT_CLASS_NAME} {
    font-size: ${typography.sizes[3.5]};
    font-family: ${typography.fontFamily.ibm};
    font-weight: ${typography.weights.regular};
    line-height: ${typography.sizes[4.5]};
    padding: ${typography.sizes[2.5]} 34px ${typography.sizes[2.5]}
      ${typography.sizes[4]};
    outline: 0;
    background: #f3f2f4;
    width: 100%;
  }

  overflow-x: auto;
  overflow-y: hidden;

  ${EDITORJS_PUBLIC_CLASS_NAME} {
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: pre !important;
  }

  border-bottom: 1px solid ${colors.gray[400]};
`;

const disabledStyles = css`
  .${EDITORJS_ROOT_CLASS_NAME} {
    background: ${colors.gray[0]};
    color: ${colors.gray[200]};
    &::placeholder {
      color: ${colors.gray[200]};
    }
    &:hover {
      cursor: not-allowed;
      background: ${colors.gray[0]};
    }
  }
`;

const errorStyles = css`
  border: 0 !important;
  margin: 0 0 1px 0 !important;
  outline: 2px solid ${colors.red[600]} !important;
`;

// Workaround, EditorJS focus method wasn't working for some reason
const focusStyles = css`
  border: 0 !important;
  margin: 0 0 1px 0 !important;
  outline: ${typography.sizes[0.5]} solid ${colors.purple[600]} !important;
`;

export const StyledEditorWrapper = styled.div<StyledTextInputProps>`
  ${baseStyles}
  ${props => props.errorText && errorStyles}
  ${props => props.disabled && disabledStyles}
  ${props => props.focus && !props.disabled && !props.errorText && focusStyles}
`;

export const StyledHelperText = styled(Text)`
  font-size: ${typography.sizes[3]};
  color: ${colors.gray[600]};
  ${props => props.disabled && `color: ${colors.gray[200]}`}
`;

export const StyledErrorText = styled(Text)`
  font-size: ${typography.sizes[3]};
  color: ${colors.red[600]};
`;

export const StyledInputContainer = styled.div<StyledInputContainerProps>`
  ${props => `
    max-width: ${props.width};
    margin-bottom: ${props.errorText || props.helperText ? `-${typography.sizes[4.5]}` : typography.sizes[0]};
  `}
`;

export const StyledPopoverContainer = styled.div`
  transform: translate(-12px, -29px);
  position: absolute;
  pointer-events: none;
  z-index: 20;
`;

export const StyledPopoverContentContainer = styled(Flex)`
  width: 20rem;
  z-index: 20;
  pointer-events: initial;
`;

export const StyledPopoverIconContainer = styled(
  Flex
)<StyledPopoverIconContainerProps>`
  ${props => `
  width: ${props.popoverOffsetCloseToEnd ? 0 : props.popoverOffset}px;
  min-width: ${typography.sizes[5]};
  pointer-events: none;
  `}
`;

export const StyledLinkInputLink = styled.a`
  color: ${colors.purple[600]};
  text-decoration: underline;
`;
