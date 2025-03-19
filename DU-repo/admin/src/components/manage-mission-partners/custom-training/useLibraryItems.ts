import { useEffect } from 'react';

export const useLibraryItems = ({
  forceMultiplierById,
  forceMultiplierByIdLoading,
  uploadLibraryItemData,
  uploadLibraryItemLoading,
  deleteLibraryItemData,
  deleteLibraryItemLoading,
  setLibraryItems
}) => {
  useEffect(() => {
    if (forceMultiplierById && !forceMultiplierByIdLoading) {
      setLibraryItems(forceMultiplierById?.libraryItems ?? []);
    }
  }, [forceMultiplierById, forceMultiplierByIdLoading, setLibraryItems]);

  useEffect(() => {
    if (!uploadLibraryItemLoading && uploadLibraryItemData?.libraryItems) {
      setLibraryItems(uploadLibraryItemData.libraryItems);
    }
  }, [uploadLibraryItemData, uploadLibraryItemLoading, setLibraryItems]);

  useEffect(() => {
    if (!deleteLibraryItemLoading && deleteLibraryItemData) {
      setLibraryItems(deleteLibraryItemData.libraryItems);
    }
  }, [deleteLibraryItemData, deleteLibraryItemLoading, setLibraryItems]);
};
