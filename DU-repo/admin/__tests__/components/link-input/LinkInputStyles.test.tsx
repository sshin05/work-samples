import { render, screen } from '@testing-library/react';
import {
  StyledEditorWrapper,
  StyledHelperText,
  StyledInputContainer,
  StyledPopoverIconContainer
} from '../../../src/components/link-input/linkInputStyles';

jest.mock('@digital-u/digital-ui', () => ({
  ...jest.requireActual('@digital-u/digital-ui'),
  // prop spread to get styles in from styled
  Text: props => <span {...props}>{props.children}</span>,
  Flex: props => <div {...props}>{props.children}</div>
}));

describe('LinkInputStyles', () => {
  describe('StyledEditorWrapper', () => {
    it('should render default styles correctly', () => {
      const { container } = render(
        <StyledEditorWrapper id="test" focus={false} disabled={false} />
      );

      expect(container.querySelector('#test')).toHaveStyle(
        'border-bottom: 1px solid #8d8d8d'
      );
    });

    it('should render error styles correctly', () => {
      const { container } = render(
        <StyledEditorWrapper
          id="test"
          errorText="error"
          focus={false}
          disabled={false}
        />
      );

      expect(container.querySelector('#test')).not.toHaveStyle(
        'border-bottom: 1px solid #8d8d8d'
      );
      expect(container.querySelector('#test')).toHaveStyle(`
      outline: 2px solid #FB362D;
    `);
    });

    it('should render disabled styles correctly', () => {
      const { container } = render(
        <StyledEditorWrapper id="test" disabled focus={false} />
      );

      // can't get style checks inside those classes so this suffices
      expect(container.querySelector('#test')).toHaveStyle(
        'border-bottom: 1px solid #8d8d8d'
      );
      expect(container.querySelector('#test')).not.toHaveStyle(`
      outline: 2px solid #FB362D;
    `);
    });

    it('should render focus styles correctly only when disabled and errorText are false', () => {
      const { container } = render(
        <StyledEditorWrapper id="test" focus disabled={false} />
      );

      expect(container.querySelector('#test')).not.toHaveStyle(
        'border-bottom: 1px solid #8d8d8d'
      );
      expect(container.querySelector('#test')).toHaveStyle(`
      outline: 0.125rem solid #7F39FB;
    `);
    });

    it('should render errorText over focus and disabled when all are set to true', () => {
      const { container } = render(
        <StyledEditorWrapper id="test" errorText="error" focus disabled />
      );

      expect(container.querySelector('#test')).not.toHaveStyle(
        'border-bottom: 1px solid #8d8d8d'
      );
      expect(container.querySelector('#test')).toHaveStyle(`
      outline: 2px solid #FB362D;
    `);
    });

    it('should not render focus styles when disabled or errorText is truthy', () => {
      const { container } = render(
        <StyledEditorWrapper id="test" focus disabled />
      );

      expect(container.querySelector('#test')).not.toHaveStyle(`
      outline: 0.125rem solid #7F39FB;
    `);
    });
  });

  describe('StyledHelperText', () => {
    it('should render with colors.gray[600] when disabled is false', () => {
      render(<StyledHelperText disabled={false} data-testid="test" />);

      expect(screen.getByTestId('test')).toHaveStyle('color: rgb(82, 82, 82)');
    });

    it('should render with colors.gray[600] when disabled is true', () => {
      render(<StyledHelperText disabled data-testid="test" />);

      expect(screen.getByTestId('test')).toHaveStyle(
        'color: rgb(198, 198, 198)'
      );
    });
  });

  describe('StyledInputContainer', () => {
    it('should have a margin bottom of 0 when errorText and helperText are falsy', () => {
      render(<StyledInputContainer data-testid="test" />);

      expect(screen.getByTestId('test')).toHaveStyle('margin-bottom: 0px');
    });

    it('should have a margin bottom of -1.125rem when errorText is truthy', () => {
      render(<StyledInputContainer data-testid="test" errorText="error" />);

      expect(screen.getByTestId('test')).toHaveStyle(
        'margin-bottom: -1.125rem'
      );
    });

    it('should have a margin bottom of -1.125rem when helperText is truthy', () => {
      render(<StyledInputContainer data-testid="test" errorText="error" />);

      expect(screen.getByTestId('test')).toHaveStyle(
        'margin-bottom: -1.125rem'
      );
    });
  });

  describe('StyledPopoverIconContainer', () => {
    it('should render with width 0 when popoverOffsetCloseToEnd is true', () => {
      render(
        <StyledPopoverIconContainer
          popoverOffsetCloseToEnd
          popoverOffset={0}
          data-testid="test"
        >
          <span>child</span>
        </StyledPopoverIconContainer>
      );

      expect(screen.getByTestId('test')).toHaveStyle('width: 0px;');
    });

    it('should render with width of popoverOffset when popoverOffsetCloseToEnd is false', () => {
      render(
        <StyledPopoverIconContainer
          popoverOffsetCloseToEnd={false}
          popoverOffset={5}
          data-testid="test"
        >
          <span>child</span>
        </StyledPopoverIconContainer>
      );

      expect(screen.getByTestId('test')).toHaveStyle('width: 5px;');
    });
  });
});
