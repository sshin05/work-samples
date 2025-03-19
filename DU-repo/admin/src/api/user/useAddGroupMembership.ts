import { gql, useMutation } from '@apollo/client';
import type {
  AddGroupMembershipMutation,
  AddGroupMembershipMutationVariables
} from '@/api/codegen/graphql';

export const useAddGroupMembership = () => {
  const mutation = gql`
    mutation addGroupMembership($input: AddGroupMembershipInput!) {
      addGroupMembership(input: $input) {
        id
        firstName
        lastName
        email
        groupMemberships {
          groupName
        }
      }
    }
  `;
  const [addGroupMembership, { loading, error, data }] = useMutation<
    AddGroupMembershipMutation,
    AddGroupMembershipMutationVariables
  >(mutation);
  return {
    addGroupMembership: (input: AddGroupMembershipMutationVariables['input']) =>
      addGroupMembership({
        variables: {
          input
        }
      }),
    groupMembershipLoading: loading,
    groupMembershipError: error,
    groupMembershipData: data?.addGroupMembership || null
  };
};
