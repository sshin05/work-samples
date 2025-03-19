import { render, screen } from '@@/test-utils';
import { Flex } from './Flex';

const mockChildren = <div>mockChildren</div>;

describe('flex', () => {
  it('should render a empty flex', () => {
    render(<Flex data-testid="emptyflex">{mockChildren}</Flex>);

    expect(screen.getByTestId('emptyflex')).toBeInTheDocument();
    expect(screen.getByTestId('emptyflex')).toHaveStyleRule('display', 'flex');
  });

  it('should render a flex that starts at column 2 and ends at column 5', () => {
    render(
      <Flex start={2} end={5} data-testid="emptyflex">
        {mockChildren}
      </Flex>
    );

    expect(screen.getByTestId('emptyflex')).toHaveStyleRule(
      'grid-column-start',
      '2'
    );
    expect(screen.getByTestId('emptyflex')).toHaveStyleRule(
      'grid-column-end',
      '5'
    );
  });

  it('should render a flex that starts at column 3 and spans 10', () => {
    render(
      <Flex start={3} span={10} data-testid="emptyflex">
        {mockChildren}
      </Flex>
    );

    expect(screen.getByTestId('emptyflex')).toHaveStyleRule(
      'grid-column-start',
      '3'
    );
    expect(screen.getByTestId('emptyflex')).toHaveStyleRule(
      'grid-column-end',
      'span 10'
    );
  });
});
