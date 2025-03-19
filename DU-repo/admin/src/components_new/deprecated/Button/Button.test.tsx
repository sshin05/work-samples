import React from 'react';
import { Button } from '.';
import { render, screen, userEvent } from '@@/test-utils';

describe('Button', () => {
  it('should render a Button', () => {
    render(<Button data-testid="Button" />);

    expect(screen.getByTestId('Button')).toBeInTheDocument();
  });

  xit('should render a primary dark Button', () => {
    render(<Button context="dark" type="primary" data-testid="Button" />);
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-black,#000000)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule('border', '0');
  });

  xit('should render a secondary dark Button', () => {
    render(<Button context="dark" type="secondary" data-testid="Button" />);
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-transparent,rgba(255,255,255,0))'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'border',
      'solid 1px white'
    );
  });

  xit('should render a disabled primary dark Button', () => {
    render(
      <Button context="dark" type="primary" disabled data-testid="Button" />
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-neonViolet,#661fff)',
      {
        target: 'disabled'
      }
    );
  });

  xit('should render a disabled secondary dark Button', () => {
    render(
      <Button context="dark" type="secondary" disabled data-testid="Button" />
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-neonViolet,#661fff)',
      {
        target: 'disabled'
      }
    );
  });

  xit('should render a primary light Button', () => {
    render(<Button context="light" type="primary" data-testid="Button" />);

    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-black,#000000)'
    );
  });

  xit('should render a secondary light Button', () => {
    render(<Button context="light" type="secondary" data-testid="Button" />);

    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-black,#000000)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-white,#ffffff)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'border',
      'solid 1px black'
    );
  });

  xit('should render a disabled primary light Button', () => {
    render(
      <Button context="light" type="primary" disabled data-testid="Button" />
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'background-color',
      'var(--theme-ui-colors-black,#000000)',
      {
        target: 'disabled'
      }
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule('opacity', '0.2', {
      target: 'disabled'
    });
  });

  xit('should render a disabled secondary light Button', () => {
    render(
      <Button context="light" type="secondary" disabled data-testid="Button" />
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'color',
      'var(--theme-ui-colors-black,#000000)'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule(
      'border',
      'solid 1px black'
    );
    expect(screen.getByTestId('Button')).toHaveStyleRule('opacity', '0.2', {
      target: 'disabled'
    });
  });

  it('should not function when disabled', () => {
    let testValue = false;
    const test = () => {
      testValue = true;
    };

    render(
      <Button
        context="light"
        type="primary"
        onClick={test}
        disabled
        data-testid="Button"
      />
    );
    userEvent.click(screen.getByTestId('Button'));
    expect(testValue).toBe(false);
  });

  it('should function when enabled', () => {
    let testValue = false;
    const test = () => {
      testValue = true;
    };

    render(
      <Button
        context="light"
        type="primary"
        onClick={test}
        data-testid="Button"
      />
    );
    userEvent.click(screen.getByTestId('Button'));
    expect(testValue).toBe(true);
  });
});
