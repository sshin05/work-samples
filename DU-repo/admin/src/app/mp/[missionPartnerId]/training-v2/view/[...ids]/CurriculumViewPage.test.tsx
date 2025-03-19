import { renderV3, screen } from '@@/test-utils';
import { notFound } from 'next/navigation';
import CurriculumViewPage from './page';

jest.mock('@digital-u/services/block/get-block', () => ({
  getBlock: jest.fn()
}));

jest.mock('@digital-u/services/block/get-valid-children-metadata', () => ({
  getValidChildrenMetadata: jest.fn().mockResolvedValue(['1', '2', '3'])
}));

jest.mock('next/navigation');

jest.mock('./components/AdmonitionTip/AdmonitionTip', () => ({
  AdmonitionTip: () => <div>Admonition Tip</div>
}));

jest.mock('./components/ChildrenList/ChildrenList', () => ({
  ChildrenList: () => <div>Children List</div>
}));

jest.mock('./components/SlashMenu/SlashMenu', () => ({
  SlashMenu: () => <div>Slash Menu</div>
}));

jest.mock('./components/EditTitleModal/EditTitleModal', () => ({
  EditTitleModal: () => <div>Edit Title Modal</div>
}));

describe('CurriculumViewPage', () => {
  const mockNotFound = notFound as unknown as jest.Mock;
  const mockGetBlock = jest.requireMock('@digital-u/services/block/get-block')
    .getBlock as jest.Mock;

  describe('when the root block is not found', () => {
    beforeAll(() => {
      mockGetBlock.mockResolvedValue(null);
    });

    it('should not found', async () => {
      renderV3(
        await CurriculumViewPage({
          params: new Promise(resolve => resolve({ ids: ['1'] }))
        })
      );
      expect(mockNotFound).toHaveBeenCalled();
    });
  });

  describe('when current block is not found', () => {
    beforeAll(() => {
      mockGetBlock.mockResolvedValueOnce({
        id: '1',
        title: 'Root Block',
        type: 'plan'
      });
      mockGetBlock.mockResolvedValueOnce(null);
    });

    it('should not found', async () => {
      renderV3(
        await CurriculumViewPage({
          params: new Promise(resolve => resolve({ ids: ['1'] }))
        })
      );
      expect(mockGetBlock).toHaveBeenCalledWith({
        id: '1',
        assert: false
      });
      expect(mockNotFound).toHaveBeenCalled();
    });
  });

  describe('when current block is found', () => {
    beforeAll(() => {
      mockGetBlock.mockResolvedValueOnce({
        id: '1',
        title: 'Root Block',
        type: 'plan'
      });
      mockGetBlock.mockResolvedValueOnce({
        id: '2',
        title: 'Current Block',
        type: 'course'
      });
    });

    it('should render', async () => {
      renderV3(
        await CurriculumViewPage({
          params: new Promise(resolve => resolve({ ids: ['1'] }))
        })
      );
      expect(screen.getByText('Admonition Tip')).toBeInTheDocument();
      expect(screen.getByText('Children List')).toBeInTheDocument();
      expect(screen.getByText('Slash Menu')).toBeInTheDocument();
      expect(screen.getByText('Edit Title Modal')).toBeInTheDocument();
    });
  });
});
