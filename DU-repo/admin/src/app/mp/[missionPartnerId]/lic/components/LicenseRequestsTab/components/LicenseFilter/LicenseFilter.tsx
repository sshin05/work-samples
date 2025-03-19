import { Controller, useForm } from 'react-hook-form';
import {
  filterButtons,
  filterButtonsResponsive,
  filterDropdownContainer,
  filterDropdownResponsive
} from '@/components_new/table/styles/toolbar-styles';
import { hstack } from '@cerberus/styled-system/patterns';
import { Button, Field, Select, Option, Label } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

export const LicenseFilter = ({
  applyFilters,
  openFilters,
  isSmallScreen,
  branchesForOpenLicenseRequestsLoading,
  branchesForOpenLicenseRequests,
  vendorsForOpenLicenseRequestsLoading,
  vendorsForOpenLicenseRequests,
  setLicenseInfo
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    control
  } = useForm();

  return (
    <form onSubmit={handleSubmit(applyFilters)}>
      <div
        style={{ display: openFilters ? 'flex' : 'none' }}
        className={
          isSmallScreen ? filterDropdownResponsive : filterDropdownContainer
        }
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
              name="organizationName"
              defaultValue=""
              disabled={isSubmitting}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <Field disabled={field.disabled}>
                  <Label
                    size="sm"
                    htmlFor="organization-filter"
                    className={css({ textStyle: 'label-sm' })}
                  >
                    Select Organization
                  </Label>
                  <Select
                    {...field}
                    id="organization-filter"
                    size="md"
                    className={css({
                      bgColor: 'initial',
                      w: 'clamp(9.25rem, 35vw, 14rem)'
                    })}
                  >
                    <Option value="">All</Option>
                    {!branchesForOpenLicenseRequestsLoading &&
                      branchesForOpenLicenseRequests.map(branch => (
                        <Option key={branch} value={branch}>
                          {branch}
                        </Option>
                      ))}
                  </Select>
                </Field>
              )}
            />
          </div>
          <div className={css({ w: '45%' })}>
            <Controller
              name="vendorName"
              defaultValue=""
              disabled={isSubmitting}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <Field disabled={field.disabled}>
                  <Label
                    size="sm"
                    htmlFor="organization-filter"
                    className={css({ textStyle: 'label-sm' })}
                  >
                    Select Vendor
                  </Label>
                  <Select
                    {...field}
                    id="course-status"
                    size="md"
                    className={css({
                      bgColor: 'initial',
                      w: 'clamp(9.25rem, 35vw, 14rem)'
                    })}
                  >
                    <Option value="">All</Option>
                    {!vendorsForOpenLicenseRequestsLoading &&
                      vendorsForOpenLicenseRequests.map(vendor => (
                        <Option key={vendor} value={vendor}>
                          {vendor}
                        </Option>
                      ))}
                  </Select>
                </Field>
              )}
            />
          </div>
        </div>
        <div
          className={isSmallScreen ? filterButtonsResponsive : filterButtons}
        >
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
              setLicenseInfo(state => ({
                ...state,
                vendorName: '',
                branch: ''
              }));
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
