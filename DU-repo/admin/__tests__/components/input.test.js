import React from 'react';
import { render, screen } from '@@/test-utils';
import Input from '../../src/components/input/input';

describe('Input', () => {
  it('should render an input', () => {
    render(<Input name="testInput" data-testid="input" />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  xit('should render an input with dark context', () => {
    render(<Input name="testInput" context="dark" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white30,rgba(255,255,255,0.3))'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule('border', 'none');
  });

  xit('should render an input with light context', () => {
    render(<Input name="testInput" context="light" data-testid="input" />);
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-black10,rgba(0,0,0,0.1))'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-black,#000000)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule('border', 'none');
  });

  xit('should render an input with dark context and a success state', () => {
    render(
      <Input
        name="testInput"
        context="dark"
        state="success"
        data-testid="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-_navyBlue,#00078c)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'border-color',
      'var(--theme-ui-colors-neonViolet,#661fff)'
    );
  });

  xit('should render an input with light context and a success state', () => {
    render(
      <Input
        name="testInput"
        context="light"
        state="success"
        data-testid="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-_navyBlue,#00078c)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'border-color',
      'var(--theme-ui-colors-neonViolet,#661fff)'
    );
  });

  xit('should render an input with dark context and an error state', () => {
    render(
      <Input
        name="testInput"
        context="dark"
        state="error"
        data-testid="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-_torchRed,#ff1f1f)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'outline-color',
      'var(--theme-ui-colors-_torchRed,#ff1f1f)'
    );
  });

  xit('should render an input with light context and an error state', () => {
    render(
      <Input
        name="testInput"
        context="light"
        state="error"
        data-testid="input"
      />
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-_torchRed,#ff1f1f)'
    );
    expect(screen.getByTestId('input')).toHaveStyleRule(
      'outline-color',
      'var(--theme-ui-colors-_torchRed,#ff1f1f)'
    );
  });
});
