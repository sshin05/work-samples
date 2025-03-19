import type { TreeBlock } from '@digital-u/services/block/types';
import { renderV3, screen } from '@@/test-utils';
import { Sidebar } from './Sidebar';

jest.mock('@digital-u/services/block/get-tree', () => ({
  getTree: jest.fn(() => ({
    children: [
      {
        id: '1',
        title: 'Test',
        description: 'Test',
        type: 'module',
        missionPartnerId: '1',
        children: []
      }
    ] as TreeBlock[]
  }))
}));

jest.mock('../SidebarItem/SidebarItem', () => ({
  SidebarItem: jest.fn(() => <div>SidebarItem</div>)
}));

describe('Sidebar', () => {
  it('should render', async () => {
    renderV3(
      await Sidebar({
        // @ts-expect-error minimum required props
        rootBlock: {
          id: '1',
          title: 'Test',
          description: 'Test'
        },
        currentBlockId: '1'
      })
    );

    expect(screen.getByText('Curriculum Contents')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('SidebarItem')).toBeInTheDocument();
  });
});
