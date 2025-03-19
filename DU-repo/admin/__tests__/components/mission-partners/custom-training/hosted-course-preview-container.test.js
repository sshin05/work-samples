import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, waitFor } from '@@/test-utils';

import { useFindHostedCourseById } from '../../../../src/api/hosted-course';
import HostedCoursePreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/HostedCoursePreviewContainer';

jest.mock('../../../../src/api/hosted-course');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: () => <div>Course Preview</div>
}));

describe('HostedCoursePreviewContainer', () => {
  const mockClient = createMockClient();
  const mockFindHostedCourseById = jest.fn(() => Promise.resolve());

  it('should render on api success', async () => {
    useFindHostedCourseById.mockReturnValue({
      hostedCourseById: mockFindHostedCourseById
    });

    const { getByText } = render(
      <ApolloProvider client={mockClient}>
        <HostedCoursePreviewContainer
          item={{ vendorCourseId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(getByText('Course Preview')).toBeInTheDocument();
    });
  });

  it('should render null on api loading', async () => {
    useFindHostedCourseById.mockReturnValue({
      hostedCourseByIdLoading: true
    });

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <HostedCoursePreviewContainer
          item={{ vendorCourseId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
