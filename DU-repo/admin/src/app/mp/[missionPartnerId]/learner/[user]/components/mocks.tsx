// user data for use in tests
import type { GetUserQuery } from '@/api/codegen/graphql';

export const userMock: GetUserQuery['getUser'] = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  branch: 'toon',
  userType: 'main character',
  grade: 'Head Toon',
  occupationalCode: '17TOON',
  metadata: {
    command: 'Toon Army',
    wing: 'Loney Toons',
    dutyStation: 'Toontown'
  },
  currentCareer: null
};
