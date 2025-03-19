import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { noop } from 'lodash';
import { useCreateForceMultiplier } from './useCreateForceMultiplier';
import { useCreateNewForceMultiplierVersion } from './useCreateNewForceMultiplierVersion';
import { useDeleteLibraryItem } from './useDeleteLibraryItem';
import { useFindLatestForceMultiplierById } from './useFindLatestForceMultiplierById';
import { useFindLatestForceMultiplierByIdAdmin } from './useFindLatestForceMultiplierByIdAdmin';
import { useRemoveItemFromForceMultiplier } from './useRemoveItemFromForceMultiplier';
import { useUpdateForceMultiplier } from './useUpdateForceMultiplier';
import { useUpdateForceMultiplierContent } from './useUpdateForceMultiplierContent';
import { useUpdateLibraryItems } from './useUpdateLibraryItems';
import { useUploadForceMultiplierImage } from './useUploadForceMultiplierImage';
import { useUploadLibraryItem } from './useUploadLibraryItem';
import { render, screen } from '@@/test-utils';

jest.mock('@apollo/client');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

describe('force multipliers test', () => {
  afterEach(() => jest.clearAllMocks());
  describe('useUpdateForceMultiplier', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        { loading: false, error: false, data: { updateForceMultiplier: {} } }
      ]);
    });

    it('should use updateForceMultiplier hook without error', () => {
      const {
        updateForceMultiplier,
        updateForceMultiplierLoading,
        updateForceMultiplierError,
        updateForceMultiplierData
      } = useUpdateForceMultiplier();

      expect(updateForceMultiplier).toBeInstanceOf(Function);
      expect(updateForceMultiplierLoading).toBe(false);
      expect(updateForceMultiplierError).toBe(false);
      expect(updateForceMultiplierData).toEqual({});
    });
  });

  describe('useFindLatestForceMultiplierById', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        loading: false,
        error: false,
        data: { findLatestForceMultiplierById: {} }
      });
    });

    it('should return data', () => {
      const {
        forceMultiplierByIdLoading,
        forceMultiplierByIdError,
        forceMultiplierById,
        fetchForceMultiplierById
      } = useFindLatestForceMultiplierById();

      expect(forceMultiplierByIdLoading).toBe(false);
      expect(forceMultiplierByIdError).toBe(false);
      expect(forceMultiplierById).toEqual({});
      expect(fetchForceMultiplierById).toBeInstanceOf(Function);
    });
  });

  describe('useFindLatestForceMultiplierByIdAdmin', () => {
    let mockSetState;

    beforeEach(() => {
      useQuery.mockReturnValue({
        refetch: jest.fn(() => Promise.resolve()),
        loading: false,
        error: false,
        data: { findLatestForceMultiplierByIdAdmin: {} }
      });

      mockSetState = jest.fn();
      useState.mockImplementation(initial => [initial, mockSetState]);
    });

    it('should return data', () => {
      const {
        forceMultiplierByIdLoading,
        forceMultiplierByIdError,
        forceMultiplierById,
        fetchForceMultiplierById
      } = useFindLatestForceMultiplierByIdAdmin();

      expect(forceMultiplierByIdLoading).toBe(false);
      expect(forceMultiplierByIdError).toBe(false);
      expect(forceMultiplierById).toEqual({});
      expect(fetchForceMultiplierById).toBeInstanceOf(Function);
    });

    it('should set isRefetchLoading when refetch is called', async () => {
      const { fetchForceMultiplierById } =
        useFindLatestForceMultiplierByIdAdmin();

      await fetchForceMultiplierById('123');

      expect(mockSetState).toHaveBeenCalledWith(true);
      expect(mockSetState).toHaveBeenCalledWith(false);
    });
  });

  describe('useCreateForceMultiplier', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        { loading: false, error: false, data: {} }
      ]);
    });

    it('should return data', () => {
      const {
        createForceMultiplier,
        createForceMultiplierLoading,
        createForceMultiplierError,
        createForceMultiplierData
      } = useCreateForceMultiplier();

      expect(createForceMultiplier).toBeInstanceOf(Function);
      expect(createForceMultiplierLoading).toBe(false);
      expect(createForceMultiplierError).toBe(false);
      expect(createForceMultiplierData).toEqual({});
    });
  });

  describe('useUpdateForceMultiplier', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        { loading: false, error: false, data: { updateForceMultiplier: {} } }
      ]);
    });

    it('should use updateForceMultiplier hook without error', () => {
      const {
        updateForceMultiplier,
        updateForceMultiplierLoading,
        updateForceMultiplierError,
        updateForceMultiplierData
      } = useUpdateForceMultiplier();

      expect(updateForceMultiplier).toBeInstanceOf(Function);
      expect(updateForceMultiplierLoading).toBe(false);
      expect(updateForceMultiplierError).toBe(false);
      expect(updateForceMultiplierData).toEqual({});
    });
  });

  describe('useUpdateForceMultiplierContent', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        {
          loading: false,
          error: false,
          data: { updateForceMultiplierContent: [] }
        }
      ]);
    });

    it('should use updateForceMultiplierContent hook without error', () => {
      const {
        updateForceMultiplierContent,
        updateForceMultiplierContentLoading,
        updateForceMultiplierContentError,
        updateForceMultiplierContentData
      } = useUpdateForceMultiplierContent();

      expect(updateForceMultiplierContent).toBeInstanceOf(Function);
      expect(updateForceMultiplierContentLoading).toBe(false);
      expect(updateForceMultiplierContentError).toBe(false);
      expect(updateForceMultiplierContentData).toEqual([]);
    });
  });

  describe('useRemoveItemFromForceMultiplier', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        {
          loading: false,
          error: false,
          data: { removeItemFromForceMultiplier: {} }
        }
      ]);
    });

    it('should use removeItemFromForceMultiplier hook without error', () => {
      const {
        removeItemFromForceMultiplier,
        removeItemFromForceMultiplierLoading,
        removeItemFromForceMultiplierError,
        removeItemFromForceMultiplierData
      } = useRemoveItemFromForceMultiplier();

      expect(removeItemFromForceMultiplier).toBeInstanceOf(Function);
      expect(removeItemFromForceMultiplierLoading).toBe(false);
      expect(removeItemFromForceMultiplierError).toBe(false);
      expect(removeItemFromForceMultiplierData).toEqual({});
    });
  });

  describe('useCreateNewForceMultiplierVersion', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        {
          loading: false,
          error: false,
          data: {}
        }
      ]);
    });

    it('should use createNewForceMultiplierVersion hook without error', () => {
      const {
        createNewForceMultiplierVersion,
        createNewForceMultiplierVersionLoading,
        createNewForceMultiplierVersionError,
        createNewForceMultiplierVersionData
      } = useCreateNewForceMultiplierVersion();

      expect(createNewForceMultiplierVersion).toBeInstanceOf(Function);
      expect(createNewForceMultiplierVersionLoading).toBe(false);
      expect(createNewForceMultiplierVersionError).toBe(false);
      expect(createNewForceMultiplierVersionData).toEqual({});
    });
  });

  describe('useUploadForceMultiplierImage', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        {
          loading: false,
          error: false,
          data: { uploadForceMultiplierImage: {} }
        }
      ]);
    });

    it('should use uploadForceMultiplierImage hook without error', () => {
      const {
        uploadForceMultiplierImage,
        uploadForceMultiplierImageLoading,
        uploadForceMultiplierImageError,
        uploadForceMultiplierImageData
      } = useUploadForceMultiplierImage();

      expect(uploadForceMultiplierImage).toBeInstanceOf(Function);
      expect(uploadForceMultiplierImageLoading).toBe(false);
      expect(uploadForceMultiplierImageError).toBe(false);
      expect(uploadForceMultiplierImageData).toEqual({});
    });
  });

  describe('useDeleteLibraryItem', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        noop,
        {
          loading: false,
          error: false,
          data: { deleteLibraryItemData: {} }
        }
      ]);
    });

    it('should use the delete library item hook without error', () => {
      const {
        deleteLibraryItem,
        deleteLibraryItemLoading,
        deleteLibraryItemError,
        deleteLibraryItemData
      } = useDeleteLibraryItem();

      expect(deleteLibraryItem).toBeInstanceOf(Function);
      expect(deleteLibraryItemLoading).toBe(false);
      expect(deleteLibraryItemError).toBe(false);
      expect(deleteLibraryItemData).toEqual(null);
    });
  });

  describe('useUploadLibraryItem', () => {
    const UploadLibraryItem = () => {
      const { uploadLibraryItemData, uploadLibraryItem } =
        useUploadLibraryItem();
      uploadLibraryItem({
        input: {
          forceMultiplierId: 'fm',
          missionPartnerId: 'missionPartnerId',
          name: 'name',
          type: 'type',
          version: 'version'
        }
      });

      return <p data-result={String(uploadLibraryItemData)}>test</p>;
    };

    it('should use the upload library item hook without error', () => {
      useMutation.mockReturnValue([
        () => {
          // Intentionally left empty.
        },
        { loading: false, error: false, data: { uploadLibraryItemData: null } }
      ]);
      render(<UploadLibraryItem />);
      expect(screen.getByText('test')).toHaveAttribute('data-result', 'null');
    });
  });

  describe('useUpdateLibraryItems', () => {
    beforeEach(() => {
      useMutation.mockReturnValue([
        noop,
        {
          loading: false,
          error: false,
          data: { updateLibraryItemData: {} }
        }
      ]);
    });

    it('should use the update libary item hook without error', () => {
      const {
        updateLibraryItems,
        updateLibraryItemsData,
        updateLibraryItemsLoading,
        updateLibraryItemsError
      } = useUpdateLibraryItems();

      expect(updateLibraryItems).toBeInstanceOf(Function);
      expect(updateLibraryItemsLoading).toBe(false);
      expect(updateLibraryItemsError).toBe(false);
      expect(updateLibraryItemsData).toEqual(null);
    });
  });
});
