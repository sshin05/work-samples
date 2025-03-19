import { useContext } from 'react';
import { screen } from '@@/test-utils';
import { render } from '@testing-library/react';
import { ContentSectionHeader } from '../ContentSectionHeader/ContentSectionHeader';
import { SubPageContainer } from './SubPageContainer';
import type { CreateCohortContentComponentProps } from '../../pages/CreateCohortPage/CreateCohortPage.types';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

jest.mock('../ContentSectionHeader/ContentSectionHeader', () => ({
  ContentSectionHeader: jest.fn(() => <div></div>)
}));

describe('SubPageContainer', () => {
  const defaultProps: {
    createCohortSubPageDetail: CreateCohortContentComponentProps;
    children: React.ReactNode;
  } = {
    createCohortSubPageDetail: {
      title: 'Test Title',
      description: 'Test Description'
    },
    children: <div>Child Content</div>
  };

  it('renders the ContentSectionHeader with the correct props', () => {
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: false
    });

    render(<SubPageContainer {...defaultProps} />);

    expect(ContentSectionHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        title: defaultProps.createCohortSubPageDetail.title,
        description: defaultProps.createCohortSubPageDetail.description,
        Icon: defaultProps.createCohortSubPageDetail.Icon
      }),
      undefined
    );
  });

  it('renders child content', () => {
    (useContext as jest.Mock).mockReturnValue({
      isLoadingCohort: false
    });

    render(<SubPageContainer {...defaultProps} />);

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
