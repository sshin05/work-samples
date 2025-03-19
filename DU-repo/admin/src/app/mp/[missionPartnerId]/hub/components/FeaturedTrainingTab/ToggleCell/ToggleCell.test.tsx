import React from 'react';
import { renderV3, fireEvent, screen } from '@@/test-utils';
import { ToggleCell } from './ToggleCell';

describe('ToggleCell component', () => {
  const original = { required: true };
  const callback = jest.fn();

  it('should render with the correct initial state', () => {
    renderV3(<ToggleCell original={original} callback={callback} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeChecked();
  });

  it('should call callback with correct arguments when toggled', async () => {
    renderV3(<ToggleCell original={original} callback={callback} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(callback).toHaveBeenCalledWith(original, false);
  });

  it('should disable the toggle when loading or pending updates', () => {
    renderV3(
      <ToggleCell original={original} callback={callback} disabled={true} />
    );

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
  });
});
