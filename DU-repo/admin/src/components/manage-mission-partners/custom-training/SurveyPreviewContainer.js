import { HostedContentModal } from '@digital-u/digital-ui';
import { useFindSurveyById } from '@/api/survey';

const SurveyPreviewContainer = ({ item, onClose }) => {
  const { surveyById, surveyByIdLoading } = useFindSurveyById(item.id);

  if (surveyByIdLoading) {
    return null;
  }

  return (
    <HostedContentModal
      item={surveyById}
      vendorName={item.vendorName}
      preview
      onClose={onClose}
    />
  );
};

export default SurveyPreviewContainer;
