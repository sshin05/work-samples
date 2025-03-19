import { routeGenerators } from '@/utils/getRouteUrl';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { TreeBlock } from '@digital-u/services/block/types';
import Link from 'next/link';

export const SidebarItem = ({
  block,
  currentBlockId,
  isFirstColumn = false
}: {
  block: TreeBlock;
  currentBlockId: string;
  isFirstColumn?: boolean;
}) => (
  <Flex direction="column" gap="sm" marginLeft={isFirstColumn ? 'none' : 'md'}>
    <Link
      href={routeGenerators.CurriculumViewPath({
        missionPartnerId: block.missionPartnerId,
        ids: block.path
      })}
      className={css({
        textStyle: 'label-sm',
        color:
          currentBlockId === block.id ? 'page.text.initial' : 'page.text.100'
      })}
    >
      {block.title}
    </Link>
    {block.children.length > 0 &&
      block.children.map(child => (
        <SidebarItem
          key={child.id}
          block={child}
          currentBlockId={currentBlockId}
        />
      ))}
  </Flex>
);
