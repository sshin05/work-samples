import React from 'react';
import { render, screen } from '@@/test-utils';
import { Text } from '.';

describe('Text', () => {
  it('should render text', () => {
    render(<Text data-testid="TextID" />);

    expect(screen.getByTestId('TextID')).toBeInTheDocument();
  });

  it('should render small text', () => {
    render(<Text data-testid="TextID" size="s" />);

    expect(screen.getByTestId('TextID')).toHaveStyleRule(
      'font-family',
      '"IBM Plex Sans",sans-serif'
    );

    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-size', '13px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('line-height', '26px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-weight', '400');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('letter-spacing', '0');
  });

  it('should render medium text', () => {
    render(<Text data-testid="TextID" size="m" />);

    expect(screen.getByTestId('TextID')).toHaveStyleRule(
      'font-family',
      '"IBM Plex Sans",sans-serif'
    );

    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-size', '16px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('line-height', '28px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-weight', '400');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('letter-spacing', '0');
  });

  it('should render large text', () => {
    render(<Text data-testid="TextID" size="l" />);

    expect(screen.getByTestId('TextID')).toHaveStyleRule(
      'font-family',
      '"IBM Plex Sans",sans-serif'
    );

    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-size', '20px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('line-height', '50px');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('font-weight', '500');
    expect(screen.getByTestId('TextID')).toHaveStyleRule('letter-spacing', '0');
  });

  xit('should render dark text', () => {
    render(<Text data-testid="TextID" context="dark" />);

    expect(screen.getByTestId('TextID')).toHaveStyleRule(
      'color',
      expect.stringContaining('-white,')
    );
  });

  xit('should render light text', () => {
    render(<Text data-testid="TextID" context="light" />);

    expect(screen.getByTestId('TextID')).toHaveStyleRule(
      'color',
      expect.stringContaining('-slateGray,')
    );
  });
});
