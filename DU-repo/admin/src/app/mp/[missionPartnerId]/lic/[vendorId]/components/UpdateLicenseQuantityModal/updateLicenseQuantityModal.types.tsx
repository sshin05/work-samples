import type { ProvisionedLicensesInput } from '@/api/codegen/graphql';

export interface UpdateLicenseQuantityModalProps {
  vendor: ProvisionedLicensesInput;
  handleUpdateMissionPartner: (
    newVendorObject: ProvisionedLicensesInput
  ) => void;
  close: () => void;
}
