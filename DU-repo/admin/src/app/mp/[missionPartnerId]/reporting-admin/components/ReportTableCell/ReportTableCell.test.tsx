import { render, screen, userEvent } from '@@/test-utils';
import { ReportTableCell } from './ReportTableCell';
import { type ReportTableCellProps } from './ReportTableCell.types';

describe('ReportTableCell', () => {
  const defaultProps = (): ReportTableCellProps => ({
    onClick: jest.fn(),
    cellDisplayText: 'MOCK DISPLAY TEXT'
  });

  it('renders as expected', () => {
    render(<ReportTableCell {...defaultProps()} />);

    expect(
      screen.getByText(defaultProps().cellDisplayText)
    ).toBeInTheDocument();
  });

  it('calls on the onClick handler when clicked', () => {
    const props = defaultProps();

    render(<ReportTableCell {...props} />);

    userEvent.click(screen.getByText(props.cellDisplayText));

    expect(props.onClick).toHaveBeenCalled();
  });
});
