import { VendorCard } from './components/VendorCard';
import { AddNewVendorCard } from './components/AddNewVendorCard';
import { css } from '@cerberus/styled-system/css';
import type { FindLicensedVendorsQuery } from '@/api/codegen/graphql';

interface VendorCardListProps {
  vendors: FindLicensedVendorsQuery['findLicensedVendors'];
}

export const VendorCardList = ({ vendors }: VendorCardListProps) => {
  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '4'
      })}
    >
      {vendors.map(vendor => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
      <AddNewVendorCard />
    </div>
  );
};
