import ImagePreviewer from '../../src/components/settings-banner/banner-card/BannerImagePreviewer';
import { render, screen } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Text: ({ children }) => <span>{children}</span>,
  Image: ({ alt, src }) => <div>{`${alt} ${src}`}</div>
}));

const mockCreateURL = jest.fn();
window.URL.createObjectURL = mockCreateURL.mockImplementation(
  file => file.name
);

const image = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('image preview', () => {
  it('should render image from file', () => {
    render(<ImagePreviewer title={'title'} image={image} />);
    const imageComponent = screen.getByText('title image hello.png');
    expect(imageComponent).toBeInTheDocument();
  });
  it('should render placeholder if title is falsy', () => {
    render(<ImagePreviewer title={''} image={image} />);
    const imageComponent = screen.getByText('your image hello.png');
    expect(imageComponent).toBeInTheDocument();
  });
  it('should render image when given string url instead of file', () => {
    render(<ImagePreviewer title={''} image={'hello.png'} />);
    const imageComponent = screen.getByText('your image hello.png');
    expect(imageComponent).toBeInTheDocument();
  });
  it('should render default image preview', () => {
    render(<ImagePreviewer title={''} image={''} />);
    const imageComponent = screen.getByText('Logo Image');
    expect(imageComponent).toBeInTheDocument();
  });
});
