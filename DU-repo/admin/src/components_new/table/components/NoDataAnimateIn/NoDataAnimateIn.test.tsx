import { renderV3, fireEvent, screen, waitFor } from '@@/test-utils';
import { NoDataAnimateIn } from './NoDataAnimateIn';

const message = 'No data available';
const buttonText = 'Click me';
const delay = '400ms';
const cta = jest.fn();

describe('NoDataAnimateIn', () => {
  it('renders no data message correctly', () => {
    const { getByText } = renderV3(<NoDataAnimateIn message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('renders button and handles click when buttonText and cta are provided', () => {
    renderV3(
      <NoDataAnimateIn message={message} buttonText={buttonText} cta={cta} />
    );

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(cta).toHaveBeenCalled();
  });

  it('does not render button when buttonText and cta are not provided', () => {
    const message = 'No data available';

    renderV3(<NoDataAnimateIn message={message} />);

    expect(screen.queryByText('Click me')).not.toBeInTheDocument();
  });

  it('renders spinner when spinner is true', () => {
    renderV3(<NoDataAnimateIn message={message} spinner />);
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders button with delay prop', async () => {
    renderV3(
      <NoDataAnimateIn
        message={message}
        buttonText={buttonText}
        cta={cta}
        delay={delay}
      />
    );
    const button = screen.getByText(buttonText);
    await waitFor(() => expect(button).toBeInTheDocument());
  });
});
