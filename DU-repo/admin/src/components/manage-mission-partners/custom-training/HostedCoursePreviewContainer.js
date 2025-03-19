import { HostedContentModal } from '@digital-u/digital-ui';
import { useFindHostedCourseById } from '@/api/hosted-course';

const HostedCoursePreviewContainer = ({ item, onClose }) => {
  const { hostedCourseById, hostedCourseByIdLoading } = useFindHostedCourseById(
    item.vendorCourseId
  );

  if (hostedCourseByIdLoading) {
    return null;
  }

  return (
    <HostedContentModal
      item={hostedCourseById}
      vendorName={item.vendorName}
      preview
      onClose={onClose}
      courseMethods={{ onComplete: onClose }}
    />
  );
};

export default HostedCoursePreviewContainer;
