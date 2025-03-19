import {
  sqlGetCohort,
  sqlFindCohorts,
  sqlFindCohortMembers,
  sqlCreateCohort,
  sqlUpdateCohort,
  sqlGetTranscriptCohort,
  sqlUpdateTranscriptCohort,
  sqlAddCohortMember,
  sqlRemoveCohortMember,
  sqlAddCohortInstructor,
  sqlRemoveCohortInstructor,
  sqlAddLibraryItem,
  sqlRemoveLibraryItem
} from './index';

describe('make sure these functions exist', () => {
  it('sqlGetCohort', () => {
    expect(sqlGetCohort()).toBeDefined();
  });
  it('sqlFindCohorts', () => {
    expect(sqlFindCohorts()).toBeDefined();
  });
  it('sqlFindCohortMembers', () => {
    expect(sqlFindCohortMembers()).toBeDefined();
  });
  it('sqlCreateCohort', () => {
    expect(sqlCreateCohort()).toBeDefined();
  });
  it('sqlUpdateCohort', () => {
    expect(sqlUpdateCohort()).toBeDefined();
  });
  it('sqlGetTranscriptCohort', () => {
    expect(sqlGetTranscriptCohort()).toBeDefined();
  });
  it('sqlUpdateTranscriptCohort', () => {
    expect(sqlUpdateTranscriptCohort()).toBeDefined();
  });
  it('sqlAddCohortMember', () => {
    expect(sqlAddCohortMember()).toBeDefined();
  });
  it('sqlRemoveCohortMember', () => {
    expect(sqlRemoveCohortMember()).toBeDefined();
  });
  it('sqlAddCohortInstructor', () => {
    expect(sqlAddCohortInstructor()).toBeDefined();
  });
  it('sqlRemoveCohortInstructor', () => {
    expect(sqlRemoveCohortInstructor()).toBeDefined();
  });
  it('sqlAddLibraryItem', () => {
    expect(sqlAddLibraryItem()).toBeDefined();
  });
  it('sqlRemoveLibraryItem', () => {
    expect(sqlRemoveLibraryItem()).toBeDefined();
  });
});
