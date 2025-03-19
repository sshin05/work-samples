import { screen, render } from '@@/test-utils';
import type { sqlGetMarketplaceProduct } from '@/app/api/marketplace/products';
import { ProductCard } from './ProductCard';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: 'Test User', role: 'admin' },
      expires: '9999-12-31T23:59:59.999Z'
    }
  }))
}));

describe('ProductCard', () => {
  it('renders', () => {
    const mockProduct = {
      title: 'Mock Title',
      shortDescription: 'Mock Description'
    } as Awaited<ReturnType<typeof sqlGetMarketplaceProduct>>['_serviceData'];

    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });
});
