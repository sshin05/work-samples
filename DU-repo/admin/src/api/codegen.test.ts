import { graphql } from '../../src/api/codegen/gql';
import {
  makeFragmentData,
  useFragment
} from '../../src/api/codegen/fragment-masking';

describe('graphQL', () => {
  it('should return empty object', () => {
    expect(graphql.constructor.name).toBe('Function');
    expect(graphql('')).toEqual({});
  });
});
describe('fragmentmasking', () => {
  it('make fragment data', () => {
    expect(makeFragmentData.constructor.name).toBe('Function');
    expect(makeFragmentData([], undefined as any)).toEqual([]);
  });
  it('usefragment', () => {
    expect(useFragment.constructor.name).toBe('Function');
    expect(useFragment(undefined as any, null)).toEqual(null);
  });
});
