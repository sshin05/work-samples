import { css } from '@cerberus/styled-system/css';

export const linkStyles = css({
  color: 'action.navigation.initial',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  },
  '&:focus': {
    textDecoration: 'underline',
    color: 'action.navigation.hover'
  },
  '&:active': {
    color: 'action.navigation.visited'
  },
  textOverflow: 'ellipsis',
  overflowX: 'clip',
  whiteSpace: 'nowrap'
});
