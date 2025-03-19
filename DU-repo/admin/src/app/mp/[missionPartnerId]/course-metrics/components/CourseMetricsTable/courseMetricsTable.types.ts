export interface FilterValue {
  courseVendor?: string;
  courseStatus?: string;
}

export interface CourseMetricsTableProps {
  missionPartnerId: string;
  missionPartnerName: string;
}

export type CourseMetricsQueryFilters = {
  missionPartnerId?: string;
  vendorId?: string;
  search?: string;
  sortField?: string;
  sortDirection?: string;
  pageSize?: number;
  pageNumber?: number;
};
