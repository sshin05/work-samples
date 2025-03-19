import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { VendorCards } from './VendorCards';
import type { sqlFindMarketplaceVendors } from '@/app/api/marketplace/vendors';

const mockVendors: Awaited<
  ReturnType<typeof sqlFindMarketplaceVendors>
>['_serviceData']['records'] = [
  {
    id: 'v1',
    name: 'V1',
    description: 'V1 desc',
    uniqueTag: 'v1tag',
    logoPath: 'https://example.com/1.png',
    imagePath: 'https://example.com/1.png',
    _idx: 0,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _table: 'marketplace_vendors',
    isArchived: false,
    shortDescription: 'short desc'
  },
  {
    id: 'v2',
    name: 'V2',
    description: 'V2 desc',
    uniqueTag: 'v2tag',
    logoPath: 'https://example.com/2.png',
    imagePath: 'https://example.com/2.png',
    _idx: 1,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _table: 'marketplace_vendors',
    isArchived: false,
    shortDescription: 'short desc 2'
  }
];

describe('VendorCards', () => {
  describe('Basic Render', () => {
    it('renders a list of vendor cards based on props', () => {
      renderV3(
        <VendorCards missionPartnerId="partner-123" vendors={mockVendors} />
      );

      mockVendors.forEach(vendor => {
        expect(screen.getByText(vendor.name)).toBeInTheDocument();
        expect(screen.getByText(vendor.shortDescription)).toBeInTheDocument();
      });
    });
  });
});
