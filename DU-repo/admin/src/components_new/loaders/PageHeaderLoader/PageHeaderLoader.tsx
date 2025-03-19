'use client';
import { Spinner } from '@cerberus/react';
import { Box } from '@cerberus/styled-system/jsx';
import { PageHeader } from '@/components_new/typography/PageHeader';

export const PageHeaderLoader = ({ name }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
    >
      <Spinner size="2rem" />
      <PageHeader> | {name}</PageHeader>
    </Box>
  );
};
