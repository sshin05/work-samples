import { fireEvent, renderV3, screen } from '@@/test-utils';
import { AwsImage } from './AwsImage';

const validBase64Image =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

describe('AwsImage Component', () => {
  it('renders image when src is provided and no errors', () => {
    renderV3(<AwsImage src={validBase64Image} alt="Test Image" />);

    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', validBase64Image);
  });

  it('shows fallback SVG when image fails to load', () => {
    renderV3(
      <AwsImage src="https://example.com/broken-image.jpg" alt="Broken Image" />
    );

    const image = screen.getByAltText('Broken Image');
    fireEvent.error(image);

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  it('shows loading state SVG when loading is true', () => {
    renderV3(
      <AwsImage src={validBase64Image} alt="Loading Image" loading={true} />
    );

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });

  it('renders circular SVG fallback when loading is true and isCircularImage is true', () => {
    renderV3(
      <AwsImage
        src={validBase64Image}
        alt="Circular Loading Image"
        loading={true}
        isCircularImage={true}
      />
    );

    const svg = screen.getByRole('img', { hidden: true });
    const circle = svg.querySelector('circle');
    expect(svg).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
  });

  it('renders rectangular SVG fallback when loading is true and isCircularImage is false', () => {
    renderV3(
      <AwsImage
        src={validBase64Image}
        alt="Rectangular Loading Image"
        loading={true}
        isCircularImage={false}
      />
    );

    const svg = screen.getByRole('img', { hidden: true });
    const rect = svg.querySelector('rect');
    expect(svg).toBeInTheDocument();
    expect(rect).toBeInTheDocument();
  });

  it('renders with custom width and height', () => {
    renderV3(
      <AwsImage
        src={validBase64Image}
        alt="Custom Size Image"
        w="64px"
        h="64px"
        loading={true}
      />
    );

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });

  it('shows fallback when no src is provided', () => {
    renderV3(<AwsImage src="" alt="No Source Image" />);

    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});
