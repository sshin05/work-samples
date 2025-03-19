'use client';

import { PageHeader } from '@/components_new/typography/PageHeader';
import { Spinner, Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Box } from '@cerberus/styled-system/jsx';

const CustomTrainingLoading = () => {
  return (
    <>
      <PageHeader>Custom Training</PageHeader>
      <Box w="full" marginBlock="2.38rem">
        <Tabs defaultValue="plans">
          <TabsList>
            <Tab value="plans">Plans</Tab>
            <Tab value="items">Items</Tab>
          </TabsList>
          <TabPanel value="plans" className={css({ w: 'full' })}></TabPanel>
          <TabPanel value="items" className={css({ w: 'full' })}></TabPanel>
        </Tabs>
        <Box display="flex" justifyContent="center" mt="4">
          <Spinner size="2rem" />
        </Box>
      </Box>
    </>
  );
};

export default CustomTrainingLoading;
