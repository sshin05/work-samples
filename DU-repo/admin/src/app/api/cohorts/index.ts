'use client';
import type { getCohort } from '@digital-u/services/cohort/get-cohort';
import type { findCohorts } from '@digital-u/services/cohort/find-cohorts';
import type { findCohortMembers } from '@digital-u/services/cohort/members/find-cohort-members';
import type { createCohort } from '@digital-u/services/cohort/create-cohort';
import type { updateCohort } from '@digital-u/services/cohort/update-cohort';
import type { updateTranscriptCohort } from '@digital-u/services/cohort/transcripts/transcript-cohort/update-transcript-cohort';
import type { getTranscriptCohort } from '@digital-u/services/cohort/transcripts/transcript-cohort/get-transcript-cohort';
import type { createCohortMember } from '@digital-u/services/cohort/members/create-cohort-member';
import type { deleteCohortMember } from '@digital-u/services/cohort/members/delete-cohort-member';
import type { createCohortInstructor } from '@digital-u/services/cohort/instructors/create-cohort-instructor';
import type { deleteCohortInstructor } from '@digital-u/services/cohort/instructors/delete-cohort-instructor';
import type { addLibraryItem } from '@digital-u/services/cohort/add-library-item';
import type { removeLibraryItem } from '@digital-u/services/cohort/remove-library-item';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type GetCohortOptions = SQLServiceArguments<typeof getCohort>;

export function sqlGetCohort(): SQLRESTOptions<typeof getCohort> {
  return {
    method: 'GET',
    route: '/admin/api/cohorts',
    name: 'get-cohort'
  };
}

export type FindCohortsOptions = SQLServiceArguments<typeof findCohorts>;

export function sqlFindCohorts(): SQLRESTOptions<typeof findCohorts> {
  return {
    method: 'GET',
    route: '/admin/api/cohorts',
    name: 'find-cohorts'
  };
}

export type FindCohortMembersOptions = SQLServiceArguments<
  typeof findCohortMembers
>;

export function sqlFindCohortMembers(): SQLRESTOptions<
  typeof findCohortMembers
> {
  return {
    method: 'GET',
    route: '/admin/api/cohorts',
    name: 'find-cohort-members'
  };
}

export type CreateCohortOptions = SQLServiceArguments<typeof createCohort>;

export function sqlCreateCohort(): SQLRESTOptions<typeof createCohort> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'create-cohort'
  };
}

export type UpdateCohortOptions = SQLServiceArguments<typeof updateCohort>;

export function sqlUpdateCohort(): SQLRESTOptions<typeof updateCohort> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'update-cohort'
  };
}

export type GetTranscriptCohortOptions = SQLServiceArguments<
  typeof getTranscriptCohort
>;

export function sqlGetTranscriptCohort(): SQLRESTOptions<
  typeof getTranscriptCohort
> {
  return {
    method: 'GET',
    route: '/admin/api/cohorts',
    name: 'get-transcript-cohort'
  };
}

export type UpdateTranscriptCohortOptions = SQLServiceArguments<
  typeof updateTranscriptCohort
>;

export function sqlUpdateTranscriptCohort(): SQLRESTOptions<
  typeof updateTranscriptCohort
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'update-transcript-cohort'
  };
}

export type AddCohortMemberOptions = SQLServiceArguments<
  typeof createCohortMember
>;

export function sqlAddCohortMember(): SQLRESTOptions<
  typeof createCohortMember
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'add-cohort-member'
  };
}

export type RemoveCohortMemberOptions = SQLServiceArguments<
  typeof deleteCohortMember
>;

export function sqlRemoveCohortMember(): SQLRESTOptions<
  typeof deleteCohortMember
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'remove-cohort-member'
  };
}

export type AddCohortInstructorOptions = SQLServiceArguments<
  typeof createCohortInstructor
>;

export function sqlAddCohortInstructor(): SQLRESTOptions<
  typeof createCohortInstructor
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'add-cohort-instructor'
  };
}

export type RemoveCohortInstructorOptions = SQLServiceArguments<
  typeof deleteCohortInstructor
>;

export function sqlRemoveCohortInstructor(): SQLRESTOptions<
  typeof deleteCohortInstructor
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'remove-cohort-instructor'
  };
}

export function sqlAddLibraryItem(): SQLRESTOptions<typeof addLibraryItem> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'add-library-item'
  };
}

export function sqlRemoveLibraryItem(): SQLRESTOptions<
  typeof removeLibraryItem
> {
  return {
    method: 'POST',
    route: '/admin/api/cohorts',
    name: 'remove-library-item'
  };
}
