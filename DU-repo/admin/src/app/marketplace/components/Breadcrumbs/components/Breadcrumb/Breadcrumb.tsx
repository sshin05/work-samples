import React from 'react';
import Link from 'next/link';
import type { BreadcrumbPath } from '../../Breadcrumbs.types';

interface BreadcrumbProps {
  breadcrumb: BreadcrumbPath;
  displayAsText: boolean;
}

export const Breadcrumb = ({ breadcrumb, displayAsText }: BreadcrumbProps) => {
  if (displayAsText) {
    return <span>{breadcrumb.text}</span>;
  }

  return <Link href={breadcrumb.href}>{breadcrumb.text}</Link>;
};
