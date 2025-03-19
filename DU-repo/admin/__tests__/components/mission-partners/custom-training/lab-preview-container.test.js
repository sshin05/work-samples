import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, waitFor } from '@@/test-utils';

import { useFindLabById } from '../../../../src/api/lab';
import LabPreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/LabPreviewContainer';

jest.mock('../../../../src/api/lab');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: () => <div>Lab Preview</div>
}));

describe('LabPreviewContainer', () => {
  const mockClient = createMockClient();
  const mockFindLabById = jest.fn(() => Promise.resolve());

  it('should render on api success', async () => {
    useFindLabById.mockReturnValue({
      findLabById: mockFindLabById
    });

    const { getByText } = render(
      <ApolloProvider client={mockClient}>
        <LabPreviewContainer
          item={{ vendorCourseId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(getByText('Lab Preview')).toBeInTheDocument();
    });
  });

  it('should render null on api loading', async () => {
    useFindLabById.mockReturnValue({
      findLabByIdLoading: true
    });

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <LabPreviewContainer
          item={{ id: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
