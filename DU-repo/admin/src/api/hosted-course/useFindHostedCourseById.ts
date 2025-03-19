import { gql, useQuery } from '@apollo/client';
import type {
  FindHostedCourseByIdQuery,
  FindHostedCourseByIdQueryVariables
} from '@/api/codegen/graphql';

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

export const useFindHostedCourseById = (
  id: FindHostedCourseByIdQueryVariables['id']
) => {
  const query = gql`
    query FindHostedCourseById($id: ID!) {
      findHostedCourseById(id: $id) {
        id
        name
        description
        duration
        missionPartnerId
        createdAt
        updatedAt
        items
        status
        __typename
      }
    }
  `;
  const { refetch, loading, error, data } = useQuery<
    FindHostedCourseByIdQuery,
    FindHostedCourseByIdQueryVariables
  >(query, {
    skip: !id,
    variables: {
      id
    },
    fetchPolicy: 'network-only'
  });
  return {
    hostedCourseByIdLoading: loading,
    hostedCourseByIdError: error,
    hostedCourseById: data?.findHostedCourseById,
    fetchHostedCourseById: async (
      id: FindHostedCourseByIdQueryVariables['id']
    ) =>
      refetch({
        id
      })
  };
};
