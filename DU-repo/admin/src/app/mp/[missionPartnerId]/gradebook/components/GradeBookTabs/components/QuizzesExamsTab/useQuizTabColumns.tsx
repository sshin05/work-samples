import { useMemo, useCallback } from 'react';
import { Flex } from '@cerberus/styled-system/jsx';
import { Download } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { Button, useNotificationCenter } from '@cerberus/react';
import { useExportQuizExams } from '@/api/mission-partner';
import type { MissionPartnerMinDetails } from '@/api/codegen/graphql';

export const useQuizTabColumns = (
  missionPartnerMinDetails: MissionPartnerMinDetails
) => {
  const { notify } = useNotificationCenter();
  const { exportQuizExams } = useExportQuizExams();

  const onDownloadResultsClick = useCallback(
    (quizOrExamId, quizOrExamName) => {
      return exportQuizExams({
        variables: {
          missionPartnerId: missionPartnerMinDetails?.id,
          missionPartnerName: missionPartnerMinDetails?.name,
          quizOrExamId,
          quizOrExamName
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
            description: 'There was an error exporting quizzes/exams.'
          })
        );
    },
    [
      exportQuizExams,
      missionPartnerMinDetails?.id,
      missionPartnerMinDetails?.name,
      notify
    ]
  );

  const memoizedColumns = useMemo(() => {
    return [
      {
        accessorKey: 'itemName',
        header: 'Name',
        cell: info => (
          <div
            className={css({
              w: '18rem',
              whiteSpace: 'normal',
              wordWrap: 'break-word'
            })}
          >
            {info.getValue()}
          </div>
        )
      },
      {
        accessorKey: 'itemType',
        header: 'Type',
        cell: info => (
          <div
            className={css({
              w: '12rem'
            })}
          >
            {info.getValue()}
          </div>
        )
      },
      {
        accessorKey: 'started',
        header: 'Total assigned',
        cell: info => <span>{info.getValue()}</span>
      },
      {
        accessorKey: 'completed',
        header: 'Total completed',
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
                    row.original.itemId.indexOf('#') === -1
                      ? row.original.itemId
                      : row.original.itemId.split('#')[1],
                    row.original.itemName
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
