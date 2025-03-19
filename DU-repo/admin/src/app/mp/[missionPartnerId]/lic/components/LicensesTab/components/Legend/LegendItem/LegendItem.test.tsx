import React from 'react';
import { renderV3 } from '@@/test-utils';
import { LegendItem } from './LegendItem'; // Adjust path as necessary
import { SquareFill } from '@cerberus/icons';

jest.mock('@cerberus/icons', () => ({
  SquareFill: jest.fn(() => <div data-testid="square-fill" />)
}));

describe('LegendItem', () => {
  it('renders correctly with label and color', () => {
    const label = 'Assigned & Active';
    const color = '#123456';

    const { getByText, getByTestId } = renderV3(
      <LegendItem label={label} color={color} />
    );

    // check if the SquareFill component is rendered
    const squareFill = getByTestId('square-fill');
    expect(squareFill).toBeInTheDocument();

    // check if the label text is rendered
    expect(getByText(label)).toBeInTheDocument();

    // ensure SquareFill receives the correct color prop
    expect(SquareFill).toHaveBeenCalledWith(
      expect.objectContaining({ color }),
      undefined
    );
  });
});
