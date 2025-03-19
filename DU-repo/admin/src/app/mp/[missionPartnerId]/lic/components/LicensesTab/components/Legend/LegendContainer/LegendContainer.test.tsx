import { renderV3, screen } from '@@/test-utils';
import { LegendContainer } from './LegendContainer'; // Adjust path as needed
import { LegendItem } from '../LegendItem';
import { useChartColors } from '@/lib/chartjs';

jest.mock('@/lib/chartjs', () => ({
  useChartColors: jest.fn()
}));

jest.mock('../LegendItem', () => ({
  LegendItem: jest.fn(() => <div data-testid="legend-item" />)
}));

describe('LegendContainer', () => {
  const mockChartColors = {
    sequential300: '#ff0000',
    sequential200: '#00ff00',
    sequential100: '#0000ff'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useChartColors as jest.Mock).mockReturnValue(mockChartColors);
  });

  it('renders a container with the correct number of LegendItems', () => {
    renderV3(<LegendContainer />);

    // ensure all LegendItems are rendered
    expect(screen.getAllByTestId('legend-item')).toHaveLength(3);
  });

  it('passes the correct props to each LegendItem', () => {
    renderV3(<LegendContainer />);

    // access the calls to the mocked LegendItem
    const legendItemCalls = (LegendItem as jest.Mock).mock.calls;

    // validate the first LegendItem props
    expect(legendItemCalls[0][0]).toEqual(
      expect.objectContaining({
        color: '#ff0000',
        label: expect.anything()
      })
    );

    // validate the content of the label for the first LegendItem
    expect(legendItemCalls[0][0].label).toMatchObject({
      type: 'span',
      props: {
        children: [
          'Assigned &',
          ' ',
          {
            type: 'span',
            props: {
              className: expect.any(String),
              children: 'active'
            }
          },
          ' (in last 4 weeks)'
        ]
      }
    });

    // validate the second LegendItem props
    expect(legendItemCalls[1][0]).toEqual(
      expect.objectContaining({
        color: '#00ff00',
        label: expect.anything()
      })
    );

    // validate the content of the label for the second LegendItem
    expect(legendItemCalls[1][0].label).toMatchObject({
      type: 'span',
      props: {
        children: [
          'Assigned &',
          ' ',
          {
            type: 'span',
            props: {
              className: expect.any(String),
              children: 'inactive'
            }
          },
          ' (in last 4 weeks)'
        ]
      }
    });

    // validate the third LegendItem props
    expect(legendItemCalls[2][0]).toEqual(
      expect.objectContaining({
        color: '#0000ff',
        label: expect.anything()
      })
    );

    const expectlegendItem3 = legendItemCalls[2][0]?.label;
    expect(expectlegendItem3).toBe('Available');
  });
});
