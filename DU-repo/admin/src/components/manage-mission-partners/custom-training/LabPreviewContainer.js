import { HostedContentModal } from '@digital-u/digital-ui';
import { useFindLabById } from '@/api/lab';

const LabPreviewContainer = ({ item, onClose }) => {
  const { findLabById, findLabByIdLoading } = useFindLabById(item.id);

  if (findLabByIdLoading) {
    return null;
  }

  return (
    <HostedContentModal
      item={findLabById}
      vendorName={item.name}
      preview
      onClose={onClose}
      labMethods={{ onComplete: onClose }}
    />
  );
};

export default LabPreviewContainer;
