import { screen, render } from '@@/test-utils';
import { ProductTypeTag } from './ProductTypeTag';

describe('ProductTypeTag', () => {
  it('renders a training tag', () => {
    render(<ProductTypeTag productType="TRAINING" />);

    expect(screen.getByText('Training')).toBeInTheDocument();
  });

  it('renders a resource tag', () => {
    render(<ProductTypeTag productType="RESOURCE" />);

    expect(screen.getByText('Resource')).toBeInTheDocument();
  });
});
