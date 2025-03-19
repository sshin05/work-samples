'use client';
import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { css } from '@cerberus/styled-system/css';
import { useFindLicenseStatusCounts } from '@/api/license';
import { find } from 'lodash';
import { ChevronLeft, Edit } from '@cerberus/icons';
import { vstack, hstack } from '@cerberus/styled-system/patterns';
import {
  useFindMissionPartnerById,
  useUpdateMissionPartner
} from '@/api/mission-partner';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import MainContentVStack from '@/components_new/layout/MainContentVStack';
import { VendorLicenseTable } from '../VendorLicenseTable/VendorLicenseTable';
import { useRouteParams } from '@/hooks/useRouteParams';
import {
  IconButton,
  Modal,
  Portal,
  useModal,
  useNotificationCenter
} from '@cerberus/react';
import { Checkbox } from '@/components_new/form/Checkbox/Checkbox';
import { UpdateLicenseQuantityModal } from '../UpdateLicenseQuantityModal';
import { formatNumber } from '@/utils/format-number';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

export const MpVendorDetailPage = () => {
  const { vendorId, missionPartnerId } = useRouteParams();
  const updateLicenseQuantityModal = useModal();
  const { updateMissionPartner, updateMissionPartnerLoading } =
    useUpdateMissionPartner();
  const { missionPartnerLoading, missionPartner, refetchMissionPartner } =
    useFindMissionPartnerById(missionPartnerId);
  const {
    licenseStatusCounts,
    licenseStatusCountsLoading,
    refetchLicenseStatusCounts
  } = useFindLicenseStatusCounts(missionPartnerId);
  const { notify } = useNotificationCenter();
  const { isDuAdmin } = useIsDuAdmin();

  const vendor = useMemo(() => {
    if (missionPartner && !missionPartnerLoading) {
      return (
        find(missionPartner?.provisionedLicenses, {
          vendorId
        }) || null
      );
    }
  }, [vendorId, missionPartner, missionPartnerLoading]);

  const autoAssignLicenses = useMemo(() => {
    return vendor?.autoAssignmentEnabled ?? false;
  }, [vendor?.autoAssignmentEnabled]);

  const [assigned, setAssigned] = useState(0);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    if (!licenseStatusCountsLoading) {
      for (const license of licenseStatusCounts) {
        if (license.vendorId === vendorId) {
          setAssigned(license.active + license.inactive);
          setAvailable(license.available);
        }
      }
    }
  }, [licenseStatusCounts, licenseStatusCountsLoading, vendorId]);

  const handleUpdateMissionPartner = updatedVendor => {
    const updatedLicenses = missionPartner?.provisionedLicenses.map(license => {
      if (license.vendorId === updatedVendor.vendorId) {
        return updatedVendor;
      }

      return license;
    });

    return updateMissionPartner({
      id: missionPartnerId,
      provisionedLicenses: updatedLicenses
    })
      .then(() => {
        refetchMissionPartner();
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Updated vendor successfully.'
        });
      })
      .then(() => refetchLicenseStatusCounts(missionPartnerId))
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update vendor.'
        })
      );
  };

  const handleCheckboxChange = async event => {
    const newVendorObject = {
      vendorId,
      vendorName: vendor?.vendorName,
      provisioned: vendor?.provisioned,
      autoAssignmentEnabled: event.target.checked
    };

    handleUpdateMissionPartner(newVendorObject);
  };

  return (
    <MainContentVStack>
      <Link
        href={getRouteUrl(
          routeGenerators.MissionPartnerVendors({ missionPartnerId })
        )}
      >
        <div className={hstack()}>
          <ChevronLeft />
          <p>Back</p>
        </div>
      </Link>
      <div
        className={vstack({
          w: 'full',
          h: 'full',
          gap: '3',
          alignItems: 'flex-start'
        })}
      >
        <div className={hstack()}>
          <p
            className={css({
              textStyle: 'heading-xl'
            })}
          >
            {missionPartner?.name}
          </p>
          <p
            className={css({
              textStyle: 'heading-xl',
              color: 'action.text.200'
            })}
          >
            {vendor?.vendorName}
          </p>
        </div>
        <div className={hstack()}>
          <p className={hstack({ textStyle: 'body-md', gap: '2' })}>
            <span>
              {vendor?.provisioned > 0 ? formatNumber(vendor.provisioned) : 'X'}{' '}
              Provisioned
            </span>
            <span>|</span>
            <span>
              {assigned != null ? formatNumber(assigned) : '0'} Assigned
            </span>
            <span>|</span>
            <span>
              {available > 0 ? formatNumber(available) : 'X'} Available
            </span>
          </p>
          {isDuAdmin && (
            <IconButton
              onClick={updateLicenseQuantityModal.show}
              ariaLabel="Update"
              size="sm"
            >
              <Edit
                className={css({
                  color: 'action.text.200'
                })}
              />
            </IconButton>
          )}
        </div>
        <Portal>
          <Modal ref={updateLicenseQuantityModal.modalRef}>
            {updateLicenseQuantityModal.isOpen && (
              <UpdateLicenseQuantityModal
                vendor={vendor}
                handleUpdateMissionPartner={handleUpdateMissionPartner}
                close={updateLicenseQuantityModal.close}
              />
            )}
          </Modal>
        </Portal>
        <div className={hstack({ justifyContent: 'start' })}>
          <Checkbox
            name="autoAssignLicenses"
            labelText="Check the box to allow users to automatically receive a license when requested"
            labelSize="md"
            onChange={handleCheckboxChange}
            value={autoAssignLicenses}
            disabled={
              missionPartnerLoading ||
              licenseStatusCountsLoading ||
              updateMissionPartnerLoading
            }
          />
        </div>
      </div>
      <div
        className={hstack({
          w: 'full',
          h: 'full',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: '12'
        })}
      >
        <VendorLicenseTable
          missionPartner={missionPartner}
          missionPartnerId={missionPartnerId}
          missionPartnerName={missionPartner?.name}
          missionPartnerLoading={missionPartnerLoading}
          vendorId={vendor?.vendorId}
          vendorName={vendor?.vendorName}
        />
      </div>
    </MainContentVStack>
  );
};
