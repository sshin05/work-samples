import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';

export const styledToolbarWrapper = css({
  marginTop: 4,
  marginBottom: 2,
  minW: '39rem',
  borderRadius: 1
});

export const styledSearchToolbarContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: 4,
  w: 'full',
  h: '3rem'
});

export const buttonWrapper = hstack({
  marginLeft: 'auto',
  gap: 2
});

export const styledEditToolbarContainer = css({
  display: 'flex',
  bg: 'page.bg.initial',
  p: 4,
  h: '3rem'
});

export const editText = css({
  justifyItems: 'center',
  fontWeight: '600',
  color: 'page.text.200'
});

export const removeIcon = css({
  color: 'danger.bg.initial',
  cursor: 'pointer',
  '&:hover': {
    bgColor: 'transparent',
    color: 'danger.bg.hover'
  }
});

export const removeActionButton = css({
  color: 'danger.bg.initial',
  pr: 4,
  pl: 0,
  '&:hover': {
    bgColor: 'transparent',
    color: 'danger.bg.hover'
  }
});

export const cancelActionButton = css({
  pr: 6,
  pl: 4,
  '&:hover': {
    bgColor: 'transparent',
    color: 'action.bg.hover'
  }
});

export const searchContainer = css({
  display: 'flex',
  alignItems: 'center',
  minW: '18.75rem',
  minH: '2.75rem',
  mb: 3
});

export const inputStyles = css({
  width: 'clamp(18.75rem, 30vw, 32.75rem)'
});

export const dropdownTextButton = css({
  lineHeight: '21px'
});

export const styledAddButton = css({
  maxH: '2.75rem'
});

export const hstackContainer = hstack({
  pos: 'relative'
});

// TODO: in the next cerb release(0.12.0), use the blanket Menu component
export const dropdownContainer = css({
  pos: 'absolute',
  direction: 'column',
  right: 0,
  top: '100%',
  w: '20rem',
  h: '4.313 rem',
  zIndex: 9999,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  bgColor: 'page.bg.initial',
  paddingY: 2,
  paddingX: 4,
  gap: 2
});

export const filterDropdownContainer = hstack({
  w: 'full',
  h: 'full',
  gap: 2,
  justifyContent: 'flex-start',
  bgColor: 'page.bg.initial',
  borderBottom: '1px solid var(--cerberus-colors-page-border-200)',
  p: 6
});

export const filterDropdownResponsive = vstack({
  w: 'full',
  h: 'full',
  gap: 2,
  borderBottom: '1px solid var(--cerberus-colors-page-border-200)',
  p: 6
});

export const filterButtons = hstack({
  gap: 4,
  w: 'full',
  h: 'full',
  justifyContent: 'flex-end'
});

export const filterButtonsResponsive = hstack({
  gap: 4,
  w: 'full',
  h: 'full',
  justifyContent: 'flex-start',
  paddingTop: 4
});
