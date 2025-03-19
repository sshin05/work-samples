export type BreadcrumbPath = {
  href?: string;
  text: string;
};

export interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbPath[];
  loading: boolean;
}
