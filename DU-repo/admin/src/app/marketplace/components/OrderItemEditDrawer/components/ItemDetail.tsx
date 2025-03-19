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
        mb: '8',
        flexDirection: 'column'
      })}
    >
      <div
        className={css({
          flex: '0 1 15%',
          overflow: 'hidden',
          whiteSpace: 'wrap',
          textStyle: 'label-md',
          fontWeight: '600',
          mb: '2'
        })}
      >
        {displayTitle}
      </div>
      <div
        className={css({
          fontWeight: '400',
          maxW: '80%'
        })}
      >
        {displayValue}
      </div>
    </li>
  );
};
