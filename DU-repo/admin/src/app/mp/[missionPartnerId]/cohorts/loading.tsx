'use client';

import { Box } from '@cerberus/styled-system/jsx';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { Spinner } from '@cerberus/react';

const Loading = () => {
  return (
    <>
      <PageHeader>Cohorts</PageHeader>
      <Box display="flex" justifyContent="center" mt="20">
        <Spinner size="2rem" />
      </Box>
    </>
  );
};

export default Loading;
