import type { CohortMemberData } from '@/app/mp/[missionPartnerId]/classroom/[cohortId]/cohort.types';
import { Education, OverflowMenuVertical } from '@cerberus/icons';
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger
} from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { hstack } from '@cerberus/styled-system/patterns';
import { RemoveMemberModal } from '../RemoveMemberModal/RemoveMemberModal';

export const LearnerRowMenu = ({
  rowData,
  cohortId,
  onRemoveSuccess,
  onRemoveError
}: {
  rowData: CohortMemberData;
  cohortId: string;
  onRemoveSuccess: () => void;
  onRemoveError: () => void;
}) => {
  return (
    <div className={css({ cursor: 'pointer' })}>
      <Menu
        positioning={{
          placement: 'right'
        }}
      >
        <MenuTrigger>
          <Button
            shape="rounded"
            usage="ghost"
            className={css({ p: '0', w: '2rem', h: '2rem' })}
          >
            <OverflowMenuVertical />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem
            className={css({ px: '0' })}
            value="completion-results"
            onClick={() => {
              console.log('Update completion results for userId', rowData.id);
            }}
          >
            <div className={hstack({ py: '0', px: '6' })}>
              <Education size={16} />
              <span>Update completion results</span>
            </div>
          </MenuItem>
          <MenuSeparator className={css({ maxW: '90%', mx: 'auto' })} />
          <MenuItem value="remove-member" className={css({ p: '0' })}>
            <div className={css({ w: 'full' })}>
              <RemoveMemberModal
                user={rowData}
                cohortId={cohortId}
                onSuccess={onRemoveSuccess}
                onError={onRemoveError}
              />
            </div>
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
};
