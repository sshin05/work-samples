import { renderV3, screen } from '@@/test-utils';
import { DomainTab } from './DomainTab';

const mockDomain = {
  findDomain: {
    data: [
      {
        id: '00000000-0000-0000-0000-000000000000',
        description: 'Test Description',
        domain: {
          id: '1234',
          name: 'Test Domain'
        }
      }
    ],
    total: 1
  }
};

jest.mock('@/api/dcwf/domain/useFindDomains', () => ({
  useFindDomains: () => ({
    data: mockDomain,
    isLoading: false,
    isError: false
  })
}));

jest.mock(
  '@/app/sys/dcwf/components/DcwfPage/components/DcwfTabs/components/DomainTab/components/CreateDomainModal',
  () => ({
    CreateDomainModal: () => <div>CreateDomainModal</div>
  })
);

describe('DomainTab', () => {
  it('should render', () => {
    renderV3(<DomainTab ksatId="1234" />);

    const [description, view] = screen.getAllByRole('columnheader');

    expect(description).toHaveTextContent('Domain');
    expect(view).toHaveTextContent('Short description');
  });
});
