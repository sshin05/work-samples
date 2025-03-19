import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import type {
  CountAllCoursesQuery,
  CountAllCoursesQueryVariables
} from '../codegen/graphql';

export const useCountAllCourses = () => {
  const query = gql`
    query CountAllCourses {
      countAllCourses {
        total
      }
    }
  `;
  const { loading, error, data } = useQuery<
    CountAllCoursesQuery,
    CountAllCoursesQueryVariables
  >(query);

  return useMemo(
    () => ({
      countAllCoursesLoading: loading,
      countAllCoursesError: error,
      countAllCourses: data?.countAllCourses?.total
    }),
    [loading, error, data]
  );
};
