import {
  checkAuthenticatedUser,
  checkAuthenticatedAdminOrAuthorizedPortalManager
} from '@/app/api/utils/role-authentication';
import { getCohort } from '@digital-u/services/cohort/get-cohort';
import { findCohorts } from '@digital-u/services/cohort/find-cohorts';
import { findCohortMembers } from '@digital-u/services/cohort/members/find-cohort-members';
import { createCohort } from '@digital-u/services/cohort/create-cohort';
import { updateCohort } from '@digital-u/services/cohort/update-cohort';
import { updateTranscriptCohort } from '@digital-u/services/cohort/transcripts/transcript-cohort/update-transcript-cohort';
import { getTranscriptCohort } from '@digital-u/services/cohort/transcripts/transcript-cohort/get-transcript-cohort';
import { createCohortMember } from '@digital-u/services/cohort/members/create-cohort-member';
import { deleteCohortMember } from '@digital-u/services/cohort/members/delete-cohort-member';
import { createCohortInstructor } from '@digital-u/services/cohort/instructors/create-cohort-instructor';
import { deleteCohortInstructor } from '@digital-u/services/cohort/instructors/delete-cohort-instructor';
import { addLibraryItem } from '@digital-u/services/cohort/add-library-item';
import { removeLibraryItem } from '@digital-u/services/cohort/remove-library-item';
import { getParams } from '../utils';

// Queries
export async function GET(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'get-cohort':
      try {
        await checkAuthenticatedUser();

        const data = await getCohort(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'find-cohorts':
      try {
        await checkAuthenticatedUser();

        const data = await findCohorts(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'find-cohort-members':
      try {
        await checkAuthenticatedUser();

        const data = await findCohortMembers(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'get-transcript-cohort':
      try {
        await checkAuthenticatedUser();

        const data = await getTranscriptCohort(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}

// Mutations
export async function POST(request: Request) {
  const { options, name } = await getParams(request);

  switch (name) {
    case 'create-cohort':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await createCohort(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-cohort':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await updateCohort(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'update-transcript-cohort':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await updateTranscriptCohort(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'add-cohort-member':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await createCohortMember(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'remove-cohort-member':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await deleteCohortMember(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'add-cohort-instructor':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await createCohortInstructor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'remove-cohort-instructor':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await deleteCohortInstructor(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'add-library-item':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await addLibraryItem(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    case 'remove-library-item':
      try {
        await checkAuthenticatedAdminOrAuthorizedPortalManager();

        const data = await removeLibraryItem(options);
        return Response.json({ data });
      } catch (e) {
        return Response.json({ error: e.message });
      }

    default:
      return Response.json({ error: 'Unknown route: ' + name });
  }
}
