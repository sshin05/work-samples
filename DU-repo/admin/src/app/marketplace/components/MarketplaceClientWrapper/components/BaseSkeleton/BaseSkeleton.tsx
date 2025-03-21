import { type ReactNode, type JSX } from 'react';

/**
 *
 * BaseSkeleton relies on Cerberus'
 * [Skeletor API](https://cerberus.digitalu.design/react/loading-states)
 * to determine whether to show the skeleton or the children based on
 * the `aria-busy` value.
 */

/**
 * Props for the BaseSkeleton component.
 */
type Props = {
  /**
   * Whether the required children content is loading.
   */
  isLoading?: boolean;
  /**
   * A className string generated by Cerberus functions.
   */
  className?: string;
  /**
   * The children content to display within the skeleton wrapper.
   */
  children: ReactNode;
};

/**
 * A loading wrapper around children content.
 *
 * @returns {JSX.Element}
 *
 * @example
 * <BaseSkeleton
 *   className={css({ color: 'blue' })}
 *   isLoading={isResponsePending}
 * >
 *   <p>
 *     {response?.update || 'Nothing to report.'}
 *   </p>
 * </BaseSkeleton>
 */
export const BaseSkeleton = ({
  isLoading = true,
  className,
  children
}: Props): JSX.Element => {
  return (
    <div role="status" className={className} aria-busy={isLoading}>
      {children}
    </div>
  );
};
