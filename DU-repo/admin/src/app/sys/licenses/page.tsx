'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { backBtnStyles } from './globalLicensesPage.styles';
import { Button, useNotificationCenter } from '@cerberus/react';
import { DuiTextInput } from '@digital-u/digital-ui';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import { useForm } from 'react-hook-form';
import { Search, Download } from '@cerberus/icons';
import { useFindLicensedVendors } from '@/api/vendor';
import { VendorCardList } from './components/VendorCardList';
import { BaseSkeleton } from '@/components_new/loaders';
import { useExportLicenses } from '@/api/license';
import { PageHeader } from '@/components_new/typography/PageHeader';
import { css } from '@cerberus/styled-system/css';
import MainContentVStack from '@/components_new/layout/MainContentVStack';

const LicensedVendorsSkeletonLoading = () => {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4rem'
      })}
    >
      <BaseSkeleton width="100%" height="8rem" />
      <BaseSkeleton width="100%" height="8rem" />
      <BaseSkeleton width="100%" height="8rem" />
    </div>
  );
};

const prepareString = (string_: string) =>
  string_.split(' ').join('').toLowerCase().trim();

const GlobalLicensesPage = () => {
  const { notify } = useNotificationCenter();

  const { watch, register } = useForm();
  const { licensedVendors, licensedVendorsLoading } = useFindLicensedVendors();
  const { exportLicenses } = useExportLicenses();

  const searchTerm: string = watch('search');

  const filteredVendors = useMemo(() => {
    if (!licensedVendors) return [];

    if (!searchTerm) return licensedVendors;

    // Flattening out string with no spaces so that
    // search can be supported more reliably
    return licensedVendors.filter(vendor =>
      prepareString(vendor.name).includes(prepareString(searchTerm))
    );
  }, [searchTerm, licensedVendors]);

  const handleExportLicenses = async () =>
    exportLicenses()
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        });
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting licenses.'
        });
      });

  return (
    <MainContentVStack>
      {/* PAGE HEADER */}
      <div
        className={hstack({
          gap: '60',
          justifyContent: 'space-between'
        })}
      >
        {/* TITLE AND BACK BUTTON */}
        <div
          className={vstack({
            gap: '1.5'
          })}
        >
          <Link className={backBtnStyles} href="/">
            {'<'} Back
          </Link>
          <PageHeader>Licenses</PageHeader>
        </div>

        {/* SEARCH  */}
        <div className={hstack({ gap: '16', minW: '300px', pos: 'relative' })}>
          <DuiTextInput
            register={register}
            id="search"
            name="search"
            placeholder="Search licensed vendors"
            defaultValue=""
          />

          <Search
            className={css({
              w: '4',
              h: '4',
              pos: 'absolute',
              top: '50%',
              right: '4',
              transform: 'translateY(-50%)',
              cursor: 'pointer'
            })}
          />
        </div>

        {/* EXPORT BUTTTON */}
        <Button
          palette="action"
          shape="rounded"
          usage="outlined"
          onClick={handleExportLicenses}
        >
          <p>All Assigned Licenses</p>
          <Download size="16" />
        </Button>
      </div>

      {/* Content */}
      {licensedVendorsLoading ? (
        <LicensedVendorsSkeletonLoading />
      ) : (
        <VendorCardList vendors={filteredVendors} />
      )}
    </MainContentVStack>
  );
};

export default GlobalLicensesPage;
