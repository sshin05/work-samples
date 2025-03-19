import { useRef } from 'react';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import { LicensesIndicator } from '../LicensesIndicator';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import type { useModal } from '@cerberus/react';
import { NoDataAnimateIn } from '@/components_new/table/components/NoDataAnimateIn';

interface LicenseStatusCount {
  vendorId: string;
  vendorName: string;
  active: number;
  inactive: number;
  available: number;
  provisioned: number;
}
interface LicensesListProps {
  licenseStatusCounts: LicenseStatusCount[];
  missionPartnerId: string;
  isEditMode: boolean;
  selectedVendorsToEdit: Record<string, boolean>;
  setSelectedVendorsToEdit: (data: Record<string, boolean>) => void;
  isDuAdmin: boolean;
  addVendorLicensesModal: ReturnType<typeof useModal>;
}
export const LicensesList = ({
  licenseStatusCounts,
  missionPartnerId,
  isEditMode,
  selectedVendorsToEdit,
  setSelectedVendorsToEdit,
  isDuAdmin,
  addVendorLicensesModal
}: LicensesListProps) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const containerWidth = cellRef.current?.offsetWidth;

  const handleSelectVendor = (event, vendorId: string) => {
    const { checked } = event.target;

    if (checked) {
      const onlySelectedVendors = {
        ...selectedVendorsToEdit,
        [vendorId]: true
      };

      setSelectedVendorsToEdit(onlySelectedVendors);
    } else {
      // create a new object onlySelectedVendors with only selected vendors by removing the vendorId if it's present
      const onlySelectedVendors = Object.fromEntries(
        Object.entries(selectedVendorsToEdit).filter(
          ([key]) => key !== vendorId
        )
      );

      setSelectedVendorsToEdit(onlySelectedVendors);
    }
  };

  const noDataMessage = isDuAdmin
    ? 'Once you have added a vendor to your Mission partner, it will appear here.'
    : 'Once a vendor is added to your Mission partner, it will appear here.';

  return (
    <div
      className={vstack({
        alignItems: 'flex-start',
        w: 'full',
        mb: 6,
        gap: 2
      })}
    >
      {licenseStatusCounts?.length === 0 && (
        <div
          className={css({
            py: 4,
            justifyContent: 'center',
            display: 'flex',
            width: '100%'
          })}
        >
          <NoDataAnimateIn
            buttonText={isDuAdmin ? 'Add Vendor' : null}
            cta={isDuAdmin ? addVendorLicensesModal.show : null}
            message={noDataMessage}
          />
        </div>
      )}
      {/* stacks of vendor licenses */}
      {licenseStatusCounts?.map(license => {
        const hrefRoute = getRouteUrl(
          routeGenerators.Vendor({
            missionPartnerId,
            vendorId: license.vendorId
          })
        );

        return (
          <div
            key={license.vendorId}
            role="license-list"
            className={hstack({
              alignItems: 'center',
              w: 'full',
              justifyItems: 'center'
            })}
          >
            {isEditMode && (
              <div className={css({ mr: 1.5 })}>
                <Checkbox
                  name={license.vendorId}
                  labelText=""
                  size="lg"
                  value={selectedVendorsToEdit[license.vendorId] === true}
                  onChange={event =>
                    handleSelectVendor(event, license.vendorId)
                  }
                />
              </div>
            )}
            <div
              className={vstack({
                alignItems: 'flex-start',
                w: '15rem',
                gap: 0
              })}
            >
              <Link href={hrefRoute}>
                <span
                  className={css({
                    color: 'action.navigation.initial',
                    textDecoration: 'underline',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem'
                  })}
                >
                  {license.vendorName}
                </span>
              </Link>
              <p className={css({ textStyle: 'body-sm', lineHeight: '1.15' })}>
                {license.provisioned} licenses
              </p>
            </div>
            <div ref={cellRef} style={{ flexGrow: 1 }}>
              <LicensesIndicator
                active={license.active}
                inactive={license.inactive}
                available={license.available}
                containerWidth={containerWidth}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
