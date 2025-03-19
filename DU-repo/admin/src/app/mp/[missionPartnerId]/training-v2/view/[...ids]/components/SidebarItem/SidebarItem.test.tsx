import { renderV3, screen } from '@@/test-utils';
import { SidebarItem } from './SidebarItem';

describe('SidebarItem', () => {
  it('should render', () => {
    renderV3(
      <SidebarItem
        block={{
          id: '1',
          title: 'Block One',
          description: 'Block One Description',
          path: ['1'],
          children: [
            // @ts-expect-error minimum required props
            {
              id: '2',
              title: 'Block Two',
              description: 'Block Two Description',
              path: ['1', '2'],
              children: []
            }
          ]
        }}
        currentBlockId="1"
        isFirstColumn={false}
      />
    );

    expect(screen.getByText('Block One')).toBeInTheDocument();
    expect(screen.getByText('Block Two')).toBeInTheDocument();
  });
});
