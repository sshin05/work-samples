import { BRANCH_MAP } from './BRANCH_MAP';

describe('BRANCH_MAP', () => {
  it('exports the expected branch types', () => {
    expect(BRANCH_MAP).toEqual({
      AIR_FORCE: 'Air Force',
      DIGITAL_UNIVERSITY: 'Digital University',
      GLOBAL: 'Global',
      SPACE_FORCE: 'Space Force'
    });
  });
});
