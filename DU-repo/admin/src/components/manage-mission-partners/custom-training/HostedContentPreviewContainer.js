import HostedCoursePreviewContainer from './HostedCoursePreviewContainer';
import HostedExamPreviewContainer from './HostedExamPreviewContainer';
import HostedScormPreviewContainer from './HostedScormPreviewContainer';
import SurveyPreviewContainer from './SurveyPreviewContainer';
import LabPreviewContainer from './LabPreviewContainer';

const HostedContentPreviewContainer = ({ item, onClose }) => {
  if (item.__typename === 'Course') {
    return item.courseUrl?.includes('ducreate/scorm') ? (
      <HostedScormPreviewContainer item={item} onClose={onClose} />
    ) : (
      <HostedCoursePreviewContainer item={item} onClose={onClose} />
    );
  }

  if (item.__typename === 'Assessment') {
    return <HostedExamPreviewContainer item={item} onClose={onClose} />;
  }

  if (item.__typename === 'Survey') {
    return <SurveyPreviewContainer item={item} onClose={onClose} />;
  }

  if (item.__typename === 'Lab') {
    return <LabPreviewContainer item={item} onClose={onClose} />;
  }

  return null;
};

export default HostedContentPreviewContainer;
