import { FieldSelect } from '@/components_new/form';
import { filterDropdownContainer } from '@/components_new/table/styles/toolbar-styles';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';

export const PlanCoursesFilter = ({
  versionEnabled,
  openFilters,
  componentState,
  setComponentState,
  generateFilterOptions
}) => {
  const { handleSubmit, control } = useForm();

  const filterOptions = generateFilterOptions();

  const onSubmit = data => {
    setComponentState({
      ...componentState,
      planVersion: data.version || undefined
    });
  };

  const handleChange = value => {
    onSubmit({ version: value === 'All' ? undefined : value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {versionEnabled && openFilters && (
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
            <div className={css({ w: '45%', mr: '5%' })}>
              <Controller
                name="version"
                defaultValue={componentState.planVersion}
                control={control}
                render={({ field: { ref, ...field } }) => (
                  <FieldSelect
                    {...field}
                    label="Select Training Plan Version"
                    options={filterOptions}
                    onChange={e => handleChange(e.target.value)}
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
        </div>
      )}
    </form>
  );
};
