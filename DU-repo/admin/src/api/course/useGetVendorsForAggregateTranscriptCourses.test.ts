import { renderHook } from '@@/test-utils';
import { useQuery } from '@apollo/client';
import { useGetVendorsForAggregateTranscriptCourses } from './useGetVendorsForAggregateTranscriptCourses';

jest.mock('@apollo/client');

describe('useGetVendorsForAggregateTranscriptCourses', () => {
  it('should fetch vendors for aggregate transcript courses without error', () => {
    (useQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        getVendorsForAggregateTranscriptCourses: [
          { vendorName: 'Vendor A', vendorId: '123' }
        ]
      }
    });

    const { result } = renderHook(() =>
      useGetVendorsForAggregateTranscriptCourses({
        missionPartnerId: 'partnerId'
      })
    );

    expect(
      result.current.getVendorsForAggregateTranscriptCourses[0].vendorName
    ).toBe('Vendor A');
  });
});
