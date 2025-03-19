import { gql, useMutation } from '@apollo/client';
import type {
  AddPlansInput,
  AddTrainingPlansToUserMutation,
  AddTrainingPlansToUserMutationVariables,
  InputMaybe
} from '@/api/codegen/graphql';

export const useAddPlansToUser = () => {
  const mutation = gql`
    mutation AddTrainingPlansToUser(
      $userId: ID!
      $plans: [AddPlansInput]!
      $missionPartnerId: ID!
    ) {
      addTrainingPlansToUser(
        userId: $userId
        plans: $plans
        missionPartnerId: $missionPartnerId
      ) {
        id
        userId
        planType
        planSourceId
      }
    }
  `;
  const [addPlansToUser, { loading, error, data }] = useMutation<
    AddTrainingPlansToUserMutation,
    AddTrainingPlansToUserMutationVariables
  >(mutation);
  return {
    addPlansToUser: async (
      userId: string,
      plans: Array<InputMaybe<AddPlansInput>> | InputMaybe<AddPlansInput>,
      missionPartnerId: string
    ) =>
      addPlansToUser({
        variables: {
          userId,
          plans,
          missionPartnerId
        }
      }),
    addPlansToUserLoading: loading,
    addPlansToUserError: error,
    addPlansToUserData: data?.addTrainingPlansToUser
  };
};
