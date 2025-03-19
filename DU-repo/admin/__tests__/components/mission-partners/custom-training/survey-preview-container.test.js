import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createMockClient } from 'mock-apollo-client';
import { render, waitFor } from '@@/test-utils';

import { useFindSurveyById } from '../../../../src/api/survey';
import SurveyPreviewContainer from '../../../../src/components/manage-mission-partners/custom-training/SurveyPreviewContainer';

jest.mock('../../../../src/api/survey');
jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  HostedContentModal: () => <div>Survey Preview</div>
}));

describe('SurveyPreviewContainer', () => {
  const mockClient = createMockClient();
  const mockFindSurveyById = jest.fn(() => Promise.resolve());

  it('should render on api success', async () => {
    useFindSurveyById.mockReturnValue({
      surveyById: mockFindSurveyById
    });

    const { getByText } = render(
      <ApolloProvider client={mockClient}>
        <SurveyPreviewContainer
          item={{ vendorCourseId: '123', vendorName: 'Vendor' }}
          onClose={() => {}}
        />
      </ApolloProvider>
    );

    await waitFor(() => {
      expect(getByText('Survey Preview')).toBeInTheDocument();
    });
  });

  it('should render null on api loading', async () => {
    useFindSurveyById.mockReturnValue({
      surveyByIdLoading: true
    });

    const { container } = render(
      <ApolloProvider client={mockClient}>
        <SurveyPreviewContainer
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
