import { renderV3, screen } from '@@/test-utils';
import CreateCurriculumPageLoading from './loading';

describe('CreateCurriculumPageLoading', () => {
  it('should render', () => {
    renderV3(<CreateCurriculumPageLoading />);

    expect(screen.getByText('Add custom training content')).toBeInTheDocument();
    expect(
      screen.getByText('What sort of content do you want to create?')
    ).toBeInTheDocument();
  });
});
