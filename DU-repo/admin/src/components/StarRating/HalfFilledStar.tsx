import React from 'react';
interface StarRatingProps {
  size?: number;
}
export const HalfFilledStar = ({ size = 16 }: StarRatingProps) => {
  return (
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left half (filled) */}
      <path
        d="M5.7 5.6L0.6 6.3 4.3 9.9 3.5 15 8 12.6 8 1z"
        fill="currentColor"
      />
      {/* Star outline */}
      <path
        d="M8,3.3l1.4,2.8l0.2,0.5l0.5,0.1l3.1,0.4L11,9.2l-0.4,0.4l0.1,0.5l0.5,3.1l-2.8-1.4L8,11.5l-0.5,0.2l-2.8,1.4l0.5-3.1 l0.1-0.5L5,9.2L2.8,7l3.1-0.4l0.5-0.1L6.6,6L8,3.3 M8,1L5.7,5.6L0.6,6.3l3.7,3.6L3.5,15L8,12.6l4.6,2.4l-0.9-5.1l3.7-3.6l-5.1-0.7 L8,1z"
        fill="none"
        stroke="currentColor"
      />
    </svg>
  );
};
