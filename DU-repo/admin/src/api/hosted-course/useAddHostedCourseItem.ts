import { gql, useMutation } from '@apollo/client';
import type {
  AddHostedCourseItemMutation,
  AddHostedCourseItemMutationVariables,
  HostedCourseItemInput
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

export const useAddHostedCourseItem = () => {
  const mutation = gql`
    mutation AddHostedCourseItem($input: HostedCourseItemInput!) {
      addHostedCourseItem(input: $input)
    }
  `;
  const [addHostedCourseItem, { loading, error, data }] = useMutation<
    AddHostedCourseItemMutation,
    AddHostedCourseItemMutationVariables
  >(mutation);
  return {
    addHostedCourseItem: async (input: HostedCourseItemInput) =>
      addHostedCourseItem({
        variables: {
          input
        }
      }),
    addHostedCourseItemLoading: loading,
    addHostedCourseItemError: error,
    addHostedCourseItemData: data?.addHostedCourseItem ?? STATIC_OBJECT
  };
};
