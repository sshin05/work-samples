/**
 * Extracts the mission partner ID from a URL.
 *
 * This file is necessary because when redirected to the not-found page, useParams() does not return params from the url in the browser,
 *   but instead returns the params from `/admin/not-found`
 */
export const getMissionPartnerIdFromUrl = (url: string = '') => {
  if (!url) {
    return null;
  }

  const urlParts = url.split('/');
  const mpIndex = urlParts.indexOf('mp');

  if (mpIndex !== -1 && mpIndex + 1 < urlParts.length) {
    return urlParts[mpIndex + 1];
  }

  return null;
};
