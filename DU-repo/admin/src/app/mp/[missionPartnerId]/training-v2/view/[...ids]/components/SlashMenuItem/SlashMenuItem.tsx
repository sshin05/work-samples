import type { BlockTypeMetadata } from '@digital-u/services/block/types';
import { css } from '@cerberus/styled-system/css';
import { Flex } from '@cerberus/styled-system/jsx';
import { useParams } from 'next/navigation';
import { appendBlockFromSlashMenu } from '../../../../actions/append-block';
import { BlockIcon } from '../../../../components/BlockIcon/';

export const SlashMenuItem = ({
  item,
  isSelected = false
}: {
  item: BlockTypeMetadata;
  isSelected?: boolean;
}) => {
  const params = useParams();

  return (
    <button
      className={css({
        paddingY: 'sm',
        paddingX: 'md',
        borderRadius: 'sm',
        _hover: {
          background: 'action.ghost.hover'
        },
        background: isSelected ? 'action.ghost.hover' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 'sm',
        textStyle: 'body-sm',
        w: 'full'
      })}
      type="submit"
      data-item-id={item.id}
      formAction={() => {
        appendBlockFromSlashMenu({
          item,
          path: params.ids as [string, ...string[]],
          missionPartnerId: params.missionPartnerId as string
        });
      }}
    >
      <BlockIcon icon={item.icon} size={16} />
      <Flex
        direction="column"
        alignItems="flex-start"
        color="page.text.initial"
      >
        <h3 className={css({ textStyle: 'heading-2xs' })}>{item.name}</h3>
        <p className={css({ textStyle: 'body-sm' })}>{item.description}</p>
      </Flex>
    </button>
  );
};
