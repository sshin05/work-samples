import { hstack } from '@cerberus/styled-system/patterns';

export const stickySaveButtonStyles = hstack({
  w: '83.5%',
  gap: '4',
  justifyContent: 'flex-end',
  pos: 'absolute',
  bottom: 0,
  right: 0,
  pr: '16',
  h: '20',
  bgColor: 'page.surface.initial',
  zIndex: 80,
  borderTop: '1px solid var(--cerberus-colors-page-border-initial)'
});
