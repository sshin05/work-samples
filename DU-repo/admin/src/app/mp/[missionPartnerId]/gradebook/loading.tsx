'use client';

import { Spinner, Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { Box } from '@cerberus/styled-system/jsx';
import { css } from '@cerberus/styled-system/css';
import { PageHeader } from '@/components_new/typography/PageHeader';

const Loading = () => {
  return (
    <>
      <PageHeader>Gradebook</PageHeader>
      <Box w="full" marginBlock="2.38rem">
        <Tabs defaultValue="learners">
          <TabsList>
            <Tab value="learners">Quizzes/Assessments</Tab>
            <Tab value="requests">Surveys</Tab>
          </TabsList>
          <TabPanel value="learners" className={css({ w: 'full' })}></TabPanel>
          <TabPanel value="requests" className={css({ w: 'full' })}></TabPanel>
        </Tabs>
        <Box display="flex" justifyContent="center" mt="4">
          <Spinner size="2rem" />
        </Box>
      </Box>
    </>
  );
};

export default Loading;
