import { renderV3, screen } from '@@/test-utils';
import { Section } from './Section';

describe('Section', () => {
  it('should render', () => {
    renderV3(
      <Section
        icon={() => <div>Icon</div>}
        header="Plans"
        body="Plans"
        cta="Plans"
        href="Plans"
      />
    );
    expect(screen.getAllByText('Plans')).toHaveLength(3);
    expect(screen.getAllByText('Icon')).toHaveLength(2);
  });
});
