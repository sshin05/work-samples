import { filterDropdownContainer } from '@/components_new/table/styles/toolbar-styles';
import { Field, Label, Option, Select, Button } from '@cerberus/react';
import { css, cx } from '@cerberus/styled-system/css';
import { flex } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';

const fieldStyle = flex({
  flexDir: 'column',
  flexGrow: 1,
  maxW: '240px',
  mr: '6'
});

type Props = {
  openFilters: boolean;
  statusFilter?: string;
  setStatusFilter: (status?: string) => void;
  missionPartnerFilter?: string;
  setMissionPartnerFilter: (missionPartner?: string) => void;
  missionPartnerOptions: { label: string; value: string }[];
  vendorFilter?: string;
  setVendorFilter?: (value: string | undefined) => void;
  vendorOptions?: { label: string; value: string }[];
};

export const OrdersTableFilters = ({
  openFilters,
  statusFilter,
  setStatusFilter,
  missionPartnerFilter,
  setMissionPartnerFilter,
  missionPartnerOptions,
  vendorFilter,
  setVendorFilter,
  vendorOptions
}: Props) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      status: statusFilter ?? '',
      missionPartner: missionPartnerFilter ?? '',
      vendor: vendorFilter ?? ''
    }
  });

  const statusOptions = [
    { label: 'All', value: '' },
    { label: 'Pending', value: 'PROCESSING' },
    { label: 'Ready for Payment', value: 'READY_FOR_PAYMENT' },
    { label: 'In Contracting', value: 'IN_CONTRACTING' },
    { label: 'Paid', value: 'PAID' },
    { label: 'Cancelled', value: 'CANCELLED' },
    { label: 'Refunded', value: 'REFUNDED' }
  ];

  const onSubmit = data => {
    setStatusFilter(data.status || undefined);
    setMissionPartnerFilter(data.missionPartner || undefined);
    setVendorFilter?.(data.vendor || undefined);
  };

  const handleClearFilters = () => {
    reset();
    setStatusFilter(undefined);
    setMissionPartnerFilter(undefined);
    setVendorFilter?.(undefined);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={css({
        backgroundColor: 'page.bg.100',
        flexShrink: 0,
        flexGrow: 1
      })}
    >
      {openFilters && (
        <div
          className={cx(
            filterDropdownContainer,
            flex({ backgroundColor: 'page.bg.100', flexShrink: 0, flexGrow: 1 })
          )}
        >
          {/* Status Filter */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Field>
                <div className={fieldStyle}>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select
                    {...field}
                    id="status-filter"
                    size="md"
                    onChange={e => field.onChange(e.target.value)}
                  >
                    {statusOptions.map(option => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Field>
            )}
          />

          {/* Mission Partner Filter */}
          <Controller
            name="missionPartner"
            control={control}
            render={({ field }) => (
              <Field>
                <div className={fieldStyle}>
                  <Label htmlFor="mission-partner-filter">
                    Mission Partner
                  </Label>
                  <Select
                    {...field}
                    id="mission-partner-filter"
                    size="md"
                    onChange={e => field.onChange(e.target.value)}
                  >
                    <Option value="">All Mission Partners</Option>
                    {missionPartnerOptions.map(({ label, value }) => (
                      <Option key={value} value={value}>
                        {label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Field>
            )}
          />

          {/* Vendor Filter (conditionally rendered) */}
          {vendorOptions && setVendorFilter && (
            <Controller
              name="vendor"
              control={control}
              render={({ field }) => (
                <Field>
                  <div className={fieldStyle}>
                    <Label htmlFor="vendor-filter">Vendor</Label>
                    <Select
                      {...field}
                      id="vendor-filter"
                      size="md"
                      onChange={e => field.onChange(e.target.value)}
                    >
                      <Option value="">All Vendors</Option>
                      {vendorOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Field>
              )}
            />
          )}

          {/* Buttons */}
          <div>
            <Button
              size="sm"
              type="submit"
              className={css({ maxH: '10', mr: '5' })}
            >
              Update
            </Button>
            <Button
              usage="outlined"
              onClick={handleClearFilters}
              className={css({ maxH: '10' })}
            >
              Reset
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
