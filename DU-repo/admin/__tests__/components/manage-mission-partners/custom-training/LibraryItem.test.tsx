import LibraryItem from '../../../../src/components/manage-mission-partners/custom-training/LibraryItem';
import { fireEvent, render, screen } from '@@/test-utils';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  Button: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Text: ({ children }) => <span>{children}</span>,
  Flex: ({ children }) => <span>{children}</span>
}));

jest.mock('@carbon/icons-react', () => ({
  Video: () => <div>Video</div>,
  VolumeUp: () => <div>Audio</div>,
  Document: () => <div>File</div>,
  Link: () => <div>Link</div>,
  Launch: () => <div>Launch</div>
}));

describe('LibraryItem test', () => {
  it('should render a library item', () => {
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: 'File',
          url: '/assets/blah'
        }}
        disabled={false}
      />
    );

    expect(screen.getByText(/Item/)).toBeInTheDocument();
  });

  it('should render a library item that opens a new window', () => {
    window.open = jest.fn();
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: 'Video',
          url: 'www.test.co'
        }}
        disabled={false}
      />
    );

    expect(screen.getByText(/Item/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Item/));
    expect(window.open).toHaveBeenCalled();
  });

  it('should render an audio library item', () => {
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: 'Audio',
          url: 'www.test.co'
        }}
        disabled={false}
      />
    );

    expect(screen.getByText(/Item/)).toBeInTheDocument();
  });

  it('should render a link library item', () => {
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: 'Link',
          url: 'www.test.co'
        }}
        disabled={false}
      />
    );

    expect(screen.getByText(/Item/)).toBeInTheDocument();
  });

  it('should choose default on switch statement', () => {
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: '',
          url: 'www.test.co'
        }}
        disabled={false}
      />
    );

    expect(screen.getByText(/Item/)).toBeInTheDocument();
  });

  it('should open a new window on click', () => {
    render(
      <LibraryItem
        libraryItem={{
          id: '1',
          title: 'Item',
          type: '',
          url: '/assets/test'
        }}
        disabled={false}
      />
    );

    fireEvent.click(screen.getByText(/Item/));
    expect(window.open).toHaveBeenCalled();
  });
});
