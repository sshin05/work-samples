import { useQuery } from '@apollo/client';
import type {
  GetUserDownloadsQuery,
  GetUserDownloadsQueryVariables
} from '@/api/codegen/graphql';
import { GET_USER_DOWNLOADS_QUERY } from './queries/GET_USER_DOWNLOADS_QUERY';

const STATIC_ARRAY: never[] = [];

export const useGetUserDownloads = () => {
  const { loading, error, data, refetch } = useQuery<
    GetUserDownloadsQuery,
    GetUserDownloadsQueryVariables
  >(GET_USER_DOWNLOADS_QUERY, {
    fetchPolicy: 'network-only'
  });
  const refetchDownloads = async () => refetch();
  return {
    downloadsLoading: loading,
    downloadsError: error,
    downloads: (data?.getUserDownloads ||
      STATIC_ARRAY) as GetUserDownloadsQuery['getUserDownloads'],
    refetchDownloads
  };
};
