import { isEmpty } from 'lodash';
import { hstack } from '@cerberus/styled-system/patterns';
import { Download } from '@cerberus/icons';
import { Button, Field, Toggle } from '@cerberus/react';
import { createDeleteColumn } from '@/components_new/table/customColumns/createDeleteColumn/createDeleteColumn';
import type {
  ColumnOptions,
  ReportColumn,
  EditOptions,
  EnabledReport
} from './getColumns.types';

export const getReportColumns = ({
  enabledReports,
  handleEnableReports,
  handleDisableReports,
  createReportDownloadHandler,
  createExportByTypeAndMissionPartnerId,
  notify,
  missionPartnerId,
  isDuAdmin = false
}): ReportColumn[] => {
  return [
    {
      header: isDuAdmin ? 'Report availability' : 'Custom reports',
      id: 'missionPartnerId',
      accessorKey: 'missionPartnerId',
      enableSorting: false,
      cell: info => {
        const reportDetail = info.row.original;

        return <>{reportDetail.name}</>;
      }
    },
    isDuAdmin
      ? {
          header: 'Available',
          id: 'available',
          enableSorting: false,
          accessorKey: '',
          cell: info => {
            const reportDetail = info.row.original;
            const checked = enabledReports.some(r => r.id === reportDetail.id);
            const toggleId = `toggle-${reportDetail.id}`;

            const handleToggleChange = async event => {
              const isChecked = event.target.checked;

              if (isChecked) {
                await handleEnableReports([
                  ...enabledReports.map(r => r.id),
                  reportDetail.id
                ]);
              } else {
                await handleDisableReports([reportDetail.id]);
              }
            };
            return (
              <div>
                <Field>
                  <Toggle
                    checked={checked}
                    id={toggleId}
                    onChange={handleToggleChange}
                    value="default"
                  />
                </Field>
              </div>
            );
          }
        }
      : null,
    {
      header: 'Download',
      id: 'download',
      accessorKey: '',
      enableSorting: false,
      cell: info => {
        const reportDetail: EnabledReport = {
          reportId: info.row.original.id,
          reportName: info.row.original.name,
          missionPartnerId: missionPartnerId
        };

        return (
          <div className={hstack({ alignItems: 'center', maxW: '8rem' })}>
            <Button
              usage="ghost"
              shape="rounded"
              onClick={createReportDownloadHandler({
                createExportByTypeAndMissionPartnerId,
                notificationHandler: notify,
                reportDetail
              })}
            >
              Download <Download />
            </Button>
          </div>
        );
      }
    }
  ].filter(el => !isEmpty(el));
};

const columnMap = {
  report: getReportColumns
};

export const getColumns = (
  type: 'report',
  options = {} as ColumnOptions,
  displayEditOptions: boolean,
  editOptions?: EditOptions
) => {
  const baseColumnsGetter = columnMap[type];

  let baseColumns = [];

  if (typeof baseColumnsGetter === 'function') {
    baseColumns = baseColumnsGetter(options);
  } else if (Array.isArray(baseColumnsGetter)) {
    baseColumns = baseColumnsGetter;
  }

  if (displayEditOptions && editOptions) {
    return [
      ...baseColumns,
      createDeleteColumn({ onDelete: editOptions.onDelete })
    ];
  }

  return baseColumns;
};
