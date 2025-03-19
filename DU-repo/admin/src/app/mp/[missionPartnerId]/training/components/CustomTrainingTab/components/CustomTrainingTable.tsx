import { Field, Label, Select, Option } from '@cerberus/react';
import { Add } from '@cerberus/icons';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { LocalTable } from '@/components_new/table/LocalTable';
import { css } from '@cerberus/styled-system/css';
import { vstack } from '@cerberus/styled-system/patterns';

export const CustomTrainingTable = ({
  combinedRows,
  openModal,
  columns,
  openFilters,
  setOpenFilters,
  setFilter,
  filter,
  loading,
  pageLoading
}) => {
  return (
    <LocalTable
      columns={columns}
      data={combinedRows}
      loading={loading}
      pageLoading={pageLoading}
      hasFiltersApplied={filter !== 'All'}
      noDataMessage={
        <NoDataMessage
          message="Once custom training has been created, it will appear here."
          buttonText="Add Custom Training Items"
          cta={() => openModal(true)}
        />
      }
      hasToolbar
      searchPlaceholder="Search by item name"
      defaultSorting={[{ id: 'updatedAt', desc: true }]}
      buttonProps={{
        onButtonClick: () => openModal(true),
        buttonContent: 'Training item',
        buttonIcon: <Add />
      }}
      filterProps={{
        openFilters,
        setOpenFilters
      }}
      filterComponent={
        <div
          className={vstack({
            display: openFilters ? 'flex' : 'none',
            w: 'full',
            h: 'full',
            gap: 2,
            justifyContent: 'flex-start',
            borderBottom: '1px solid var(--cerberus-colors-page-border-200)',
            p: 6,
            alignItems: 'flex-start'
          })}
        >
          <div>
            <Field>
              <Label
                htmlFor="itemType-filter"
                size="sm"
                className={css({ textStyle: 'label-sm' })}
              >
                Select Item Type
              </Label>
              <Select
                id="itemType-filter"
                aria-label="Select Item Type"
                size="md"
                className={css({
                  bgColor: 'initial',
                  w: '14rem'
                })}
                onChange={event => {
                  setFilter(event.target.value);
                }}
              >
                <Option value="All">All</Option>
                <Option value="Course">Manual course</Option>
                <Option value="Exam">Assessment</Option>
                <Option value="SCORM">SCORM uploaded course</Option>
                <Option value="Survey">Survey</Option>
                <Option value="Lab">Lab</Option>
              </Select>
            </Field>
          </div>
        </div>
      }
    />
  );
};
