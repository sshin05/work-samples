import { type ApolloError, gql, useQuery } from '@apollo/client';
import type {
  GetUserQuery,
  GetUserQueryVariables
} from '@/api/codegen/graphql';

export type UseGetUser = {
  userLoading: boolean;
  userError: ApolloError;
  user: GetUserQuery['getUser'] | null;
};

export const useGetUser = (): UseGetUser => {
  const query = gql`
    query GetUser {
      getUser {
        id
        firstName
        lastName
        phoneNumber
        email
        photoUrl
        userType
        branch
        grade
        occupationalCode
        metadata
        trainingGroup
        currentCareer
        onboardingCompletedAt
        licenseOnboardingCompletedAt
        showThirdPartySiteWarning
        badgeNotifications
      }
    }
  `;
  const { loading, error, data } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(query);

  return {
    userLoading: loading,
    userError: error,
    user: data?.getUser || null
  };
};
