import { renderV3, screen } from '@@/test-utils';
import { DomainTab } from './DomainTab';

jest.mock('./components/CreateDomainModal', () => ({
  CreateDomainModal: () => <div>CreateDomainModal</div>
}));

const mockDomain = {
  id: '06aa4d38-8b42-4382-8796-bc01157268fe',
  name: 'Collaboration',
  shortDescription: 'Biz School',
  description:
    'This "business school" style unit focuses on how to be a good partner to members of internal and external teams'
};

const mockDomainData = {
  findDomains: {
    data: [mockDomain],
    total: 1
  }
};

jest.mock('@/api/dcwf/domain/useFindDomains', () => ({
  useFindDomains: () => ({
    data: mockDomainData,
    isLoading: false,
    isError: false
  })
}));

describe('DomainTab', () => {
  it('should render', () => {
    renderV3(<DomainTab />);

    const [domain, shortDescription, description, view] =
      screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Description');
    expect(shortDescription).toHaveTextContent('Short description');
    expect(domain).toHaveTextContent('Domain');
    expect(view).toHaveTextContent('');
    expect(
      screen.getByRole('button', { name: 'add Create Domain' })
    ).toBeInTheDocument();
    expect(screen.getByText('CreateDomainModal')).toBeInTheDocument();
  });
});
