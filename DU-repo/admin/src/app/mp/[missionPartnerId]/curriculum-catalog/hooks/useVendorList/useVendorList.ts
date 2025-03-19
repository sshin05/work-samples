import { useFindAllVendors } from '@/api/vendor';

// todo - add types
export const useVendorList = ({ handleFilterChange }) => {
  const { vendors, vendorsReady } = useFindAllVendors();

  const vendorList = [
    {
      title: 'Any',
      onClick: () => handleFilterChange('vendor', null)
    },
    ...(vendors
      ?.map(vendor => ({
        title: vendor.name,
        onClick: () => {
          handleFilterChange('vendor', vendor);
        }
      }))
      .sort((first, second) => (first.title < second.title ? -1 : 1)) || [])
  ];

  return {
    vendorList,
    vendorsReady
  };
};
