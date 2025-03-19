'use client';
import { Text } from '@digital-u/digital-ui';
import { hstack } from '@cerberus/styled-system/patterns';
import { useCountUniqueItemsAndVendorsBySource } from '@/api/vendor';
import { TrainingLibraryCard } from './components/TrainingLibraryCard';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';

const ManageTrainingLibrary = () => {
  const {
    totalItems: manualItems,
    totalVendors: manualVendors,
    countUniqueItemsAndVendorsBySourceLoading
  } = useCountUniqueItemsAndVendorsBySource('admin-managed');

  const cards = [
    {
      key: 'manually-added-items',
      title: 'MANUALLY ADDED ITEMS',
      value: manualItems,
      unit: 'Item',
      href: `/admin${getRouteUrl(routeGenerators.SysManualItems())}`,
      buttonText: 'MANAGE',
      vendors: manualVendors
    }
  ];

  return (
    <>
      <Text size="h2" fontWeight="bold">
        Manage Training Library
      </Text>
      <div className={hstack({ gap: '1.5rem' })}>
        {cards.map(card => (
          <TrainingLibraryCard
            key={card.key}
            {...card}
            loading={countUniqueItemsAndVendorsBySourceLoading}
          />
        ))}
      </div>
    </>
  );
};

export default ManageTrainingLibrary;
