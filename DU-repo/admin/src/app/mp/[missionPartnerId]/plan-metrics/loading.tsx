import { Button, Spinner } from '@cerberus/react';
import { Box } from '@cerberus/styled-system/jsx';
import { vstack } from '@cerberus/styled-system/patterns';
import { ArrowLeft } from '@cerberus/icons';
import { css } from '@cerberus/styled-system/css';
import { PageHeader } from '@/components_new/typography/PageHeader';

const PlanMetricsLoading = () => {
  return (
    <Box w="full" minW="39rem">
      <div className={vstack({ gap: 4, alignItems: 'start' })}>
        <div className={css({ mb: 8 })}>
          <Button palette="secondaryAction" usage="ghost">
            <ArrowLeft />
            <span className={css({ textStyle: 'body-sm', fontWeight: 'bold' })}>
              Back
            </span>
          </Button>
        </div>
        <Box display="flex" alignItems="center">
          <Spinner size="2rem" />
          <PageHeader> | Plans</PageHeader>
        </Box>
      </div>
      <Box display="flex" justifyContent="center">
        <Spinner size="2rem" />
      </Box>
    </Box>
  );
};

export default PlanMetricsLoading;
