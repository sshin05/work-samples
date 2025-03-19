import type { Blocks } from '@digital-u/services/block/types';
import { getTree } from '@digital-u/services/block/get-tree';
import { Filter } from '@carbon/icons-react';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { Search } from '../Search/';
import { SidebarItem } from '../SidebarItem/';

export const Sidebar = async ({
  rootBlock,
  currentBlockId
}: {
  rootBlock: Blocks;
  currentBlockId: string;
}) => {
  const tree = await getTree({
    id: rootBlock.id
  });

  return (
    <Flex
      background="page.surface.initial"
      position="sticky"
      top={0}
      left={0}
      width="1/3"
      height="calc(100vh - 80px)"
      borderRight="1px solid"
      borderColor="page.border.100"
      paddingY="xl"
      paddingX="lg"
      direction="column"
      gap="md"
    >
      <h2 className={css({ textStyle: 'heading-2xs' })}>Curriculum Contents</h2>
      <Flex gap="sm">
        <Search />
        <Button usage="ghost">
          <Filter size={16} />
        </Button>
      </Flex>

      <Flex direction="column" gap="sm">
        {tree.children.map(child => (
          <SidebarItem
            key={child.id}
            block={child}
            currentBlockId={currentBlockId}
            isFirstColumn
          />
        ))}
      </Flex>
    </Flex>
  );
};
