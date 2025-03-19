'use client';

import { Spinner, Tab, TabPanel, Tabs, TabsList } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Box } from '@cerberus/styled-system/jsx';

const LicensesLoading = () => {
  return (
    <Box w="full" marginBlock="2.38rem">
      <Tabs defaultValue="licenses">
        <TabsList>
          <Tab value="licenses">Licenses</Tab>
          <Tab value="requests">Requests</Tab>
        </TabsList>
        <TabPanel value="licenses" className={css({ w: 'full' })}></TabPanel>
        <TabPanel value="requests" className={css({ w: 'full' })}></TabPanel>
      </Tabs>
      <Box display="flex" justifyContent="center" mt="4">
        <Spinner size="2rem" />
      </Box>
    </Box>
  );
};

export default LicensesLoading;
