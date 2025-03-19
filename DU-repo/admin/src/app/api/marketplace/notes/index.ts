'use client';

import type { createMarketplaceNote } from '@digital-u/services/marketplace/notes/create-marketplace-note';
import type { deleteMarketplaceNote } from '@digital-u/services/marketplace/notes/delete-marketplace-note';
import type { findMarketplaceNotes } from '@digital-u/services/marketplace/notes/find-marketplace-notes';
import type { getMarketplaceNote } from '@digital-u/services/marketplace/notes/get-marketplace-note';
import type { updateMarketplaceNote } from '@digital-u/services/marketplace/notes/update-marketplace-note';
import type { SQLRESTOptions, SQLServiceArguments } from '@/app/api';

export type GetMarketplaceNoteOptions = SQLServiceArguments<
  typeof getMarketplaceNote
>;

export function sqlGetMarketplaceNote(): SQLRESTOptions<
  typeof getMarketplaceNote
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/notes',
    name: 'get-marketplace-note'
  };
}

export type FindMarketplaceNotesOptions = SQLServiceArguments<
  typeof findMarketplaceNotes
>;

export function sqlFindMarketplaceNotes(): SQLRESTOptions<
  typeof findMarketplaceNotes
> {
  return {
    method: 'GET',
    route: '/admin/api/marketplace/notes',
    name: 'find-marketplace-notes'
  };
}

export type CreateMarketplaceNoteOptions = Omit<
  SQLServiceArguments<typeof createMarketplaceNote>,
  'modifyingUserId'
>;

export function sqlCreateMarketplaceNote(): SQLRESTOptions<
  typeof createMarketplaceNote,
  CreateMarketplaceNoteOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/notes',
    name: 'create-marketplace-note',
    invalidatesRoutes: ['/admin/api/marketplace/orders']
  };
}

export type DeleteMarketplaceNoteOptions = SQLServiceArguments<
  typeof deleteMarketplaceNote
>;

export function sqlDeleteMarketplaceNote(): SQLRESTOptions<
  typeof deleteMarketplaceNote
> {
  return {
    method: 'DELETE',
    route: '/admin/api/marketplace/notes',
    name: 'delete-marketplace-note',
    invalidatesRoutes: ['/admin/api/marketplace/orders']
  };
}

export type UpdateMarketplaceNoteOptions = Omit<
  SQLServiceArguments<typeof updateMarketplaceNote>,
  'modifyingUserId'
>;

export function sqlUpdateMarketplaceNote(): SQLRESTOptions<
  typeof updateMarketplaceNote,
  UpdateMarketplaceNoteOptions
> {
  return {
    method: 'POST',
    route: '/admin/api/marketplace/notes',
    name: 'update-marketplace-note',
    invalidatesRoutes: ['/admin/api/marketplace/orders']
  };
}
