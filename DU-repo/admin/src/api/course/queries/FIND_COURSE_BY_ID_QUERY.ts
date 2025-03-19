import { gql } from '@apollo/client';

export const FIND_COURSE_BY_ID_QUERY = gql`
  query FindCourseById($id: ID!) {
    findCourseById(id: $id) {
      id
      courseTitle
      courseDescription
      courseDuration
      courseImage
      dateUpdated
      courseUrl
      vendorName
      vendorCourseId
      vendorId
      source
    }
  }
`;
