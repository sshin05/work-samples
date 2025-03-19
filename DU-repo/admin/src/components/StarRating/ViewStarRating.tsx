import { Star, StarFilled } from '@carbon/icons-react';
import { HalfFilledStar } from './HalfFilledStar';
import { Flex } from '@digital-u/digital-ui';

interface StarRatingProps {
  rating: number;
  size?: number;
  inline?: boolean;
}

export const ViewStarRating = ({
  rating,
  size = 20,
  inline = false
}: StarRatingProps) => {
  const maxStarCount = 5;

  const fullStarsCount = Math.trunc(rating);
  const filledStars = Array.from(Array(fullStarsCount).keys()).map(key => (
    <StarFilled size={size} key={`filled-${key}`} />
  ));

  const hasHalfStar = rating % 1 !== 0;
  const halfStars = hasHalfStar
    ? [<HalfFilledStar size={size} key="half-filled" />]
    : [];

  const unfilledStarCount =
    maxStarCount - filledStars.length + halfStars.length;
  const unfilledStars = Array.from(Array(unfilledStarCount).keys()).map(key => (
    <Star size={size} key={`unfilled-${key}`} />
  ));

  const stars = [...filledStars, ...halfStars, ...unfilledStars];

  return (
    <Flex style={{ display: inline ? 'inline-flex' : 'flex' }}>{...stars}</Flex>
  );
};
