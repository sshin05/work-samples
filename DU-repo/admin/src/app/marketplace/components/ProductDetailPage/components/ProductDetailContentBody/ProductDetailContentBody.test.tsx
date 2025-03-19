import { render, screen } from '@@/test-utils';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { ProductDetailContentBody } from './ProductDetailContentBody';

describe('ProductDetailContentBody', () => {
  it('renders the expected fields when present on the product', () => {
    const mockProduct = {
      title: 'Mock Product Title',
      description: 'Mock Short Description'
    } as Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];

    render(<ProductDetailContentBody product={mockProduct} loading={false} />);

    expect(screen.getByText(`Mock Short Description`)).toBeInTheDocument();
  });
});
