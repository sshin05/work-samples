import { screen, render } from '@@/test-utils';
import type { BreadcrumbPath } from '../../Breadcrumbs.types';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders as a link', () => {
    const breadcrumb = {
      href: '/mock-path',
      text: 'Mock Breadcrumb Text'
    } as BreadcrumbPath;

    render(<Breadcrumb breadcrumb={breadcrumb} displayAsText={false} />);

    expect(screen.getByText(breadcrumb.text)).toHaveAttribute(
      'href',
      breadcrumb.href
    );
  });

  it('renders as text', () => {
    const breadcrumb = {
      href: '/mock-path',
      text: 'Mock Breadcrumb Text'
    } as BreadcrumbPath;

    render(<Breadcrumb breadcrumb={breadcrumb} displayAsText={true} />);

    expect(screen.getByText(breadcrumb.text)).not.toHaveAttribute(
      'href',
      breadcrumb.href
    );
  });
});
