import type { FindVendorByIdQuery } from '@/api/codegen/graphql';

export type LicensesTablePropTypes = {
  vendor: FindVendorByIdQuery['findVendorById'];
};
