import { css } from '@cerberus/styled-system/css';

export const styledTableContainer = css({
  w: '100%'
});

export const styledTableWrapper = css({
  minW: '39rem'
});

export const styledTable = css({
  minW: '65vw',
  borderCollapse: 'collapse',
  borderSpacing: '0',
  overflowY: 'auto'
});

export const styledTableHead = css({
  pos: 'sticky',
  top: 0,
  m: 0,
  zIndex: 1,
  borderBottom: '1px solid var(--cerberus-colors-page-border-200)'
});

export const styledLoading = css({
  w: '100%',
  h: '80%'
});

export const styledTableHeadRow = css({
  h: '3rem'
});

export const styledTableHeadCell = css({
  textAlign: 'left',
  verticalAlign: 'middle',
  '&:hover': {
    bgColor: 'action.ghost.hover'
  },
  '&:hover #arrowsVertical': {
    visibility: 'visible'
  }
});

export const activeSortedColumn = css({
  bgColor: 'action.ghost.active'
});

export const notSortableTableHeadCell = css({
  textAlign: 'left',
  verticalAlign: 'middle'
});

export const styledTd = css({
  borderBottom: '1px solid var(--cerberus-colors-page-border-100)',
  whiteSpace: 'nowrap',
  overflow: 'auto'
});

export const styledFooter = css({
  mt: 4
});

export const styledFooterContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 2
});

export const styledButtonContainer = css({
  display: 'flex',
  alignItems: 'center',
  gap: 2
});

export const styledCaretButtons = css({
  cursor: 'pointer'
});

export const styledPageButtons = css({
  rounded: 'sm',
  h: '2rem',
  w: '2rem'
});

export const styledMessageWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  bgColor: 'page.bg.initial',
  h: '18.75rem',
  pt: 9
});

export const styledArrowWrapper = css({
  float: 'right'
});
