import { render, screen } from '@@/test-utils';
import SimplePaginationLayout from '../../src/components/simple-pagination-layout/SimplePaginationLayout';

const noData = 'No Data';

const props = {
  items: [],
  onLoadMore: jest.fn(),
  showLoadMore: false,
  emptyComponent: <div>{noData}</div>,
  ComponentItem: user => <div>{user.firstName}</div>
};

describe('<SimplePaginationLayout>', () => {
  beforeEach(() => {
    props.items = [
      {
        firstName: 'Johnny',
        id: 'Johnny'
      },
      {
        firstName: 'Terra',
        id: 'Terra'
      },
      {
        firstName: 'Adam',
        id: 'Adam'
      }
    ];
  });

  it('should handle an empty array', () => {
    props.items = [];
    render(<SimplePaginationLayout {...props} />);
    expect(screen.getByText(noData)).toBeInTheDocument();
  });

  it('should show items given without loadMore', () => {
    props.showLoadMore = false;
    render(<SimplePaginationLayout {...props} />);
    expect(screen.getByText(props.items[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(props.items[1].firstName)).toBeInTheDocument();
    expect(screen.getByText(props.items[2].firstName)).toBeInTheDocument();
    expect(screen.queryAllByText('LOAD MORE')).toHaveLength(0);
  });

  it('should show items and loadMore that is given', () => {
    props.showLoadMore = true;
    render(<SimplePaginationLayout {...props} />);
    expect(screen.getByText(props.items[0].firstName)).toBeInTheDocument();
    expect(screen.getByText(props.items[1].firstName)).toBeInTheDocument();
    expect(screen.getByText(props.items[2].firstName)).toBeInTheDocument();
    expect(screen.getByText('LOAD MORE')).toBeInTheDocument();
  });
});
