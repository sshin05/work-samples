'use client';
const appApiBaseRoute = '/admin/api';

import type { getMissionPartner } from '@digital-u/services/mission-partner/get-mission-partner';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type getMissionPartnerOptions = SQLServiceArguments<
  typeof getMissionPartner
>;

export function sqlGetMissionPartner(): SQLRESTOptions<
  typeof getMissionPartner
> {
  return {
    method: 'GET',
    route: `${appApiBaseRoute}/mission-partner`,
    name: 'get-mission-partner'
  };
}

export function sqlGetMissionPartnerById(): SQLRESTOptions<
  typeof getMissionPartner,
  { id: string }
> {
  return {
    method: 'GET',
    route: `${appApiBaseRoute}/mission-partner`,
    name: 'get-mission-partner-by-id'
  };
}

export function sqlGetMissionPartnerBySlug(): SQLRESTOptions<
  typeof getMissionPartner,
  { slug: string }
> {
  return {
    method: 'GET',
    route: `${appApiBaseRoute}/mission-partner`,
    name: 'get-mission-partner-by-slug'
  };
}

export function sqlGetMissionPartnerByName(): SQLRESTOptions<
  typeof getMissionPartner,
  { name: string }
> {
  return {
    method: 'GET',
    route: `${appApiBaseRoute}/mission-partner`,
    name: 'get-mission-partner-by-name'
  };
}

export function sqlUpdateIsMarketplaceEnabled(): SQLRESTOptions<
  typeof getMissionPartner,
  { id: string; isMarketplaceEnabled: boolean }
> {
  return {
    method: 'POST',
    route: `${appApiBaseRoute}/mission-partner`,
    name: 'update-is-marketplace-enabled'
  };
}
