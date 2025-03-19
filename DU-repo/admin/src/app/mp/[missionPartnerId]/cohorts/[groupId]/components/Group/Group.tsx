'use client';
import { css } from '@cerberus/styled-system/css';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRouteUrl, routeGenerators } from '@/utils/getRouteUrl';
import { camelToCapitalCase } from '@/utils/camelToCapitalCase';
import {
  useFindMissionPartnerMinDetails,
  useExportTrainingPlanTranscriptsForGroup,
  useAggregateTranscriptTrainingPlansForGroup
} from '@/api/mission-partner';
import { useGetMetricsByGroupIdCourseId } from '@/api/course';
import {
  useGetTrainingPlanProgress,
  useGetCourseProgress,
  useUpdateGroup,
  useFindGroupById,
  useDeleteGroup
} from '@/api/groups';
import { useFindUsersByGroupId, useRemoveGroupMemberships } from '@/api/user';
import { AddUsersToGroup } from './components/AddUsersToGroup';
import { ChangeCohortNameModal } from '../../../components/ChangeCohortNameModal';
import { CoursesTab } from './components/CoursesTab';
import { MembersTab } from './components/MembersTab';
import { UserTrainingModal } from './components/UserTrainingModal';
import { AssignCohortMissionPartnerModal } from '../../../components/AssignCohortMissionPartnerModal';
import { CohortsTrainingPlansTab } from './components/CohortsTrainingPlansTab';
import { useGraphqlErrorHandler } from '@/hooks/useGraphqlErrorHandler';
import type { FindGroupByIdQuery } from '@/api/codegen/graphql';
import { PageHeader } from '@/components_new/typography/PageHeader';
import {
  Tabs,
  Tab,
  TabPanel,
  useNotificationCenter,
  Modal,
  trapFocus,
  useModal,
  useConfirmModal,
  TabsList
} from '@cerberus/react';
import Link from 'next/link';
import { backButtonStyles } from '../../../../../../styles/BackButtonStyles';
import { tabsFullWidth } from '@/components_new/table/styles/tableWidthStyles';

interface UserTrainingModalData {
  row: {
    title: string;
    cells: { value: string }[];
  };
  cell: {
    info: {
      header: string;
    };
  };
}

const keys = {
  completed: 'completed',
  inProgress: 'inProgress',
  pendingReview: 'pendingReview',
  notStarted: 'notStarted'
};

