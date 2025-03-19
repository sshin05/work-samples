'use client';

import { css } from '@cerberus/styled-system/css';
import { Box } from '@cerberus/styled-system/jsx';
import { Spinner, Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { LearnerDoughnutLoader } from '@/components_new/loaders/LearnerDoughnutLoader';
import { PageHeader } from '@/components_new/typography/PageHeader';
import MainContentVStack from '@/components_new/layout/MainContentVStack';

const Loading = () => {
  return (
    <MainContentVStack>
      <PageHeader>Dashboard</PageHeader>
      <LearnerDoughnutLoader />
      <Box w="full" minW="39rem">
        <Tabs defaultValue="plans">
          <TabsList>
            <Tab value="plans">Plans</Tab>
            <Tab value="courses">Courses</Tab>
          </TabsList>
          <TabPanel value="plans" className={css({ w: 'full' })}></TabPanel>
          <TabPanel value="courses" className={css({ w: 'full' })}></TabPanel>
        </Tabs>
        <Box display="flex" justifyContent="center" mt="4">
          <Spinner size="2rem" />
        </Box>
      </Box>
    </MainContentVStack>
  );
};

export default Loading;
