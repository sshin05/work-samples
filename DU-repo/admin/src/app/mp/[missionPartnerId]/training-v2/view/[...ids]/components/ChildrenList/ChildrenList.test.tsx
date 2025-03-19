import { renderV3, screen } from '@@/test-utils';
import { ChildrenList } from './ChildrenList';

jest.mock('@digital-u/services/block/get-children', () => ({
  getChildren: jest.fn()
}));

jest.mock('../ChildCard', () => ({
  ChildCard: jest.fn(({ child }) => <div>{child.title}</div>)
}));

describe('ChildrenList', () => {
  const mockGetChildren = jest.requireMock(
    '@digital-u/services/block/get-children'
  ).getChildren;

  beforeEach(() => {
    mockGetChildren.mockResolvedValue([
      {
        id: '1',
        type: 'module',
        title: 'Module 1'
      }
    ]);
  });

  it('should render', async () => {
    renderV3(await ChildrenList({ currentBlockId: '1' }));

    expect(mockGetChildren).toHaveBeenCalledWith({ id: '1' });
    expect(screen.getByText('Module 1')).toBeInTheDocument();
  });
});
