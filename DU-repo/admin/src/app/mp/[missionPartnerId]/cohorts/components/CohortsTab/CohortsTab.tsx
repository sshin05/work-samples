'use client';

import { useCallback, useState } from 'react';
import { css } from '@cerberus/styled-system/css';
import { Add } from '@cerberus/icons';
import {
  useNotificationCenter,
  Modal,
  trapFocus,
  Button,
  useModal,
  useConfirmModal
} from '@cerberus/react';
import { TextInput } from '@/components_new/form';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import {
  useFindGroupsByMissionPartnerId,
  useCreateGroup,
  useUpdateGroup,
  useDeleteGroup
} from '@/api/groups';
import { AssignCohortMissionPartnerModal } from '../AssignCohortMissionPartnerModal';
import { ChangeCohortNameModal } from '../ChangeCohortNameModal';
import { useCohortsColumns } from './cohortsTabHelper';
import { hstack, vstack } from '@cerberus/styled-system/patterns';
import { Controller, useForm } from 'react-hook-form';
import { StandardModalHeader } from '@/components_new/modals/StandardModalHeader';

const CohortsTab = ({ missionPartnerId }) => {
  const [selectedCohort, setSelectedCohort] = useState(null);
  const newCohortModal = useModal();
  const handleKeyDownNewCohort = trapFocus(newCohortModal.modalRef);
  const changeCohortNameModal = useModal();
  const assignCohortMissionPartnerModal = useModal();
  const { notify } = useNotificationCenter();
  const { createGroup } = useCreateGroup();
  const { updateGroup } = useUpdateGroup();
  const { deleteGroup } = useDeleteGroup();
  const {
    groupsByMissionPartnerId,
    groupsByMissionPartnerIdLoading,
    refetchGroupsByMissionPartnerId
  } = useFindGroupsByMissionPartnerId(missionPartnerId);

  const refetchData = useCallback(() => {
    refetchGroupsByMissionPartnerId({
      missionPartnerId: missionPartnerId
    });
  }, [missionPartnerId, refetchGroupsByMissionPartnerId]);

  const handleDeleteModalClose = useCallback(
    refetch => {
      if (refetch === true) {
        // todo -- use refetchQueries instead of this if possible (open search indexing limitation)
        refetchData();
      }
    },
    [refetchData]
  );

  const deleteCohortModal = useConfirmModal();
  const handleConfirmDeleteCohort = useCallback(
    async (name: string, id: string) => {
      const consent = await deleteCohortModal.show({
        heading: 'Are you sure?',
        description: `You are about to delete: "${name}"`,
        actionText: 'Yes, delete',
        cancelText: 'No, cancel'
      });
      if (consent) {
        await deleteGroup(id);
        handleDeleteModalClose(true);
      }
    },
    [deleteCohortModal, deleteGroup, handleDeleteModalClose]
  );

  const TABLE_COLUMNS = useCohortsColumns({
    setSelectedCohort,
    showDeleteCohortModal: handleConfirmDeleteCohort,
    showChangeCohortNameModal: changeCohortNameModal.show,
    showAssignCohortMissionPartnerModal: assignCohortMissionPartnerModal.show
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  const handleChangeNameModalClose = refetch => {
    setSelectedCohort(null);
    changeCohortNameModal.close();
    if (refetch === true) {
      // todo -- use refetchQueries instead of this if possible (open search indexing limitation)
      refetchData();
    }
  };

  const handleUpdateMissionPartnerSubmit = missionPartnerId => {
    assignCohortMissionPartnerModal.close();
    return updateGroup(selectedCohort.id, selectedCohort.name, missionPartnerId)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: `Assigned mission partner succesfully`
        });
        refetchData();
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to assign mission partner`
        });
      });
  };

  const handleNewCohortSubmit = async data => {
    if (data.cohortName && missionPartnerId && newCohortModal.show) {
      newCohortModal.close();
      reset();
      return createGroup(data.cohortName, missionPartnerId)
        .then(() => {
          notify({
            palette: 'success',
            heading: 'Success!',
            description: `New Cohort Added`
          });
        })
        .then(() => {
          refetchGroupsByMissionPartnerId({
            missionPartnerId: missionPartnerId
          });
        })
        .catch(() => {
          notify({
            palette: 'danger',
            heading: 'Error!',
            description: 'Something went wrong. Try again.'
          });
        });
    }
  };

  const callToAction = () => {
    newCohortModal.show();
  };

  const onNewCohortModalClose = () => {
    reset();
    newCohortModal.close();
  };

  return (
    <>
      <LocalTable
        columns={TABLE_COLUMNS}
        data={groupsByMissionPartnerId || []}
        loading={groupsByMissionPartnerIdLoading}
        noDataMessage={
          <NoDataMessage
            buttonText="Create a Cohort"
            cta={callToAction}
            message="Once a Cohort has been created, it will appear here"
          />
        }
        searchPlaceholder="Search by name"
        buttonProps={{
          buttonIcon: <Add />,
          buttonContent: 'Cohort',
          onButtonClick: callToAction
        }}
      />
      <Modal onKeyDown={handleKeyDownNewCohort} ref={newCohortModal.modalRef}>
        {newCohortModal.isOpen && (
          <div
            className={vstack({
              w: 'full',
              gap: '8',
              alignItems: 'flex-start'
            })}
          >
            <StandardModalHeader
              title="Create new cohort"
              onClose={onNewCohortModalClose}
            />
            <form
              className={vstack({ gap: '8', alignItems: 'flex-start' })}
              onSubmit={handleSubmit(handleNewCohortSubmit)}
            >
              <Controller
                name="cohortName"
                control={control}
                render={({
                  field: { ref, ...field },
                  fieldState: { error }
                }) => (
                  <TextInput
                    {...field}
                    className={css({ w: '31rem' })}
                    label="Cohort Name"
                    errorMessage={error?.message}
                    required
                  />
                )}
              />
              <div className={hstack()}>
                <Button
                  type="submit"
                  palette="action"
                  shape="rounded"
                  usage="filled"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
                <Button
                  palette="action"
                  shape="rounded"
                  usage="outlined"
                  onClick={onNewCohortModalClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
      </Modal>
      {selectedCohort && (
        <ChangeCohortNameModal
          changeCohortNameModal={changeCohortNameModal}
          onClose={handleChangeNameModalClose}
          title="Rename Cohort"
          group={selectedCohort}
        />
      )}
      {selectedCohort && (
        <AssignCohortMissionPartnerModal
          assignCohortMissionPartnerModal={assignCohortMissionPartnerModal}
          onClose={doRefetch => {
            assignCohortMissionPartnerModal.close();
            setSelectedCohort(null);
            if (doRefetch) {
              refetchData();
            }
          }}
          onSubmit={handleUpdateMissionPartnerSubmit}
          group={selectedCohort}
        />
      )}
    </>
  );
};

export default CohortsTab;
