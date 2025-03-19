'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@cerberus/react';
import { css } from '@cerberus/styled-system/css';
import { Launch } from '@cerberus/icons';
import {
  type FindAwardedBadgesQuery,
  type FindUserByIdQuery
} from '@/api/codegen/graphql';
import { SideDrawer } from './components/SideDrawer';
import { SideDrawerBody } from './components/SideDrawer/components/SideDrawerBody';
import { SideDrawerFooter } from './components/SideDrawer/components/SideDrawerFooter';
import { BadgesSection } from './components/BadgesSection';
import { SkillsSection } from './components/SkillsSection/SkillsSection';
import { UserDetailsSection } from './components/UserDetailsSection';

interface LearnerSideDrawerProps {
  /** whether the drawer is open or not */
  isOpen: boolean;
  /** called when the close icon is clicked */
  onClose: () => void;
  /** the user data returned from `useFindUserById` hook */
  userById?: FindUserByIdQuery['findUserById'] | null;
  /** whether the user data is still loading */
  isLoading: boolean;
  /** any fetch error for user data */
  isError: boolean;
  /** path info for the "view full profile" button */
  viewLearnerDetailsPath?: string;
  /** awarded badges for this user */
  awardedBadges?: FindAwardedBadgesQuery['findAwardedBadges'];
  /** loading state for awarded badges */
  awardedBadgesLoading?: boolean;
}

/**
 * displays a SideDrawer containing user details for the selected learner.
 */
export const LearnerSideDrawer = ({
  awardedBadges,
  isOpen,
  isLoading,
  onClose,
  userById,
  isError,
  viewLearnerDetailsPath,
  awardedBadgesLoading
}: LearnerSideDrawerProps) => {
  const router = useRouter();

  // dictionaries for data
  const staticDetailsDictionary: Record<string, string> = {
    Branch: 'branch',
    Type: 'userType',
    Grade: 'grade',
    Code: 'occupationalCode',
    'Total time training': 'totalTimeTrained'
  };
  const airForceDetailsDictionary: Record<string, string> = {
    Wing: 'metadata.wing',
    Command: 'metadata.command',
    'Duty Station': 'metadata.dutyStation'
  };
  const armyDetailsDictionary: Record<string, string> = {
    Other: 'metadata.other'
  };
  const spaceForceDetailsDictionary: Record<string, string> = {
    Command: 'metadata.command',
    Squadron: 'metadata.squadron',
    'Space Delta': 'metadata.spaceDelta'
  };
  const branchDetailsMapping: Record<string, Record<string, string>> = {
    'Air Force': airForceDetailsDictionary,
    Army: armyDetailsDictionary,
    'Space Force': spaceForceDetailsDictionary
  };

  return (
    <SideDrawer
      name={`${userById?.firstName ?? ''} ${userById?.lastName ?? ''}`}
      email={userById?.email}
      onCloseIconClick={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <SideDrawerBody>
        <div>
          <UserDetailsSection
            user={userById}
            isLoading={isLoading}
            staticDetailsDictionary={staticDetailsDictionary}
            branchDetailsMapping={branchDetailsMapping}
          />
          <SkillsSection skills={userById?.skills} isLoading={isLoading} />
          <BadgesSection
            badges={awardedBadges}
            isLoading={isLoading || awardedBadgesLoading}
          />
        </div>
      </SideDrawerBody>
      <SideDrawerFooter>
        <Button
          palette="action"
          shape="rounded"
          className={css({ py: 1, px: 8, height: '2.5rem' })}
          onClick={() => router.push(viewLearnerDetailsPath ?? '')}
          disabled={isLoading && !isError}
        >
          View full profile
          <Launch size={16} />
        </Button>
      </SideDrawerFooter>
    </SideDrawer>
  );
};
