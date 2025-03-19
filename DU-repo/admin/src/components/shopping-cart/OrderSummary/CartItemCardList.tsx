import _ from 'lodash';
import { CartItemCard } from './CartItemCard';
import type { CartItem } from './OrderSummary.types';
import { css } from '@cerberus/styled-system/css';

export const itemPropertyMap = {
  Course: {
    title: 'courseTitle',
    description: 'courseDescription',
    duration: 'courseDuration',
    vendorId: 'vendorId',
    url: 'courseUrl',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  },
  Assessment: {
    title: 'assessmentTitle',
    description: 'assessmentDescription',
    duration: 'durationInMinutes',
    vendorId: 'vendorId',
    url: 'assessmentUrl'
  },
  LearningPath: {
    title: 'title',
    duration: 'totalDuration',
    description: 'content.summary',
    vendorId: 'vendors',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  },
  ForceMultiplier: {
    title: 'title',
    duration: 'totalDuration',
    description: 'content.summary',
    vendorId: 'vendors',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  },
  Skill: {
    title: 'title',
    duration: 'totalDuration',
    description: 'content.summary',
    vendorId: 'vendors',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  },
  Survey: {
    title: 'name',
    duration: 'durationInMinutes',
    description: 'description',
    vendorId: 'missionPartnerId',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  },
  Lab: {
    title: 'name',
    duration: 'durationInMinutes',
    description: 'description',
    vendorId: 'missionPartner',
    averageRating: 'averageRating',
    totalReviews: 'totalReviews'
  }
};

type CartItemCardList = {
  items: CartItem[];
  onRemoveFromCart: (item: CartItem) => void;
};

export const CartItemCardList = ({ items, onRemoveFromCart }) => {
  if (!items?.length) return null;

  return (
    <div className={css({ overflowY: 'auto', w: 'full', px: 4, py: 2.5 })}>
      {items
        .sort((left, right) => {
          /* TODO: Client-side sorting of paginated search items is *not ideal*. Data the user
           is expecting may not show because it's on a different page.
           Remove this when the backend is ready to sort these results.
           */
          const leftTitle = left[itemPropertyMap[left.__typename].title];
          const rightTitle = right[itemPropertyMap[right.__typename].title];

          return leftTitle.localeCompare(rightTitle);
        })
        .map(item => {
          return (
            <div key={item.id}>
              <CartItemCard item={item} onRemoveFromCart={onRemoveFromCart} />

              <div
                className={css({
                  content: '',
                  bottom: '0',
                  width: '100%',
                  height: '1px',
                  mt: 2,
                  mb: 2,
                  backgroundColor: '#E4E3E9' // replace with token
                })}
              />
            </div>
          );
        })}
    </div>
  );
};
