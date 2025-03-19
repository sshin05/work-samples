'use client';
import { useCallback, useState } from 'react';
import { isEmpty } from 'lodash';
import {
  Button,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Modal,
  Portal,
  trapFocus,
  useConfirmModal,
  useModal,
  useNotificationCenter
} from '@cerberus/react';
import { Edit, TrashCan } from '@cerberus/icons';
import { css, cx } from '@cerberus/styled-system/css';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { useUpdateMissionPartner } from '@/api/mission-partner';
import { useFindLicenseStatusCounts } from '@/api/license';
import { AddVendorLicensesModalContent } from './components/AddVendorLicensesModalContent';
import { LicensesList } from './components/LicensesList';
import { LegendContainer } from './components/Legend/LegendContainer';
import { containerStyles } from '@/app/styles/ContainerStyles';
import { useIsDuAdmin } from '@/hooks/useCurrentSession/useCurrentSession';

const LicensesTab = ({
  missionPartnerId,
  provisionedLicenses,
  refetchMissionPartner
}) => {
  const [showEditVendorFor, setShowEditVendorFor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedVendorsToEdit, setSelectedVendorsToEdit] = useState<
    Record<string, boolean>
  >({});
  const { notify } = useNotificationCenter();
  const deleteVendorsModal = useConfirmModal();
  const addVendorLicensesModal = useModal();
  const editVendorLicensesModal = useModal();
  const { isDuAdmin } = useIsDuAdmin();

  const { updateMissionPartner } = useUpdateMissionPartner();
  const {
    licenseStatusCounts,
    refetchLicenseStatusCounts,
    licenseStatusCountsLoading
  } = useFindLicenseStatusCounts(missionPartnerId);

  const handleKeyDownOnAddVendorLicensesModal = trapFocus(
    addVendorLicensesModal.modalRef
  );
  const handleKeyDownOnEditVendorLicensesModal = trapFocus(
    editVendorLicensesModal.modalRef
  );

  const handleSubmit = async newVendor => {
    const vendorExists = provisionedLicenses.find(
      license => license.vendorId === newVendor.vendorId
    );

    if (vendorExists) {
      return Promise.reject(
        new Error(
          `Vendor ${newVendor.vendorName} already exists for this mission partner.`
        )
      );
    }
    return updateMissionPartner({
      id: missionPartnerId,
      provisionedLicenses: [...provisionedLicenses, newVendor]
    })
      .then(() => refetchMissionPartner())
      .then(() => refetchLicenseStatusCounts(missionPartnerId))
      .then(() => addVendorLicensesModal.close())
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to add a vendor'
        });
      });
  };

  const handleAddVendor = async updatedVendor => {
    const updatedLicenses = provisionedLicenses.map(license => {
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
      .then(() => {
        setShowEditVendorFor(null);
        editVendorLicensesModal.close();
      })
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update vendor.'
        })
      );
  };

  const handleDeleteVendors = () => {
    return updateMissionPartner({
      id: missionPartnerId,
      provisionedLicenses: provisionedLicenses.filter(
        license =>
          !Object.keys(selectedVendorsToEdit).includes(license.vendorId)
      )
    })
      .then(() => {
        refetchMissionPartner();
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Updated vendors successfully.'
        });
      })
      .then(() => refetchLicenseStatusCounts(missionPartnerId))
      .then(() => {
        setShowEditVendorFor(null);
        editVendorLicensesModal.close();
      })
      .finally(() => {
        setEditMode(false);
      })
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'Failed to update vendors.'
        })
      );
  };

  const confirmDeleteVendors = useCallback(async () => {
    const selectedVendorsLength = Object.keys(selectedVendorsToEdit).length;
    const consent = await deleteVendorsModal.show({
      kind: 'destructive',
      heading: `Are you sure you want to delete ${selectedVendorsLength > 1 ? 'these vendors' : 'this vendor'}?`,
      description: `Deleting ${selectedVendorsLength > 1 ? 'these vendors' : 'this vendor'} will remove all associated licenses from users and hide ${selectedVendorsLength > 1 ? 'these vendors' : 'the vendor'} from Mission Partner Portals.`,
      actionText: 'Confirm',
      cancelText: 'Cancel'
    });
    if (consent) {
      handleDeleteVendors();
    } else {
      setSelectedVendorsToEdit({});
      setEditMode(false);
    }
    //handleDeleteVendors is not a useCallback or memoized and shouldn't be used as a dependency array item.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteVendorsModal, selectedVendorsToEdit]);

  // Add an id to each license so that the table renders properly
  const licenses = provisionedLicenses?.map((license, index) => ({
    ...license,
    id: `${license.vendorId}-${index}`
  }));

  return (
    <>
      <div
        className={cx(
          vstack({
            minH: '13.375rem',
            mb: 8,
            mt: 4,
            alignItems: 'flex-start',
            padding: 'xl',
            borderRadius: 'sm'
          }),
          containerStyles
        )}
      >
        <div
          className={hstack({
            w: 'full',
            mb: 6,
            justifyContent: 'space-between'
          })}
        >
          {licenseStatusCountsLoading || isEmpty(licenses) ? null : (
            <LegendContainer />
          )}
          {isDuAdmin && !isEmpty(licenses) && !licenseStatusCountsLoading && (
            <Menu>
              <MenuTrigger
                onClick={event => {
                  if (editMode) {
                    event.preventDefault();
                    setEditMode(false);
                    setSelectedVendorsToEdit({});
                  }
                }}
              >
                <IconButton
                  ariaLabel="Edit Vendor Licenses button"
                  palette="action"
                  usage="ghost"
                  size="sm"
                >
                  <Edit size={16} />
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  value="item_1"
                  onClick={() => setEditMode(prevMode => !prevMode)}
                >
                  {!editMode && (
                    <>
                      Delete vendor(s){' '}
                      <TrashCan className={css({ ml: 'auto' })} />
                    </>
                  )}
                </MenuItem>
              </MenuContent>
            </Menu>
          )}
        </div>
        <LicensesList
          licenseStatusCounts={licenseStatusCounts}
          missionPartnerId={missionPartnerId}
          isEditMode={editMode}
          selectedVendorsToEdit={selectedVendorsToEdit}
          setSelectedVendorsToEdit={setSelectedVendorsToEdit}
          isDuAdmin={isDuAdmin}
          addVendorLicensesModal={addVendorLicensesModal}
        />
        <div className={hstack()}>
          {editMode && (
            <Button
              disabled={isEmpty(selectedVendorsToEdit)}
              palette="danger"
              shape="rounded"
              usage="filled"
              className={css({ color: 'page.bg.initial' })}
              onClick={() => confirmDeleteVendors()}
            >
              Delete Vendor(s)
            </Button>
          )}
          {isDuAdmin ||
            (!isEmpty(licenses) && (
              <Button
                usage="ghost"
                shape="rounded"
                onClick={() => addVendorLicensesModal.show()}
              >
                Add a new vendor
              </Button>
            ))}
        </div>
      </div>
      <Portal>
        <Modal
          onKeyDown={handleKeyDownOnAddVendorLicensesModal}
          ref={addVendorLicensesModal.modalRef}
        >
          {addVendorLicensesModal.isOpen && (
            <AddVendorLicensesModalContent
              onClose={addVendorLicensesModal.close}
              onSubmit={handleSubmit}
              isDuAdmin={isDuAdmin}
              vendorToEdit={undefined}
            />
          )}
        </Modal>
        <Modal
          onKeyDown={handleKeyDownOnEditVendorLicensesModal}
          ref={editVendorLicensesModal.modalRef}
        >
          {editVendorLicensesModal.isOpen && (
            <AddVendorLicensesModalContent
              onClose={editVendorLicensesModal.close}
              onSubmit={handleAddVendor}
              vendorToEdit={showEditVendorFor}
              isDuAdmin={isDuAdmin}
            />
          )}
        </Modal>
      </Portal>
    </>
  );
};

export default LicensesTab;
