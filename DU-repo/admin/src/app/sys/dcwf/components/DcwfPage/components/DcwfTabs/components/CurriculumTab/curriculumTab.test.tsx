import { renderV3, screen } from '@@/test-utils';
import { CurriculumTab } from './CurriculumTab';

describe('CurriculumTab', () => {
  it('should render', () => {
    renderV3(<CurriculumTab />);

    const [title, description, provider, type, view] =
      screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Description');
    expect(provider).toHaveTextContent('Provider');
    expect(title).toHaveTextContent('Item title');
    expect(type).toHaveTextContent('Type');
    expect(view).toHaveTextContent('');
  });
});
