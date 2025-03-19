import type {
  BlockType,
  blockTypeMetadata
} from '@digital-u/services/block/types';
import { css } from '@cerberus/styled-system/css';
import { Button } from '@cerberus/react';
import { gridItem } from '@cerberus/styled-system/patterns';
import { createBlock } from '../../../actions/create-block';
import { BlockIcon } from '../../../components/BlockIcon/';

export const CreateCard = ({
  blockMetadata,
  missionPartnerId
}: {
  blockMetadata: (typeof blockTypeMetadata)[number];
  missionPartnerId: string;
}) => {
  return (
    <Button
      className={gridItem({
        background: 'page.surface.100',
        borderRadius: 'lg',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        paddingLeft: 'lg',
        paddingRight: 'lg',
        border: '1px solid',
        borderColor: 'page.surface.100',
        gap: 'md',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 'fit',
        _hover: {
          borderColor: 'action.border.initial'
        }
      })}
      formAction={async () => {
        'use server';

        await createBlock({
          missionPartnerId,
          type: blockMetadata.id as BlockType,
          name: blockMetadata.name,
          isRoot: true
        });
      }}
      type="submit"
    >
      <BlockIcon icon={blockMetadata.icon} />

      <h5
        className={css({ textStyle: 'heading-xs', color: 'action.text.200' })}
      >
        {blockMetadata.name}
      </h5>
      <p className={css({ textStyle: 'body-sm', color: 'page.text.initial' })}>
        {blockMetadata.description}
      </p>
    </Button>
  );
};
