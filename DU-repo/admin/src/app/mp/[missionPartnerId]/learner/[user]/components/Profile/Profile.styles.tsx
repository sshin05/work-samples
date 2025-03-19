import { css } from '@cerberus/styled-system/css';

export const containerStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  backgroundColor: 'page.surface.100',
  borderRadius: '.25rem',
  border: '1px solid var(--cerberus-colors-page-border-initial)',
  gap: '8',
  my: '4',
  py: '8',
  px: '4'
});

export const dataStyles = css({
  color: 'page.text.initial',
  textStyle: 'body-md',
  textTransform: 'capitalize',
  fontWeight: '600'
});

export const categoryStyles = css({
  textStyle: 'h6',
  color: 'page.text.100',
  fontWeight: 'semiBold'
});

export const profileStyles = css({ textStyle: 'h3', fontWeight: 'semibold' });
