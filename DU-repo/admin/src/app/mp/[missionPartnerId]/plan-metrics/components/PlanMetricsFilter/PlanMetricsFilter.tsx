import { FieldSelect } from '@/components_new/form';
import { filterDropdownContainer } from '@/components_new/table/styles/toolbar-styles';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';

import { Controller } from 'react-hook-form';

export const PlanMetricsFilter = ({
  openFilters,
  handleSubmit,
  applyFilters,
  control,
  isSubmitting,
  reset
}) => {
  const planTypeOptions = [
    { label: 'All', value: '' },
    { label: 'Force Multiplier', value: 'Force Multiplier' },
    { label: 'Learning Path', value: 'Learning Path' },
    { label: 'Skill', value: 'Skill' }
  ];
  return (
    <form onSubmit={handleSubmit(applyFilters)}>
      <div
        style={{ display: openFilters ? 'flex' : 'none' }}
        className={filterDropdownContainer}
      >
        <div
          className={hstack({
            w: 'full',
            h: 'full',
            alignItems: 'start'
          })}
        >
          <div className={css({ w: '45%', mr: '0' })}>
            <Controller
              name="planType"
              defaultValue=""
              disabled={isSubmitting}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FieldSelect
                  {...field}
                  label="Select Plan Type"
                  options={planTypeOptions}
                  size="md"
                  labelSize="sm"
                  className={css({
                    bgColor: 'initial',
                    w: 'clamp(9.25rem, 35vw, 14rem)'
                  })}
                />
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          palette="action"
          shape="rounded"
          usage="filled"
        >
          Submit
        </Button>
        <Button
          type="button"
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={() => {
            reset();
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
