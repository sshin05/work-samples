import { render, screen, fireEvent } from '@testing-library/react';
import ImageFetcher from './ImageFetcher';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  )
}));

describe('ImageFetcher', () => {
  const defaultProps = {
    src: '/valid-image.jpg',
    fallbackSrc: '/fallback-image.jpg',
    alt: 'Test Image',
    width: 100,
    height: 100
  };

  it('renders with the provided src', () => {
    render(<ImageFetcher {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.alt);
    expect(image).toHaveAttribute('src', defaultProps.src);
  });

  it('switches to fallbackSrc on error', () => {
    render(<ImageFetcher {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.alt);
    expect(image).toHaveAttribute('src', defaultProps.src);

    fireEvent.error(image);

    expect(image).toHaveAttribute('src', defaultProps.fallbackSrc);
  });

  it('renders with fallbackSrc if no src is provided', () => {
    render(<ImageFetcher {...defaultProps} src="" />);

    const image = screen.getByAltText(defaultProps.alt);
    expect(image).toHaveAttribute('src', defaultProps.fallbackSrc);
  });

  it('renders with correct dimensions', () => {
    render(<ImageFetcher {...defaultProps} />);

    const image = screen.getByAltText(defaultProps.alt);
    expect(image).toHaveAttribute('width', defaultProps.width.toString());
    expect(image).toHaveAttribute('height', defaultProps.height.toString());
  });
});
