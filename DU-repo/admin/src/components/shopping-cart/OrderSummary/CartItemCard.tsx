import { durationToString } from '@/utils/string/durationToString';
import { itemPropertyMap } from './CartItemCardList';
import type { CartItem } from './OrderSummary.types';
import { VendorIconGroup } from '@/components_new/icons/VendorIconGroup';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { css } from '@cerberus/styled-system/css';
import { styles } from '@/components/shopping-cart/ItemCardList/StyledItemCardComponents';
import { Time, TrashCan } from '@cerberus/icons';
import { CartItemTypeIcon } from './CartItemTypeIcon';
import { IconButton } from '@cerberus/react';
import { StarRatingTrainingCard } from '@/components/StarRating/StarRatingTrainingCard';

const vendorIdIconMap = {
  cloudacademy: 'Cloud Academy',
  coursera: 'Coursera',
  datacamp: 'DataCamp',
  hackedu: 'HackEDU',
  pluralsight: 'Pluralsight',
  udacity: 'Udacity',
  udemy: 'Udemy',
  workera: 'Workera'
};

type CartItemCardProps = {
  item: CartItem;
  onRemoveFromCart: (item: CartItem) => void;
};

export const CartItemCard = ({ item, onRemoveFromCart }: CartItemCardProps) => {
  const itemProperties = itemPropertyMap[item.__typename];

  const duration = itemProperties.duration
    ? durationToString(item[itemProperties.duration])
    : 'Unknown';

  const vendorId =
    item.__typename === 'Lab'
      ? [item[itemProperties.vendorId].name]
      : item[itemProperties.vendorId]; // Can be array or string

  const vendorIconProp = Array.isArray(vendorId)
    ? vendorId
    : item.__typename === 'Lab'
      ? item[itemProperties.vendorId].name
      : [vendorIdIconMap[vendorId] ?? item.vendorName];

  const rating = item[itemProperties.averageRating] ?? 0;

  const totalNum =
    item[itemProperties.totalReviews] > 1000
      ? `${(item[itemProperties.totalReviews] / 1000).toFixed(1)}k`
      : item[itemProperties.totalReviews];
  const totalReviewsText =
    item[itemProperties.totalReviews] &&
    `(${totalNum} ${totalNum === 1 ? 'Review' : 'Reviews'})`;

  return (
    <div
      className={hstack({
        p: 4,
        pr: 0,
        justifyContent: 'space-between'
      })}
    >
      <div
        className={vstack({
          gap: 2
        })}
      >
        <div
          className={css({
            display: 'flex',
            w: 'full',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 'sm',
            marginLeft: 1
          })}
        >
          <CartItemTypeIcon type={item.__typename} />

          <p
            className={styles.responsiveCourseTitleText}
            title={item[itemProperties.title]}
          >
            {item[itemProperties.title]}
          </p>
        </div>

        <div
          className={css({
            display: 'flex',
            w: 'full',
            gap: 4,
            marginLeft: '1',
            justifyContent: 'flex-start'
          })}
        >
          <div className={hstack({ gap: 1 })}>
            <Time size={20} />
            <div className={css({ textStyle: 'body-sm' })}>{duration}</div>
          </div>

          <VendorIconGroup
            vendors={vendorIconProp}
            variant="dark"
            className={hstack({ gap: 1 })}
          />

          {rating > 0 && (
            <div className={hstack({ gap: 1 })}>
              <StarRatingTrainingCard ratings={rating} filled={false} />{' '}
              {totalReviewsText}
            </div>
          )}
        </div>
      </div>

      <IconButton
        ariaLabel="Remove Cart Item"
        palette="action"
        size="lg"
        usage="ghost"
        onClick={() => onRemoveFromCart(item)}
      >
        <TrashCan />
      </IconButton>
    </div>
  );
};
