export interface ItemLinkDetails {
  planSourceId: string;
  planType: string;
  title: string;
  totalAssigned: number;
  totalCompleted: number;
  totalEnrolled: number;
  totalInProgress: number;
  totalStopped: number;
}

export interface ItemTextDetails {
  courseTitle: string;
  totalCompleted: number;
  totalEnrolled: number;
  totalInProgress: number;
  totalPendingReview: number;
  totalStopped: number;
  vendorName: string;
}

export interface TopItemsProps {
  missionPartnerId: string;
  topItemsCategory: 'Plans' | 'Courses';
}

export interface TopItemsLinkProps {
  href: string;
  title: string;
}

export interface TopItemsTextProps {
  title: string;
}
