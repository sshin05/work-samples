import { useLazyQuery } from '@apollo/client';
import type {
  FindCourseByIdQuery,
  FindCourseByIdQueryVariables
} from '@/api/codegen/graphql';
import { useCallback, useMemo } from 'react';
import { FIND_COURSE_BY_ID_QUERY } from './queries/FIND_COURSE_BY_ID_QUERY';

const STATIC_ARRAY = [];

export const useFindCourseById = () => {
  const [getCourse, { loading, error, data }] = useLazyQuery<
    FindCourseByIdQuery,
    FindCourseByIdQueryVariables
  >(FIND_COURSE_BY_ID_QUERY);
  const fetchCourse = useCallback(
    (input: { id: string }) => {
      getCourse({
        variables: input
      });
    },
    [getCourse]
  );
  return useMemo(
    () => ({
      fetchCourse,
      courseByIdLoading: loading,
      courseByIdError: error,
      courseById: (data?.findCourseById ||
        STATIC_ARRAY) as FindCourseByIdQuery['findCourseById']
    }),
    [loading, error, data, fetchCourse]
  );
};
