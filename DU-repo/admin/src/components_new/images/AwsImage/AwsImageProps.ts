export type AwsImageProps = {
  alt: string;

  // rounds the encapsulating div's border-radius to 50% (full in cerby)
  isCircularImage?: boolean;

  // sets the aria-busy attribute on an svg's encapsulating div
  loading?: boolean;

  // If the src is from AWS, use this Image component over nextjs because it next/Image will degrade performance.
  src: string;

  // The w property must be in `px` units
  w?: string;

  // The h property must be in `px` units
  h?: string;

  // defaults to 'page.bg.100'
  bg?: string;

  // custom classes passed into the component
  className?: string;
};
