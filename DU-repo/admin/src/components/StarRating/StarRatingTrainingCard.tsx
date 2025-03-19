import React from 'react';
import { StarFilled, Star } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';

interface StarRatingTrainingCardProps {
  ratings: number;
  filled: boolean;
}
export const StarRatingTrainingCard = ({
  ratings,
  filled
}: StarRatingTrainingCardProps) => {
  const displayRating =
    !Number.isNaN(ratings) && ratings >= 0 && ratings <= 5
      ? ratings % 1 === 0
        ? ratings
        : ratings.toFixed(1)
      : 0;

  return (
    <>
      {displayRating && (
        <>
          {filled ? <StarFilled /> : <Star />}

          <p
            className={css({
              textStyle: 'body-sm'
            })}
          >
            {displayRating}
          </p>
        </>
      )}
    </>
  );
};
