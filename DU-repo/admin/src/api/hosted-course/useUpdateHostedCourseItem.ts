import { gql, useMutation } from '@apollo/client';
import type {
  HostedCourseItemInput,
  UpdateHostedCourseItemMutation,
  UpdateHostedCourseItemMutationVariables
} from '@/api/codegen/graphql';

const STATIC_OBJECT = {};

/*
const HOSTED_COURSE_FRAGMENT = gql`
  fragment HostedCourseFields on HostedCourse {
    id
    name
    description
    duration
    missionPartnerId
    createdAt
    updatedAt
    items
    status
  }
`;
*/

export const useUpdateHostedCourseItem = () => {
  const mutation = gql`
    mutation UpdateHostedCourseItem($input: HostedCourseItemInput!) {
      updateHostedCourseItem(input: $input)
    }
  `;
  const [updateHostedCourseItem, { loading, error, data }] = useMutation<
    UpdateHostedCourseItemMutation,
    UpdateHostedCourseItemMutationVariables
  >(mutation, {
    refetchQueries: ['FindHostedCourseItem']
  });
  return {
    updateHostedCourseItem: async (input: HostedCourseItemInput) =>
      updateHostedCourseItem({
        variables: {
          input
        }
      }),
    updateHostedCourseItemLoading: loading,
    updateHostedCourseItemError: error,
    updateHostedCourseItemData: data?.updateHostedCourseItem ?? STATIC_OBJECT
  };
};
