import { css } from '@cerberus/styled-system/css';

export const backButtonStyles = css({
  color: 'secondaryAction.navigation.initial',
  width: 'fit-content',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
});
