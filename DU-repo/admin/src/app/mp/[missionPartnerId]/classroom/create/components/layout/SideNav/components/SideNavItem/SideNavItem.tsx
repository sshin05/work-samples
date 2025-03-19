import { CheckmarkOutline } from '@carbon/icons-react';
import { Show } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';

type SideNavItemProps = {
  isSelected: boolean;
  isComplete: boolean;
  isDisabled: boolean;
  displayName: string;
  onNavItemClick: () => void;
};

export const getTextColor = (isDisabled: boolean, isSelected: boolean) => {
  if (isSelected) {
    return 'action.text.200';
  }

  if (isDisabled) {
    return 'page.text.100';
  }

  return null;
};

export const SideNavItem = ({
  isSelected,
  isComplete,
  isDisabled,
  displayName,
  onNavItemClick
}: SideNavItemProps) => {
  return (
    <li>
      <button
        disabled={isDisabled}
        onClick={onNavItemClick}
        className={css({
          display: 'flex',
          alignItems: 'center',
          py: 2,
          px: 3,
          borderRadius: 'lg',
          backgroundColor: isSelected && 'action.ghost.active',
          color: getTextColor(isDisabled, isSelected),
          textStyle: 'body-sm',
          cursor: isDisabled ? 'not-allowed' : 'pointer'
        })}
      >
        <Show
          when={isComplete}
          fallback={
            <div
              className={css({
                borderRadius: '50%',
                border: '1px solid',
                borderColor: isSelected ? 'action.text.200' : 'page.text.100',
                height: 4,
                width: 4,
                mr: 2
              })}
            ></div>
          }
        >
          <CheckmarkOutline
            className={css({
              color: 'success.surface.200',
              height: 4,
              width: 4,
              mr: 2
            })}
          />
        </Show>

        {displayName}
      </button>
    </li>
  );
};
