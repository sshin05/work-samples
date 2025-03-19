/**
 * This module contains global types
 * */

/**
 * This is the type of the page props that are passed to the page components
 */
export type PageProps = {
  params: Promise<{
    missionPartnerId?: string;
  }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    tab?: string;
  }>;
};
