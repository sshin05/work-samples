'use client';

import { useState, useCallback, useMemo } from 'react';
import { LearnersTable } from './LearnersTable';
import { useConfirmModal, useNotificationCenter } from '@cerberus/react';
import { useRemoveMissionPartnerMemberships } from '@/api/user';
import {
  useFindLearnersBySearch,
  useFindMissionPartnerMinDetails
} from '@/api/mission-partner';
import type { SortingState } from '@tanstack/react-table';
import { ErrorHandler } from '@/components_new/errors/ErrorHandler';

interface MpLearnersTableContentProps {
  missionPartnerId: string;
  refetchInitialCount: () => void;
  handleShowModal: () => void;
  callLearnerSideDrawer: (args) => void;
}

const MpLearnersTableContent = (props: MpLearnersTableContentProps) => {
  const { callLearnerSideDrawer } = props;
  const PAGE_SIZE = 25;
  const { notify } = useNotificationCenter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState();
  const [sorting, setSorting] = useState<SortingState>([]);

  const searchParameters = useMemo(() => {
    return {
      missionPartnerId: props.missionPartnerId,
      searchText,
      sortKey: sorting.length ? sorting[0].id : undefined,
      sortDirection: sorting.length
        ? sorting[0].desc
          ? 'desc'
          : 'asc'
        : 'asc',
      pageNumber: page,
      pageSize: PAGE_SIZE
    };
  }, [props.missionPartnerId, searchText, sorting, page]);

  const { learners, learnersLoading, total, refetchLearners, learnersError } =
    useFindLearnersBySearch(searchParameters);

  const { removeMissionPartnerMemberships } =
    useRemoveMissionPartnerMemberships();

  const { missionPartnerMinDetailsError, missionPartnerMinDetails } =
    useFindMissionPartnerMinDetails(props.missionPartnerId);

  const handleRemoveLearners = useCallback(
    async (missionPartnerMembers, missionPartnerId: string) => {
      try {
        await removeMissionPartnerMemberships(
          missionPartnerMembers,
          missionPartnerId
        );
        setPage(1); // on delete, we'll go back to page 1 to prevent table issues.
        props.refetchInitialCount();
        await refetchLearners({
          ...searchParameters,
          pageNumber: 1
        });
        notify({
          palette: 'success',
          heading: 'Success',
          description: 'Successfully removed members from the mission partner'
        });
      } catch (error) {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to remove ${
            missionPartnerMembers.length
          } Member${
            missionPartnerMembers.length > 1 ? 's' : ''
          } from the mission partner | ${error.message}`
        });
      }
    },
    [
      removeMissionPartnerMemberships,
      refetchLearners,
      notify,
      props,
      searchParameters
    ]
  );

  const confirm = useConfirmModal();
  const handleConfirm = useCallback(
    async (
      userIds: [],
      firstName: string,
      lastName: string,
      isSpecificLearner: boolean
    ) => {
      const learnerInfo = isSpecificLearner
        ? `${firstName} ${lastName}`
        : `${userIds.length} learner${userIds.length > 1 ? 's' : ''}`;

      const consent = await confirm.show({
        heading: 'Are you sure?',
        description: `You will be removing ${learnerInfo} from the Mission Partner.`,
        actionText: 'Yes, Remove',
        cancelText: 'No, Keep Learners'
      });
      if (consent) await handleRemoveLearners(userIds, props.missionPartnerId);
    },
    [confirm, handleRemoveLearners, props.missionPartnerId]
  );

  const errorDetails = missionPartnerMinDetailsError || learnersError;

  return (
    <ErrorHandler errorDetails={errorDetails}>
      <LearnersTable
        missionPartner={missionPartnerMinDetails}
        learners={learners}
        loading={learnersLoading}
        page={page}
        setPage={setPage}
        sort={sorting}
        setSort={setSorting}
        searchText={searchText}
        setSearchText={setSearchText}
        total={total}
        size={PAGE_SIZE}
        setShowAddMemberModal={props.handleShowModal}
        showConfirmModal={handleConfirm}
        callLearnerSideDrawer={callLearnerSideDrawer}
      />
    </ErrorHandler>
  );
};

export default MpLearnersTableContent;
