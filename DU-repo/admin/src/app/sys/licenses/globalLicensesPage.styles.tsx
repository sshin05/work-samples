import { css } from '@cerberus/styled-system/css';

export const backBtnStyles = css({
  color: 'page.text.300',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textDecoration: 'none',
  w: 'fit-content',
  _hover: {
    textDecoration: 'underline'
  }
});
