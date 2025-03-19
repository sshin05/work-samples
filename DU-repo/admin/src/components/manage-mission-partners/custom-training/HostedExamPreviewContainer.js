import { HostedContentModal } from '@digital-u/digital-ui';
import { useFindHostedExamById } from '@/api/hosted-exam';

const HostedExamPreviewContainer = ({ item, onClose }) => {
  const { hostedExamById, hostedExamByIdLoading } = useFindHostedExamById(
    item.vendorAssessmentId
  );

  if (hostedExamByIdLoading) {
    return null;
  }

  return (
    <HostedContentModal
      item={hostedExamById}
      vendorName={item.vendorName}
      preview
      onClose={onClose}
    />
  );
};

export default HostedExamPreviewContainer;
