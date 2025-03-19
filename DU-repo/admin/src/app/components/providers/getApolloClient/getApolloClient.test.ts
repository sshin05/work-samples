import { getApolloClient } from './getApolloClient';

describe('get apollo client', () => {
  it('should return a new apollo client', () => {
    const client = getApolloClient();
    expect(client).toBeDefined();
  });
});
