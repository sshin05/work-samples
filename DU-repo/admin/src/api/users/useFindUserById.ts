import { type ApolloError, gql, useQuery } from '@apollo/client';
import type {
  FindUserByIdQuery,
  FindUserByIdQueryVariables
} from '@/api/codegen/graphql';

const STATIC_OBJECT: any = {};

export type UseFindUserByIdResult = {
  readonly userByIdLoading: boolean;
  readonly userByIdError: ApolloError | undefined;
  readonly userById: FindUserByIdQuery['findUserById'] | typeof STATIC_OBJECT;
};

export const useFindUserById = (userId?: string): UseFindUserByIdResult => {
  const query = gql`
    query findUserById($userId: ID!) {
      findUserById(id: $userId) {
        id
        firstName
        lastName
        email
        userType
        branch
        grade
        metadata
        testRecord
        canAccessFullDu
        occupationalCode
        groupMemberships {
          groupName
          userId
          groupId
        }
        photoUrl
        metadata
        lastLoginAt
        keycloakUserCreatedAt
        totalTimeTrained
        skills
      }
    }
  `;

  const { loading, error, data } = useQuery<
    FindUserByIdQuery,
    FindUserByIdQueryVariables
  >(query, {
    variables: {
      userId
    },
    skip: !userId
  });

  return {
    userByIdLoading: loading,
    userByIdError: error,
    userById: data?.findUserById || STATIC_OBJECT
  };
};
