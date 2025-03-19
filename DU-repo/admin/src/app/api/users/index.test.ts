import { sqlCreateUser, sqlFindUsers, sqlFindUsersBySearchText } from './index';

describe('make sure these functions exist', () => {
  it('sqlCreateUser', () => {
    expect(sqlCreateUser()).toBeDefined();
  });

  it('sqlFindUsers', () => {
    expect(sqlFindUsers()).toBeDefined();
  });

  it('sqlFindUsersBySearchText', () => {
    expect(sqlFindUsersBySearchText()).toBeDefined();
  });
});
