import { CircularProgress } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

type numTagsAllowed = 1 | 2 | 3 | 4;

interface PlaceholderCohortListCardProps {
  numTopTags: numTagsAllowed;
  numBottomTags: numTagsAllowed;
  circularProgressId: string;
}

export const PlaceholderCohortListCard = ({
  numTopTags,
  numBottomTags,
  circularProgressId
}: PlaceholderCohortListCardProps) => {
  const placeholderBox = css({
    bgColor: 'page.bg.100',
    borderRadius: '2.659px'
  });

  const renderTags = numToRender => {
    const widthPercentage = Math.floor(100 / numToRender);

    const divs = Array.from({ length: numToRender }, (_, index) => (
      <div
        key={index}
        className={cx(
          hstack({ w: `${widthPercentage}%`, h: '4' }),
          placeholderBox
        )}
      />
    ));

    return <>{divs}</>;
  };

  return (
    <div
      className={hstack({
        gap: '6',
        py: '4',
        px: '10',
        mb: '4',
        w: '50%',
        bg: 'cerberus.neutral.white',
        borderRadius: 'lg'
      })}
    >
      <div className={css({ w: '20%' })}>
        <CircularProgress
          aria-busy="true"
          bgStyle="transparent"
          id={circularProgressId}
          label=""
          now={0}
          title=""
        />
      </div>
      <div className={css({ w: '50%' })}>
        <div className={hstack({ w: '50%' })}>{renderTags(numTopTags)}</div>
        <div
          className={cx(
            css({
              mb: '2',
              mt: '2',
              w: 'full',
              h: '5'
            }),
            placeholderBox
          )}
        />
        <div
          className={hstack({
            gap: '1.5',
            whiteSpace: 'nowrap',
            w: '45%'
          })}
        >
          {renderTags(numBottomTags)}
        </div>
      </div>
      <div
        className={cx(css({ ml: 'auto', w: '4%', h: '5' }), placeholderBox)}
      />
    </div>
  );
};
