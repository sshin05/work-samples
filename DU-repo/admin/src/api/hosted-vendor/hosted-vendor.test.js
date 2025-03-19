import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { render } from '@testing-library/react';
import { useCreateHostedVendor } from './useCreateHostedVendor';
import { useFindAllHostedVendors } from './useFindAllHostedVendors';
import { useFindHostedVendorById } from './useFindHostedVendorById';
import { useUpdateHostedVendor } from './useUpdateHostedVendor';
import { useUploadHostedVendorLogo } from './useUploadHostedVendorLogo';

jest.mock('@apollo/client');

const HostedVendorTest = () => {
  const { allHostedVendors } = useFindAllHostedVendors();

  const { createHostedVendors } = useCreateHostedVendor();

  const { updateHostedVendor } = useUpdateHostedVendor();

  const { uploadHostedVendorLogo } = useUploadHostedVendorLogo();

  updateHostedVendor();

  uploadHostedVendorLogo();

  return allHostedVendors && createHostedVendors ? <div>test</div> : null;
};

describe('hosted vendor test', () => {
  it('should use hosted vendor hook without error', () => {
    const data = {};

    useQuery.mockReturnValue({ loading: false, error: false, data });
    useLazyQuery.mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    useMutation.mockReturnValue([
      () => {
        // Intentionally left empty.
      },
      { loading: false, error: false, data }
    ]);
    render(<HostedVendorTest />);

    expect(useQuery).toHaveBeenCalled();
  });

  it('should return findHostedVendorById', () => {
    useQuery.mockReturnValue({ loading: false, error: false, data: {} });

    expect(useFindHostedVendorById()).toEqual(
      expect.objectContaining({
        hostedVendorByIdLoading: false,
        hostedVendorByIdError: false,
        hostedVendorById: {}
      })
    );
  });
});
