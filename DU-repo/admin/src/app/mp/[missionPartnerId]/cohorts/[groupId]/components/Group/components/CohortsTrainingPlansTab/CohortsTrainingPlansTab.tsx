import { Add } from '@cerberus/icons';
import { LocalTable } from '@/components_new/table/LocalTable';
import { NoDataMessage } from '@/components_new/table/components/NoDataMessage';
import { useCohortTrainingPlansColumns } from './cohort-training-plans-columns';

export const CohortsTrainingPlansTab = ({
  transcriptTrainingPlans,
  missionPartner,
  group,
  handleDownload,
  handleAddPlans,
  loading,
  pageLoading
}) => {
  const columns = useCohortTrainingPlansColumns({
    missionPartnerId: missionPartner?.id,
    missionPartnerName: missionPartner?.name,
    groupId: group?.id,
    groupName: group?.name
  });

  return (
    <LocalTable
      columns={columns}
      data={transcriptTrainingPlans}
      loading={loading}
      pageLoading={pageLoading}
      searchPlaceholder="Search by plan name or type"
      noDataMessage={
        <NoDataMessage
          buttonText="Add Training Plan"
          cta={handleAddPlans}
          message="Once a plan has been added, it will appear here."
        />
      }
      buttonProps={{
        buttonContent: 'Add Training Plan',
        buttonIcon: <Add />,
        onButtonClick: handleAddPlans
      }}
      downloadProps={{
        onDownload: handleDownload
      }}
    />
  );
};
