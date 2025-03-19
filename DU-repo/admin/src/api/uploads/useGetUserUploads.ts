import { useQuery } from '@apollo/client';
import type {
  GetUserUploadsQuery,
  GetUserUploadsQueryVariables
} from '@/api/codegen/graphql';
import { useCallback, useMemo } from 'react';
import { GET_USER_UPLOADS_QUERY } from './queries/GET_USER_UPLOADS_QUERY';

const STATIC_ARRAY: never[] = [];

export const useGetUserUploads = () => {
  const { loading, error, data, refetch } = useQuery<
    GetUserUploadsQuery,
    GetUserUploadsQueryVariables
  >(GET_USER_UPLOADS_QUERY, {
    fetchPolicy: 'network-only'
  });
  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);
  return useMemo(
    () => ({
      uploadsLoading: loading,
      uploadsError: error,
      uploads: (data?.getUserUploads ||
        STATIC_ARRAY) as GetUserUploadsQuery['getUserUploads'],
      refetchUploads: handleRefetch
    }),
    [loading, error, data, handleRefetch]
  );
};
