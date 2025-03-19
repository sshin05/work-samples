import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, waitFor } from '@@/test-utils';

import { useFindHostedExamById } from '../../../../src/api/hosted-exam';
import HostedExamPreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/HostedExamPreviewContainer';

jest.mock('../../../../src/api/hosted-exam');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: () => <div>Exam Preview</div>
}));

describe('HostedExamPreviewContainer', () => {
  const mockClient = createMockClient();
  const mockFindHostedExamById = jest.fn(() => Promise.resolve());

  it('should render on api success', async () => {
    useFindHostedExamById.mockReturnValue({
      hostedExamById: mockFindHostedExamById
    });

    const { getByText } = render(
      <ApolloProvider client={mockClient}>
        <HostedExamPreviewContainer
          item={{ vendorAssessmentId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(getByText('Exam Preview')).toBeInTheDocument();
    });
  });

  it('should render null on api loading', async () => {
    useFindHostedExamById.mockReturnValue({
      hostedExamByIdLoading: true
    });

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <HostedExamPreviewContainer
          item={{ vendorAssessmentId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});
