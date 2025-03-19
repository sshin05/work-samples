'use client';
import { css } from '@cerberus/styled-system/css';
import type { CreateCohortSubPageDetail } from '../../pages/CreateCohortPage/CreateCohortPage.types';
import { Button, Show, Spinner } from '@cerberus/react';
import { Save } from '@carbon/icons-react';
import { SideNavItem } from './components/SideNavItem/SideNavItem';
import { useContext, useState } from 'react';
import { CreateCohortContext } from '../../../providers/CreateCohortProvider/CreateCohortProvider';
import { formatCohortDate } from '../../../../[cohortId]/components/ClassroomDetails/utils/formatCohortDate/formatCohortDate';

export type SideNavProps = {
  activeSubPage: CreateCohortSubPageDetail;
  nextSubPage: CreateCohortSubPageDetail;
  navItems: CreateCohortSubPageDetail[];
  isNextPageEnabled: boolean;
  onNavItemClick: (navItemSubPage: CreateCohortSubPageDetail) => void;
  onSaveAndExit: () => Promise<void>;
};

export const SideNav = ({
  activeSubPage,
  nextSubPage,
  navItems,
  isNextPageEnabled,
  onNavItemClick,
  onSaveAndExit
}: SideNavProps) => {
  const { cohortDetails, isLoadingCohort } = useContext(CreateCohortContext);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const handleSaveAndExit = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);
    await onSaveAndExit();
    setIsSaving(false);
  };

  return (
    <nav
      className={css({
        width: '250px',
        backgroundColor: 'page.surface.100',
        pt: 8,
        mb: '98px', // account for fixed footer height, ensure all elements in nav visible when scrolling
        px: 6,
        boxShadow: '-2px 0px 16px 0px rgba(0, 0, 0, 0.05)',
        overflow: 'auto'
      })}
    >
      <Button
        disabled={isLoadingCohort}
        onClick={handleSaveAndExit}
        palette="action"
        shape="sharp"
        usage="outlined"
        size="sm"
        className={css({
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: 'page.border.100'
        })}
      >
        Save and close{' '}
        <Show when={isSaving} fallback={<Save />}>
          <Spinner size="1em" />
        </Show>
      </Button>
      <div className={css({ mt: 2, mb: 8, textStyle: 'body-sm' })}>
        Autosaved 1 min ago
      </div>
      <div
        aria-busy={isLoadingCohort}
        className={css({
          minH: isLoadingCohort && '20px',
          minW: isLoadingCohort && '200px'
        })}
      ></div>
      <h2
        className={css({
          textStyle: 'h6',
          visibility: isLoadingCohort && 'hidden'
        })}
      >
        {cohortDetails?.cohort?.name}
      </h2>
      <div
        aria-busy={isLoadingCohort}
        className={css({ mb: 8, textStyle: 'label-sm' })}
      >
        {cohortDetails?.cohort?.meetingStartDate && (
          <>
            {formatCohortDate(cohortDetails?.cohort?.meetingStartDate)} -{' '}
            {formatCohortDate(cohortDetails?.cohort?.meetingEndDate)}
          </>
        )}
      </div>

      <ul>
        {navItems.map(item => {
          const isComplete = item.isSetupStepComplete(cohortDetails);
          const enabledNextSubPage =
            nextSubPage?.id === item.id && isNextPageEnabled;

          const isSelected = activeSubPage.id === item.id;
          const isDisabled =
            !isSelected && !enabledNextSubPage && !isComplete && !isSaving;

          return (
            <div
              aria-busy={isLoadingCohort}
              key={item.id}
              className={css({ mb: 8 })}
            >
              <SideNavItem
                isSelected={isSelected}
                isComplete={isComplete}
                displayName={item.displayName}
                onNavItemClick={() => onNavItemClick(item)}
                isDisabled={isDisabled}
              />
            </div>
          );
        })}
      </ul>
    </nav>
  );
};
