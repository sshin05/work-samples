import { css } from '@cerberus/styled-system/css';

export const styles = {
  responsiveCourseTitleText: css({
    maxWidth: '10ch',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '@media (min-width: 1023px)': {
      maxWidth: '10ch'
    },
    '@media (min-width: 1439px)': {
      maxWidth: '20ch'
    },
    '@media (min-width: 1919px)': {
      maxWidth: '35ch'
    },
    '@media (min-width: 2559px)': {
      maxWidth: '55ch'
    }
  }),
  courseDescriptionText: css({
    textStyle: 'body-sm',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  }),
  courseTitleText: css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical'
  })
};
