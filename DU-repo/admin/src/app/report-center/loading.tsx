'use client';

import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Box } from '@cerberus/styled-system/jsx';
import {
  Button,
  Spinner,
  Tab,
  TabPanel,
  Tabs,
  TabsList
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { ArrowLeft } from '@carbon/icons-react';

const ReportCenterLoading = () => {
  return (
    <MainContentVStack>
      <Box>
        <Box className={css({ mb: 8 })}>
          <Button palette="secondaryAction" usage="ghost" disabled>
            <ArrowLeft />
            <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
              Back
            </span>
          </Button>
        </Box>
        <PageHeader>Report Center</PageHeader>
      </Box>
      <Box w="full" minW="39rem">
        <Tabs defaultValue="downloads">
          <TabsList>
            <Tab value="downloads">Downloads</Tab>
            <Tab value="uploads">Uploads</Tab>
          </TabsList>
          <TabPanel value="downloads" className={css({ w: 'full' })}></TabPanel>
          <TabPanel value="uploads" className={css({ w: 'full' })}></TabPanel>
        </Tabs>
        <Box display="flex" justifyContent="center" mt="4">
          <Spinner size="2rem" />
        </Box>
      </Box>
    </MainContentVStack>
  );
};

export default ReportCenterLoading;
