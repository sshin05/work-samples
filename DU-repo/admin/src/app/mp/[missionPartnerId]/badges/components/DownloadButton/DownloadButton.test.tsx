// DownloadButton.test.tsx
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderV3 } from '@@/test-utils';
import { DownloadButton } from './DownloadButton';

const onClickMock = jest.fn();

describe('DownloadButton', () => {
  it('renders the button with correct text and icon', () => {
    renderV3(
      <DownloadButton onClick={onClickMock} exportingDisabled={false} />
    );

    const buttonText = screen.getByText(/Download all DU badge recipients/i);
    expect(buttonText).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    renderV3(
      <DownloadButton onClick={onClickMock} exportingDisabled={false} />
    );

    const button = screen.getByText(/Download all DU badge recipients/i);
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});

describe('DownloadButton disabled state', () => {
  it('disables the button when exportingDisabled is true', () => {
    renderV3(<DownloadButton onClick={onClickMock} exportingDisabled={true} />);

    // Find the button
    const button = screen.getByText(/Download all DU badge recipients/i);

    // Check if the button is disabled
    expect(button).toBeDisabled();
  });

  it('enables the button when exportingDisabled is false', () => {
    renderV3(
      <DownloadButton onClick={onClickMock} exportingDisabled={false} />
    );

    // Find the button
    const button = screen.getByText(/Download all DU badge recipients/i);

    // Check if the button is enabled
    expect(button).not.toBeDisabled();
  });
});
