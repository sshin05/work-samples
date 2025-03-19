import React from 'react';
import { renderV3, screen } from '@@/test-utils';
import { BaseSkeleton } from './BaseSkeleton';

const CHILD_CONTENT = 'Test content';
const CLASS_NAME = 'test-class-name';

describe('BaseSkeleton', () => {
  describe('Basic Rendering', () => {
    it('renders children content', () => {
      renderV3(
        <BaseSkeleton className={CLASS_NAME} isLoading={false}>
          <p>{CHILD_CONTENT}</p>
        </BaseSkeleton>
      );

      const child = screen.getByText(CHILD_CONTENT);
      expect(child).toBeInTheDocument();
    });
  });

  describe('Aria Attributes', () => {
    describe('Default IsLoading', () => {
      it('defaults aria-busy to true', () => {
        renderV3(
          <BaseSkeleton className={CLASS_NAME}>
            <p>{CHILD_CONTENT}</p>
          </BaseSkeleton>
        );

        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
      });
    });

    describe('Loading', () => {
      it('sets aria-busy to true', () => {
        renderV3(
          <BaseSkeleton className={CLASS_NAME} isLoading={true}>
            <p>{CHILD_CONTENT}</p>
          </BaseSkeleton>
        );

        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveAttribute('aria-busy', 'true');
      });
    });

    describe('Not Loading', () => {
      it('sets aria-busy to false', () => {
        renderV3(
          <BaseSkeleton className={CLASS_NAME} isLoading={false}>
            <p>{CHILD_CONTENT}</p>
          </BaseSkeleton>
        );

        const skeleton = screen.getByRole('status');
        expect(skeleton).toHaveAttribute('aria-busy', 'false');
      });
    });
  });

  describe('Class Names', () => {
    it('applies provided className', () => {
      renderV3(
        <BaseSkeleton className={CLASS_NAME} isLoading={false}>
          <p>{CHILD_CONTENT}</p>
        </BaseSkeleton>
      );

      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass(CLASS_NAME);
    });
  });
});
