import { render, screen } from '@@/test-utils';
import AlertBanner from '../../src/components/alert-banner-notification/AlertBannerNotification';

const EMPTY_LINK_INNER = '<p></p>\n';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  InlineNotification: ({ subheading, onClose }) => (
    <>
      <div>{subheading}</div>
      {onClose && <button>CloseInlineNotification</button>}
    </>
  )
}));

describe('AlertBanner', () => {
  it('should render alert banner without crashing', () => {
    render(<AlertBanner heading="heading" subheading="<p>content</p>" />);

    expect(screen.getByText(/content/)).toBeInTheDocument();
    expect(
      screen.queryByText('CloseInlineNotification')
    ).not.toBeInTheDocument();
  });

  it('should show close ', () => {
    render(
      <AlertBanner
        heading="heading"
        subheading="<p>content</p>"
        canClose={true}
      />
    );

    expect(screen.getByText(/content/)).toBeInTheDocument();
    expect(screen.getByText('CloseInlineNotification')).toBeInTheDocument();
  });

  it('should show "content goes here " when subheading has <p></p>\n value ', () => {
    render(<AlertBanner heading="heading" subheading={EMPTY_LINK_INNER} />);

    expect(screen.getByText('Content goes here')).toBeInTheDocument();
  });

  it('should show no onClose when canClose is false', () => {
    render(
      <AlertBanner heading="heading" subheading="content" canClose={false} />
    );

    expect(
      screen.queryByText('CloseInlineNotification')
    ).not.toBeInTheDocument();
  });
});
