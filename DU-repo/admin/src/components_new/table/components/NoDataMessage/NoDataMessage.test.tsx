import { renderV3, fireEvent, screen } from '@@/test-utils';
import { NoDataMessage } from './NoDataMessage';

describe('NoDataMessage', () => {
  const message = 'No data available';
  const buttonText = 'Click me';
  const cta = jest.fn();
  it('renders no data message correctly', () => {
    const { getByText } = renderV3(<NoDataMessage message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
  it('renders button and handles click when buttonText and cta are provided', () => {
    renderV3(
      <NoDataMessage message={message} buttonText={buttonText} cta={cta} />
    );

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(cta).toHaveBeenCalled();
  });
  it('does not render button when buttonText and cta are not provided', () => {
    const message = 'No data available';

    renderV3(<NoDataMessage message={message} />);

    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });
});
