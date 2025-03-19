import { renderV3, screen } from '@@/test-utils';
import CreateCurriculumPageLayout from './layout';

describe('CreateCurriculumPageLayout', () => {
  it('should render', async () => {
    renderV3(
      await CreateCurriculumPageLayout({
        params: Promise.resolve({ missionPartnerId: '1' }),
        children: <div>Children</div>
      })
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
