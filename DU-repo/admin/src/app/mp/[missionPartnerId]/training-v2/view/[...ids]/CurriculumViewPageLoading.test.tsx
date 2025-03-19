import { renderV3, screen } from '@@/test-utils';
import CurriculumViewPageLoading from './loading';

describe('CurriculumViewPageLoading', () => {
  it('should render', () => {
    renderV3(<CurriculumViewPageLoading />);

    expect(screen.getByText('Start with a lesson')).toBeInTheDocument();
  });
});
