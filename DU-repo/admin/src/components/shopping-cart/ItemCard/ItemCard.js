import React, { useState } from 'react';
import { VendorIconGroup } from '@/components_new/icons/VendorIconGroup';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Timer, Launch, ShoppingCartPlus, Checkmark } from '@cerberus/icons';
import { StarRatingTrainingCard } from '@/components/StarRating/StarRatingTrainingCard';
import { Button, IconButton, Tag } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { CartItemTypeIcon } from '@/components/shopping-cart/OrderSummary/CartItemTypeIcon';
import { styles } from '../ItemCardList/StyledItemCardComponents';

const ItemCard = ({
  item,
  title,
  description,
  duration,
  vendorIconProp,
  rating,
  totalReviews,
  previewUrl,
  isItemInCart,
  isItemAlreadyAttachedToTarget,
  onAddToCart,
  checkingOut = false,
  setShowPreviewFor,
  isCurrentlyFeaturedItem = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPlan =
    item.__typename === 'LearningPath' ||
    item.__typename === 'ForceMultiplier' ||
    item.__typename === 'Skill';

  const isExternalPreview =
    !isPlan && item.source !== 'du-create' && previewUrl !== undefined;

  const handleShowPreview = item => {
    if (isExternalPreview) {
      return window.open(previewUrl, '_blank');
    }
    setShowPreviewFor(item);
  };

  const cartButtonMinWidth = 88;

  const totalNum =
  totalReviews > 1000 ? `${(totalReviews / 1000).toFixed(1)}k` : totalReviews;
  const totalReviewsText = totalReviews && `(${totalNum} ${totalNum === 1 ? 'Review' : 'Reviews'})`
  
  return (
    <div
      className={hstack({
        p: '16px 24px',
        gap: 6,
        alignSelf: 'stretch',
        backgroundColor: 'page.surface.100',
        border: '1px solid transparent',
        borderRadius: 8,
        _hover: {
          border: '1px solid',
          borderColor: 'page.border.200',
          boxShadow: '0px 2px 16px 0px rgba(22, 1, 38, 0.10)'
        }
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={vstack({
          gap: '8px',
          alignItems: 'flex-start',
          flex: '1 0 0'
        })}
      >
        <div className={hstack({ gap: '8px' })}>
          <CartItemTypeIcon type={item.__typename} />
          <p className={styles.courseTitleText} title={title}>
            {title} {item?.version ? `(v${item.version})` : ''}
          </p>
        </div>
        <p className={styles.courseDescriptionText}>{description}</p>
        <div className={hstack({ gap: 4, alignItems: 'center' })}>
          {duration !== 'Unknown' && (
            <div className={hstack({ gap: 2, alignItems: 'center' })}>
              <Timer size={20} />
              <p className={css({ textStyle: 'body-sm' })}>{duration}</p>
            </div>
          )}
          <VendorIconGroup
            vendors={[vendorIconProp]}
            variant="dark"
            className={hstack({ gap: 2 })}
          />
          

          {rating > 0 && (
              <div className={hstack({ gap: 1, alignItems: 'center' })}>
                <StarRatingTrainingCard ratings={rating} filled={false} /> {totalReviewsText}
              </div>
          )}
        </div>
      </div>
      <div className={css({ minWidth: cartButtonMinWidth })}>
        {isItemInCart && (
          <Tag
            className={css({ color: 'success.border.initial' })}
            palette="success"
            shape="pill"
            usage="outlined"
          >
            <Checkmark />
            In Cart
          </Tag>
        )}
        {isCurrentlyFeaturedItem && (
          <Button
            usage="ghost"
            shape="rounded"
            palette="info"
            className={css({
              p: 0,
              _hover: { bg: 'action.ghost.initial' }
            })}
            disabled
          >
            Featured
          </Button>
        )}
        {isHovered && (
          <div
            className={vstack({
              alignItems: 'flex-end',
              gap: 0,
              minWidth: cartButtonMinWidth
            })}
          >
            {!isCurrentlyFeaturedItem && !isItemInCart && (
              <IconButton
                ariaLabel="add to cart"
                palette="action"
                usage="outlined"
                shape="circle"
                size="sm"
                className={css({
                  alignSelf: 'center',
                  h: '2rem',
                  w: '2rem',
                  border: '1px solid',
                  _hover: { bg: 'action.ghost.initial' }
                })}
                onClick={() => onAddToCart(item)}
                disabled={isItemAlreadyAttachedToTarget || checkingOut}
              >
                <ShoppingCartPlus size={16} />
              </IconButton>
            )}
            {!isPlan && (
              <Button
                usage="ghost"
                shape="rounded"
                palette="secondaryAction"
                onClick={() => handleShowPreview(item)}
                className={css({
                  mL: isExternalPreview && '20px',
                  p: 0,
                  _hover: {
                    bg: 'action.ghost.initial',
                    textDecoration: 'underline'
                  }
                })}
              >
                Preview{isExternalPreview && <Launch />}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
