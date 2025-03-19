import { renderV3, screen } from '@@/test-utils';
import { DcwfPage } from './DcwfPage';

jest.mock('@/components_new/layout/MainContentVStack', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}));

jest.mock('@/components_new/typography/PageHeader', () => ({
  __esModule: true,
  PageHeader: ({ children }) => <div>{children}</div>
}));

jest.mock('./components/DcwfTabs', () => ({
  __esModule: true,
  DcwfTabs: () => <div>DcwfTabs content</div>
}));

describe('DcwfPage', () => {
  it('should render', () => {
    renderV3(<DcwfPage />);

    expect(
      screen.getByText('Content relationship mapping')
    ).toBeInTheDocument();
    expect(screen.getByText('DcwfTabs content')).toBeInTheDocument();
  });
});
