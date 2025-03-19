import { BadgesSectionLoader } from '@/components_new/loaders/BadgesSectionLoader/BadgesSectionLoader';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Spinner, Text } from '@cerberus/react';
import { Box } from '@cerberus/styled-system/jsx';
import { hstack } from '@cerberus/styled-system/patterns';

const BadgesLoading = () => {
  return (
    <>
      <Box className={hstack({ justifyContent: 'space-between', w: 'full' })}>
        <Box className={hstack({ alignItems: 'flex-end' })}>
          <PageHeader>Badges</PageHeader>
          <Spinner size="1rem" />
          <Text as="p">Badges</Text>
        </Box>
      </Box>
      <Box w="full" marginBlock="2.38rem" minW="39rem">
        <BadgesSectionLoader />
      </Box>
    </>
  );
};

export default BadgesLoading;
