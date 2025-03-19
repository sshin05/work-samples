'use client';

import type { Blocks } from '@digital-u/services/block/types';
import { Document, Draggable, TrashCan } from '@carbon/icons-react';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { Avatar, Button } from '@cerberus/react';
import { useRouter, useParams } from 'next/navigation';
import { routeGenerators } from '@/utils/getRouteUrl';
import { deleteBlock } from '../../../../actions/delete-block';

const capitalizeWords = (words: string) => {
  return words
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const ChildCard = ({ child }: { child: Blocks }) => {
  const router = useRouter();
  const params = useParams();

  const friendlyName = capitalizeWords(child.type);

  const handleNavigateToChild = () => {
    router.push(
      routeGenerators.CurriculumViewPath({
        missionPartnerId: child.missionPartnerId,
        ids: [...(params.ids as string[]), child.id]
      })
    );
  };

  return (
    <Flex
      background="page.surface.100"
      paddingX="md"
      paddingY="1.25rem"
      borderRadius="md"
      gap="lg"
      border="1px solid"
      borderColor="page.surface.100"
      _hover={{
        border: '1px solid',
        borderColor: 'page.border.200'
      }}
      alignItems="center"
      role="button"
      cursor="pointer"
      tabIndex={0}
      aria-label={`${child.type}: ${child.title}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleNavigateToChild();
        }
      }}
      onClick={handleNavigateToChild}
    >
      <Draggable size={24} />
      <Flex alignItems="center" gap="xs" flex={1}>
        <Avatar
          gradient="charon-light"
          size="xs"
          icon={<Document size={16} />}
          ariaLabel=""
          src=""
        />
        <h3 className={css({ textStyle: 'heading-xs' })}>{friendlyName}</h3>|
        <span className={css({ textStyle: 'heading-xs', fontWeight: '400' })}>
          {child.title}
        </span>
      </Flex>
      <form>
        <Button
          usage="ghost"
          palette="danger"
          size="sm"
          shape="rounded"
          type="submit"
          onClick={e => {
            e.stopPropagation();
          }}
          formAction={async () =>
            deleteBlock({
              id: child.id,
              missionPartnerId: params.missionPartnerId as string
            })
          }
        >
          <TrashCan />
        </Button>
      </form>
    </Flex>
  );
};
