import { HostedContentModal } from '@digital-u/digital-ui';
import { useFindHostedScormById } from '@/api/hosted-scorm';

const HostedScormPreviewContainer = ({ item, onClose }) => {
  const { hostedScormById, hostedScormByIdLoading } = useFindHostedScormById(
    item.vendorCourseId
  );

  if (hostedScormByIdLoading) {
    return null;
  }

  return (
    <HostedContentModal
      item={hostedScormById}
      vendorName={item.vendorName}
      preview
      onClose={onClose}
      scormMethods={{ onComplete: onClose }}
    />
  );
};

export default HostedScormPreviewContainer;
