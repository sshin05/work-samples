import { renderV3, screen } from '@@/test-utils';
import { AddCurriculumModal } from './AddCurriculumModal';

describe('AddCurriculumModal', () => {
  it('Should render the modal', () => {
    renderV3(<AddCurriculumModal />);

    expect(screen.getByText('Add Curriculum')).toBeTruthy();
    expect(screen.getByText('This is a custom modal')).toBeTruthy();
  });
});