export const Group = ({ groupId, missionPartnerId, tab }) => {
  const router = useRouter();
  const addMemberModal = useModal();
  const handleKeyDownOnAddMemberModal = trapFocus(addMemberModal.modalRef);
  const changeCohortNameModal = useModal();
  const assignCohortMissionPartnerModal = useModal();

  const {
    missionPartnerMinDetailsLoading,
    missionPartnerMinDetailsError,
    missionPartnerMinDetails
  } = useFindMissionPartnerMinDetails(missionPartnerId);
  useGraphqlErrorHandler(missionPartnerMinDetailsError);

  const [activePlan, setActivePlan] = useState(0);
  const [planSourceId, setPlanSourceId] = useState<string | undefined>();
  const [planType, setPlanType] = useState<string | undefined>();
  const [planVersion, setPlanVersion] = useState<string | undefined>();
  const [rowData, setRowData] = useState([]);
  const [userTrainingModalData, setUserTrainingModalData] = useState<
    UserTrainingModalData | boolean
  >(false);

  // todo: setActiveTab is never used?
  const [activeTab] = useState(tab ? Number.parseInt(tab, 10) : 0);
  const { notify } = useNotificationCenter();

  const [rowDataModal, setRowDataModal] = useState({
    data: null,
    template: null,
    columnTitles: null,
    title: ''
  });

  const { transcriptTrainingPlans, transcriptTrainingPlansLoading } =
    useAggregateTranscriptTrainingPlansForGroup({
      missionPartnerId,
      groupId
    });

  const { exportTrainingPlanTranscriptsForGroup } =
    useExportTrainingPlanTranscriptsForGroup();

  const handlePlansDownload = () =>
    exportTrainingPlanTranscriptsForGroup({
      variables: {
        missionPartnerId,
        groupId,
        groupName: (groupById as FindGroupByIdQuery['findGroupById']).name
      }
    })
      .then(() =>
        notify({
          palette: 'success',
          heading: 'Success',
          description: `The export has been started. You will receive an email when it is ready.`
        })
      )
      .catch(() =>
        notify({
          palette: 'danger',
          heading: 'Error',
          description: 'There was an error exporting transcripts.'
        })
      );

  const handleAddPlans = () => {
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId: missionPartnerId
        }),
        {
          targetId: groupId,
          targetType: 'cohort',
          missionPartnerId,
          allowedContent: ['plan'],
          excludeCustomContent: true,
          callbackPath: getRouteUrl(
            routeGenerators.Cohort({ missionPartnerId, cohortId: groupId }),
            { tab: '2' }
          )
        }
      )
    );
  };

  // End Plans Tab

  const onAddMemberClose = groupId => {
    addMemberModal.close();
    fetchUsersByGroupId(groupId);
  };

  const changeGroupNameClose = reload => {
    changeCohortNameModal.close();
    if (reload) refetchGroupById(groupId);
  };

  const handleAddCoursesClick = () => {
    router.push(
      getRouteUrl(
        routeGenerators.CurriculumCatalog({
          missionPartnerId: missionPartnerId
        }),
        {
          targetId: groupId,
          targetType: 'cohort',
          missionPartnerId,
          allowedContent: ['course'],
          excludeCustomContent: true,
          callbackPath: `${getRouteUrl(routeGenerators.Cohort({ missionPartnerId, cohortId: groupId }), { tab: '1' })}`
        }
      )
    );
  };

  const handleRemoveMembers = (groupId, groupMembers) => {
    removeGroupMemberships(groupId, groupMembers, missionPartnerId)
      .then(() => {
        fetchUsersByGroupId(groupId);

        notify({
          palette: 'success',
          heading: 'Success',
          description: `${groupMembers.length} Member${
            groupMembers.length > 1 ? 's' : ''
          } ${
            groupMembers.length > 1 ? 'were' : 'was'
          } successfully removed from the group`
        });
        fetchUsersByGroupId(groupId);
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to remove member from the group`
        });
      });
  };

  const handleShowAssignPartnerModal = missionPartnerId => {
    return updateGroup(groupId, groupById?.name, missionPartnerId)
      .then(() => {
        notify({
          palette: 'success',
          heading: 'Success',
          description: `Assigned mission partner successfully`
        });
        refetchGroupById(groupId);
      })
      .catch(() => {
        notify({
          palette: 'danger',
          heading: 'Error',
          description: `Error trying to assign mission partner`
        });
      });
  };

  const { fetchUsersByGroupId, users, usersLoading } = useFindUsersByGroupId();

  const { removeGroupMemberships } = useRemoveGroupMemberships();

  const [groupMembers, setGroupMembers] = useState(usersLoading ? [] : users);

  // !!! THIS IS A LAZY QUERY !!! --> none of this is working without a call to `fetchMetrics()`
  const { metrics } = useGetMetricsByGroupIdCourseId();
  const { refetchGroupById, groupById, groupByIdError, groupByIdLoading } =
    useFindGroupById(groupId);

  const { updateGroup } = useUpdateGroup();
  const { deleteGroup } = useDeleteGroup();

  const { fetchTrainingPlanProgress, trainingPlanProgress } =
    useGetTrainingPlanProgress({
      groupId,
      planSourceId,
      planType,
      planVersion
    });

  const { fetchCourseProgress, courseProgress, courseProgressLoading } =
    useGetCourseProgress({
      groupId
    });

  useEffect(() => {
    refetchGroupById(groupId);
    fetchUsersByGroupId(groupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const deleteGroupClose = useCallback(
    async reload => {
      await deleteGroup(groupId);
      if (reload) refetchGroupById(groupId);
      router.push(getRouteUrl(routeGenerators.Cohorts({ missionPartnerId })));
    },
    [deleteGroup, groupId, missionPartnerId, refetchGroupById, router]
  );

  const deleteCohortModal = useConfirmModal();
  //unused function because delete cohort function has been temporarily removed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleConfirmDeleteCohort = useCallback(async () => {
    const consent = await deleteCohortModal.show({
      heading: 'Are you sure?',
      description: `You are about to delete: "${groupById.name}"`,
      actionText: 'Yes, delete',
      cancelText: 'No, cancel'
    });
    if (consent) {
      deleteGroupClose(true);
    }
  }, [deleteCohortModal, deleteGroupClose, groupById]);

  useEffect(() => {
    const { row, cell } = userTrainingModalData as UserTrainingModalData;
    if (row === undefined || cell === undefined || !metrics) return;
    const rowDataM = { data: [], template: [], columnTitles: [], title: '' };
    const cellStatus = cell.info.header;
    rowDataM.title = row.title || row.cells[0].value;

    switch (cellStatus) {
      case keys.completed:
        for (const userMetrics of metrics) {
          if (userMetrics.status === 'Completed') {
            rowDataM.data.push([
              `${userMetrics.user.firstName} ${userMetrics.user.lastName}`,
              userMetrics.user.email,
              userMetrics.startedAt
                ? new Date(userMetrics.startedAt).toLocaleString()
                : 'N/A',
              userMetrics.completedAt
                ? new Date(userMetrics.completedAt).toLocaleString()
                : 'N/A'
            ]);
          }
        }

        rowDataM.columnTitles = ['Name', 'Email', 'Started At', 'Completed At'];
        rowDataM.template = Array.from({ length: 4 }).fill(({ cellData }) => (
          <p id={cellData}>{cellData}</p>
        ));
        break;
      case keys.inProgress:
        for (const userMetrics of metrics) {
          if (
            userMetrics.status === 'Started' ||
            userMetrics.status === 'Marked Completed'
          ) {
            rowDataM.data.push([
              `${userMetrics.user.firstName} ${userMetrics.user.lastName}`,
              userMetrics.user.email,
              userMetrics.startedAt
                ? new Date(userMetrics.startedAt).toLocaleString()
                : 'N/A'
            ]);
          }
        }

        rowDataM.columnTitles = ['Name', 'Email', 'Started At'];
        rowDataM.template = Array.from({ length: 3 }).fill(({ cellData }) => (
          <p id={cellData}>{cellData}</p>
        ));
        break;
      case keys.pendingReview:
        for (const userMetrics of metrics) {
          if (userMetrics.status === 'Pending Review') {
            rowDataM.data.push([
              `${userMetrics.user.firstName} ${userMetrics.user.lastName}`,
              userMetrics.user.email,
              userMetrics.startedAt
                ? new Date(userMetrics.startedAt).toLocaleString()
                : 'N/A'
            ]);
          }
        }

        rowDataM.columnTitles = ['Name', 'Email', 'Started At'];
        rowDataM.template = Array.from({ length: 3 }).fill(({ cellData }) => (
          <p id={cellData}>{cellData}</p>
        ));
        break;
      case keys.notStarted:
        // eslint-disable-next-line guard-for-in
        for (const user in groupMembers) {
          const found = metrics.some(
            userMetrics => userMetrics.user.email === groupMembers[user].email
          );
          if (!found) {
            rowDataM.data.push([
              `${groupMembers[user].firstName} ${groupMembers[user].lastName}`,
              groupMembers[user].email
            ]);
          }
        }

        rowDataM.columnTitles = ['Name', 'Email'];
        rowDataM.template = Array.from({ length: 2 }).fill(({ cellData }) => (
          <p id={cellData}>{cellData}</p>
        ));
        break;
      default:
        break;
    }

    if (rowDataM.data.length === 0) {
      rowDataM.columnTitles = ['No data'];
      rowDataM.template = [() => <h3>No Data</h3>];
      rowDataM.data.push(['No users found']);
    }

    setRowDataModal(rowDataM);
  }, [metrics, activePlan, userTrainingModalData, groupMembers, rowData]);

  const closeModal = () => {
    setUserTrainingModalData(false);
    setRowDataModal(null);
  };

  useEffect(() => {
    if (
      !(
        users.length === groupMembers.length &&
        users.every((v, i) => v === groupMembers[i])
      )
    ) {
      setGroupMembers(users);
    }
  }, [users, groupMembers]);

  useEffect(() => {
    if (
      (groupById as FindGroupByIdQuery['findGroupById'])?.courses &&
      !courseProgressLoading
    ) {
      fetchCourseProgress(groupId);
    }
  }, [groupById]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (trainingPlanProgress.length > 0) {
      const temporaryRowData = trainingPlanProgress.map(i => ({
        ...i,
        title: `${camelToCapitalCase(i.type)}: ${i.title}`,
        groupId
      }));

      setRowData(temporaryRowData);
    }
  }, [trainingPlanProgress, groupMembers.length, groupId]);

  useEffect(() => {
    if (planSourceId && planType && planVersion) {
      fetchTrainingPlanProgress({
        variables: { groupId, planSourceId, planType, planVersion }
      });
    }
  }, [groupId, activePlan, planSourceId, planType, planVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  if (groupByIdError) router.push('/404');

  useEffect(() => {
    if (
      (groupById as FindGroupByIdQuery['findGroupById'])?.trainingPlans
        ?.length > 0
    ) {
      const { planSourceId, planType, planVersion } = (
        groupById as FindGroupByIdQuery['findGroupById']
      ).trainingPlans[0];

      setActivePlan(1);
      setPlanSourceId(planSourceId);
      setPlanType(planType);
      setPlanVersion(planVersion);
    }
  }, [groupById]);

  return (
    <>
      <Link
        className={backButtonStyles}
        href={getRouteUrl(routeGenerators.Cohorts({ missionPartnerId }))}
      >
        {'<'} BACK
      </Link>
      <div className={css({ mt: '4', mb: '16' })}>
        <PageHeader>
          {(groupById as FindGroupByIdQuery['findGroupById'])?.name}
        </PageHeader>
      </div>
      <Modal
        onKeyDown={handleKeyDownOnAddMemberModal}
        ref={addMemberModal.modalRef}
      >
        {addMemberModal.isOpen && (
          <AddUsersToGroup
            onClose={() => onAddMemberClose(groupId)}
            group={groupById as FindGroupByIdQuery['findGroupById']}
            type="cohort"
          />
        )}
      </Modal>
      {groupById && (
        <ChangeCohortNameModal
          changeCohortNameModal={changeCohortNameModal}
          title="Change Cohort Name"
          onClose={changeGroupNameClose}
          group={groupById}
        />
      )}
      {groupById && (
        <AssignCohortMissionPartnerModal
          assignCohortMissionPartnerModal={assignCohortMissionPartnerModal}
          onClose={assignCohortMissionPartnerModal.close}
          onSubmit={handleShowAssignPartnerModal}
          group={groupById}
        />
      )}
      <Tabs defaultValue="members">
        <TabsList className={tabsFullWidth}>
          <Tab value="members">Roster</Tab>
          <Tab value="courses">Courses</Tab>
          <Tab value="trainingPlans">Plans</Tab>
        </TabsList>
        <TabPanel value="members">
          <MembersTab
            aria-current={activeTab === 0}
            members={groupMembers}
            isLoading={usersLoading}
            pageLoading={missionPartnerMinDetailsLoading && groupByIdLoading}
            addMember={addMemberModal.show}
            groupId={groupId}
            handleRemoveMembers={handleRemoveMembers}
          />
        </TabPanel>
        <TabPanel value="courses">
          <CoursesTab
            aria-current={activeTab === 1}
            courses={courseProgress}
            isLoading={courseProgressLoading}
            pageLoading={missionPartnerMinDetailsLoading && groupByIdLoading}
            addCourse={() => handleAddCoursesClick()}
          />
        </TabPanel>
        <TabPanel value="trainingPlans">
          <CohortsTrainingPlansTab
            aria-current={activeTab === 2}
            transcriptTrainingPlans={transcriptTrainingPlans}
            loading={transcriptTrainingPlansLoading}
            pageLoading={missionPartnerMinDetailsLoading && groupByIdLoading}
            missionPartner={missionPartnerMinDetails}
            group={groupById}
            handleDownload={handlePlansDownload}
            handleAddPlans={handleAddPlans}
          />
        </TabPanel>
      </Tabs>
      {userTrainingModalData && rowDataModal && (
        <UserTrainingModal
          title={rowDataModal.title}
          onClose={closeModal}
          tableData={{
            columns: rowDataModal.columnTitles,
            rowData: rowDataModal.data,
            rowTemplate: rowDataModal.template,
            stylings: {
              titleStyles: {
                marginTop: 'm'
              }
            }
          }}
        />
      )}
    </>
  );
};
