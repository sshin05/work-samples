import { useSQLMutation, useSQLQuery } from '@/app/api';
import { sqlAddCohortMember } from '@/app/api/cohorts';
import { sqlCreateUser, sqlFindUsers } from '@/app/api/users';
import type { MemberData } from '../../AddLearnersModal.types';

type CreateAndAddMembers = {
  cohortId: string;
  newMembers: MemberData[];
  missionPartnerId: string;
};

export const useCreateAndAddMembers = () => {
  const { query: fetchUser } = useSQLQuery(sqlFindUsers);
  const { mutation: importSingleUser } = useSQLMutation(sqlCreateUser);
  const { mutation: addCohortMember } = useSQLMutation(sqlAddCohortMember);

  const createUsers = async ({
    newMembers
  }: {
    missionPartnerId: CreateAndAddMembers['missionPartnerId'];
    newMembers: CreateAndAddMembers['newMembers'];
  }) => {
    const newUserPromises = newMembers.map(async member => {
      const result = await fetchUser({ filter: { search: member.email } });
      const hasUser = result?.data?.records?.length > 0;

      if (!hasUser) {
        const userCreationData = {
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName
        };

        await importSingleUser(userCreationData);
      }
    });

    await Promise.all(newUserPromises);
  };

  const addUsersToCohort = async ({
    cohortId,
    newMembers
  }: {
    cohortId: CreateAndAddMembers['cohortId'];
    newMembers: CreateAndAddMembers['newMembers'];
  }) => {
    const addMemberPromises = newMembers
      .map(async member => {
        const result = await fetchUser({ filter: { search: member.email } });
        const user = result?.data?.records?.[0];

        if (user) {
          await addCohortMember({
            userId: user.id,
            cohortId
          });

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          };
        }
      })
      .filter(Boolean);

    return await Promise.all(addMemberPromises);
  };

  const createAndAddMembers = async ({
    cohortId,
    missionPartnerId,
    newMembers
  }: CreateAndAddMembers): Promise<MemberData[]> => {
    try {
      await createUsers({
        missionPartnerId,
        newMembers
      });

      const addedMembers = await addUsersToCohort({
        cohortId,
        newMembers
      });

      return addedMembers;
    } catch (error) {
      console.error('createAndAddMembers failed', error);
    }
  };

  return {
    createAndAddMembers
  };
};
