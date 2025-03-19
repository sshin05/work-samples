import React from 'react';
import { renderV3, screen, userEvent, waitFor } from '@@/test-utils';
import { NullHover } from './NullHover';

describe('Null Hover', () => {
  it('should render and display element on hover', async () => {
    const onClickMock = jest.fn();
    renderV3(
      <NullHover
        enabled
        width="100%"
        text="test text"
        onClick={onClickMock}
        element={<p>Display</p>}
      >
        test
      </NullHover>
    );

    const testElement = screen.getByText('test');
    expect(testElement).toBeInTheDocument();

    await waitFor(() => {
      userEvent.hover(testElement);
      const clickableDisplayText = screen.getByText('Display');
      expect(clickableDisplayText).toBeInTheDocument();
      userEvent.click(clickableDisplayText);

      expect(onClickMock).toBeCalledTimes(1);
      userEvent.unhover(screen.getByText('test'));
    });

    const disappearDisplayElement = screen.queryByText('Display');
    expect(disappearDisplayElement).not.toBeInTheDocument();
  });

  it('should not display element on non null hover', async () => {
    renderV3(
      <NullHover enabled={false} width="100%" element={<p>Display</p>}>
        test
      </NullHover>
    );
    expect(screen.getByText('test')).toBeInTheDocument();
    await waitFor(() => {
      userEvent.hover(screen.getByText('test'));
    });
    expect(screen.queryByText('Display')).not.toBeInTheDocument();
  });
});
