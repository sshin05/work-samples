import { Text } from '@cerberus/react';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { SkeletonPanel } from '@/components_new/loaders/SkeletonPanel';

interface DashboardTileProps {
  headingTitle: string;
  headingValue: number;
  countTextWithPlaceholder: string;
  count: number;
  headingLoading: boolean;
  countLoading: boolean;
}

export const DashboardTile = ({
  headingTitle,
  headingValue,
  countTextWithPlaceholder,
  count,
  headingLoading,
  countLoading
}: DashboardTileProps) => {
  const [preposition, units] = countTextWithPlaceholder.split('{}');
  const formattedFooterValue = countLoading ? (
    '---'
  ) : (
    <div
      className={hstack({
        gap: '1',
        justifyContent: 'center',
        flexWrap: 'wrap'
      })}
    >
      {preposition}
      <Text as="strong" textStyle="heading-2sx">
        {count?.toLocaleString('en-US')}
      </Text>
      {units}
    </div>
  );

  return (
    <div
      className={vstack({
        justifyContent: 'center',
        alignItems: 'center',
        bg: 'page.surface.100',
        borderRadius: 'lg',
        px: '6',
        py: '4',
        fontSize: 'sm'
      })}
    >
      <strong>{headingTitle}</strong>
      <Text as="h5" textStyle="heading-lg">
        {headingLoading ? (
          <SkeletonPanel>Loading</SkeletonPanel>
        ) : (
          headingValue?.toLocaleString('en-US')
        )}
      </Text>
      {formattedFooterValue}
    </div>
  );
};
