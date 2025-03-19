'use client';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import { Text } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { AwsImage } from '@/components_new/images/AwsImage';
import { abbreviatedDayDate } from '@/utils/date/abbreviatedDayDate';
import { type FindAwardedBadgesQuery } from '@/api/codegen/graphql';

const DEFAULT_BADGES_COUNT = 3;

interface BadgesSectionProps {
  badges: FindAwardedBadgesQuery['findAwardedBadges'];
  isLoading: boolean;
}

export const BadgesSection: React.FC<BadgesSectionProps> = ({
  badges = [],
  isLoading
}) => {
  const [showAllBadges, setShowAllBadges] = useState(false);

  if (isEmpty(badges)) return null;

  const sortedBadges = [...badges].sort(
    (a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime()
  );
  const remainingBadges = sortedBadges.length - DEFAULT_BADGES_COUNT;

  return (
    <div
      aria-busy={isLoading}
      className={vstack({ mb: 12, alignItems: 'flex-start', w: 'full' })}
    >
      <Text as="h5" textStyle="h5" className={css({ display: 'block' })}>
        Badges
      </Text>
      <div
        className={css({
          width: 'full',
          overflow: 'hidden',
          maxHeight: showAllBadges ? 'none' : '325px'
        })}
      >
        {sortedBadges.map(badge => (
          <div
            key={badge.badgeId}
            className={hstack({
              borderRadius: 'md',
              bg: `linear-gradient(225deg, var(--gradient-charon-dark-start, rgba(76, 0, 145, 0.67)) 0%, var(--gradient-charon-dark-end, rgba(159, 102, 211, 0.67)) 100%)`,
              backgroundImage: 'url(/admin/images/badges-background.svg)',
              backgroundSize: 'cover',
              p: 4,
              gap: 4,
              mb: 4,
              h: '6rem',
              w: 'full',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              _hover: {
                boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)'
              }
            })}
          >
            <AwsImage
              src={badge.imageUrl}
              alt="badge image"
              w="4rem"
              h="4rem"
              className={css({ bg: 'none', bgSize: 'contain' })}
            />
            <div className={vstack({ alignItems: 'flex-start', gap: 'xs' })}>
              <Text
                as="h5"
                color="gradient.charon-light.text.initial"
                fontWeight={600}
              >
                {badge.title}
              </Text>
              <Text color="gradient.charon-light.text.initial">
                Awarded on {abbreviatedDayDate(badge.issuedAt)}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className={hstack({ justifyContent: 'center', w: 'full' })}>
        {remainingBadges > DEFAULT_BADGES_COUNT && (
          <Text
            as="small"
            onClick={() => setShowAllBadges(prev => !prev)}
            className={css({
              _hover: {
                textDecoration: 'underline',
                cursor: 'pointer'
              }
            })}
          >
            {showAllBadges ? 'Show Less' : `+${remainingBadges} more`}
          </Text>
        )}
      </div>
    </div>
  );
};
