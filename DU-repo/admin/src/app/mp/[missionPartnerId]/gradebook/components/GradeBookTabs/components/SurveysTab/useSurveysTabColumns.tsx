import { useMemo, useCallback } from 'react';
import { Download } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { Button, useNotificationCenter } from '@cerberus/react';
import { useExportSurveys } from '@/api/mission-partner';
import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';
import { Flex } from '@cerberus/styled-system/jsx';

export const useSurveysTabColumns = (
  missionPartnerMinDetails: MissionPartnerMinDetails
) => {
  const { exportSurveys } = useExportSurveys();
  const { notify } = useNotificationCenter();

  const onDownloadResultsClick = useCallback(
    async (surveyId, surveyName) => {
      await exportSurveys({
        variables: {
          missionPartnerId: missionPartnerMinDetails?.id,
          missionPartnerName: missionPartnerMinDetails?.name,
          surveyId,
          surveyName
        }
      })
        .then(() =>
          notify({
            palette: 'success',
            heading: 'Success',
            description: `The export has been started. You will receive an email when it is ready.`
          })
        )
        .catch(() =>
          notify({
            palette: 'danger',
            heading: 'Error',
            description: 'There was an error exporting surveys.'
          })
        );
    },
    [
      exportSurveys,
      missionPartnerMinDetails?.id,
      missionPartnerMinDetails?.name,
      notify
    ]
  );

  const memoizedColumns = useMemo(() => {
    return [
      {
        accessorKey: 'hostedSurveyName',
        header: 'Name',
        enableSorting: false,
        cell: info => (
          <div
            className={css({
              w: '29.5rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {info.getValue()}
          </div>
        )
      },
      {
        accessorKey: 'started',
        header: 'Total assigned',
        enableSorting: false,
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'completed',
        header: 'Total completed',
        enableSorting: false,
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'downloadResults',
        header: '',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Flex justifyContent="end">
              <Button
                usage="ghost"
                shape="rounded"
                onClick={() =>
                  onDownloadResultsClick(
                    row.original.hostedSurveyId,
                    row.original.hostedSurveyName
                  )
                }
                className={css({
                  color: 'action.navigation.initial',
                  '&:hover': {
                    bgColor: 'transparent',
                    color: 'action.navigation.hover'
                  }
                })}
              >
                Download
                <Download />
              </Button>
            </Flex>
          );
        }
      }
    ];
  }, [onDownloadResultsClick]);

  return memoizedColumns;
};
