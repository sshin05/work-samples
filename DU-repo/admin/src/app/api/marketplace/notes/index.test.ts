import {
  sqlGetMarketplaceNote,
  sqlFindMarketplaceNotes,
  sqlCreateMarketplaceNote,
  sqlDeleteMarketplaceNote,
  sqlUpdateMarketplaceNote
} from './index';

describe('make sure these functions exist', () => {
  it('sqlGetMarketplaceNote', () => {
    expect(sqlGetMarketplaceNote()).toBeDefined();
  });

  it('sqlFindMarketplaceNotes', () => {
    expect(sqlFindMarketplaceNotes()).toBeDefined();
  });

  it('sqlCreateMarketplaceNote', () => {
    expect(sqlCreateMarketplaceNote()).toBeDefined();
  });

  it('sqlDeleteMarketplaceNote', () => {
    expect(sqlDeleteMarketplaceNote()).toBeDefined();
  });

  it('sqlUpdateMarketplaceNote', () => {
    expect(sqlUpdateMarketplaceNote()).toBeDefined();
  });
});
