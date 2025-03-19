import {
  sqlGetMissionPartner,
  sqlGetMissionPartnerByName,
  sqlGetMissionPartnerById,
  sqlGetMissionPartnerBySlug,
  sqlUpdateIsMarketplaceEnabled
} from './index';

describe('make sure these functions exist', () => {
  it('sqlGetMissionPartner', () => {
    expect(sqlGetMissionPartner()).toBeDefined();
  });

  it('sqlGetMissionPartnerByName', () => {
    expect(sqlGetMissionPartnerByName()).toBeDefined();
  });

  it('sqlGetMissionPartnerById', () => {
    expect(sqlGetMissionPartnerById()).toBeDefined();
  });

  it('sqlGetMissionPartnerBySlug', () => {
    expect(sqlGetMissionPartnerBySlug()).toBeDefined();
  });

  it('sqlUpdateIsMarketplaceEnabled', () => {
    expect(sqlUpdateIsMarketplaceEnabled()).toBeDefined();
  });
});
