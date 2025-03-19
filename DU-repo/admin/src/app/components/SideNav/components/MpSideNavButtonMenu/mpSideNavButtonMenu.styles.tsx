import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

export const triggerButtonStyles = hstack({
  bgColor: 'page.surface.100',
  border: '1px solid',
  borderColor: 'page.border.200',
  color: 'action.navigation.initial',

  rounded: 'md',
  transitionProperty: 'background-color,color',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
  _hover: {
    bgColor: 'action.bg.100.hover',
    color: 'action.navigation.hover'
  },
  w: 48
});

export const triggerButtonContentStyles = hstack({
  p: '4',
  justifyContent: 'flex-start',
  overflow: 'hidden',
  cursor: 'pointer'
});

export const triggerButtonTextStyles = css({
  flexShrink: 1,
  minW: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  w: '100%'
});

export const menuContentStyles = css({
  border: '2px solid',
  borderColor: 'page.border.100',
  maxW: '340px',
  maxH: '424px',
  p: '4'
});

export const missionPartnerTextStyles = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textStyle: 'body-sm'
});
