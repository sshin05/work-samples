import { Flex } from '@cerberus/styled-system/jsx';
import { getChildren } from '@digital-u/services/block/get-children';
import { ChildCard } from '../ChildCard/';

export const ChildrenList = async ({
  currentBlockId
}: {
  currentBlockId: string;
}) => {
  const children = await getChildren({
    id: currentBlockId
  });

  return (
    children.length > 0 && (
      <Flex flexDirection="column" gap="md">
        {children.map(child => (
          <ChildCard key={child.id} child={child} />
        ))}
      </Flex>
    )
  );
};
