import { forwardRef } from 'react';
import _ from 'lodash';
import { stripHtml } from '@/utils/string/stripHtml';
import ItemCard from '../ItemCard/ItemCard';
import { durationToString } from '@/utils/string/durationToString';
import { vstack } from '@cerberus/styled-system/patterns';

// Allows us to reference one property below in JSX
const propertyMap = {
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

const ItemCardList = forwardRef(
  (
    {
      items,
      existingCurriculum,
      cart,
      onAddToCart,
      onRemoveFromCart,
      checkingOut,
      setShowPreviewFor,
      featuredTrainingIds = []
    },
    ref
  ) => {
    if (!items?.length) return null;

    return (
      <div
        className={vstack({
          gap: '16px',
          width: 'full',
          paddingBottom: onRemoveFromCart ? '88px' : 0,
          alignItems: 'stretch'
        })}
        ref={ref}
      >
        {items
          .sort((left, right) => {
            /* TODO: Client-side sorting of paginated search items is *not ideal*. Data the user
           is expecting may not show because it's on a different page.
           Remove this when the backend is ready to sort these results.
           */
            const leftTitle = left[propertyMap[left.__typename].title];
            const rightTitle = right[propertyMap[right.__typename].title];

            return leftTitle.localeCompare(rightTitle);
          })
          .map((item, index) => {
            const itemProperties = propertyMap[item.__typename];

            const duration = itemProperties.duration
              ? durationToString(item[itemProperties.duration])
              : 'Unknown';

            const title = item[itemProperties.title];

            const description = stripHtml(
              _.get(item, itemProperties.description)
            );

            const vendorId =
              item.__typename === 'Lab'
                ? item[itemProperties.vendorId].name
                : item[itemProperties.vendorId]; // Can be array or string

            const vendorIconProp = Array.isArray(vendorId)
              ? vendorId
              : item.__typename === 'Lab'
                ? item[itemProperties.vendorId].name
                : [vendorIdIconMap[vendorId] ?? item.vendorName];

            const isItemInCart = cart?.some(cartItem => {
              const cartItemTitle = cartItem[itemProperties.title];
              const cartItemVendorId =
                cartItem.__typename === 'Lab'
                  ? cartItem[itemProperties.vendorId].name
                  : cartItem[itemProperties.vendorId];

              return (
                cartItem.id === item.id &&
                cartItem?.version === item?.version &&
                cartItem.__typename === item.__typename &&
                cartItemTitle === title &&
                cartItemVendorId === vendorId
              );
            });

            const previewUrl = item[itemProperties.url];

            const itemId = isItemInCart
              ? `${item.id}-${item?.version || index}-${item.__typename}-${title}-${vendorId}-selected`
              : `${item.id}-${item?.version || index}-${item.__typename}-${title}-${vendorId}`;

            // Is that item already on the group, user or mp?
            // TODO: Simplify the input here
            const isItemAlreadyAttachedToTarget =
              existingCurriculum?.plans?.some(
                plan =>
                  plan.planSourceId === item.id &&
                  plan?.planVersion === item?.version
              ) ||
              existingCurriculum?.courses?.some(
                course => course.courseId === item.id || course.id === item.id
              ) ||
              existingCurriculum?.assessments?.some(
                assessment => assessment.id === item.id
              ) ||
              existingCurriculum?.surveys?.some(
                survey => survey.id === item.id
              ) ||
              existingCurriculum?.lab?.some(lab => lab.id === item.id);

            const isCurrentlyFeaturedItem = featuredTrainingIds.includes(
              item.id
            );

            return (
              <ItemCard
                key={itemId}
                item={item}
                title={title}
                description={description}
                duration={duration}
                vendorIconProp={vendorIconProp}
                isItemInCart={isItemInCart}
                isItemAlreadyAttachedToTarget={isItemAlreadyAttachedToTarget}
                onRemoveFromCart={onRemoveFromCart}
                onAddToCart={onAddToCart}
                previewUrl={previewUrl}
                checkingOut={checkingOut}
                setShowPreviewFor={setShowPreviewFor}
                isCurrentlyFeaturedItem={isCurrentlyFeaturedItem}
                rating={item[itemProperties.averageRating]}
                totalReviews={item[itemProperties.totalReviews]}
              />
            );
          })}
      </div>
    );
  }
);

ItemCardList.displayName = 'ItemCardList';

export default ItemCardList;
