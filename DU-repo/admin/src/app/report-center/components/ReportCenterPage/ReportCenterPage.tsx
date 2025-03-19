'use client';

import { BackArrowButton } from '@/components_new/buttons/BackArrowButton';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { ReportCenterTabs } from '../ReportCenterTabs';
import { PAGE_TITLE } from '../../constants';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { Box } from '@cerberus/styled-system/jsx';

export const ReportCenterPage = () => {
  return (
    <MainContentVStack>
      <Box>
        <BackArrowButton />
        <PageHeader>{PAGE_TITLE}</PageHeader>
      </Box>
      <Box w="full" minW="39rem">
        <ReportCenterTabs />
      </Box>
    </MainContentVStack>
  );
};
