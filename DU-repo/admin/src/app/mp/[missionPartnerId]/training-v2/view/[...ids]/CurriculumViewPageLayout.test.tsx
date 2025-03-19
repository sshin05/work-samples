import type { Blocks } from '@digital-u/services/block/types';
import { renderV3, screen } from '@@/test-utils';
import CurriculumViewPageLayout from './layout';

jest.mock('@digital-u/services/block/get-block', () => ({
  getBlock: jest.fn()
}));

jest.mock('./components/Sidebar', () => ({
  Sidebar: () => <div>Sidebar</div>
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn()
}));

describe('CurriculumViewPageLayout', () => {
  const mockGetBlock = jest.requireMock('@digital-u/services/block/get-block')
    .getBlock as jest.Mock;

  const mockNotFound = jest.requireMock('next/navigation')
    .notFound as jest.Mock;

  beforeEach(() => {
    mockGetBlock.mockResolvedValue({
      id: '123',
      title: 'Test',
      version: 1
    } as Blocks);
  });

  it('should render', async () => {
    renderV3(
      await CurriculumViewPageLayout({
        params: new Promise(resolve => {
          resolve({
            missionPartnerId: '123',
            ids: ['123']
          });
        }),
        children: <div>Test</div>
      })
    );

    expect(screen.getByText('Autosaved just now')).toBeInTheDocument();
  });

  it('should not found if root block is not found', async () => {
    mockGetBlock.mockResolvedValue(null);

    await CurriculumViewPageLayout({
      params: new Promise(resolve => {
        resolve({ missionPartnerId: '123', ids: ['123'] });
      }),
      children: <div>Test</div>
    });

    expect(mockNotFound).toHaveBeenCalled();
  });
});
