import { ServerPageLoader } from '@/components_new/loaders/ServerPageLoader';
import { ClassroomBackground } from './components/MpClassroomPage/components/ClassroomBackground/ClassroomBackground';

const Loading = () => {
  return (
    <ServerPageLoader header="Classroom">
      <ClassroomBackground />
    </ServerPageLoader>
  );
};

export default Loading;
