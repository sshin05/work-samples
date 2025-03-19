import { renderV3, screen } from '@@/test-utils';
import { TableLoader } from './TableLoader';

const messages = [
  'Consulting Digi',
  'Conjuring your content',
  'Unleashing the digital kraken',
  'Harnessing the power of the cloud',
  'Syncing with the digital realm',
  'Summoning the code spirits'
];

const columns = [
  {
    header: 'test name'
  },
  {
    header: 'test last name'
  },
  {
    header: 'test email'
  }
];

describe('TableLoader', () => {
  it('rotates the messages', () => {
    renderV3(<TableLoader buttonContent="Test button text" columns={[]} />);

    const messageElement = screen.getByText(new RegExp(messages.join('|')));
    expect(messageElement).toBeInTheDocument();
  });

  it('uses the props correctly', () => {
    renderV3(
      <TableLoader buttonContent="Test button text" columns={columns} />
    );
    expect(screen.getByText('Test button text')).toBeInTheDocument();
    expect(screen.getByText('test name')).toBeInTheDocument();
    expect(screen.getByText('test last name')).toBeInTheDocument();
    expect(screen.getByText('test email')).toBeInTheDocument();
  });
});
