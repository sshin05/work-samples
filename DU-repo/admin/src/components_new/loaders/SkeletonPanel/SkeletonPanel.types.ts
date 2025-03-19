/**
 * @fileoverview - I'm putting this all here because I forsee finding simple ways to make this component more dynamic in the future.
 * and following inline documentation for prop comments, as described in the CONTRIBUTING.md file, will be better served here.
 *
 * See metadata documentation in CONTRIBUTING.md:
 * [Metadata Section](../../../../CONTRIBUTING.md)
 */
export interface SkeletonPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
