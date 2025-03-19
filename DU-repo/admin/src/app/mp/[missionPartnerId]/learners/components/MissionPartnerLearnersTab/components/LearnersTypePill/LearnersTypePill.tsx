import { Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

export const LearnersTypePill = ({ value }) => {
  if (!value) {
    return null;
  }

  const palette =
    value === 'military' ? 'info' : value === 'civilian' ? 'page' : 'warning';

  return (
    <Tag
      palette={palette}
      shape="pill"
      usage="outlined"
      className={css({
        w: '5.375rem'
      })}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </Tag>
  );
};
