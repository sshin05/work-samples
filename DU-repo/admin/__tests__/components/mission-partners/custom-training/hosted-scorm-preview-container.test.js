import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, waitFor } from '@@/test-utils';

import { useFindHostedScormById } from '../../../../src/api/hosted-scorm';
import HostedScormPreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/HostedScormPreviewContainer';

jest.mock('../../../../src/api/hosted-scorm');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: () => <div>Scorm Preview</div>
}));

describe('HostedScormPreviewContainer', () => {
  const mockClient = createMockClient();
  const mockFindHostedScormById = jest.fn(() => Promise.resolve());

  it('should render on api success', async () => {
    useFindHostedScormById.mockReturnValue({
      hostedScormById: mockFindHostedScormById
    });

    const { getByText } = render(
      <ApolloProvider client={mockClient}>
        <HostedScormPreviewContainer
          item={{ vendorCourseId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(getByText('Scorm Preview')).toBeInTheDocument();
    });
  });

  it('should render null on api loading', async () => {
    useFindHostedScormById.mockReturnValue({
      hostedScormByIdLoading: true
    });

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <HostedScormPreviewContainer
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
