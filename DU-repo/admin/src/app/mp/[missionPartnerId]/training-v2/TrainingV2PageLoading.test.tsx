import { renderV3, screen } from '@@/test-utils';
import TrainingV2PageLoading from './loading';

describe('TrainingV2PageLoading', () => {
  it('should render', () => {
    renderV3(<TrainingV2PageLoading />);

    expect(screen.getByText('Custom Training')).toBeInTheDocument();
  });
});
