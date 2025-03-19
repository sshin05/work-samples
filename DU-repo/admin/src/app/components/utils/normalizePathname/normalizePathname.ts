export const normalizePathname = (path: string = '') => {
  return path
    .split('?')[0] // Remove query parameters
    .split('#')[0] // Remove hash fragments
    .toLowerCase(); // Convert to lowercase for case-insensitive comparison
};
