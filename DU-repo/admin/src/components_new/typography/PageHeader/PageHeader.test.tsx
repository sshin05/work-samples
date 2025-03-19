import { render, screen } from '@@/test-utils';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('redners', () => {
    const headerText = 'Mock Header Text';

    render(<PageHeader>{headerText}</PageHeader>);

    expect(screen.getByText(headerText)).toBeInTheDocument();
  });
});
