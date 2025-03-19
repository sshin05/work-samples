import { gql, useMutation } from '@apollo/client';
import type {
  AddLabsToUserMutation,
  AddLabsToUserMutationVariables
} from '@/api/codegen/graphql';
import { useMemo } from 'react';

export const useAddLabsToUser = () => {
  const mutation = gql`
    mutation AddLabsToUser($userId: ID!, $labIds: [ID!]!) {
      addLabsToUser(userId: $userId, labIds: $labIds)
    }
  `;
  const [addLabsToUserMutation, { loading, error, data }] = useMutation<
    AddLabsToUserMutation,
    AddLabsToUserMutationVariables
  >(mutation);
  return useMemo(
    () => ({
      addLabsToUser: (userId: string, labIds: string[]) =>
        addLabsToUserMutation({
          variables: {
            userId,
            labIds
          }
        }),
      addLabsToUserLoading: loading,
      addLabsToUserError: error,
      addLabsToUserData: data
    }),
    [loading, error, data, addLabsToUserMutation]
  );
};
