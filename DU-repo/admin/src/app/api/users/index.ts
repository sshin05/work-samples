'use client';
const appApiBaseRoute = '/admin/api';

import type { findUsers } from '@digital-u/services/user/find-users';
import type { createUser } from '@digital-u/services/user/create-user';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type FindUsersOptions = SQLServiceArguments<typeof findUsers>;

export function sqlFindUsers(): SQLRESTOptions<typeof findUsers> {
  return {
    method: 'GET',
    route: '/admin/api/users',
    name: 'find-users'
  };
}

export function sqlFindUsersBySearchText(): Omit<
  SQLRESTOptions<typeof findUsers>,
  '_serviceOptions'
> & {
  _serviceOptions?: { search: string };
} {
  return {
    method: 'GET',
    route: `${appApiBaseRoute}/users`,
    name: 'find-users-by-search-text'
  };
}

export function sqlCreateUser(): SQLRESTOptions<typeof createUser> {
  return {
    method: 'POST',
    route: `${appApiBaseRoute}/users`,
    name: 'create-user'
  };
}
