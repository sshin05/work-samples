import { renderV3, screen } from '@@/test-utils';
import CreateCurriculumPage from './page';

jest.mock('../actions/create-block', () => ({
  createBlock: jest.fn()
}));

jest.mock('../components/BlockIcon', () => ({
  BlockIcon: jest.fn().mockImplementation(() => <div>BlockIcon</div>)
}));

jest.mock('@digital-u/services/block/types', () => ({
  blockTypeMetadata: [
    {
      id: 'plan',
      name: 'Plan',
      description: 'Plan',
      icon: 'plan',
      organizational: false,
      root: true,
      allowedChildren: []
    }
  ]
}));

describe('CreateCurriculumPage', () => {
  const mockCreateBlock = jest.requireMock(
    '../actions/create-block'
  ).createBlock;

  it('should call createBlock if type is plan', async () => {
    renderV3(
      await CreateCurriculumPage({
        params: new Promise(resolve => resolve({ missionPartnerId: '1' })),
        searchParams: new Promise(resolve => resolve({ type: 'plan' }))
      })
    );

    expect(mockCreateBlock).toHaveBeenCalledWith({
      missionPartnerId: '1',
      type: 'plan',
      name: 'Plan',
      isRoot: true
    });
  });

  it('should render create card for each root block', async () => {
    renderV3(
      await CreateCurriculumPage({
        params: new Promise(resolve => resolve({ missionPartnerId: '1' })),
        searchParams: new Promise(resolve => resolve({}))
      })
    );

    expect(screen.getAllByText('BlockIcon')).toHaveLength(1);
    expect(screen.getAllByText('Plan')).toHaveLength(2);
  });
});
