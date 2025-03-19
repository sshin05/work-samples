import { css } from '@cerberus/styled-system/css';

type ItemDetailProps = {
  displayTitle: string;
  displayValue: string | number;
};

export const ItemDetail = ({ displayTitle, displayValue }: ItemDetailProps) => {
  return (
    <li
      className={css({
        display: 'flex',
        fontWeight: '400',
        mb: '2'
      })}
    >
      <div
        className={css({
          flex: '0 1 15%',
          overflow: 'hidden',
          whiteSpace: 'wrap'
        })}
      >
        {displayTitle}
      </div>
      <div
        className={css({
          ml: '2',
          fontWeight: '400',
          maxW: '80%',
          textWrap: 'wrap',
          overflow: 'auto',
          maxH: '92px',
          minHeight: '24px'
        })}
      >
        {displayValue}
      </div>
    </li>
  );
};
